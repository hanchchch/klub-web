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
  return (
    <Card onClick={() => router.push(`/product/${product.id}`)}>
      <img src={product.image} alt={product.name} />
    </Card>
  );
}