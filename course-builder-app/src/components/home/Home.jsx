import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import './Home.css';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import { DiAws } from 'react-icons/di';
import intro from '../../assets/videos/intro.mp4';
const Home = () => {
  return (
    <section className="home">
      <div className="container1">
        <Stack
          direction={['column', 'row']}
          height="100%"
          justifyContent={['center', 'flex-end']}
          spacing={['16', '56']}
          alignItems="center"
        >
          <VStack
            width={'full'}
          >
            <Heading
              children="LEARN FROM THE EXPERTS"
              size={'2xl'}
              textAlign={'center'}
            />
            <Text
              textAlign={'center'}
              children="Find Valuable Content At Reasonable Price ..."
            />
            <Link to="/courses">
              <Button size={'lg'} colorScheme="yellow">
                Explore Now
              </Button>
            </Link>
          </VStack>

          {/* <Image boxSizing={"md"} src={logo} objectFit={"contain"} width={"250px"} height={"250px"}/> */}
        </Stack>
      </div>

      <div className="container2">
        <video
          // autoPlay
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={intro}
        ></video>
      </div>

      <Box padding={'8'} bg={'blackAlpha.200'}>
        <Heading
          children="OUR BRANDS"
          textAlign={'center'}
          fontFamily="body"
          color={'yellow.400'}
        />
        <HStack
          className="bannerBrands"
          justifyContent={'space-evenly'}
          marginTop={'4'}
        >
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>
    </section>
  );
};

export default Home;
