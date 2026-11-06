import { EMAIL } from "@/data/site";
import { MAX_BODY_BYTES, parseQuote, quoteHtml, quoteSubject, quoteText } from "@/lib/quote";

/**
 * 무료 견적 요청을 Resend로 받아 개인 메일로 보냅니다.
 * 필요한 환경 변수: RESEND_API_KEY (Vercel 프로젝트에 Secret으로 저장)
 * 선택: QUOTE_FROM (보내는 주소, 기본값 onboarding@resend.dev), QUOTE_TO (받는 주소, 기본값 사이트 이메일)
 */

const FROM = process.env.QUOTE_FROM || "그리다, 스튜디오 <onboarding@resend.dev>";
const TO = process.env.QUOTE_TO || EMAIL;

// 같은 곳에서 짧은 시간에 여러 번 보내는 것을 막습니다. (서버 인스턴스마다 따로 세는 간단한 방식)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function tooMany(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[quote] RESEND_API_KEY is not set");
    return Response.json({ error: "메일 발송 설정이 아직 끝나지 않았어요." }, { status: 500 });
  }

  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 415 });
  }

  // 너무 큰 요청은 거절합니다. (Content-Length로 먼저 거르고, 읽은 뒤 한 번 더 확인)
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return Response.json({ error: "입력한 내용이 너무 깁니다." }, { status: 413 });
  }
  const text = await request.text();
  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) {
    return Response.json({ error: "입력한 내용이 너무 깁니다." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    const parsedJson: unknown = JSON.parse(text);
    if (!parsedJson || typeof parsedJson !== "object" || Array.isArray(parsedJson)) throw new Error();
    body = parsedJson as Record<string, unknown>;
  } catch {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 봇 막기: 사람에게는 보이지 않는 칸이 채워졌거나, 양식을 연 지 3초도 안 돼 보냈다면 조용히 무시합니다.
  const startedAt = Number(body.startedAt);
  const elapsed = Date.now() - startedAt;
  if (body.website || !Number.isFinite(startedAt) || elapsed < 3000 || elapsed > 24 * 60 * 60 * 1000) {
    return Response.json({ ok: true });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (tooMany(ip)) {
    return Response.json({ error: "잠시 후 다시 시도해 주세요." }, { status: 429 });
  }

  const parsed = parseQuote(body);
  if (!parsed.ok) return Response.json({ error: parsed.error }, { status: 400 });
  const f = parsed.data;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      subject: quoteSubject(f),
      text: quoteText(f),
      html: quoteHtml(f),
      ...(f.email ? { reply_to: f.email } : {}),
    }),
  });

  if (!res.ok) {
    console.error("[quote] Resend error", res.status, await res.text().catch(() => ""));
    return Response.json({ error: "메일을 보내지 못했어요. 잠시 후 다시 시도해 주세요." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
