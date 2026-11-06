/** 견적 요청 양식: 모달(브라우저)과 /api/quote(서버)가 함께 씁니다. */

export type QuoteFields = {
  name: string;
  company: string;
  phone: string;
  email: string;
  industry: string;
  siteType: string;
  /** 참고 사이트 여러 개 */
  reference: string[];
  timeline: string;
  budget: string;
  message: string;
};

export const EMPTY_QUOTE: QuoteFields = {
  name: "",
  company: "",
  phone: "",
  email: "",
  industry: "",
  siteType: "",
  reference: [""],
  timeline: "",
  budget: "",
  message: "",
};

export const SITE_TYPES = ["회사 · 매장 소개", "포트폴리오", "랜딩페이지 (1페이지)", "블로그", "아직 모르겠어요"];
export const BUDGETS = ["50만 원 이하", "50~100만 원", "100~200만 원", "200만 원 이상", "상담 후 결정"];
export const TIMELINES = ["2주 이내", "한 달 이내", "1~3개월", "정해지지 않음"];

/** 칸별 최대 글자 수 (모달 입력칸의 maxLength와 같게 씁니다) */
export const LIMITS = {
  name: 30,
  company: 60,
  phone: 20,
  email: 100,
  industry: 50,
  message: 2000,
  reference: 200,
} as const;
export const MAX_REFS = 5;

/** 서버가 받는 요청 본문의 최대 크기 (바이트) */
export const MAX_BODY_BYTES = 32 * 1024;

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
const PHONE_CHARS_RE = /^\+?[0-9\s()-]+$/;

/** 줄바꿈을 뺀 제어 문자를 지우고 앞뒤 공백을 정리합니다. */
const clean = (s: string, keepNewlines = false) =>
  (keepNewlines ? s.replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "") : s.replace(/[\u0000-\u001F\u007F]/g, " "))
    .replace(keepNewlines ? /[ \t]+/g : /\s+/g, " ")
    .trim();

export function phoneDigits(phone: string) {
  return phone.replace(/\D/g, "");
}

/** 브라우저와 서버가 함께 쓰는 연락처 검사: 숫자 9~13자리, 숫자·+·-·괄호·공백만 */
export function isValidPhone(phone: string) {
  const d = phoneDigits(phone);
  return PHONE_CHARS_RE.test(phone.trim()) && d.length >= 9 && d.length <= 13;
}

export function isValidEmail(email: string) {
  return email.length <= LIMITS.email && EMAIL_RE.test(email);
}

type Result = { ok: true; data: QuoteFields } | { ok: false; error: string };
const fail = (error: string): Result => ({ ok: false, error });

