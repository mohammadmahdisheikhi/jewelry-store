// pages/_app.tsx

import { AppProps } from "next/app";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { useStore } from "../store";
import { GlobalStateProvider } from "@/components/GlobalStateContext";
import fa from "moment/src/locale/fa";

function MyApp({ Component, pageProps }: AppProps) {
	const store = useStore(pageProps.initialReduxState);

	return (
		<GlobalStateProvider>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</GlobalStateProvider>
	);
}

export default MyApp;
