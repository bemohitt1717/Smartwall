import { Link } from "react-router-dom";
import LoginForm from "./components/LoginForm.jsx";
import LoginShowcase from "./components/LoginShowcase.jsx";
import logo from "../../assets/icons/smartwall-logo.svg";

export default function Login() {
  return (
    <div className="min-h-[100dvh] bg-white md:grid md:h-[100dvh] md:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)] md:overflow-hidden md:bg-[#f7f6f6] xl:grid-cols-[minmax(0,0.95fr)_minmax(560px,1.05fr)]">
      <main className="flex min-h-[100dvh] items-stretch justify-stretch px-0 py-0 md:h-full md:min-h-0 md:items-center md:justify-center md:px-7 lg:px-10 xl:px-14">
        <section
          className="flex h-[100dvh] w-full max-w-none flex-col bg-white px-5 py-7 sm:px-8 sm:py-8 md:h-auto md:max-w-[456px] md:rounded-[18px] md:px-9 md:py-9 md:shadow-[0_8px_24px_rgba(53,37,52,0.07)]"
          aria-label="SmartWall account access"
        >
          <header>
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6e4d82]/20"
            >
              <img src={logo} alt="" className="h-9 w-9" />
              <span className="text-[16px] font-semibold tracking-[-0.035em] text-[#211d22]">
                SmartWall
              </span>
            </Link>
          </header>

          <LoginForm />
        </section>
      </main>

      <LoginShowcase />
    </div>
  );
}
