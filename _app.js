// pages/_app.js
import '@/styles/styles.css'; // Altere o caminho se necessário

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;