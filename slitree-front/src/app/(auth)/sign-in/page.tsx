"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import logo from "@/assets/logo.svg";
import { useAuth } from "@/contexts/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Image from "next/image";

const signInFormSchema = z.object({
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .min(1, "Email é obrigatório")
    .email({
      message: "Email inválido",
    }),
  password: z
    .string({
      required_error: "Senha é obrigatória",
    })
    .min(6, "Senha deve conter no mínimo 6 caracteres"),
});

type signInFormSchemaType = z.infer<typeof signInFormSchema>;

export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleSignIn } = useAuth();
  const { push } = useRouter();

  const handleRedirectToSignUp = useCallback(() => {
    push("/sign-up");
  }, [push]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<signInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
    mode: "onBlur",
  });

  const handleSignInFn = useCallback(
    async (data: signInFormSchemaType) => {
      try {
        setIsSubmitting(true);
        await handleSignIn({ email: data.email, password: data.password });
        toast.success("Bem vindo!");
        push("/posts");
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [handleSignIn, push],
  );

  return (
    <form
      className="flex flex-col w-full items-center"
      onSubmit={handleSubmit(handleSignInFn)}
    >
      <div className="mb-12">
        <Image src={logo} width={200} height={200} alt="Logo Slitree" />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <Input
          placeholder="Email"
          {...register("email")}
          error={errors?.email?.message}
        />
        <Input
          placeholder="Senha"
          type="password"
          error={errors?.password?.message}
          {...register("password")}
        />
        <Button isLoading={isSubmitting}>Entrar</Button>
        <Button
          intent="ghost"
          size="small"
          type="button"
          onClick={handleRedirectToSignUp}
        >
          Não possui uma conta? Registre-se aqui
        </Button>
      </div>
    </form>
  );
}
