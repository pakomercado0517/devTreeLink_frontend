import { useForm } from "react-hook-form";
import { updateUser, uploadImage } from "../api/DevTreeAPI";
import ErrorMessage from "../components/ErrorMessage";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { UpdateForm, User } from "../types";
import { toast } from "sonner";

export default function ProfileView() {
  const queryClient = useQueryClient();
  const data: User = queryClient.getQueryData(["user"])!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateForm>({
    defaultValues: {
      handle: data.handle,
      description: data.description,
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateUser,
    onError: (errors) => {
      toast.error((errors as Error).message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (errors) => {
      toast.error((errors as Error).message);
    },
    onSuccess: (data) => {
      queryClient.setQueryData<User>(["user"], (prevData) => {
        if (!prevData) {
          return {
            ...data,
            image: data.newImage, // Usa los datos de `data` como fallback
          };
        }

        return {
          ...prevData,
          image: data.image,
        };
      });
      toast.success(data.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadImageMutation.mutate(e.target.files[0]);
    }
  };

  const handleUserProfileForm = (formData: UpdateForm) => {
    const user: User = queryClient.getQueryData(["user"])!;
    user.description = formData.description;
    user.handle = formData.handle;
    updateProfileMutation.mutate(user);
  };

  return (
    <form
      className="space-y-5 rounded-lg bg-white p-10"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-center text-2xl text-slate-800">
        Editar Información
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle:</label>
        <input
          type="text"
          className="rounded-lg border-none bg-slate-100 p-2"
          placeholder="handle o Nombre de Usuario"
          {...register("handle", { required: "El handle es obligatorio" })}
        />
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Descripción:</label>
        <textarea
          className="rounded-lg border-none bg-slate-100 p-2"
          placeholder="Tu Descripción"
          {...register("description")}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="rounded-lg border-none bg-slate-100 p-2"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-cyan-400 p-2 text-lg font-bold uppercase text-slate-600"
        value="Guardar Cambios"
      />
    </form>
  );
}
