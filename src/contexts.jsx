import { createContext } from "react";

// context --> gudang yang bersifat global, artinya data/value yang disimpan dalam gudang ini, bisa diakses dari file mana saja. Scopenya global / app.

// dalam gudang ada ruangan (CartContext) untuk menyimpan cartnya.
export const CartContext = createContext([[], function () {}]);

// export const userContext

// export const DarkModeContext

// export const I8nContext
