import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

export default function HomeView() {
  return (
    <section>
      <Header />

      <main className="lg:bg-home lg:bg-home-xl min-h-screen bg-gray-100 bg-right-top bg-no-repeat py-10">
        <div className="mx-auto mt-10 max-w-5xl">
          <div className="space-y-6 px-10 lg:w-1/2 lg:p-0">
            <h1 className="text-6xl font-black">
              Todas tus <span className="text-cyan-400">Redes Sociales </span>{" "}
              en un enlace
            </h1>
            <p className="text-xl text-slate-800">
              Únete a más de 200 mil developers compartiendo sus redes sociales,
              comparte tu perfil de TikTok, Facebook, Instagram, Youtube,
              Github, y más
            </p>
            <SearchForm />
          </div>
        </div>
      </main>
    </section>
  );
}
