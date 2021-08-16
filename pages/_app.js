import "../styles/globals.css";
import "react-quill/dist/quill.snow.css";
import "../styles/custom-quill.css";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
