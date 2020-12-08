import * as React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { BottomTab } from './BottomTab';
import SideBarMenu from './SideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import { MyHeader } from './MyHeader';

export const SideMenuContainer = createDrawerNavigator(
	{
		Home: { screen: BottomTab },
		Settings: { screen: SettingScreen },
	},
	{ contentComponent: SideBarMenu },
	{ initialRouteName: 'Home' }
);

//Component for the screens of side bar menu
