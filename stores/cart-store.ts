import { type Product } from "@/data/product-data";
import { create } from "zustand";

export type CartProduct = Product & { qty: number };

export type CartState = {
  products: CartProduct[];
  addProduct: (product: Product) => void
  removeProduct: (id: string) => void
  increaseQty: (id: string) => void
  decreaseQty: (id: string) => void
  clear: () => void
};

export const useCartStore = create<CartState>((set) => ({
  products: [],
  addProduct: product =>
    set(state => {
      const existing = state.products.find(i => i.id === product.id)
      if (existing) {
        return {
          products: state.products.map(i =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
          ),
        }
      }
      return { products: [...state.products, { ...product, qty: 1 }] }
    }),

  removeProduct: id =>
    set(state => ({
      products: state.products.filter(i => i.id !== id),
    })),

  increaseQty: id =>
    set(state => ({
      products: state.products.map(i =>
        i.id === id ? { ...i, qty: i.qty + 1 } : i
      ),
    })),

  decreaseQty: id =>
    set(state => ({
      products: state.products
        .map(i => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter(i => i.qty > 0),
    })),

  clear: () => set({ products: [] }),
}));
