import { QuoteButton } from "@/components/QuoteModal";

const steps = [
  {
    step: "01",
    title: "의뢰서 작성",
    body: "업체 정보, 원하는 분위기, 참고하고 싶은 사이트, 필요한 페이지를 간단한 의뢰서에 적어 주세요. 모르는 항목은 비워 두셔도 괜찮습니다.",
  },
  {
    step: "02",
    title: "상담",
    body: "의뢰서를 확인한 뒤 전화나 채팅으로 상담합니다. 사이트로 이루고 싶은 목적과 꼭 필요한 내용을 함께 정리합니다.",
  },
  {
    step: "03",
    title: "견적 · 일정 확정",
    body: "페이지 수와 디자인 범위에 맞춰 견적과 작업 일정을 안내드립니다. 사이트 운영 비용(플랜, 도메인)도 이때 함께 알려 드립니다.",
  },
  {
    step: "04",
    title: "자료 전달",
    body: "로고, 사진, 소개 글 같은 자료를 보내 주시면 작업을 시작합니다. 사진이 부족하면 분위기에 맞는 이미지를 함께 찾아 드립니다.",
  },
  {
    step: "05",
    title: "디자인 시안",
    body: "메인 화면 시안을 먼저 보여 드리고 의견을 반영해 다듬습니다. 정해진 횟수 안에서 무료로 수정해 드립니다.",
  },
  {
    step: "06",
    title: "제작",
    body: "확정된 시안으로 전체 페이지를 만듭니다. PC, 태블릿, 모바일 어디서 보아도 편안한 반응형으로 제작합니다.",
  },
  {
    step: "07",
    title: "검수 · 수정",
    body: "완성된 사이트를 함께 확인하며 오탈자, 링크, 화면 깨짐을 꼼꼼히 점검하고 마지막 수정을 반영합니다.",
  },
  {
    step: "08",
    title: "오픈 · 사용법 안내",
    body: "사이트를 오픈하고, 글과 사진을 직접 고치실 수 있도록 사용법과 간단한 설명서를 드립니다. 오픈 후 생긴 오류도 일정 기간 무료로 고쳐 드립니다.",
  },
];

export function Process() {
  return (
    <section id="process" className="scroll-mt-10 rounded-[48px] bg-gradient-to-b from-mist to-haze py-28 sm:rounded-[72px]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="title-wide text-3xl text-ink sm:text-4xl">서비스 절차</h2>
            <p className="mt-3 text-sm tracking-wide text-mute">문의부터 오픈까지, 이렇게 함께 그려 갑니다</p>
          </div>
          <QuoteButton className="btn btn-ghost self-start sm:self-auto">
            의뢰서 받기
          </QuoteButton>
        </div>
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.step} className="rounded-[28px] bg-white p-8 shadow-soft">
              <span className="text-xs font-semibold tracking-[0.2em] text-tone-deep">{s.step}</span>
              <h3 className="title-wide mt-5 text-lg">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
