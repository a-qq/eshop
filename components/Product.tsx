import { Rating } from "./Rating";

interface ProductProps {
  data: {
    description: string;
    thumbnailUrl: string;
    thumbnailAlt: string;
    rating: number;
  };
}

export const Product = ({ data }: ProductProps) => {
  return (
    <>
      <img src={data.thumbnailUrl} alt={data.thumbnailAlt} />
      <p className="text-justify">{data.description}</p>
      <Rating rating={data.rating} />
    </>
  );
};