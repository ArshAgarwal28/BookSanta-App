import * as React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import RequestScreen from '../screens/requestScreen';
import { AppStackNavigator } from '../components/AppStackNavigator';

export const BottomTab = createBottomTabNavigator({
	Request: RequestScreen,
	Donate: AppStackNavigator,
});
