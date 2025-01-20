import { SearchHandle } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import { searchByHandle } from "../api/DevTreeAPI";
import { Link } from "react-router-dom";

export default function SearchForm() {
  const initialValues = {
    handle: "",
  };

  const mutation = useMutation({
    mutationFn: searchByHandle,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SearchHandle>({ defaultValues: initialValues });

  const handle = watch("handle");

  const handleSearch = () => {
    const slug = slugify(handle, {
      delimiter: "_",
    });
    mutation.mutate(slug);
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="space-y-5">
      <div className="relative flex items-center bg-white px-2">
        <label htmlFor="handle">devtree.com/</label>
        <input
          type="text"
          id="handle"
          className="flex-1 border-none bg-transparent p-2 focus:ring-0"
          placeholder="elonmusk, zuck, jeffbezos"
          {...register("handle", {
            required: "Un Nombre de Usuario es obligatorio",
          })}
        />
      </div>
      {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

      <div className="mt-10">
        {mutation.isPending && <p className="text-center">Cargando...</p>}
        {mutation.error && (
          <p className="text-center font-black text-red-600">
            {mutation.error.message}
          </p>
        )}
        {mutation.data && (
          <p className="text-center font-semibold text-cyan-500">
            {mutation.data}.{" "}
            <Link
              className="font-black underline"
              to={"/auth/register"}
              state={{ handle: slugify(handle, { delimiter: "_" }) }}
            >
              Hazlo en Registro
            </Link>
          </p>
        )}
      </div>
      <input
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-cyan-400 p-3 text-lg font-bold uppercase text-slate-600"
        value="Obtener mi DevTree"
      />
    </form>
  );
}
