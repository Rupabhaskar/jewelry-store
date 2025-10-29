"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Cart Context
const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateItemQty: () => {},
  clear: () => {},
});

export function useCart() {
  return useContext(CartContext);
}

function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("aurelia_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("aurelia_cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (item) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id && p.variant === item.variant);
      if (existing) {
        return prev.map((p) => (p.id === item.id && p.variant === item.variant ? { ...p, qty: p.qty + (item.qty || 1) } : p));
      }
      return [...prev, { ...item, qty: item.qty || 1 }];
    });
  };

  const removeItem = (id, variant) => {
    setItems((prev) => prev.filter((p) => !(p.id === id && p.variant === variant)));
  };

  const updateItemQty = (id, variant, nextQty) => {
    setItems((prev) => {
      return prev
        .map((p) => (p.id === id && p.variant === variant ? { ...p, qty: Math.max(1, nextQty) } : p))
        .filter((p) => p.qty > 0);
    });
  };

  const clear = () => setItems([]);

  const value = useMemo(() => ({ items, addItem, removeItem, updateItemQty, clear }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Auth Context (mocked)
const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} });
export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem("aurelia_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (email) => {
    const u = { email };
    setUser(u);
    try { localStorage.setItem("aurelia_user", JSON.stringify(u)); } catch {}
  };
  const logout = () => {
    setUser(null);
    try { localStorage.removeItem("aurelia_user"); } catch {}
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}


