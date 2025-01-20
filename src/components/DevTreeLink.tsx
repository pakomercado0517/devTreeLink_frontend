import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SocialNetworks } from "../types";

type DevTreeLinkProps = {
  link: SocialNetworks;
};

export default function DevTreeLink({ link }: DevTreeLinkProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: link.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="flex items-center gap-5 rounded-lg bg-white px-5 py-2"
    >
      <div
        className="h-12 w-12 bg-cover"
        style={{ backgroundImage: `url('/social/icon_${link.name}.svg')` }}
      ></div>
      <p className="capitalize">
        Visita mi cuenta de <span className="font-bold">{link.name}</span>
      </p>
    </li>
  );
}
