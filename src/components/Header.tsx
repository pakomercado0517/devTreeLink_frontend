import AdminNavigation from "./nav/AdminNavigation";
import { useLocation } from "react-router-dom";
import HomeNavigation from "./nav/HomeNavigation";
import Logo from "./Logo";

export default function Header() {
  const location = useLocation();

  return (
    <div>
      {" "}
      <header className="bg-slate-800 py-5">
        <div className="mx-auto flex max-w-5xl flex-col items-center md:flex-row md:justify-between">
          <div className="w-full p-5 md:w-1/3 lg:p-0">
            <Logo />
          </div>
          <nav className="md:flex md:w-1/3 md:justify-end">
            {location.pathname === "/" ? (
              <HomeNavigation />
            ) : (
              <AdminNavigation />
            )}
          </nav>
        </div>
      </header>
    </div>
  );
}
