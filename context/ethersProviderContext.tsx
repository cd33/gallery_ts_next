import { useEffect, useState, createContext } from "react";
import { providers } from "ethers";
// import { string } from "hardhat/internal/core/params/argumentTypes";
import { ReactElement } from "react";

type Context = {
  account: string | null;
  provider: providers.Web3Provider | null;
  setAccount: Function;
};

const initialContext: Context = {
  account: null,
  provider: null,
  setAccount: (): void => {
    throw new Error("setAccount function must be overridden");
  },
};

declare var window: any;

const EthersContext = createContext(initialContext);

export const EthersProvider = (props: { children: ReactElement }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<providers.Web3Provider | null>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      window.ethereum.on("chainChanged", () => {
        setAccount(null);
        setProvider(new providers.Web3Provider(window.ethereum));
      });
      window.ethereum.on("disconnect", () => {
        setAccount(null);
        setProvider(new providers.Web3Provider(window.ethereum));
      });
      window.ethereum.on("accountsChanged", () => {
        setAccount(null);
        setProvider(new providers.Web3Provider(window.ethereum));
      });
    }
  });

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      setProvider(new providers.Web3Provider(window.ethereum));
    }
  }, []);

  return (
    <EthersContext.Provider
      value={{
        account,
        provider,
        setAccount,
      }}
    >
      {props.children}
    </EthersContext.Provider>
  );
};

export default EthersContext;
