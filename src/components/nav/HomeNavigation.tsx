import { Link } from "react-router-dom";

export default function HomeNavigation() {
  return (
    <>
      <Link
        to="/auth/login"
        className="cursor-pointer p-2 text-xs font-black uppercase text-white"
      >
        Iniciar Sesión
      </Link>
      <Link
        to="/auth/register"
        className="cursor-pointer rounded-lg bg-lime-500 p-2 text-xs font-black uppercase text-slate-800"
      >
        Registrarme
      </Link>
    </>
  );
}
