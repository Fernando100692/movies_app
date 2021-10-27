import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGrinHearts, faFilm} from '@fortawesome/free-solid-svg-icons';
import Home from '../../views/Home';
import Favorites from '../../views/Favorites';

const Tab = createBottomTabNavigator();

export const DashboardTapNavigator = ({route}) => {
  const sizeIcon = 25;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#0888D1',
        tabBarActiveBackgroundColor: '#fff',
        tabBarInactiveTintColor: '#9A9A9A',
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarStyle: {height: 60, paddingBottom: 5},
        headerTitle: '',
        headerStatusBarHeight: -60,
      }}>
      <Tab.Screen
        name={'Movies'}
        options={{
          tabBarLabel: dashboardStrings.vote,
          tabBarIcon: ({focused}) => {
            let iconName;
            let iconColor;
            iconName = faFilm;
            iconColor = focused ? '#0888D1' : '#9A9A9A';

            return (
              <FontAwesomeIcon
                icon={iconName}
                color={iconColor}
                size={sizeIcon}
              />
            );
          },
        }}
        component={Home}
      />
      <Tab.Screen
        name={'Favorites'}
        options={{
          tabBarLabel: dashboardStrings.favorites,
          tabBarIcon: ({focused}) => {
            let iconName;
            let iconColor;
            iconName = faGrinHearts;
            iconColor = focused ? '#0888D1' : '#9A9A9A';

            return (
              <FontAwesomeIcon
                icon={iconName}
                color={iconColor}
                size={sizeIcon}
              />
            );
          },
        }}
        component={Favorites}
      />
    </Tab.Navigator>
  );
};

const dashboardStrings = {
  movies: 'Movies List',
  favorites: 'My Favorites',
};
