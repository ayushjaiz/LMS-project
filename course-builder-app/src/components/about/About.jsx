import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import my_profile from '../../assets/images/my_profile.jpg';
import { Link } from 'react-router-dom';
import intro from '../../assets/videos/intro.mp4';
import { RiSecurePaymentFill } from 'react-icons/ri';

import termsAndConditions from '../../assets/docs/termsAndConditions';

const Founder = () => (
  <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>
    <VStack>
      <Avatar boxSize={['40', '48']} src={my_profile} />
      <Text children="Co-Founder" opacity={0.7} />
    </VStack>
    <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
      <Heading children="Ayush Jaiswal" size={['md', 'xl']} />
      <Text
        children={`Hi, I am a full-stack developer and a student. `}
        textAlign={['center', 'left']}
      />
    </VStack>
  </Stack>
);

const VideoPlayer = () => (
  <Box>
    <video
      // autoPlay
      controls
      controlsList="nodownload nofullscreen noremoteplayback"
      disablePictureInPicture
      disableRemotePlayback
      src={intro}
    ></video>
  </Box>
);

const TandC = ({ termsAndConditions }) => (
  <Box>
    <Heading
      size={'md'}
      children="Terms & Conditions"
      textAlign={['center', 'left']}
      my="4"
    />
    <Box h="sm" p="4" overflowY={"scroll"}>
      <Text letterSpacing={'widest'} textAlign={['center', 'left']}>
        {termsAndConditions}
      </Text>
      <Heading
        my={'4'}
        size="xs"
        children="Refund only applicable for cancellation within 7 days. "
      />
    </Box>
  </Box>
);

const About = () => {
  return (
    <Container maxW={'container.lg'} padding={'16'} boxShadow={'lg'}>
      <Heading children="About Us" textAlign={['center', 'left']} />
      <Founder />
      <Stack m="8" direction={['column', 'row']} alignItems={'center'}>
        <Text fontFamily={'cursive'} m={'8'} textAlign={['center', 'left']}>
          We are a video streaming platform with some premium courses available
          only for premium users.
        </Text>
        <Link to="/subscribe">
          <Button variant={'ghost'} colorScheme="yellow">
            Checkout Our Plan
          </Button>
        </Link>
      </Stack>

      <VideoPlayer />

      <TandC termsAndConditions={termsAndConditions} />

      {/* <HStack my={'4'} p={'4'}>
        <RiSecurePaymentFill />
        <Heading
          children={'Payment is secured by Razorpay'}
          size={'xs'}
          textTransform={'uppercase'}
          fontFamily={'sans-serif'}
        />
      </HStack> */}
    </Container>
  );
};

export default About;
