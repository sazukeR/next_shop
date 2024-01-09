"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";

import { useState } from "react";

interface Props {
 product: Product;
}

export const AddToCart = ({ product }: Props) => {
 const addProductToCart = useCartStore((state) => state.addProductToCart);

 const [size, setSize] = useState<Size | undefined>();
 const [quantity, setQuantity] = useState<number>(1);

 const [posted, setPosted] = useState(false);

 const addToCart = () => {
  setPosted(true);
  if (!size) return;
  // todo: agregar al carrito

  const cartProduct: CartProduct = {
   id: product.id,
   slug: product.slug,
   title: product.title,
   price: product.price,
   quantity: quantity,
   size: size,
   image: product.images[0],
  };

  addProductToCart(cartProduct);

  setPosted(false);
  setQuantity(1);
  setSize(undefined);
 };

 return (
  <>
   {posted && !size && (
    <span className='mt-2 text-red-500 faded-in'>
     Debe seleccionar una talla *
    </span>
   )}

   {/*  selecttor de tallas */}
   <SizeSelector
    selectedSize={size}
    availableSizes={product.sizes}
    onSizeChanged={(size) => setSize(size)}
   />
   {/*  selecttor de cantidad */}
   <QuantitySelector
    quantity={quantity}
    onQuantityChanged={(quantity) => setQuantity(quantity)}
   />

   {/* button */}
   <button onClick={addToCart} className='btn-primary my-5'>
    Agregar al carrito
   </button>
  </>
 );
};
