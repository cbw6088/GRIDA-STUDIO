import { Comma } from "@/components/Mark";
import { Shot } from "@/components/Shot";
import { QuoteButton } from "@/components/QuoteModal";

// 배너 오른쪽 그림 (캡처 대신 화면 모양 그림으로 둡니다)
const shots = [
  { tint: "#E2ECE5", className: "absolute left-0 top-[6%] aspect-[4/3] w-[72%] rounded-[28px] shadow-float" },
  { tint: "#EBEFEC", className: "absolute right-0 top-0 aspect-[3/4] w-[34%] rounded-[24px] shadow-float" },
  { tint: "#D9E7DE", className: "absolute bottom-[8%] right-[6%] aspect-[4/3] w-[42%] rounded-[24px] shadow-float" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-b-[48px] bg-[radial-gradient(120%_90%_at_85%_10%,#e2efe6_0%,#f3f7f4_45%,#ffffff_80%)] pb-24 pt-36 sm:rounded-b-[72px]">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.4em] text-mute">GRIDA STUDIO</p>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.2] tracking-[0.04em] text-ink sm:text-6xl">
            웹사이트를
            <br />
            <span className="text-grad">그립니다</span>
            <Comma className="ml-1 h-[0.55em] w-auto" />
          </h1>
          <p className="mt-7 max-w-md text-[15px] leading-loose text-slate">
            하얀 도화지에 그림을 그리듯, 가게와 회사의 이야기를 한 장의 화면으로 그려 냅니다.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <QuoteButton className="btn btn-primary">무료 견적 요청</QuoteButton>
            <a href="#portfolio" className="btn btn-ghost">
              포트폴리오 보기 <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        {/* 화면 모양 그림이 겹쳐 놓인 구성 */}
        <div className="relative mx-auto aspect-[5/4] w-full max-w-xl">
          <div className="absolute inset-x-[8%] bottom-0 h-[18%] rounded-[32px] bg-gradient-to-r from-white/80 to-tone/60 shadow-soft" />
          {shots.map((sh, i) => (
            <Shot key={i} alt="" tint={sh.tint} className={sh.className} />
          ))}
        </div>
      </div>
    </section>
  );
}
