import { useCallback, useEffect, useState } from "react";
import useEthersProvider from "../hook/useEthersProvider";
import { ethers } from "ethers";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  // useBreakpointValue,
  useDisclosure,
  useToast,
  Spinner,
  chakra,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import Image from "next/image";
import ChakraNextLink from "./ChakraNextLink";

declare var window: any;

export type Network = {
  name: string;
  chainId: number;
  ensAddress?: string;
  _defaultProvider?: (providers: any, options?: any) => any;
};

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const { account, setAccount, provider } = useEthersProvider();
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const connectWallet = useCallback(async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      setIsLoading(true);
      if (provider) {
        let network: Network | null;
        network = await provider.getNetwork();
        if (network !== null) {
          if (network.chainId === 1) {
            try {
              const resultAccount = await provider.send(
                "eth_requestAccounts",
                []
              );
              setAccount(ethers.utils.getAddress(resultAccount[0]));
              setIsLoading(false);
              toast({
                title: "Congratulations",
                description: "You wallet has been successfully connected!",
                status: "success",
                duration: 5000,
                isClosable: true,
                variant: "top-accent",
              });
            } catch (err) {
              setAccount(null);
              setIsLoading(false);
              toast({
                title: "An error occured",
                description: "Please select Ethereum Main Network on Metamask",
                status: "error",
                duration: 5000,
                isClosable: true,
                variant: "top-accent",
              });
            }
          } else {
            setAccount(null);
            setIsLoading(false);
            toast({
              title: "An error occured",
              description: "Please select Ethereum Main Network on Metamask",
              status: "error",
              duration: 5000,
              isClosable: true,
              variant: "top-accent",
            });
          }
        }
      }
    } else {
      toast({
        title: "An error occured",
        description: "Please install Metamask extension on your browser.",
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: "top-accent",
      });
    }
  }, [provider, setAccount, toast]);

  useEffect(() => {
    connectWallet();
  }, [connectWallet]);

  return (
    <Box>
      <Flex
        // bg={useColorModeValue('white', 'gray.800')}
        bg="black"
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          {/* <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
            Logo
          </Text> */}
          <ChakraNextLink href="/">
            <Image src="/logo2.png" alt="Logo" width={30} height={30} />
          </ChakraNextLink>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {isLoading ? (
            <Spinner />
          ) : account ? (
            <chakra.span color="orange" fontWeight="bold">
              {account.substring(0, 5)}...
              {account.substring(account.length - 4)}
            </chakra.span>
          ) : (
            <Button colorScheme="orange" onClick={() => connectWallet()}>
              Connect
            </Button>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  // const linkColor = useColorModeValue('gray.600', 'gray.200');
  // const linkHoverColor = useColorModeValue('gray.800', 'white');
  // const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  const linkColor = "white";
  const linkHoverColor = "#b2b2b2";
  const popoverContentBgColor = "black";

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <ChakraNextLink
                p={2}
                href={navItem.href ?? "#"}
                fontSize="xl"
                fontWeight={700}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </ChakraNextLink>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                color="#e0e0e0"
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <ChakraNextLink
      href={href ? href : ""}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "orange" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"} _groupHover={{ color: "black" }}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"orange"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </ChakraNextLink>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={ChakraNextLink}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <ChakraNextLink
                key={child.label}
                py={2}
                href={child.href ? child.href : ""}
              >
                {child.label}
              </ChakraNextLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Market Place",
    href: "/marketPlace",
    // children: [
    //   {
    //     label: 'Explore Design Work',
    //     subLabel: 'Trending Design to inspire you',
    //     href: '#',
    //   },
    //   {
    //     label: 'New & Noteworthy',
    //     subLabel: 'Up-and-coming Designers',
    //     href: '#',
    //   },
    // ],
  },
  {
    label: "Find Work",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "#",
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "#",
      },
    ],
  },
  //   {
  //     label: 'Learn Design',
  //     href: '#',
  //   },
  //   {
  //     label: 'Hire Designers',
  //     href: '#',
  //   },
];
