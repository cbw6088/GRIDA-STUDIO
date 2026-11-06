export const EMAIL = "cbw60881@gmail.com";

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
