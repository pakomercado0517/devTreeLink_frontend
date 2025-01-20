import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import type { RegisterForm } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import api from "../config/axios";
import { toast } from "sonner";

export default function RegisterView() {
  const location = useLocation();
  const navigate = useNavigate();
  const initHandle = location?.state?.handle;

  const initialValues = {
    name: "",
    email: "",
    handle: initHandle || "",
    password: "",
    password_confirmation: "",
    links: "[]",
  };

  const errorMessage = "Este campo es obligatorio";

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterForm>({ defaultValues: initialValues });

  const password = watch("password");

  const handleRegister = async (formData: RegisterForm) => {
    try {
      const { data } = await api.post("auth/register", formData);
      toast.success(data.message);
      navigate("/auth/login");
      reset();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-white">Registro</h1>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="mt-10 space-y-10 rounded-lg bg-white px-5 py-20"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="rounded-lg border-none bg-slate-100 p-3 placeholder-slate-400"
            {...register("name", { required: errorMessage })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="rounded-lg border-none bg-slate-100 p-3 placeholder-slate-400"
            {...register("email", {
              required: errorMessage,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">
            Handle
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario: sin espacios"
            className="rounded-lg border-none bg-slate-100 p-3 placeholder-slate-400"
            {...register("handle", { required: errorMessage })}
          />
          {errors.handle && (
            <ErrorMessage>{errors.handle.message}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="rounded-lg border-none bg-slate-100 p-3 placeholder-slate-400"
            {...register("password", {
              required: errorMessage,
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Repetir Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir Password"
            className="rounded-lg border-none bg-slate-100 p-3 placeholder-slate-400"
            {...register("password_confirmation", {
              required: errorMessage,
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-cyan-400 p-3 text-lg font-bold uppercase text-slate-600"
          value="Crear Cuenta"
        />
      </form>

      <nav className="mt-10">
        <Link className="block text-center text-white" to="/auth/login">
          ¿Ya tienes cuenta? Inicia Sesión aquí
        </Link>
      </nav>
    </>
  );
}
