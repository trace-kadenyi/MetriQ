import LoginButtons from "../Components/Buttons/LoginButtons";
import logo from "../assets/zyntra_logo.png";

export default function LoginPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center 
                     bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800
                     dark:from-blue-900 dark:via-blue-950 dark:to-black px-4"
    >
      <section
        className="w-full max-w-md space-y-8 rounded-3xl p-10
                          bg-white/60 backdrop-blur-sm shadow-xl
                          dark:bg-blue-950/70"
      >
        {/* Brand + intro */}
        <div className="flex flex-col items-center gap-2 text-center">
          <img src={logo} alt="Zyntra" className="w-10 h-10" />
          <h1 className="text-2xl font-bold tracking-tight text-blue-900 dark:text-gray-100">
            Welcome back
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Log in to view your PageSpeed reports, favourites and more.
          </p>
        </div>

        {/* OAuth choices */}
        <LoginButtons variant="providers" />

        {/* Legal */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          By continuing you agree to our&nbsp;
          <a href="/terms" className="underline hover:text-orange-500">
            Terms
          </a>{" "}
          &amp;&nbsp;
          <a href="/privacy" className="underline hover:text-orange-500">
            Privacy Policy
          </a>
          .
        </p>
      </section>
    </main>
  );
}
