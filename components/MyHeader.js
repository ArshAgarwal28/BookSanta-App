import * as React from 'react';
import { View } from 'react-native';
import { Header, Icon, Badge } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

export default class MyHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
		};
	}

	getNumberofUnreadNotifications = () => {
		db.collection('all_notifications')
			.where('notification_status', '==', 'unread')
			.onSnapshot((snapshot) => {
				var unread_notis = snapshot.docs.map((doc) => {
					doc.data();
				});
				this.setState({
					value: unread_notis.length,
				});
			});
	};

	componentDidMount() {
		this.getNumberofUnreadNotifications();
	}

	render() {
		return (
			<View>
				<Header
					leftComponent={
						<Icon
							name='bars'
							type='font-awesome'
							color='blue'
							onPress={() => {
								this.props.navigation.toggleDrawer();
							}}
						/>
					}
					centerComponent={{
						text: this.props.title,
						style: { color: 'white', fontSize: 20, fontWidth: 'bold' },
					}}
					rightComponent={
						<View style={{ marginLeft: 10 }}>
							<Icon
								name='bell'
								type='font-awesome'
								size={25}
								onPress={() => {
									this.props.navigation.navigate('Notis');
								}}
							/>

							<Badge
								value={this.state.value}
								status='error'
								containerStyle={{ position: 'absolute', top: -5, right: -5 }}
							/>
						</View>
					}
				/>
			</View>
		);
	}
}
