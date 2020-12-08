import * as React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import db from '../config';
import firebase from 'firebase';

export default class SwipeView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			all_notifications: this.props.all_notifications,
		};
		console.log(this.state.all_notifications);
	}

	// readNotifications = async () => {
	// 	console.log(this.state.emailId);
	// 	await db
	// 		.collection('all_notifications')
	// 		.where('notification_status', '==', 'unread')
	// 		.where('targetUserID', '==', this.state.emailId)
	// 		.get()
	// 		.then((snapshot) => {
	// 			var all_notifications = [];
	// 			snapshot.forEach((doc) => {
	// 				var notification = doc.data();
	// 				notification['doc_id'] = doc.id;
	// 				console.log(notification['doc_id']);
	// 				all_notifications.push(notification);
	// 			});

	// 			this.setState(
	// 				{
	// 					all_notifications: all_notifications,
	// 				},
	// 				() => {
	// 					console.log('Database Read');
	// 					console.log(this.state.message);
	// 				}
	// 			);
	// 		});
	// };

	updateMarkAsRead = (notification) => {
		db.collection('all_notifications').doc(notification.doc_id).update({
			notification_status: 'read',
		});
	};

	onSwipeValueChanged = (swipeData) => {
		var all_notifications = this.state.all_notifications;
		const { key, value } = swipeData;
		if (value < -Dimensions.get('window').width) {
			const newData = [...all_notifications];
			const prevIndex = all_notifications.findIndex((item) => item.key === key);
			this.updateMarkAsRead(all_notifications[prevIndex]);
			console.log(newData);
			newData.splice(prevIndex, 1);
			console.log(newData);
			this.setState({
				all_notifications: newData,
			});
		}
	};

	renderItem = (data) => {
		return (
			<ListItem
				leftElement={<Icon name='book' type='font-awesome' color='red' />}
				title={data.item.bookName}
				titleStyle={{ color: 'black', fontWeight: 'bold' }}
				subtitle={data.item.message}
				bottomDivider
			/>
		);
	};

	keyExtractor = (item, index) => {
		index.toString();
	};
	renderHiddenItem = () => {};

	render() {
		return (
			<View>
				<SwipeListView
					disableRightSwipe
					data={this.state.all_notifications}
					renderItem={() => {
						console.log('SHOWING');
						this.renderItem();
					}}
					keyExtractor={this.keyExtractor}
					rightOpenValue={-Dimensions.get('window').width}
					previewRowKey={'0'}
					previewOpenValue={-40}
					previewOpenDelay={3000}
					onSwipeValueChange={() => {
						this.onSwipeValueChanged();
					}}
				/>
			</View>
		);
	}
}
