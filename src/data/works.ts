export type Work = {
  slug: string;
  title: string;
  category: string;
  /** 왼쪽 목록에 보이는 한 줄 설명 */
  short: string;
  /** 오른쪽 미리보기에 보이는 설명 */
  summary: string;
  pages: string[];
  stack: string[];
  /** 왼쪽 목록 썸네일 캡처 (예: "/works/cafe-thumb.png") */
  thumbnail?: string;
  /** 오른쪽 미리보기 캡처 (예: "/works/cafe.png") */
  preview?: string;
  /** 실제 사이트 주소 (있으면 "사이트 보기" 버튼 표시) */
  url?: string;
  /** 캡처가 없을 때 자리 표시 이미지 색 */
  tint: string;
};

// TODO: 실제 포트폴리오를 만들면 아래 항목을 바꾸고 캡처 이미지를 public/works/ 에 넣으세요.
export const works: Work[] = [
  {
    slug: "cafe",
    title: "오후의 온도",
    category: "카페",
    short: "동네 카페의 따뜻한 분위기를 담은 한 페이지 사이트",
    summary:
      "메뉴, 매장 사진, 영업시간, 지도를 한 화면에서 볼 수 있게 정리했습니다. 따뜻한 베이지 톤으로 매장 분위기를 그대로 옮겼습니다.",
    pages: ["메인", "메뉴", "매장 소개", "오시는 길"],
    stack: ["WordPress", "블록 테마"],
    tint: "#E2ECE5",
  },
  {
    slug: "pilates",
    title: "숨 필라테스",
    category: "필라테스 스튜디오",
    short: "수업과 시간표를 한눈에 보는 스튜디오 사이트",
    summary:
      "수업 종류, 강사 소개, 시간표를 깔끔하게 담았습니다. 모바일에서 시간표와 예약 링크를 바로 찾을 수 있게 구성했습니다.",
    pages: ["메인", "수업 안내", "강사 소개", "시간표", "오시는 길"],
    stack: ["WordPress", "블록 테마"],
    tint: "#EBEFEC",
  },
  {
    slug: "office",
    title: "정도 세무회계",
    category: "전문직 사무소",
    short: "신뢰감을 주는 톤의 세무회계 사무소 사이트",
    summary:
      "업무 분야와 대표 소개, 상담 연락처를 정리했습니다. 처음 방문한 사람도 필요한 정보를 3초 안에 찾도록 설계했습니다.",
    pages: ["메인", "업무 분야", "대표 소개", "오시는 길"],
    stack: ["WordPress", "블록 테마"],
    tint: "#D9E7DE",
  },
  {
    slug: "academy",
    title: "작은 숲 미술학원",
    category: "학원",
    short: "커리큘럼과 작품 갤러리를 담은 미술학원 사이트",
    summary:
      "연령별 커리큘럼, 강사 소개, 아이들 작품 갤러리를 담았습니다. 학부모가 상담 전에 궁금한 내용을 미리 확인할 수 있게 구성했습니다.",
    pages: ["메인", "커리큘럼", "갤러리", "상담 안내"],
    stack: ["WordPress", "블록 테마"],
    tint: "#EEF1EE",
  },
  {
    slug: "stay",
    title: "바람결 스테이",
    category: "숙소",
    short: "객실 사진과 예약 링크를 담은 독채 숙소 사이트",
    summary:
      "객실별 사진과 요금, 주변 여행지를 소개하고 외부 예약 페이지로 바로 연결했습니다. 사진이 돋보이도록 여백을 넉넉하게 두었습니다.",
    pages: ["메인", "객실", "주변 여행지", "예약 안내"],
    stack: ["WordPress", "블록 테마"],
    tint: "#E5EDE7",
  },
];
