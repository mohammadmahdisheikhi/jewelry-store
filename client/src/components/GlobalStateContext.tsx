// GlobalStateContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import type { ProductProps } from "@/pages/product";

interface GlobalStateContextProps {
	bookmarks: ProductProps[];
	cart: ProductProps[];
	addToBookmarks: (product: ProductProps) => void;
	addToCart: (product: ProductProps) => void;
}

const GlobalStateContext = createContext<GlobalStateContextProps | undefined>(
	undefined,
);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
	const [bookmarks, setBookmarks] = useState<ProductProps[]>([]);
	const [cart, setCart] = useState<ProductProps[]>([]);

	const addToBookmarks = (product: ProductProps) => {
		setBookmarks((prev) => [...prev, product]);
	};

	const addToCart = (product: ProductProps) => {
		setCart((prev) => [...prev, product]);
	};

	return (
		<GlobalStateContext.Provider
			value={{ bookmarks, cart, addToBookmarks, addToCart }}
		>
			{children}
		</GlobalStateContext.Provider>
	);
};

export const useGlobalState = () => {
	const context = useContext(GlobalStateContext);
	if (!context) {
		throw new Error("useGlobalState must be used within a GlobalStateProvider");
	}
	return context;
};
