import { Comma, Mark } from "@/components/Mark";
import { QuoteButton } from "@/components/QuoteModal";
import { NAV } from "@/data/site";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="#" className="flex items-center gap-2.5" aria-label="그리다, 스튜디오 홈">
          <Mark className="size-7 text-ink" />
          <span className="text-base font-bold tracking-wide">
            그리다<Comma className="ml-0.5 h-[0.7em] w-auto" />
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-[13px] tracking-[0.08em] text-slate md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="transition hover:text-ink">
              {n.label}
            </a>
          ))}
        </nav>
        <QuoteButton className="btn btn-primary px-5 py-2.5 text-[13px]">
          무료 견적
        </QuoteButton>
      </div>
    </header>
  );
}
