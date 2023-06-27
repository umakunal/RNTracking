import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import ChooseLocation from '../Screens/ChooseLocation';

export default function AppRoutes() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}