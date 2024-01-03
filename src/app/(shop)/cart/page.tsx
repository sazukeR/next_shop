import { useState } from "react";
import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";

export default function CartPage() {
 // redirect("/empty");

 return (
  <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
   <div className='flex flex-col w-[1000px]'>
    <Title title='Carrito' />

    <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
     {/* carrito */}

     <div className='flex flex-col mt-5'>
      <span className='text-xl'>Agregar mas items</span>
      <Link href={`/`} className='underline mb-5'>
       Continua comprando
      </Link>

      {/* items */}

      <ProductsInCart />
     </div>

     {/* checkout - resumen de orden */}

     <div className=' bg-white rounded-xl shadow-xl p-7 h-fit'>
      <h2 className='text-2xl'>Resumen de orden</h2>
      <div className='grid grid-cols-2'>
       <span>No. Productos</span>
       <span className='text-right'>3 Articulos</span>

       <span>Subtotal</span>
       <span className='text-right'>$ 100</span>

       <span>Impuestos (15%)</span>
       <span className='text-right'>$ 100</span>

       <span className='text-2xl mt-5'>Total:</span>
       <span className='text-2xl mt-5 text-right'>$ 100</span>
      </div>

      <div className='mt-5 mb-2 w-full'>
       <Link
        className='flex btn-primary justify-center'
        href={`/checkout/address`}
       >
        Checkout
       </Link>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
