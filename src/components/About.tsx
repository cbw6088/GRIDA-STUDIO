import { Comma, Mark } from "@/components/Mark";
import { QuoteButton } from "@/components/QuoteModal";

const stack = ["WordPress", "블록 테마", "Next.js", "Tailwind CSS", "반응형 디자인"];

export function About() {
  return (
    <section id="about" className="scroll-mt-10 py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[0.8fr_1.2fr]">
        <div className="flex aspect-square max-w-sm items-center justify-center rounded-[48px] bg-[radial-gradient(circle_at_30%_25%,#ffffff_0%,#e4efe8_55%,#cfe2d6_100%)] shadow-soft">
          <Mark className="w-1/2 text-ink" />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.4em] text-mute">ABOUT</p>
          <h2 className="title-wide mt-4 text-3xl text-ink sm:text-4xl">
            그리다<Comma className="ml-0.5 h-[0.6em] w-auto" /> 스튜디오
          </h2>
          <p className="mt-6 text-[15px] leading-loose text-ink/60">
            &lsquo;그리다&rsquo;는 사이트를 그린다는 뜻에서 지은 이름입니다. 쉼표는 그림을 다 그리고 붓을
            떼는 순간을 뜻합니다. 필요한 정보가 제자리에 놓인, 오래 봐도 편안한 화면을 좋아합니다.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {stack.map((s) => (
              <li key={s} className="rounded-full bg-tone/60 px-4 py-1.5 text-xs tracking-wide text-ink/60">
                {s}
              </li>
            ))}
          </ul>
          <QuoteButton className="btn btn-primary mt-10">
            무료 견적 요청 <span aria-hidden>→</span>
          </QuoteButton>
        </div>
      </div>
    </section>
  );
}
