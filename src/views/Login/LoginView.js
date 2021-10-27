// Dependencies
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Spinner,
  StatusBar,
} from 'native-base';

// Components
import {Layout} from '../../components';
import Storage from '../../config/Storage';

const LoginView = ({navigation, actions}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {setFavorites} = actions;

  useEffect(() => {
    const onGetUserInfo = async () => {
      const userInfo = await Storage.getUserInfo();
      const favoritesInfo = await Storage.getFavorites();

      if (favoritesInfo) {
        setFavorites(favoritesInfo);
      }

      if (userInfo) {
        navigation.navigate('Home');
      } else {
        setIsLoading(false);
      }
    };
    onGetUserInfo();
  }, [navigation, setFavorites]);

  const onLogin = async () => {
    await Storage.setUserInfo({email, password});
    navigation.navigate('Home');
  };

  const handleChangeEmail = value => setEmail(value);
  const handleChangePassword = value => setPassword(value);

  const validation = !email || !password;
  return (
    <Layout
      withInputScrollView
      contentContainerStyle={styles.contentContainerStyle}>
      {isLoading ? (
        <Box flex={1} justifyContent="center" alignItems="center" mt={5}>
          <Spinner color="lightBlue.600" size="large" />
          <Heading color="lightBlue.600" fontSize="md" mt="2">
            Loading...
          </Heading>
        </Box>
      ) : (
        <>
          <StatusBar backgroundColor="#0284c7" barStyle="light-content" />
          <Box
            safeArea
            flex={1}
            px="10"
            py="30"
            w="100%"
            mx="auto"
            backgroundColor="white">
            <Heading size="lg" fontWeight="600" color="coolGray.800">
              Movies App
            </Heading>
            <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
              Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label _text={styles.inputLabelStyle}>
                  Username
                </FormControl.Label>
                <Input onChangeText={handleChangeEmail} />
              </FormControl>
              <FormControl>
                <FormControl.Label _text={styles.inputLabelStyle}>
                  Password
                </FormControl.Label>
                <Input
                  value={password}
                  onChangeText={handleChangePassword}
                  type="password"
                />
                <Link
                  _text={styles.rememberLinkStyle}
                  alignSelf="flex-end"
                  mt="1">
                  I forgot my password
                </Link>
              </FormControl>
              <Button
                disabled={validation}
                opacity={validation ? 0.5 : 1}
                onPress={() => onLogin()}
                mt="2"
                colorScheme="lightBlue"
                _text={{color: 'white'}}>
                Sign in
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text fontSize="sm" color="muted.700" fontWeight={400}>
                  I'm a new user.{' '}
                </Text>
                <Link _text={styles.registerLinkStyle} href="#">
                  Sign up
                </Link>
              </HStack>
            </VStack>
          </Box>
        </>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputLabelStyle: {
    color: 'coolGray.800',
    fontSize: 'xs',
    fontWeight: 500,
  },
  rememberLinkStyle: {
    fontSize: 'xs',
    fontWeight: '500',
    color: 'lightBlue.600',
  },
  registerLinkStyle: {
    color: 'lightBlue.600',
    fontWeight: 'medium',
    fontSize: 'sm',
  },
});

/**
 * Component properties.
 */
LoginView.propTypes = {
  actions: PropTypes.shape({
    setFavorites: PropTypes.func,
  }).isRequired,
};

export default LoginView;
