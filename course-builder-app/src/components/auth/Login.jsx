import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  // Link,
  VStack,
} from '@chakra-ui/react';
import {Link} from "react-router-dom"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/UserAction';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (
    <Container h={'95vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
        <Heading children={'Welcome to CourseBuilder'} />

        <form style={{ width: '100%' }} onSubmit={submitHandler}>
          <Box my={'4'}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              id="email"
              type="email"
              focusBorderColor="yellow.500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="password" children="Password" />
            <Input
              required
              id="password"
              type="password"
              focusBorderColor="yellow.500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </Box>
          <Box>
            <Link to='/forgetpassword'>
              <Button fontSize={"sm"} variant={"link"}>Forget Password</Button>
            </Link>
          </Box>
          <Button my="4" colorScheme='yellow' type='submit'>Login</Button>

          <Box my='4'>
            New User?{" "}<Link to='/register'>
              <Button colorScheme='yellow' variant={"link"}>Sign Up</Button>{" "}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Login;
