// Dependencies
import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import {Box, Heading, Stack, HStack, Text, Progress} from 'native-base';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faStar,
  faCalendarCheck,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

// Components
import {Layout} from '../../components';

export const MovieDetailsView = ({route: {params}, navigation}) => {
  return (
    <Layout withScrollView contentContainerStyle={styles.contentContainerStyle}>
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w500${params?.poster_path}`,
        }}
        style={{flex: 1}}>
        <Box height="full" justifyContent="space-between">
          <Box
            paddingY="3"
            pl="3"
            bgColor="rgba(22, 22, 22, 0.5)"
            borderColor="none">
            <HStack space={6} alignItems="center">
              <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <FontAwesomeIcon icon={faArrowLeft} color="white" size={20} />
              </TouchableWithoutFeedback>
              <Text color="white" ml="-3" fontSize="16">
                Go back
              </Text>
            </HStack>
          </Box>

          <Box bgColor="rgba(22, 22, 22, 0.7)" borderColor="none">
            <Stack space={3} px="3" pt="2">
              <Heading fontSize="18" color="white" textAlign="left" mb="0">
                {params?.title}
              </Heading>
              <Text color="white">{params?.overview}</Text>
              <HStack space={6} alignItems="center">
                <FontAwesomeIcon icon={faStar} color="white" size={20} />
                <Text color="white" marginLeft="-5" marginRight="10">
                  {params?.popularity}
                </Text>
                <FontAwesomeIcon
                  icon={faCalendarCheck}
                  color="white"
                  size={20}
                />
                <Text marginLeft="-5" color="white">
                  {moment(params?.release_date).format('MMMM D, YYYY')}
                </Text>
              </HStack>
              <HStack space={6} alignItems="center">
                <Progress
                  width="5/6"
                  colorScheme="#0284c7"
                  value={params?.vote_average * 10}
                />
                <Text color="white" fontWeight="bold">
                  {params?.vote_average}/10
                </Text>
              </HStack>
            </Stack>
            <Text>Your Contents 2</Text>
          </Box>
        </Box>
      </ImageBackground>
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
});
