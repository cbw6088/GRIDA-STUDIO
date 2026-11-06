"use client";

import { useState } from "react";
import { Shot } from "@/components/Shot";
import { QUOTE_HREF } from "@/data/site";
import type { Work } from "@/data/works";

/** 왼쪽 목록 한 칸 높이(px). 4칸이 보이고 나머지는 스크롤됩니다. */
const ITEM_H = 112;
const GAP = 12;
const VISIBLE = 4;

export function Portfolio({ works }: { works: Work[] }) {
  const [active, setActive] = useState(0);
  const w = works[active];

  return (
    <section id="portfolio" className="scroll-mt-10 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr]">
          {/* 왼쪽: 목록 */}
          <div>
            <h2 className="title-wide text-3xl text-ink sm:text-4xl">포트폴리오</h2>
            <p className="mt-3 text-sm tracking-wide text-mute">업종별로 그려 낸 작업들</p>

            <ul
              className="thin-scroll mt-10 flex flex-col overflow-y-auto pr-2"
              style={{ gap: GAP, maxHeight: ITEM_H * VISIBLE + GAP * (VISIBLE - 1) }}
              aria-label="포트폴리오 목록"
            >
              {works.map((item, i) => {
                const on = i === active;
                return (
                  <li key={item.slug} style={{ minHeight: ITEM_H }}>
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
                        src={item.thumbnail ?? item.preview}
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

          {/* 오른쪽: 미리보기 */}
          {w && (
            <div className="rounded-[40px] bg-gradient-to-br from-mist via-mist to-tone/60 p-5 sm:p-8">
              <Shot
                key={w.slug}
                src={w.preview}
                alt={`${w.title} 미리보기`}
                tint={w.tint}
                label="미리보기 준비 중"
                className="aspect-[16/10] w-full rounded-[28px] bg-white shadow-soft"
              />
              <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.12em] text-tone-deep">{w.category}</p>
                  <h3 className="title-wide mt-2 text-2xl">{w.title}</h3>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/60">{w.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {w.pages.map((p) => (
                      <li key={p} className="rounded-full bg-white px-3 py-1 text-xs text-ink/60 shadow-soft">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-3 sm:flex-col">
                  {w.url && (
                    <a
                      href={w.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-ghost"
                    >
                      사이트 보기 ↗
                    </a>
                  )}
                  <a href={QUOTE_HREF} className="btn btn-primary">
                    이런 사이트 견적 받기
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
