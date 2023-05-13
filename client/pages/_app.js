import "../styles/globals.css";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
export default function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#E98326",
        },
      }}
    >
       <StyleProvider hashPriority="high">
        <Component {...pageProps} />
      </StyleProvider>
    </ConfigProvider>
  );
}
