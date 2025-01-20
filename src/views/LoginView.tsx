import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginForm } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import api from "../config/axios";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export default function LoginView() {
  const navigate = useNavigate();

  const initialValues: LoginForm = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: initialValues,
  });

  const handleLogin = async (loginData: LoginForm) => {
    try {
      const { data } = await api.post("auth/login", loginData);
      localStorage.setItem("AUTH_TOKEN", data.token);
      toast.success("Inicio de sesión correcto");
      navigate("/admin");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-white">Iniciar Sesión</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="mt-10 space-y-10 rounded-lg bg-white px-5 py-20"
        noValidate
      >
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
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
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
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-cyan-400 p-3 text-lg font-bold uppercase text-slate-600"
          value="Iniciar Sesión"
        />
      </form>
      <nav className="mt-10">
        <Link className="block text-center text-white" to="/auth/register">
          ¿No tienes cuenta? Crea una aquí
        </Link>
      </nav>
    </>
  );
}
