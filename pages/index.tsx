import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import useEthersProvider from "../hook/useEthersProvider";
import { ethers } from "ethers";
import { Flex, Text } from "@chakra-ui/react";
import Layout from "../components/Layout";
// import Contract from '../artifacts/contracts/XXX.sol/XXX.json';

const contractAddress = "XXX";

const Home: NextPage = () => {
  const { account, setAccount, provider } = useEthersProvider();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getDatas = useCallback(async () => {
    setIsLoading(true);
    if (provider) {
      // const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
      console.log("success !");
    }
  }, [provider]);

  useEffect(() => {
    if (account) {
      getDatas();
    }
  }, [account, getDatas]);

  return (
    <Layout>
      <Flex align="center" justify="center" width="100%">
        {account ? (
          <Text>Bravo</Text>
        ) : (
          <Text>Please connect your wallet.</Text>
        )}
      </Flex>
    </Layout>
  );
};

export default Home;
