"use client";

import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { Profile } from "@/components/Profile";
import { Textarea } from "./Textarea";
import { useAuth } from "@/contexts/auth";
import { LogOut, Image as Picture, X } from "lucide-react";
import Image from "next/image";
import { Select } from "./Select";
import { toast } from "sonner";
import { usePosts } from "@/contexts/posts";

export function NewPost() {
  const { signOut, user } = useAuth();
  const { handleCreatePost } = usePosts();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        setImage(file);
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };

        reader.readAsDataURL(file);
      }
    },
    [],
  );
  const clearImage = useCallback(() => {
    setImage(null);
    setPreview(null);
  }, []);

  const clearForm = useCallback(() => {
    setTitle("");
    setDescription("");
    setType(null);
    clearImage();
  }, [clearImage]);

  const handlePost = useCallback(async () => {
    if (!description) {
      toast.error("Descrição é obrigatória");
      return;
    }

    if (!title) {
      toast.error("Título é obrigatório");
      return;
    }

    if (!type) {
      toast.error("Tipo é obrigatório");
      return;
    }

    if (image?.size && image?.size > 5 * 1024 * 1024) {
      toast.error("Imagem deve ter no máximo 5MB");
      return;
    }

    try {
      await handleCreatePost({
        description,
        image,
        title,
        type,
      });

      clearForm();

      toast.success("Semente plantada com sucesso!");
    } catch (error) {
      toast.error("Não foi possível criar a semente. Tente novamente.");
    }
  }, [clearForm, description, image, title, type, handleCreatePost]);

  const options = useMemo(
    () => [
      {
        value: "noticia",
        label: "Notícia",
      },
      {
        value: "edital",
        label: "Edital",
      },
      {
        value: "divulgacao",
        label: "Divulgação",
      },
    ],
    [],
  );

  return (
    <div className="flex flex-col items-start justify-start gap-4 pb-4 border-b border-slate-300 w-full">
      <div className="flex justify-between items-center w-full">
        <Profile icon={"myProfile"}>
          {user?.name ? `${user.name}` : "Meu perfl"}
        </Profile>
        <button
          className="p-2 rounded-sm bg-teal-50 text-teal-500 flex items-center justify-center"
          onClick={signOut}
        >
          <LogOut size={20} className="text-inherit" />
        </button>
      </div>
      {description.length > 0 && (
        <input
          placeholder="Digite o título da sua semente."
          className="w-full font-bold border-none outline-none"
          type="text"
          value={title}
          onChange={(event) => setTitle(event?.target?.value)}
        />
      )}
      <Textarea
        onChange={(event) => setDescription(event?.target?.value)}
        value={description}
      />
      {preview && (
        <Image
          src={preview}
          alt="preview"
          className="w-full h-fit border-2 border-slate-200 rounded-lg"
          width={500}
          height={500}
        />
      )}
      <section className="w-full flex items-center justify-between ">
        <label htmlFor="image" onClick={() => image && clearImage()}>
          <div
            className="flex items-center justify-center gap-1 text-teal-500 data-[image=true]:text-rose-500"
            data-image={!!image}
          >
            {image ? <X /> : <Picture />}
            <span>Imagem</span>
          </div>
          <input
            id="image"
            className="sr-only"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
        </label>
        <div className="flex items-center gap-3">
          {description.length > 0 && (
            <Select
              options={options}
              placeholder="Tipo"
              onValueChange={setType}
            />
          )}
          <Button size={"small"} onClick={handlePost}>
            Plantar
          </Button>
        </div>
      </section>
    </div>
  );
}
