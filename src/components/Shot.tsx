import Image from "next/image";

/**
 * 캡처 이미지 자리. src가 있으면 이미지를, 없으면 자리 표시를 보여 줍니다.
 * 부모가 크기(aspect, h 등)를 정합니다.
 */
export function Shot({
  src,
  alt,
  tint = "#EEF0F4",
  label,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className = "",
}: {
  src?: string;
  alt: string;
  tint?: string;
  label?: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={`${/\babsolute\b/.test(className) ? "" : "relative"} overflow-hidden ${className}`}
      style={{ background: tint }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          unoptimized={src.endsWith(".svg")}
          className="object-cover object-top"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col p-[8%]" aria-label={alt} role="img">
          <div className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-white/80" />
            <span className="size-1.5 rounded-full bg-white/60" />
            <span className="size-1.5 rounded-full bg-white/60" />
          </div>
          <div className="mt-[10%] h-[9%] w-3/5 rounded-full bg-white/70" />
          <div className="mt-[4%] h-[6%] w-2/5 rounded-full bg-white/50" />
          <div className="mt-auto grid grid-cols-3 gap-[6%]">
            <span className="aspect-square rounded-xl bg-white/55" />
            <span className="aspect-square rounded-xl bg-white/55" />
            <span className="aspect-square rounded-xl bg-white/55" />
          </div>
          {label && (
            <span className="absolute bottom-3 right-4 text-[11px] tracking-wide text-ink/35">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
