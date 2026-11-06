export type Capture = {
  /** 페이지 이름 (미리보기 탭에 표시) */
  label: string;
  /** public/ 기준 경로 */
  src: string;
  width: number;
  height: number;
};

export type Work = {
  slug: string;
  title: string;
  category: string;
  /** 왼쪽 목록에 보이는 한 줄 설명 */
  short: string;
  /** 오른쪽 미리보기에 보이는 설명 */
  summary: string;
  /** 페이지별 전체 화면 캡처. 첫 번째가 대표 이미지(목록 썸네일, 배너)입니다. */
  captures: Capture[];
  /** 실제 사이트 주소 (있으면 "사이트 보기" 버튼 표시) */
  url?: string;
  /** 이미지가 뜨기 전 배경색 */
  tint: string;
  /** 실제 업체가 아닌 가상 업체로 만든 작업이면 true ("시안" 배지 표시) */
  draft?: boolean;
};

// 새 포트폴리오: 캡처를 public/works/<slug>/ 에 넣고 아래 배열에 항목을 추가하세요.
export const works: Work[] = [
  {
    slug: "grida-space",
    title: "그리다, 공간",
    category: "도배 시공",
    short: "벽지 안내와 시공 사례를 담은 도배 시공 전문 사이트",
    summary:
      "서울·경기 도배 시공 업체 사이트입니다. 합지·실크·한지·뮤럴 벽지를 사진과 함께 비교하는 도배지 안내, 지역별 시공 사례, 도배 전에 읽어 보면 좋은 블로그 글을 담았습니다. 어느 페이지에서든 무료 견적 문의로 바로 이어지도록 구성했습니다.",
    captures: [
      { label: "홈", src: "/works/grida-space/home.webp", width: 1095, height: 2000 },
      { label: "소개", src: "/works/grida-space/about.webp", width: 1012, height: 2000 },
      { label: "도배지 안내", src: "/works/grida-space/wallpaper.webp", width: 773, height: 2000 },
      { label: "문의하기", src: "/works/grida-space/contact.webp", width: 1068, height: 2000 },
    ],
    tint: "#F3EFEA",
  },
  {
    slug: "neighbor-dog",
    title: "이웃집 강아지",
    category: "반려견 미용실",
    short: "1:1 예약제 소형견 미용실의 원페이지 사이트",
    summary:
      "망원동 1:1 반려견 미용실을 소개하는 원페이지 사이트입니다. 서비스 안내, 좋은 이유, 이용 순서, 스타일 예시, 몸무게별 요금표, 미용 전 주의사항, 자주 묻는 질문, 지도와 예약 문의를 한 페이지에 담았습니다. 하늘색 물방울 사진과 원형 아이콘으로 밝고 친근하게 구성하고, 모바일에서는 하단에 예약 버튼을 고정했습니다.",
    captures: [
      { label: "전체", src: "/works/neighbor-dog/full.jpg", width: 1280, height: 6095 },
      { label: "메인", src: "/works/neighbor-dog/home.jpg", width: 1280, height: 1551 },
      { label: "서비스", src: "/works/neighbor-dog/service.jpg", width: 1280, height: 1561 },
      { label: "요금", src: "/works/neighbor-dog/price.jpg", width: 1280, height: 1181 },
      { label: "안내 · 문의", src: "/works/neighbor-dog/contact.jpg", width: 1280, height: 1850 },
    ],
    tint: "#EEF7FA",
    draft: true,
  },
];
