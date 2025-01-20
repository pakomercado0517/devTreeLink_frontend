import { SocialNetworks, UserHandle } from "../types";

type HandleDataProps = {
  data: UserHandle;
};
export default function HandleData({ data }: HandleDataProps) {
  const links: SocialNetworks[] = JSON.parse(data.links).filter(
    (link: SocialNetworks) => link.enabled,
  );

  return (
    <div className="space-y-6 text-white">
      <p className="text-center text-4xl font-bold">{data.handle}</p>
      {data.image && (
        <img
          src={data.image}
          alt="imagen de usuario"
          className="mx-auto max-w-[250px]"
        />
      )}
      <p className="text-center text-lg font-semibold">{data.description}</p>
      <div className="mt-20 flex flex-col gap-6">
        {links.length ? (
          links.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 rounded-lg bg-white px-5 py-2 text-black"
              key={link.name}
            >
              <img
                src={`/social/icon_${link.name}.svg`}
                className="h-12 w-12"
                alt="image network"
              />
              <p className="text-black">Visita mi perfil en : {link.name}</p>
            </a>
          ))
        ) : (
          <p className="text-center">No hay enlaces</p>
        )}
      </div>
    </div>
  );
}
