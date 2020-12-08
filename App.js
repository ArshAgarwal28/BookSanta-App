import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/welcomeScreen';
import { BottomTab } from './components/BottomTab';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { SideMenuContainer } from './components/SideMenuContainer';
import NotificationScreen from './screens/notificationScreen';

export default function App() {
	return (
		<View style={{ flex: 1 }}>
			<ScreenNavContainer />
		</View>
	);
}

const ScreenNav = createSwitchNavigator({
	LoginScreen: WelcomeScreen,
	Drawer: SideMenuContainer,
	Notis: NotificationScreen,
});

const ScreenNavContainer = createAppContainer(ScreenNav);
