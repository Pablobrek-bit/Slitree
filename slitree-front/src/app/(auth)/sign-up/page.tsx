"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { toast } from "sonner";
import Image from "next/image";

import logo from "@/assets/logo.svg";

const signUpFormSchema = z
  .object({
    name: z
      .string({
        required_error: "O campo nome é obrigatório",
      })
      .min(1, "Nome é obrigatório"),
    email: z
      .string({
        required_error: "Email é obrigatório",
      })
      .min(1, "Eamil é obrigatório")
      .email({
        message: "Email inválido",
      }),
    password: z
      .string({
        required_error: "A senha é obrigatória",
      })
      .min(6, "A senha deve conter no mínimo 6 caracteres"),
    confirmPassword: z
      .string({
        required_error: "A confirmação da senha é obrigatória",
      })
      .min(6, "A senha deve conter no mínimo 6 caracteres"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "A senhas não são iguais",
        path: ["confirmPassword"],
      });
    }
  });

type signUpFormSchemaType = z.infer<typeof signUpFormSchema>;

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleSignUp } = useAuth();
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onBlur",
  });

  const handleRedirectToSignIn = useCallback(() => {
    push("/sign-in");
  }, [push]);

  const handleRegister = useCallback(
    async (data: signUpFormSchemaType) => {
      try {
        setIsSubmitting(true);
        await handleSignUp(data);
        toast.success("Registrado com sucesso!");
        push("/sign-in");
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [handleSignUp, push],
  );

  return (
    <form
      className="flex flex-col w-full items-center"
      onSubmit={handleSubmit(handleRegister)}
    >
      <div className="mb-12">
        <Image src={logo} width={200} height={200} alt="Logo Slitree" />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <Input
          placeholder="Nome"
          {...register("name")}
          error={errors?.name?.message}
        />
        <Input
          placeholder="Email"
          {...register("email")}
          error={errors?.email?.message}
        />
        <Input
          placeholder="Senha"
          type="password"
          {...register("password")}
          error={errors?.password?.message}
        />
        <Input
          placeholder="Confirme sua senha"
          type="password"
          error={errors?.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Button isLoading={isSubmitting}>Registrar</Button>
        <Button
          intent="ghost"
          type="button"
          size="small"
          onClick={handleRedirectToSignIn}
        >
          Já possui conta? Entre aqui
        </Button>
      </div>
    </form>
  );
}
