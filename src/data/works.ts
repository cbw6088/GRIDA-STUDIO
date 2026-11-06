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
];
