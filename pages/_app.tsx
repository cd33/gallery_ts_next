import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { EthersProvider } from "../context/ethersProviderContext";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <EthersProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </EthersProvider>
    </ChakraProvider>
  );
}

export default MyApp;
