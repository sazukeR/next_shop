"use client";

import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";
import { getStockBySlug } from "../../../actions/products/get-stock-by-slug";

interface Props {
 slug: string;
}

export const StockLabel = ({ slug }: Props) => {
 const [stock, setStock] = useState(0);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  getStock();
 }, []);

 const getStock = async () => {
  // llamar server action
  const inStock = await getStockBySlug(slug);

  setStock(inStock);
  setIsLoading(false);
 };

 return (
  <>
   {isLoading ? (
    <h1
     className={`${titleFont.className} antialiased font-bold text-lg animate-pulse bg-gray-200`}
    >
     &nbsp;
    </h1>
   ) : (
    <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
     Stock: {stock}
    </h1>
   )}
  </>
 );
};
