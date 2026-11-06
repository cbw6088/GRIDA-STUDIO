"use client";

import { useRef, useState } from "react";

export type Step = { step: string; title: string; body: string };

/** 단계 카드를 두 개씩 한 장으로 묶어 옆으로 넘기는 슬라이더 (모바일 · 태블릿용) */
export function StepsSlider({ steps, className = "" }: { steps: Step[]; className?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  const pages: Step[][] = [];
  for (let i = 0; i < steps.length; i += 2) pages.push(steps.slice(i, i + 2));

  // 각 장의 실제 위치를 기준으로 이동하고, 지금 보이는 장을 계산합니다.
  const slides = () => Array.from(track.current?.children ?? []) as HTMLElement[];
  const go = (i: number) => {
    const el = track.current;
    const target = slides()[Math.max(0, Math.min(pages.length - 1, i))];
    if (el && target) el.scrollTo({ left: target.offsetLeft - 24, behavior: "smooth" });
  };
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const x = el.scrollLeft;
    let best = 0;
    slides().forEach((c, i) => {
      if (Math.abs(c.offsetLeft - 24 - x) < Math.abs(slides()[best].offsetLeft - 24 - x)) best = i;
    });
    setPage(best);
  };

  return (
    <div className={className}>
      <div
        ref={track}
        onScroll={onScroll}
        className="relative -mx-6 flex gap-3 snap-x snap-mandatory overflow-x-auto scroll-smooth px-6 sm:gap-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollPaddingInline: "1.5rem" }}
        aria-roledescription="슬라이드"
        aria-label="서비스 절차"
      >
        {pages.map((pair, i) => (
          <ol
            key={i}
            start={i * 2 + 1}
            className="grid w-full shrink-0 snap-start grid-cols-2 gap-3 sm:gap-5"
            aria-label={`${pages.length}장 중 ${i + 1}번째`}
          >
            {pair.map((s) => (
              <li key={s.step} className="rounded-[24px] bg-white p-5 shadow-soft sm:p-7">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-tone-deep">{s.step}</span>
                <h3 className="title-wide mt-3 text-[15px] sm:text-lg">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/60 sm:text-sm">{s.body}</p>
              </li>
            ))}
          </ol>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2" role="tablist" aria-label="장 선택">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === page}
              aria-label={`${i + 1}번째 장`}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all ${i === page ? "w-6 bg-forest" : "w-1.5 bg-sage/60"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(page - 1)}
            disabled={page === 0}
            aria-label="이전"
            className="grid size-10 place-items-center rounded-full bg-white text-ink shadow-soft transition disabled:opacity-40"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(page + 1)}
            disabled={page === pages.length - 1}
            aria-label="다음"
            className="grid size-10 place-items-center rounded-full bg-white text-ink shadow-soft transition disabled:opacity-40"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
