import { ChakraProvider, Flex, Image } from "@chakra-ui/react";
import Router from "~/router";
import { Header } from "./components/Header";

function App() {
  return (
    <ChakraProvider>
      <>
        <Header>
          <Flex align="center">
            <Image src="/icone.svg" alt="Icon" />
          </Flex>
        </Header>
        <Router />
      </>
    </ChakraProvider>
  );
}

export default App;
