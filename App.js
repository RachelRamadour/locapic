import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);import React from 'react';
import HomeScreen from './screens/HomeScreen'
import MapScreen from './screens/MapScreen'
import ChatScreen from './screens/ChatScreen'
import POIScreen from './screens/POIScreen'
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import pseudo from './reducers/pseudo'
import POIList from './reducers/poiList'

const store = createStore(combineReducers({pseudo, POIList}));


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomNav() {
  return (
    <Tab.Navigator
    screenOptions={
      ({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;

        if (route.name == 'Carte') {
          iconName = 'ios-navigate';
        } else if (route.name == 'Chat') {
          iconName = 'ios-chatbubbles';
        } else if (route.name == 'Favoris') {
          iconName='location-outline'
        }

        return <Ionicons name={iconName} size={25} color={color} />;
      },
      })}

    tabBarOptions={{
      activeTintColor: '#eb4d4b',
      inactiveTintColor: '#FFFFFF',
      style: {
      backgroundColor: '#130f40',
      }
    }}>
    <Tab.Screen name="Carte" component={MapScreen} />
    <Tab.Screen name="Chat" component={ChatScreen} />
    <Tab.Screen name="Favoris" component={POIScreen} />
  </Tab.Navigator>
);
}

  

export default function App() {
  return (
  <Provider store={store}>

    <NavigationContainer>
   <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="BottomNav" component={BottomNav} />
  </Stack.Navigator>
  </NavigationContainer>
  </Provider>
 );
}


