import * as React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import DonateScreen from '../screens/donateScreen';
import ReceiverDetails from '../screens/receiverDetailScreen';

export const AppStackNavigator = createStackNavigator(
	{
		BookDonateList: {
			screen: DonateScreen,
		},
		ReceiverDetails: {
			screen: ReceiverDetails,
		},
	},
	{ initialRouteName: 'BookDonateList' }
);

//Component to overlap details of the requestee
