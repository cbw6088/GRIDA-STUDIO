/** 그리다, 스튜디오 심볼: 한 획으로 그린 화면 + 주황 쉼표 */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="120 120 290 290"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M 286 362 H 174 Q 150 362 150 338 V 174 Q 150 150 174 150 H 338 Q 362 150 362 174 V 272"
        stroke="currentColor"
        strokeWidth="26"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g transform="translate(350 334) scale(1.1)">
        <circle cx="0" cy="0" r="20" className="fill-accent" />
        <path
          d="M 19 6 C 19 30, 6 46, -12 56"
          className="stroke-accent"
          strokeWidth="11"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/** 문장 속 쉼표 포인트 */
export function Comma({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="-24 -24 52 84"
      className={`inline-block align-baseline ${className}`}
      aria-hidden="true"
    >
      <circle cx="0" cy="0" r="20" className="fill-accent" />
      <path
        d="M 19 6 C 19 30, 6 46, -12 56"
        className="stroke-accent"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
