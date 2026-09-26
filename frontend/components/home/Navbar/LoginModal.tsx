import Image from "next/image";
import Login from "@/components/Auth/login";
import type { AuthUser } from "@/lib/auth";

type LoginModalProps = {
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => Promise<void>;
};

export default function LoginModal({
  onClose,
  onLoginSuccess,
}: LoginModalProps) {
  return (
    <div
      className="modal-overlay-enter fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-[3px]"
      onClick={onClose}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#4b0018]/25 via-[#7a0b34]/20 to-[#f7dce8]/20" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Login to RoopSetu"
        className="modal-luxury-enter relative max-h-[94vh] w-[96%] max-w-[820px] overflow-hidden rounded-[24px] border border-[#F2DCE4] bg-[#FFF9F7] shadow-[0_30px_90px_rgba(76,0,30,0.35)] lg:max-h-[85vh] lg:w-[90%]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[36px] bg-[#8a0032]/20 blur-3xl" />
        <button
          type="button"
          className="absolute right-4 top-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF5F8] text-[#8A1238] shadow-sm transition-all hover:bg-[#FFEAF0] hover:scale-105"
          onClick={onClose}
          aria-label="Close login dialog"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid min-h-[480px] max-h-[90vh] grid-cols-1 lg:min-h-[540px] lg:max-h-[85vh] lg:grid-cols-[45%_55%]">
          <aside className="relative hidden overflow-hidden border-b border-[#F2E1E6] bg-gradient-to-br from-[#5A001F] via-[#7A1034] to-[#A32954] lg:grid lg:h-auto lg:grid-cols-1 lg:border-b-0">
            <div className="relative z-10 flex flex-col justify-end p-5 text-white sm:p-6 lg:absolute lg:inset-x-0 lg:bottom-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FFD7E1] sm:text-xs">
                Beauty Services
              </p>
              <h3 className="mt-1.5 text-2xl font-semibold leading-tight sm:text-[1.9rem]">
                Find Your Perfect Glow
              </h3>
              <p className="mt-2 max-w-[18rem] text-xs leading-relaxed text-[#FFEAF0] sm:text-sm">
                Discover verified beauticians for makeup, hair, mehndi, and
                event-ready styling.
              </p>
            </div>

            <div className="pointer-events-none absolute inset-0 hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80"
                alt=""
                fill
                sizes="36vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B0014]/86 via-[#4D1230]/44 to-transparent" />
            </div>
          </aside>

          <div className="max-h-[94vh] overflow-y-auto bg-[#FFFDFC] p-5 sm:p-6 lg:max-h-[85vh] lg:border-l lg:p-7">
            <div className="[&_.register-card-wrap]:min-h-0 [&_.register-card-wrap]:items-stretch [&_.register-card]:w-full [&_.register-card]:max-w-none [&_.register-card]:border-0 [&_.register-card]:bg-transparent [&_.register-card]:p-0 [&_.register-card]:shadow-none [&_.register-close]:hidden [&_.embedded-login-form]:w-full">
              <Login onSuccess={onLoginSuccess} embedded />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
