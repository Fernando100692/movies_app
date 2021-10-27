// Dependencies
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

// Components
import {MovieDetailsView} from '../../views';
import Login from '../../views/Login';
import {DashboardTapNavigator} from '../../components';

const Stack = createStackNavigator();

export const AppContainer = () => {
  const screenNavigatorOptions = {
    gestureEnabled: true,
    headerStyle: {height: 0},
    headerTitle: '',
    headerBackTitleVisible: false,
    headerLeft: '',
    cardShadowEnabled: true,
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenNavigatorOptions}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home">
            {props => <DashboardTapNavigator {...props} />}
          </Stack.Screen>
          <Stack.Screen
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forFadeFromBottomAndroid,
            }}
            name="MovieDetails"
            component={MovieDetailsView}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
