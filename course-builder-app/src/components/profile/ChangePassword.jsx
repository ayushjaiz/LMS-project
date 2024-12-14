import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/ProfileAction';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const submitHandler = e => {
      e.preventDefault();
      dispatch(changePassword(oldPassword, newPassword));
    };
    const {loading, message, error} = useSelector(state => state.profile)
    useEffect(() => {
      if(error){
        toast.error(error)
        dispatch({type:"clearError"})
      }
      if(message){
        toast.success(message)
        dispatch({type:"clearMessage"})
        navigate('/profile')
      }
    }, [dispatch, error, message, navigate])
  return (
    <Container py={'16'} minH={'90vh'}>
        <form onSubmit={submitHandler}>
            <Heading textTransform={"uppercase"} children="Change Password" my={'16'} textAlign={['center','left']} />
            <VStack spacing={'8'}>
            <Input
              required
              type="password"
              focusBorderColor="yellow.500"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              placeholder=" Old Password"
            />
            <Input
              required
              type="password"
              focusBorderColor="yellow.500"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder=" New Password"
            />

            <Button isLoading={loading} w='full' colorScheme='yellow' type='submit'>Change</Button>
            </VStack>
        </form>
    </Container>
  )
}

export default ChangePassword