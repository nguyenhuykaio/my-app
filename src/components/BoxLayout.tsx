import { Center, VStack } from "@chakra-ui/react";

const BoxLayout = ({ children }) => {

  return (
    <Center>
      <VStack
        w="full"
        maxW={{ base: "100%", lg: "1100px", xl: "1440px" }}
        alignItems="start"
        pt="10px"
        px={{ base: "12px", md: "32px" }}
      >
        {children}
      </VStack>
    </Center>
  )
}

export default BoxLayout;
