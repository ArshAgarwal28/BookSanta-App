import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';

export default class SideBarMenu extends React.Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<DrawerItems {...this.props} />
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate('LoginScreen');
						firebase.auth().signOut();
					}}>
					<Text> Log Out </Text>
				</TouchableOpacity>
			</View>
		);
	}
}

//Component for SideBarMenu
