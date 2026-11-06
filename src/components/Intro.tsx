import { Shot } from "@/components/Shot";
import { INTRO_IMAGES } from "@/data/site";

const tints = ["#E8EFEA", "#E8EFEA", "#E8EFEA"];

export function Intro() {
  return (
    <section id="intro" className="scroll-mt-10 py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-6 px-6 lg:grid-cols-[1fr_1.15fr_0.55fr]">
        <div className="lg:pr-6">
          <h2 className="title-wide text-3xl text-ink sm:text-4xl">소개</h2>
          <p className="mt-6 text-[15px] leading-loose text-ink/60">
            그리다, 스튜디오는 &lsquo;사이트를 그린다&rsquo;는 뜻에서 시작했습니다. 화려한 기능보다 필요한
            정보가 제자리에 놓인 화면, 오래 봐도 편안한 화면을 그립니다. 오픈한 뒤에는 사장님이 글과
            사진을 직접 고치실 수 있도록 함께 정리해 드립니다.
          </p>
          <a href="#process" className="btn btn-ghost mt-8">
            서비스 절차 보기
          </a>
        </div>

        <Shot
          src={INTRO_IMAGES.main}
          alt="스케치북에 그린 웹사이트 밑그림과 연필, 찻잔"
          tint="#E3ECE6"
          label="이미지 준비 중"
          className="aspect-[4/5] w-full rounded-[36px] shadow-soft"
        />

        <div className="grid grid-cols-3 gap-4 lg:grid-cols-1">
          {INTRO_IMAGES.side.map((src, i) => (
            <Shot
              key={i}
              src={src}
              alt={["색과 글꼴 견본 카드", "브라우저 창에 그린 웹사이트 화면", "휴대폰에 띄운 모바일 화면"][i] ?? ""}
              tint={tints[i]}
              sizes="(min-width: 1024px) 15vw, 33vw"
              className="aspect-[4/3] w-full rounded-[24px] shadow-soft"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
