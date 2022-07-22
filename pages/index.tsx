import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import useEthersProvider from "../hook/useEthersProvider";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
import { Flex, Text } from '@chakra-ui/react'
import Layout from '../components/Layout'
// import Contract from '../artifacts/contracts/XXX.sol/XXX.json';

const contractAddress = "XXX";

const Home: NextPage = () => {
  const { account, setAccount, provider } = useEthersProvider();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log("account :>> ", account);

  const getDatas = async () => {
    setIsLoading(true);
    if (provider) {
      // const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
      console.log("success !");
    }
  };

  useEffect(() => {
    if (account) {
      getDatas();
    }
  }, [account]);

  return (
    <Layout>
      <Flex align="center" justify="center" width="100%">
        {account ? <Text>Bravo</Text> : <Text>Please connect your wallet.</Text>}
      </Flex>
    </Layout>
  );
};

export default Home;
