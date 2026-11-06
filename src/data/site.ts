export const EMAIL = "cbw60881@gmail.com";

/** 무료 견적 요청 버튼: 제목과 기본 양식이 채워진 메일 작성 화면을 엽니다. */
export const QUOTE_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "[그리다, 스튜디오] 무료 견적 요청",
)}&body=${encodeURIComponent(
  "업체명:\n업종:\n연락처:\n원하는 사이트 (예: 회사 소개, 매장 소개):\n참고하고 싶은 사이트:\n희망 오픈 시기:\n",
)}`;

export const NAV = [
  { href: "#intro", label: "소개" },
  { href: "#portfolio", label: "포트폴리오" },
  { href: "#process", label: "서비스 절차" },
  { href: "#about", label: "About" },
];

/**
 * 소개 섹션 이미지 (public/intro/, scripts/make-intro-art.py 로 생성).
 * 비어 있으면 자리 표시 이미지가 보입니다.
 */
export const INTRO_IMAGES: { main?: string; side: (string | undefined)[] } = {
  main: "/intro/intro-main.svg",
  side: ["/intro/intro-side-1.svg", "/intro/intro-side-2.svg", "/intro/intro-side-3.svg"],
};
