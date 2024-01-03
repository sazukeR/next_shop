"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { titleFont } from "@/config/fonts";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { useCartStore, useUiStore } from "@/store";

export const TopMenu = () => {
 const openSideMenu = useUiStore((state) => state.openSideMenu);
 const totalItemsInCart = useCartStore((state) => state.getTotalItems());

 // en este punto tenemos un error de hidratacion ya que de lado del servidor se genera la pantalla del carrito con la cuenta en 0 por defecto, pero estamos actualizando la informacion del carrito de compras de lado del cliente. Para resolver este inconveniente usamos un estado y un use efect colocando el set loaded en true, de esa manera la pantalla se carga una vez se ha cargado la informacion del carrito.
 const [loaded, setLoaded] = useState(false);

 useEffect(() => {
  setLoaded(true);
 }, []);

 return (
  <nav className='flex px-5 justify-between items-center w-full'>
   <div>
    <Link href='/'>
     <span className={`${titleFont.className} antialiased font-bolt`}>
      Teslo
     </span>
     <span>| Shop</span>
    </Link>
   </div>
   <div className='hidden sm:block'>
    <Link
     className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
     href='/gender/men'
    >
     Hombres
    </Link>
    <Link
     className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
     href='/gender/women'
    >
     Mujeres
    </Link>
    <Link
     className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
     href='/gender/kid'
    >
     Ninos
    </Link>
   </div>

   {/* search, cart, menu */}
   <div className='flex items-center'>
    <Link href={`/search`} className='mx-2'>
     <IoSearchOutline className='w-5 h-5' />
    </Link>
    <Link href={`/cart`} className='mx-2'>
     <div className='relative'>
      {loaded && totalItemsInCart > 0 && (
       <span className='absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white'>
        {totalItemsInCart}
       </span>
      )}

      <IoCartOutline />
     </div>
    </Link>
    <button
     onClick={openSideMenu}
     className='m-2 rounded-md transition-all hover:bg-gray-100'
    >
     Menu
    </button>
   </div>
  </nav>
 );
};
