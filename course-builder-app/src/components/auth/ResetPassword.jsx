import { Container, Heading, VStack, Input, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams} from "react-router-dom"
import { resetPassword } from '../../redux/actions/ProfileAction';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const params = useParams()
    const {loading, message, error} = useSelector(state=>state.profile)

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(resetPassword( params.token, password))

    }

    useEffect(() => {
      if(error){
        toast.error(error)
        dispatch({type:"clearError"})
        
      }
      if(message){
        toast.success(message)
        dispatch({type:"clearMessage"})
        navigate('/login')
      }
    },[dispatch, error, message, navigate])
  return (
    <Container py={'19'} h={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          children="Reset Password"
          my="16"
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />

        <VStack spacing={'6'}>
        <Input
              required
              type="password"
              focusBorderColor="yellow.500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="New password"
            />

            <Button type='submit' w={'full'} colorScheme='yellow' isLoading={loading}>Reset Password</Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
