import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { server } from '../../redux/Store';
import { buySubscription } from '../../redux/actions/UserAction';
import toast from 'react-hot-toast'
import subscription from "../../assets/images/subscription.jpg"

const Subscribe = ({user}) => {

  const dispatch = useDispatch()
  const [key, setKey] = useState("");

  const {loading, error, subscriptionId} = useSelector(state=>state.subscription)
  const {error:courseError} = useSelector(state=>state.course)

  const subscribeHandler = async  () => {

    const {data:{
      key
    }} = await axios.get(`${server}/razorpaykey`)

    setKey(key)
    dispatch(buySubscription())
  }

  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch({type:"clearError"})
    }
    if(courseError){
      toast.error(courseError)
      dispatch({type:"clearError"})
    }
    if(subscriptionId){
      const openPrpUp = () => {
        const options = {
          key,
          name:"CourseBuilder",
          description:"Get access to premium content",
          image:subscription,
          subscription_id:subscriptionId,
          callback_url:`${server}/paymentverification`,
          prefill:{
            name:user.name,
            email:user.email,
            contact:"", 
          },
          notes:{
            address:"By DarKnight"
          },
          theme:{
            color:"#FFC800"
          }
        }

        const razor = new window.Razorpay(options)
        razor.open()
      }
      openPrpUp()
    }
  },[dispatch, error, user.name, user.email, key, subscriptionId, courseError])


  return (
    <Container h="90vh" p={'16'}>
      <Heading children="Welcome" my={'8'} textAlign={'center'} />
      <VStack
        boxShadow={'lg'}
        alignItems={'stretch'}
        borderRadius={'lg'}
        spacing={'0'}
      >
        <Box bg="yellow.400" p="4" css={{ borderRadius: '8px 8px 0 0' }}>
          <Text color={'black'} children={`Dark Knight   -    ₹499.00`} />
        </Box>
        <Box p="4">
          <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
            <Text
              children={`Join Dark Knight and Get Access to all premium courses.`}
            />
            <Heading size={'md'} children="₹499.00 Only" />
          </VStack>
          <Button my={'8'} w="full" colorScheme="yellow" onClick={subscribeHandler} isLoading={loading}>
            Buy Now
          </Button>
        </Box>
        <Box bg={'blackAlpha.600'} p="4" css={{ borderRadius: '0 0 8px 8px' }}>
          <Heading
            children="100% refund at cancellation"
            color={'white'}
            textTransform={'uppercase'}
            size={'sm'}
          />
          <Text
            color={'white'}
            children={`*Terms and Conditions applied`}
            fontSize={'sm'}
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
