import Image from "next/image";
import Link from "next/link";

function CoverImage({ title, coverImageUrl, slug }) {
  return (
    <Link href={`/blogs/${slug}`}>
      <div className="relative w-full aspect-video overflow-hidden rounded-md mb-6">
        <Image
          src={coverImageUrl}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 
                 (max-width: 1024px) 50vw, 
                 33vw"
          //  in before we have object-cover now object-fill
          className="object-fill object-center hover:scale-110 transition-all duration-300 ease-out"
          quality={90}
        />
      </div>
    </Link>
  );
}

export default CoverImage;
