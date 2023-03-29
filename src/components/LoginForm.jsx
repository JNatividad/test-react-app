import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Ingrese un correo electrónico válido")
      .required("El correo electrónico es requerido"),
    password: yup.string().required(),
  })
  .required();

export function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const initLogin = (data) => {
    const { email, password } = data;

    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error al iniciar sesión");
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        navigate("/usuarios");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container-login">
      <form onSubmit={handleSubmit(initLogin)}>
        <div>
          <label>Email</label>
          <input type="email" {...register("email")} />
          {errors.email && <span>Ingrese un correo electrónico válido</span>}
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" {...register("password")} />
          {errors.password && <span>Ingrese una contraseña</span>}
        </div>

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}
