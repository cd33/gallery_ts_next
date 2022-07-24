import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import useEthersProvider from "../hook/useEthersProvider";
import { ethers } from "ethers";
import { Flex, Text } from "@chakra-ui/react";
import ContractAbi from '../data/abi/SWC_V4_ABI.json';

const contractAddress = "0x7dA4BC8CF0344F4D473Cc5Bb9c864BCC8D06Ded2";

const Home: NextPage = () => {
  const { account, provider } = useEthersProvider();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0)

  const getDatas = useCallback(async () => {
    setIsLoading(true);
    if (provider && account) {
      const contract = new ethers.Contract(contractAddress, ContractAbi, provider);
      const balanceNFT = await contract.balanceOf(account)
      setBalance(balanceNFT.toString())
    }
  }, [account, provider]);

  useEffect(() => {
    if (account) {
      getDatas();
    }
  }, [account, getDatas]);

  return (
    <Flex align="center" justify="center" width="100%">
      {account ? <Text>My Balance of NFT: {balance}</Text> : <Text>Please connect your wallet.</Text>}
    </Flex>
  );
};

export default Home;
