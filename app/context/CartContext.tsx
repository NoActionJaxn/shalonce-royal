import { createContext, useContext, useEffect, useReducer, type ReactNode } from "react";

export interface CartItem {
  priceId: string;
  productId: string;
  name: string;
  image?: string;
  unitAmount: number;
  currency: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> & { quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: { priceId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { priceId: string; quantity: number } }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; payload: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.priceId === action.payload.priceId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.priceId === action.payload.priceId
              ? { ...i, quantity: i.quantity + (action.payload.quantity ?? 1) }
              : i,
          ),
        };
      }
      return {
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity ?? 1 }],
      };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.priceId !== action.payload.priceId) };
    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        return { items: state.items.filter((i) => i.priceId !== action.payload.priceId) };
      }
      return {
        items: state.items.map((i) =>
          i.priceId === action.payload.priceId ? { ...i, quantity: action.payload.quantity } : i,
        ),
      };
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return { items: action.payload };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (priceId: string) => void;
  updateQuantity: (priceId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "shalonce-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          dispatch({ type: "HYDRATE", payload: parsed });
        }
      }
    } catch {
      // Ignore corrupt storage
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Storage full or unavailable
    }
  }, [state.items]);

  const addItem = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (priceId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { priceId } });
  };

  const updateQuantity = (priceId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { priceId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const total = state.items.reduce((sum, i) => sum + i.unitAmount * i.quantity, 0);

  return (
    <CartContext
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
