import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";
import logo from "../public/logo3.png";
import { ChakraNextImage } from "./ImageChakra";
import ChakraNextLink from "./LinkChakra";

const SocialButton = ({
  children,
  label,
  href,
  target,
}: {
  children: ReactNode;
  label: string;
  href: string;
  target?: string;
}) => {
  return (
    <chakra.button
      // bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      bg="white"
      color="black"
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      target={target}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
        color: "white",
        border: "1px solid white",
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      // bg={useColorModeValue('gray.50', 'gray.900')}
      // color={useColorModeValue("gray.700", "gray.200")}
      bg="black"
      color="white"
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <ChakraNextLink href="/">
          <ChakraNextImage
            alt="Logo"
            placeholder="blur"
            layout="responsive"
            src={logo}
            width={80}
            height={30}
          />
        </ChakraNextLink>
        <Text>Carlito© 2022. All rights reserved</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"Twitter"} href={"#"} target="_blank">
            <FaTwitter />
          </SocialButton>
          <SocialButton
            label={"YouTube"}
            href={"https://www.youtube.com/watch?v=bqXz271fT4I"}
            target="_blank"
          >
            <FaYoutube />
          </SocialButton>
          <SocialButton label={"Instagram"} href={"#"} target="_blank">
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
