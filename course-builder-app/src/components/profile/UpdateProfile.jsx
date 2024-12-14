import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/ProfileAction';
import { getMyProfile } from '../../redux/actions/UserAction';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = ({ user }) => {
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.profile);

  const submitHandler = async e => {
    e.preventDefault();
    await dispatch(updateProfile(name, email));
    dispatch(getMyProfile());
    navigate('/profile')
  };
  return (
    <Container py={'16'} minH={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          textTransform={'uppercase'}
          children="Update Profile"
          my={'16'}
          textAlign={['center', 'left']}
        />
        <VStack spacing={'8'}>
          <Input
            type="text"
            focusBorderColor="yellow.500"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
          />
          <Input
            type="email"
            focusBorderColor="yellow.500"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
          />

          <Button
            w="full"
            colorScheme="yellow"
            type="submit"
            isLoading={loading}
          >
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
