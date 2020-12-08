import * as React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

export default class Santa extends React.Component {
	render() {
		return (
			<LottieView
				source={require('../assets/10342-santa-claus-christmas.json')}
				style={{ width: '45%' }}
				autoplay
				loop
			/>
		);
	}
}
