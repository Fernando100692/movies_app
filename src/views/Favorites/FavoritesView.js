// Dependencies
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  Stack,
  ScrollView,
} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBoxOpen, faHeart} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

// Components
import {Layout} from '../../components';

// Helpers
import {sortByDate, onPressValidateFav, onCheckFav} from '../../helpers';

const FavoritesView = ({actions, favorites, navigation}) => {
  const [moviesData, setMoviesData] = useState(null);

  const {setFavorites} = actions;

  useEffect(() => {
    setMoviesData(favorites);
  }, [favorites]);

  const cardItem = (itm, idx) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigation.navigate('MovieDetails', itm)}
      key={idx}>
      <Box
        key={idx}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="0"
        shadow="4"
        mt="5"
        backgroundColor="white"
        width="full">
        <Box>
          <AspectRatio ratio={0.9} roundedBottomLeft="lg">
            <Image
              roundedBottom="2xl"
              source={{
                uri: `https://image.tmdb.org/t/p/w500${itm?.poster_path}`,
              }}
              alt={`image_${idx}`}
            />
          </AspectRatio>
          <TouchableWithoutFeedback
            activeOpacity={0.7}
            onPress={() => onPressValidateFav(itm, favorites, setFavorites)}>
            <Center
              bg={onCheckFav(itm, favorites) ? 'lightBlue.600' : 'gray.300'}
              rounded="full"
              shadow={onCheckFav(itm, favorites) ? '9' : '0'}
              position="absolute"
              bottom="-20"
              right="3"
              px="3"
              py="3">
              <FontAwesomeIcon icon={faHeart} color="white" size={20} />
            </Center>
          </TouchableWithoutFeedback>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {itm?.title}
            </Heading>
            <Text
              fontSize="xs"
              color="lightBlue.600"
              fontWeight="500"
              ml="-0.5"
              mt="-1">
              {moment(itm?.release_date).format('MMMM D, YYYY')}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </TouchableOpacity>
  );

  return (
    <Layout withScrollView contentContainerStyle={styles.contentContainerStyle}>
      {!moviesData || moviesData.length === 0 ? (
        <Box flex={1} justifyContent="center" alignItems="center" mt={5}>
          <FontAwesomeIcon icon={faBoxOpen} color="gray" size={50} />
          <Heading color="gray.400" fontSize="md" mt="2">
            No favorite items have been added
          </Heading>
        </Box>
      ) : (
        <Box backgroundColor="gray.50" flex={1}>
          <ScrollView _contentContainerStyle={{pb: '4', w: 'full', px: 4}}>
            <Heading color="black" size="md" mt="3">
              My Favorites
            </Heading>
            {moviesData &&
              sortByDate(moviesData, 'release_date')?.map((itm, idx) => {
                return cardItem(itm, idx);
              })}
          </ScrollView>
        </Box>
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
});

/**
 * Component properties.
 */
FavoritesView.propTypes = {
  loading: PropTypes.bool,
  favorites: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]).isRequired,
  actions: PropTypes.shape({
    setFavorites: PropTypes.func,
  }).isRequired,
};

export default FavoritesView;
