import { Image as Picture, X } from "lucide-react";
import {
  ChangeEvent,
  ComponentProps,
  useCallback,
  useRef,
  useState,
} from "react";

interface ImageInputProps extends ComponentProps<"input"> {}

export function ImageInput({ name, ...props }: ImageInputProps) {
  const [image, setImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        setImage(file);
      }
    },
    [],
  );

  const clearImage = useCallback(() => {
    setImage(null);
    inputRef.current!.files = null;
  }, []);

  return (
    <label htmlFor={name} onClick={() => image && clearImage()}>
      <div
        className="flex items-center justify-center gap-1 text-teal-500 data-[image=true]:text-rose-500"
        data-image={!!image}
      >
        {image ? <X /> : <Picture />}
        <span>Imagem</span>
      </div>
      <input
        name={name}
        id={name}
        {...props}
        className="sr-only"
        type="file"
        onChange={handleImageChange}
        ref={inputRef}
      />
    </label>
  );
}
