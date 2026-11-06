"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Comma } from "@/components/Mark";
import { EMAIL } from "@/data/site";
import {
  BUDGETS,
  EMPTY_QUOTE,
  LIMITS,
  MAX_REFS,
  SITE_TYPES,
  TIMELINES,
  isValidEmail,
  isValidPhone,
  quoteSubject,
  quoteText,
  type QuoteFields,
} from "@/lib/quote";

const OPEN_EVENT = "grida:open-quote";

/** 어디서든 누르면 견적 요청 모달을 엽니다. */
export function QuoteButton({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      {children}
    </button>
  );
}


type Fields = QuoteFields;
type Status = "idle" | "sending" | "done" | "error";

export function QuoteModal() {
  const ref = useRef<HTMLDialogElement>(null);
  const [f, setF] = useState<Fields>(EMPTY_QUOTE);
  const [agree, setAgree] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const startedAt = useRef(0);
  const trap = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const open = () => {
      setStatus((s) => (s === "done" ? "idle" : s));
      setCopied(false);
      startedAt.current = Date.now();
      ref.current?.showModal();
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  type TextKey = Exclude<keyof Fields, "reference">;
  const set = (k: TextKey) => (e: { target: { value: string; setCustomValidity?: (m: string) => void } }) => {
    e.target.setCustomValidity?.("");
    setF((p) => ({ ...p, [k]: e.target.value }));
  };
  const close = () => ref.current?.close();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // 서버와 같은 규칙으로 먼저 확인해서, 틀린 칸을 바로 알려 줍니다.
    const form = e.currentTarget as HTMLFormElement;
    const phoneEl = form.elements.namedItem("phone") as HTMLInputElement | null;
    const emailEl = form.elements.namedItem("email") as HTMLInputElement | null;
    phoneEl?.setCustomValidity(isValidPhone(f.phone) ? "" : "연락처를 확인해 주세요. (예: 010-1234-5678)");
    emailEl?.setCustomValidity(!f.email.trim() || isValidEmail(f.email.trim()) ? "" : "이메일 주소를 확인해 주세요.");
    if (!f.name.trim()) (form.elements.namedItem("name") as HTMLInputElement | null)?.setCustomValidity("이름을 입력해 주세요.");
    if (!form.reportValidity()) return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, agree, website: trap.current?.value ?? "", startedAt: startedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "메일을 보내지 못했어요.");
      setStatus("done");
      setF(EMPTY_QUOTE);
      setAgree(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "메일을 보내지 못했어요.");
      setStatus("error");
    }
  };

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(quoteSubject(f))}&body=${encodeURIComponent(quoteText(f))}`;
  const copy = async () => {
    await navigator.clipboard.writeText(quoteText(f));
    setCopied(true);
  };

  return (
    <dialog
      ref={ref}
      onClick={(e) => e.target === ref.current && close()}
      aria-labelledby="quote-title"
      className="m-auto w-[min(640px,calc(100%-2rem))] max-h-[calc(100dvh-2rem)] overflow-hidden rounded-[32px] bg-white p-0 text-ink shadow-float backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
    >
      <div className="thin-scroll max-h-[calc(100dvh-2rem)] overflow-y-auto">
        {/* 머리 */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 bg-[linear-gradient(135deg,#ffffff_0%,#eef5f0_100%)] px-7 pb-5 pt-7 sm:px-9">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-tone-deep">FREE QUOTE</p>
            <h2 id="quote-title" className="title-wide mt-2 text-2xl">
              무료 견적 요청<Comma className="ml-0.5 h-[0.6em] w-auto" />
            </h2>
            <p className="mt-2 text-sm text-slate">아는 만큼만 적어 주세요. 모르는 항목은 비워 두셔도 괜찮아요.</p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="닫기"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-slate shadow-soft transition hover:text-ink"
          >
            ✕
          </button>
        </div>

        {status === "done" ? (
          <div className="px-7 pb-9 pt-4 sm:px-9">
            <div className="rounded-[24px] bg-gradient-to-br from-mist to-tone/60 p-7 text-center">
              <p className="text-3xl" aria-hidden>
                ✓
              </p>
              <p className="mt-3 text-lg font-semibold">견적 요청이 접수됐어요</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                남겨 주신 내용을 확인한 뒤 1~2일 안에 연락드릴게요.
              </p>
              <button type="button" onClick={close} className="btn btn-primary mt-6">
                닫기
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-5 px-7 pb-8 pt-2 sm:px-9">
            {/* 봇 막기용 칸: 사람에게는 보이지 않아요 */}
            <input
              ref={trap}
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="이름" required>
                <input
                  required
                  name="name"
                  maxLength={LIMITS.name}
                  value={f.name}
                  onChange={set("name")}
                  className={input}
                  autoComplete="name"
                />
              </Field>
              <Field label="업체명">
                <input
                  maxLength={LIMITS.company}
                  value={f.company}
                  onChange={set("company")}
                  className={input}
                  autoComplete="organization"
                />
              </Field>
              <Field label="연락처" required>
                <input
                  required
                  name="phone"
                  maxLength={LIMITS.phone}
                  type="tel"
                  inputMode="tel"
                  placeholder="010-0000-0000"
                  value={f.phone}
                  onChange={set("phone")}
                  className={input}
                  autoComplete="tel"
                />
              </Field>
              <Field label="이메일">
                <input
                  type="email"
                  name="email"
                  maxLength={LIMITS.email}
                  value={f.email}
                  onChange={set("email")}
                  className={input}
                  autoComplete="email"
                />
              </Field>
              <Field label="업종">
                <input
                  maxLength={LIMITS.industry}
                  placeholder="예: 카페, 학원, 도배 시공"
                  value={f.industry}
                  onChange={set("industry")}
                  className={input}
                />
              </Field>
              <Field label="희망 오픈 시기">
                <Select value={f.timeline} onChange={set("timeline")} options={TIMELINES} />
              </Field>
            </div>

            <Field label="원하는 사이트" group>
              <Chips options={SITE_TYPES} value={f.siteType} onChange={(v) => setF((p) => ({ ...p, siteType: v }))} />
            </Field>

            <Field label="예산" group>
              <Chips options={BUDGETS} value={f.budget} onChange={(v) => setF((p) => ({ ...p, budget: v }))} />
            </Field>

            <Field label="참고하고 싶은 사이트" group>
              <References value={f.reference} onChange={(reference) => setF((p) => ({ ...p, reference }))} />
            </Field>

            <Field label="문의 내용">
              <textarea
                rows={4}
                maxLength={LIMITS.message}
                placeholder="필요한 페이지, 꼭 넣고 싶은 내용, 궁금한 점을 자유롭게 적어 주세요."
                value={f.message}
                onChange={set("message")}
                className={`${input} resize-none py-3`}
              />
            </Field>

            <label className="flex items-start gap-3 rounded-2xl bg-mist p-4 text-xs leading-relaxed text-slate">
              <input
                type="checkbox"
                required
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-forest"
              />
              <span>
                <b className="text-ink">개인정보 수집 · 이용 동의 (필수)</b>
                <br />
                견적 상담을 위해 이름, 연락처, 이메일을 받으며 상담이 끝나면 파기합니다.
              </span>
            </label>

            {status === "error" && (
              <div role="alert" className="rounded-2xl border border-[#f1d5cc] bg-[#fdf5f2] p-4 text-sm text-ink">
                <p className="font-semibold">{error}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate">
                  계속 안 되면 메일로 보내 주세요. 작성한 내용이 채워진 메일을 열거나 복사할 수 있어요.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a href={mailto} className="btn btn-ghost px-4 py-2 text-xs">
                    메일로 보내기
                  </a>
                  <button type="button" onClick={copy} className="btn btn-ghost px-4 py-2 text-xs">
                    {copied ? "복사했어요" : "내용 복사하기"}
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] text-mute">보내 주신 내용은 {EMAIL}로 전달돼요.</p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn btn-primary justify-center disabled:cursor-wait disabled:opacity-70"
              >
                {status === "sending" ? "보내는 중…" : "견적 요청 보내기"} <span aria-hidden>→</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}

/** 참고 사이트: + 버튼으로 칸을 늘리고 − 버튼으로 지웁니다. */
function References({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const update = (i: number, v: string) => onChange(value.map((r, j) => (j === i ? v : r)));
  const remove = (i: number) => onChange(value.length > 1 ? value.filter((_, j) => j !== i) : [""]);
  const add = () => value.length < MAX_REFS && onChange([...value, ""]);

  return (
    <div className="grid gap-2">
      {value.map((r, i) => (
        <div key={i} className="flex gap-2">
          <input
            aria-label={`참고 사이트 ${i + 1}`}
            maxLength={LIMITS.reference}
            placeholder={i === 0 ? "주소나 사이트 이름" : "다른 참고 사이트"}
            value={r}
            onChange={(e) => update(i, e.target.value)}
            className={input}
            autoFocus={i > 0 && i === value.length - 1 && r === ""}
          />
          {value.length > 1 && (
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label={`참고 사이트 ${i + 1} 지우기`}
              className="grid size-11 shrink-0 place-items-center rounded-2xl border border-line text-lg text-slate transition hover:border-sage hover:text-ink"
            >
              −
            </button>
          )}
        </div>
      ))}
      {value.length < MAX_REFS ? (
        <button
          type="button"
          onClick={add}
          className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-dashed border-sage text-xs font-semibold text-tone-deep transition hover:bg-tone/40"
        >
          <span className="text-base leading-none">+</span> 참고 사이트 추가
        </button>
      ) : (
        <p className="text-[11px] text-mute">참고 사이트는 {MAX_REFS}개까지 넣을 수 있어요.</p>
      )}
    </div>
  );
}

const input =
  "h-11 w-full rounded-2xl border border-line bg-white px-4 text-sm outline-none transition placeholder:text-mute focus:border-tone-deep focus:ring-4 focus:ring-tone/60";

function Field({
  label,
  required,
  group,
  children,
}: {
  label: string;
  required?: boolean;
  /** 버튼 묶음처럼 label로 감쌀 수 없는 경우 */
  group?: boolean;
  children: ReactNode;
}) {
  const head = (
    <span className="text-xs font-semibold tracking-wide text-slate">
      {label}
      {required && <span className="ml-1 text-tone-deep">*</span>}
    </span>
  );
  return group ? (
    <div role="group" aria-label={label} className="grid gap-2">
      {head}
      {children}
    </div>
  ) : (
    <label className="grid gap-2">
      {head}
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  options: string[];
}) {
  return (
    <select value={value} onChange={onChange} className={`${input} appearance-none`}>
      <option value="">선택해 주세요</option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

function Chips({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <span className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = o === value;
        return (
          <button
            key={o}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(on ? "" : o)}
            className={`rounded-full border px-4 py-2 text-xs transition ${
              on ? "border-forest bg-forest text-white shadow-soft" : "border-line bg-white text-slate hover:border-sage"
            }`}
          >
            {o}
          </button>
        );
      })}
    </span>
  );
}
