import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {
    cart:  CartProduct[];

    getTotalItems: () => number;

    addProductToCart: (product: CartProduct) => void;

    updateProductQuantity: (product: CartProduct, quantity: number) => void;

    removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
    

  // persist me ofrece una forma para guardr el estado de sustat en el localstorage
  persist(

    (set, get) => ({

      cart: [],

      // metodos

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce( (total, item) => total + item.quantity, 0 )
      },

      addProductToCart: (product: CartProduct) => {

        const { cart } = get()

        // 1. revisar si el producto existe en el carrito con la talla seleccionada

        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        )

        if(!productInCart) {
          set({cart: [...cart, product]});
          return;
        }

        // 2. el producto existe por talla, entonces debemos incrementarlo

        const updatedCartProducts = cart.map ((item) => {

          if(item.id === product.id && item.size === product.size){
            return {...item, quantity: item.quantity + product.quantity}
          }
          return item
        });
        set({cart: updatedCartProducts})
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
       

        const { cart } = get();

        const updatedCartProducts = cart.map(item => {

          if(item.id === product.id && item.size === product.size) {
            return {...item, quantity: quantity};
          }

          return item;
        });

        set({cart: updatedCartProducts});
      },
      removeProduct: (product: CartProduct) => {

        const { cart } = get();
        const updatedCartProducts = cart.filter(
          item => item.id !== product.id || item.size !== product.size
        );

         set({cart: updatedCartProducts});
      },
    }),
    {
      name: 'shopping-cart',
    }
  )
);