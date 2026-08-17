import Image from "next/image";
import { cn } from "@/lib/utils";

type CoverImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export function CoverImage({
  src,
  alt,
  className,
  imageClassName,
  priority,
  sizes = "100vw",
}: CoverImageProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
