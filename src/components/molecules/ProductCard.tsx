import React from "react";
import { useRouter } from "next/router";
import Card from "@src/components/atoms/Card";
import { Product } from "@src/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard(props: ProductCardProps) {
  const { product } = props;
  const router = useRouter();
  const mainImage = () => product.images.filter((image) => image.is_main)[0]?.image;

  return (
    <Card onClick={() => router.push(`/product/${product.id}`)}>
      <img src={mainImage()} alt={product.name} style={{ width: "100%" }} />
    </Card>
  );
}
