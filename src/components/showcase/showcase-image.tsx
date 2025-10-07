import Image from "next/image";

export default function ShowcaseImage({
  imageUrl,
  imageAlt,
}: {
  imageUrl: string;
  imageAlt: string;
}) {
  return (
    <div
      style={{
        gridColumnStart: 1,
        gridColumnEnd: 21,
        gridRowStart: 1,
        gridRowEnd: 21,
      }}
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={1920}
        height={1080}
        className="aspect-video"
        priority
      />
    </div>
  );
}
