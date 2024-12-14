import { Container, Heading, VStack, Input, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/ProfileAction';
import { toast } from 'react-hot-toast';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');

    const {loading, message, error} = useSelector(state=>state.profile)

    const dispatch = useDispatch()
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(forgetPassword(email))

    }

    useEffect(() => {
      if(error){
        toast.error(error)
        dispatch({type:"clearError"})
      }
      if(message){
        toast.success(message)
        dispatch({type:"clearMessage"})
      }
    },[dispatch, error, message])
  return (
    <Container py={'19'} h={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          children="Forget Password"
          my="16"
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />

        <VStack spacing={'6'}>
        <Input
              required
              type="email"
              focusBorderColor="yellow.500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
            />

            <Button type='submit' w={'full'} colorScheme='yellow' isLoading={loading}>Send Reset Link</Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
