import * as React from 'react';
import { Icon, ListItem } from 'react-native-elements';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import SwipeView from '../components/SwipableFlatList';

export default class NotificationScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			emailId: firebase.auth().currentUser.email,
			message: [],
			all_notifications: [],
		};
	}

	// readNotifications = async () => {
	// 	console.log(this.state.emailId);
	// 	await db
	// 		.collection('all_notifications')
	// 		.where('notification_status', '==', 'unread')
	// 		.where('targetUserID', '==', this.state.emailId)
	// 		.onSnapshot((snapshot) => {
	// 			var all_notifications = [];
	// 			snapshot.docs.map((doc) => {
	// 				var notification = doc.data();
	// 				notification['doc_id'] = doc.id;
	// 				all_notifications.push(notification);
	// 			});

	// 			this.setState(
	// 				{
	// 					message: all_notifications,
	// 				},
	// 				() => {
	// 					console.log('Database Read');
	// 				}
	// 			);
	// 		});
	// };

	readNotifications = async () => {
		console.log(this.state.emailId);
		await db
			.collection('all_notifications')
			.where('notification_status', '==', 'unread')
			.where('targetUserID', '==', this.state.emailId)
			.get()
			.then((snapshot) => {
				var all_notifications = [];
				snapshot.forEach((doc) => {
					var notification = doc.data();
					notification['doc_id'] = doc.id;
					console.log(notification['doc_id']);
					all_notifications.push(notification);
				});

				this.setState(
					{
						message: all_notifications,
					},
					() => {
						console.log('Database Read');
						console.log(this.state.message);
					}
				);
			});
	};

	componentDidMount() {
		this.readNotifications();
	}

	render() {
		return (
			<View style={{ marginTop: 100 }}>
				<SwipeView all_notifications={this.state.message} />
			</View>
		);
	}
}
