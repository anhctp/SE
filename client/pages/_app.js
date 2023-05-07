import { ConfigProvider } from "antd";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#E98326",
        },
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
