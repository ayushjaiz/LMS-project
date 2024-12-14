import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import { TiSocialInstagramCircular, TiSocialGithub} from "react-icons/ti"
import {AiFillLinkedin, AiFillBehanceCircle, AiFillCodepenCircle} from "react-icons/ai"
const Footer = () => {
  return (
    <Box padding={"4"} bg={"blackAlpha.900"} minH={"10vh"}>
        <Stack direction={["column", "row"]}>
            <VStack alignItems={["center", "flex-start"]} width={"full"}>
                <Heading children="ALL Rights Reserved" color={"white"} />
                <Heading
                fontFamily={"body"}
                size={"sm"}
                children="DarKKnight"
                color={"yellow.400"} />
            </VStack>
            <HStack spacing={["2", "10"]} justifyContent={"center"} size="50" color={"white"}>
                <a href='https://www.linkedin.com/in/ayush-jaiswal-061869221/' target={"_blank"} rel="noreferrer">
                    <AiFillLinkedin />
                </a>=
                <a href='https://github.com/AYUSHJAIZ' target={"_blank"} rel="noreferrer">
                    <TiSocialGithub />
                </a>
            </HStack>
        </Stack>
    </Box>
  )
}

export default Footer