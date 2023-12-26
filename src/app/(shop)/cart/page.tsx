import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
 initialData.products[0],
 initialData.products[1],
 initialData.products[2],
];

export default function () {
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

      {productsInCart.map((product) => (
       <div className='flex mb-5' key={product.slug}>
        <Image
         src={`/products/${product.images[0]}`}
         width={100}
         height={100}
         style={{
          width: "100px",
          height: "100px",
         }}
         alt={product.title}
         className='mr-5 rounded'
        />

        <div className=''>
         <p>{product.title}</p>
         <p>{product.price}</p>
         <QuantitySelector quantity={3} />

         <button className='underline mt-3'>Remover</button>
        </div>
       </div>
      ))}
     </div>

     {/* checkout - resumen de orden */}

     <div className='bg-white rounded-xl shadow-xl p-7'>
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
