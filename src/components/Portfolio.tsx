"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { Shot } from "@/components/Shot";
import type { Work } from "@/data/works";

/** PC 왼쪽 목록 한 칸 높이(px). 4칸이 보이고 나머지는 아래로 스크롤됩니다. */
const ITEM_H = 112;
const GAP = 12;
const VISIBLE = 4;

export function Portfolio({ works }: { works: Work[] }) {
  const [active, setActive] = useState(0);
  const w = works[active];

  return (
    <section id="portfolio" className="scroll-mt-10 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.4fr] lg:gap-10">
          {/* 왼쪽: 목록 */}
          <div>
            <h2 className="title-wide text-3xl text-ink sm:text-4xl">포트폴리오</h2>
            <p className="mt-3 text-sm tracking-wide text-mute">업종별로 그려 낸 작업들</p>

            {/* 모바일 · 태블릿: 옆으로 넘기는 카드 / PC: 세로 목록 (4개까지 보이고 아래로 스크롤) */}
            <ul
              className="thin-scroll -mx-6 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:mx-0 lg:mt-10 lg:max-h-[var(--list-h)] lg:snap-none lg:flex-col lg:overflow-x-visible lg:overflow-y-auto lg:px-0 lg:pb-0 lg:pr-2 lg:[scrollbar-width:thin]"
              style={{ gap: GAP, "--list-h": `${ITEM_H * VISIBLE + GAP * (VISIBLE - 1)}px` } as CSSProperties}
              aria-label="포트폴리오 목록"
            >
              {works.map((item, i) => {
                const on = i === active;
                return (
                  <li
                    key={item.slug}
                    className={`shrink-0 snap-start lg:min-h-[var(--item-h)] lg:w-auto ${
                      works.length === 1 ? "w-full" : "w-[82%] sm:w-[48%]"
                    }`}
                    style={{ "--item-h": `${ITEM_H}px` } as CSSProperties}
                  >
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={on}
                      className={`flex h-full w-full items-center gap-5 rounded-[24px] p-3 pl-6 text-left transition ${
                        on ? "bg-gradient-to-r from-tone/70 to-haze" : "hover:bg-mist"
                      }`}
                    >
                      <span className="flex-1">
                        <span className="block text-[11px] font-semibold tracking-[0.12em] text-tone-deep">
                          {item.category}
                        </span>
                        <span className="mt-1 block text-[15px] font-semibold tracking-wide">{item.title}</span>
                        <span className="mt-1 line-clamp-1 text-xs text-ink/55">{item.short}</span>
                      </span>
                      <Shot
                        src={item.captures[0]?.src}
                        alt=""
                        tint={item.tint}
                        sizes="120px"
                        className={`aspect-square w-[88px] shrink-0 rounded-[18px] bg-white ${
                          on ? "shadow-soft ring-2 ring-white" : ""
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 오른쪽: 미리보기 (작업이 바뀌면 탭도 처음으로) */}
          {w && <Preview key={w.slug} work={w} />}
        </div>
      </div>
    </section>
  );
}

function Preview({ work: w }: { work: Work }) {
  const [page, setPage] = useState(0);
  const cap = w.captures[page];

  return (
    <div className="rounded-[40px] bg-gradient-to-br from-mist via-mist to-tone/60 p-5 sm:p-8">
      {/* 페이지 탭 */}
      {w.captures.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label={`${w.title} 페이지`}>
          {w.captures.map((c, i) => (
            <button
              key={c.src}
              type="button"
              role="tab"
              aria-selected={i === page}
              onClick={() => setPage(i)}
              className={`rounded-full px-4 py-1.5 text-xs tracking-wide transition ${
                i === page ? "bg-forest text-white shadow-soft" : "bg-white/80 text-slate hover:bg-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {/* 브라우저 창 안에서 페이지 전체를 스크롤해서 볼 수 있어요 */}
      <div className="overflow-hidden rounded-[28px] bg-white shadow-soft">
        <div className="flex items-center gap-1.5 border-b border-line px-5 py-3">
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="ml-3 truncate text-[11px] text-mute">
            {w.title} · {cap?.label}
          </span>
        </div>
        <div
          key={cap?.src}
          className="thin-scroll aspect-[16/11] overflow-y-auto"
          style={{ background: w.tint }}
          tabIndex={0}
          aria-label={`${w.title} ${cap?.label} 화면 (스크롤해서 전체 보기)`}
        >
          {cap ? (
            <Image
              src={cap.src}
              alt={`${w.title} ${cap.label} 화면`}
              width={cap.width}
              height={cap.height}
              sizes="(min-width: 1024px) 640px, 100vw"
              className="block h-auto w-full"
            />
          ) : (
            <Shot alt={`${w.title} 미리보기`} tint={w.tint} label="미리보기 준비 중" className="h-full w-full" />
          )}
        </div>
      </div>
      <p className="mt-3 text-right text-[11px] text-mute">화면 안에서 스크롤하면 페이지 전체를 볼 수 있어요</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.12em] text-tone-deep">{w.category}</p>
          <h3 className="title-wide mt-2 text-2xl">{w.title}</h3>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/60">{w.summary}</p>
        </div>
        {w.url && (
          <a href={w.url} target="_blank" rel="noreferrer" className="btn btn-ghost self-start">
            사이트 보기 ↗
          </a>
        )}
      </div>
    </div>
  );
}