/** 서버에서 받은 값을 검사하고 정리합니다. 문제가 있으면 오류 문구를 돌려줍니다. */
export function parseQuote(input: unknown): Result {
  if (!input || typeof input !== "object" || Array.isArray(input)) return fail("잘못된 요청입니다.");
  const raw = input as Record<string, unknown>;

  const str = (k: string): string | null => {
    const v = raw[k];
    if (v === undefined || v === null) return "";
    return typeof v === "string" ? v : null;
  };

  // 글자 칸
  const name = str("name"), company = str("company"), phone = str("phone"), email = str("email");
  const industry = str("industry"), message = str("message");
  const siteType = str("siteType"), timeline = str("timeline"), budget = str("budget");
  if ([name, company, phone, email, industry, message, siteType, timeline, budget].some((v) => v === null)) {
    return fail("잘못된 요청입니다.");
  }

  const data: QuoteFields = {
    name: clean(name!),
    company: clean(company!),
    phone: clean(phone!),
    email: clean(email!).toLowerCase(),
    industry: clean(industry!),
    message: clean(message!, true).replace(/\n{3,}/g, "\n\n"),
    siteType: clean(siteType!),
    timeline: clean(timeline!),
    budget: clean(budget!),
    reference: [],
  };

  // 필수 · 형식
  if (!data.name) return fail("이름을 입력해 주세요.");
  if (data.name.length > LIMITS.name) return fail(`이름은 ${LIMITS.name}자까지 입력할 수 있어요.`);
  if (!data.phone) return fail("연락처를 입력해 주세요.");
  if (!isValidPhone(data.phone)) return fail("연락처를 확인해 주세요. (예: 010-1234-5678)");
  if (data.email && !isValidEmail(data.email)) return fail("이메일 주소를 확인해 주세요.");
  if (data.company.length > LIMITS.company) return fail(`업체명은 ${LIMITS.company}자까지 입력할 수 있어요.`);
  if (data.industry.length > LIMITS.industry) return fail(`업종은 ${LIMITS.industry}자까지 입력할 수 있어요.`);
  if (data.message.length > LIMITS.message) return fail(`문의 내용은 ${LIMITS.message}자까지 입력할 수 있어요.`);

  // 선택 항목은 정해진 값만
  if (data.siteType && !SITE_TYPES.includes(data.siteType)) return fail("원하는 사이트 항목을 다시 골라 주세요.");
  if (data.timeline && !TIMELINES.includes(data.timeline)) return fail("희망 오픈 시기를 다시 골라 주세요.");
  if (data.budget && !BUDGETS.includes(data.budget)) return fail("예산 항목을 다시 골라 주세요.");

  // 참고 사이트
  const refs = raw.reference ?? [];
  if (!Array.isArray(refs) || refs.length > MAX_REFS || refs.some((r) => typeof r !== "string")) {
    return fail(`참고 사이트는 ${MAX_REFS}개까지 입력할 수 있어요.`);
  }
  data.reference = (refs as string[]).map((r) => clean(r)).filter(Boolean);
  if (data.reference.some((r) => r.length > LIMITS.reference)) {
    return fail(`참고 사이트는 한 칸에 ${LIMITS.reference}자까지 입력할 수 있어요.`);
  }

  // 개인정보 동의
  if (raw.agree !== true) return fail("개인정보 수집 · 이용에 동의해 주세요.");

  return { ok: true, data };
}

function rows(f: QuoteFields): [string, string][] {
  const refs = f.reference.map((r) => r.trim()).filter(Boolean);
  return [
    ["이름", f.name],
    ["업체명", f.company],
    ["연락처", f.phone],
    ["이메일", f.email],
    ["업종", f.industry],
    ["원하는 사이트", f.siteType],
    ["참고 사이트", refs.map((r, i) => `${i + 1}. ${r}`).join("\n")],
    ["희망 오픈 시기", f.timeline],
    ["예산", f.budget],
    ["문의 내용", f.message],
  ];
}

export function quoteSubject(f: QuoteFields) {
  // 제목에는 줄바꿈이 들어가지 않게 한 줄로 만듭니다.
  const who = (f.company || f.name || "고객").replace(/\s+/g, " ").slice(0, 60);
  return `[그리다, 스튜디오] 무료 견적 요청 - ${who}`;
}

/** 메일 본문(텍스트) */
export function quoteText(f: QuoteFields) {
  return rows(f)
    .map(([k, v]) => {
      const val = v || "-";
      return val.includes("\n") ? `${k}:\n${val.replace(/^/gm, "  ")}` : `${k}: ${val}`;
    })
    .join("\n");
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** 메일 본문(HTML) */
export function quoteHtml(f: QuoteFields) {
  const trs = rows(f)
    .map(
      ([k, v]) =>
        `<tr><th style="text-align:left;vertical-align:top;padding:10px 16px 10px 0;color:#56625b;font-weight:600;white-space:nowrap;border-bottom:1px solid #e1e7e2">${esc(
          k,
        )}</th><td style="padding:10px 0;color:#17201b;border-bottom:1px solid #e1e7e2;white-space:pre-wrap">${esc(
          v || "-",
        )}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:-apple-system,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;max-width:600px;margin:0 auto;padding:24px">
<p style="margin:0;font-size:12px;letter-spacing:.3em;color:#4e7c63;font-weight:700">FREE QUOTE</p>
<h1 style="margin:8px 0 20px;font-size:22px;color:#17201b">무료 견적 요청이 들어왔어요</h1>
<table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6">${trs}</table>
<p style="margin-top:20px;font-size:12px;color:#96a199">그리다, 스튜디오 사이트의 견적 요청 양식에서 보낸 메일입니다.</p>
</div>`;
}
