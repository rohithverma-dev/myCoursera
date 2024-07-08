import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions/user';
import toast from 'react-hot-toast';


const Login = () => {
  const { loading, message, error } = useSelector(state => state.profile);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const submitHandler = e => {
    console.log("form submitted successfully");
    e.preventDefault();
    dispatch(login(email, password));

  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  return (
    <Container h={'95vh'}>
      <VStack h={'full'} justifyContent="center" spacing={'16'}>
        <Heading children={'Welcome to CourseBundler'} />

        <form                               // HTML form / not chakra 
        onSubmit={submitHandler}       
        style={{ width: '100%' }}>    
          <Box my={'4'}>
            <FormLabel                       //  chakra Ui  
            htmlFor="email"                 
            children="Email Address" />   
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type={'email'}
              focusBorderColor="yellow.500"
            />
          </Box>

          <Box my={'4'}>
            <FormLabel htmlFor="password" children="Password" />
            <Input
              required
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              type={'password'}
              focusBorderColor="yellow.500"
            />
          </Box>

          <Box>
            <Link to="/forgetpassword">
              <Button fontSize={'sm'} variant="link">
                Forget Password?
              </Button>
            </Link>
          </Box>

          <Button my="4" colorScheme={'yellow'} type="submit">
            Login
          </Button>

          
          <Box my="4">
            New User? 
            <Link to="/register">{" "}
              <Button colorScheme={'yellow'} variant="link">
                Sign Up
              </Button>{" "}
              here
            </Link>
          </Box>
        
        </form>
      </VStack>
    </Container>
  );
};

export default Login;
