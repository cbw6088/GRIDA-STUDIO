import { Comma, Mark } from "@/components/Mark";
import { EMAIL, NAV } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-6 rounded-t-[48px] bg-[linear-gradient(160deg,#1f3a2d_0%,#17201b_70%)] text-white sm:rounded-t-[72px]">
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-14 sm:pt-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Mark className="size-10 text-white" />
              <span className="text-2xl font-bold tracking-wide">
                그리다<Comma className="ml-0.5 h-[0.7em] w-auto" />
              </span>
            </div>
            <p className="mt-3 text-xs tracking-[0.4em] text-sage/80">GRIDA STUDIO</p>
          </div>

          <div className="grid grid-cols-2 gap-12 text-sm">
            <div>
              <p className="text-xs tracking-[0.2em] text-mute">MENU</p>
              <ul className="mt-4 grid gap-2 text-white/70">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="hover:text-white">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] text-mute">CONTACT</p>
              <ul className="mt-4 grid gap-2 text-white/70">
                <li>
                  <a href={`mailto:${EMAIL}`} className="hover:text-white">
                    {EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-12 border-t border-white/10 pt-6 text-xs text-white/40">© 2026 그리다, 스튜디오</p>
      </div>
    </footer>
  );
}
