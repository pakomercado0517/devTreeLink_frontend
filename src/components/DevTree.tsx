import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Link, Outlet } from "react-router-dom";
import NavigationTabs from "./NavigationTabs";
import { SocialNetworks, User } from "../types";
import DevTreeLink from "./DevTreeLink";
import { useQueryClient } from "@tanstack/react-query";
import Header from "./Header";

type DevTreeProps = {
  data: User;
};

export default function DevTree({ data }: DevTreeProps) {
  const [enabledLinks, setEnabledLinks] = useState<SocialNetworks[]>(
    JSON.parse(data.links).filter((item: SocialNetworks) => item.enabled),
  );

  console.log("enabledLinks", enabledLinks);

  useEffect(() => {
    setEnabledLinks(
      JSON.parse(data.links).filter((item: SocialNetworks) => item.enabled),
    );
  }, [data]);

  const queryClient = useQueryClient();
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    const prevIndex = enabledLinks.findIndex((link) => link.id === active.id);
    const newIndex = enabledLinks.findIndex((link) => link.id === over?.id);
    const order = arrayMove(enabledLinks, prevIndex, newIndex);
    setEnabledLinks(order);

    const disabledLinks: SocialNetworks[] = JSON.parse(data.links).filter(
      (item: SocialNetworks) => !item.enabled,
    );
    const links = order.concat(disabledLinks);
    queryClient.setQueryData<User | undefined>(["user"], (prevData) => {
      if (!prevData) {
        return {
          ...data,
          links: JSON.stringify(links),
        };
      }
      return {
        ...prevData,
        links: JSON.stringify(links),
      };
    });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <NavigationTabs />
          <div className="flex justify-end">
            <Link
              className="text-right text-2xl font-bold text-slate-800"
              to={`/${data.handle}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visitar Mi Perfil: /{data.handle}
            </Link>
          </div>

          <div className="mt-10 flex flex-col gap-10 md:flex-row">
            <div className="flex-1">
              <Outlet />
            </div>
            <div className="w-full space-y-6 bg-slate-800 px-5 py-10 md:w-96">
              <p className="text-center text-4xl text-white">{data.handle}</p>
              {data.image && (
                <img
                  src={data.image}
                  alt="Profile Image"
                  className="mx-auto max-w-[250px]"
                />
              )}
              <p className="text-center text-lg font-bold text-white">
                {data.description}
              </p>

              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <div className="mt-20 flex flex-col gap-5">
                  <SortableContext
                    items={enabledLinks}
                    strategy={verticalListSortingStrategy}
                  >
                    {enabledLinks.map((link) => (
                      <DevTreeLink key={link.name} link={link} />
                    ))}
                  </SortableContext>
                </div>
              </DndContext>
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
}
