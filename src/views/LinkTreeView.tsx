import { useEffect, useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/DevTreeAPI";
import { SocialNetworks, User } from "../types";

export default function LinkTreeView() {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"])!;

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onError: (errors) => {
      toast.error((errors as Error).message);
    },
    onSuccess: () => {
      toast.success("Actualizado correctamente");
    },
  });

  useEffect(() => {
    const updatedData = devTreeLinks
      .map((el) => {
        const userLink: SocialNetworks | undefined = JSON.parse(
          user.links,
        ).find((link: SocialNetworks) => link.name === el.name);
        if (userLink) {
          return { ...el, url: userLink.url, enabled: userLink.enabled };
        }
        return el;
      })
      .filter((el) => el !== undefined) as typeof social;
    setDevTreeLinks(updatedData);
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateLinks = devTreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link,
    );
    setDevTreeLinks(updateLinks);

    queryClient.setQueryData<User>(["user"], (prevData): User => {
      if (prevData) {
        return {
          ...prevData,
          links: JSON.stringify(updateLinks),
        };
      }
      return user;
    });
  };

  const links: SocialNetworks[] = JSON.parse(user.links);
  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("URL no Válida");
        }
      }
      return link;
    });

    setDevTreeLinks(updatedLinks);

    let updatedItems: SocialNetworks[] = [];
    const selectedSocialNetwork = updatedLinks.find(
      (link) => link.name === socialNetwork,
    );
    if (selectedSocialNetwork?.enabled) {
      const id = links.filter((link) => link.id).length + 1;
      if (links.some((link) => link.name === socialNetwork)) {
        updatedItems = links.map((link) => {
          if (link.name === socialNetwork) {
            return {
              ...link,
              enabled: true,
              id,
            };
          } else {
            return link;
          }
        });
      } else {
        const newItem = {
          ...selectedSocialNetwork,
          id,
        };
        updatedItems = [...links, newItem];
      }
    } else {
      const indexToUpdate = links.findIndex(
        (link) => link.name === socialNetwork,
      );
      updatedItems = links.map((link) => {
        if (link.name === socialNetwork) {
          return {
            ...link,
            id: 0,
            enabled: false,
          };
        } else if (
          link.id > indexToUpdate &&
          indexToUpdate !== 0 &&
          link.id === 1
        ) {
          return {
            ...link,
            id: link.id - 1,
          };
        } else {
          return link;
        }
      });
    }

    // Almacenar en la base de datos
    queryClient.setQueryData(["user"], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems),
      };
    });
  };

  return (
    <div className="space-y-5">
      {devTreeLinks.map((item) => (
        <DevTreeInput
          key={item.name}
          item={item}
          handleUrlChange={handleUrlChange}
          handleEnableLink={handleEnableLink}
        />
      ))}
      <button
        onClick={() => mutate(queryClient.getQueryData(["user"])!)}
        className="test-slate-600 w-full rounded-lg bg-cyan-400 p-2 text-lg font-bold uppercase"
      >
        Guardar Cambios
      </button>
    </div>
  );
}
