import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class ReceiverDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: firebase.auth().currentUser.email, //Donor Email ID
			username: '',
			receiverId: this.props.navigation.getParam('details')['userId'], //Requester Email ID
			requestId: this.props.navigation.getParam('details')['request_id'],
			bookName: this.props.navigation.getParam('details')['bookName'],
			bookReason: this.props.navigation.getParam('details')['bookReason'],
			receiverName: '',
			receiverAddress: '',
			receiverRequestDocid: '',
		};
	}

	componentDidMount() {
		this.getReceiverdetails();
	}

	getReceiverdetails = async () => [
		await db
			.collection('users')
			.where('emailId', '==', this.state.receiverId)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					console.log();
					this.setState({
						receiverName: doc.data().firstName,
						receiverAddress: doc.data().address,
					});
				});
			}),

		await db
			.collection('users')
			.where('emailId', '==', this.state.userId)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					this.setState({
						username: doc.data().firstName,
					});
				});
			}),

		await db
			.collection('requested_books')
			.where('request_id', '==', this.state.requestId)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					this.setState({
						receiverRequestDocid: doc.id,
					});
				});
			}),
	];

	addNotification = () => {
		var message = this.state.username + ' has shown interest in donating your requested book.';
		db.collection('all_notifications').add({
			targetUserID: this.state.receiverId,
			donorID: this.state.userId,
			requestId: this.state.requestId,
			bookName: this.state.bookName,
			date: firebase.firestore.FieldValue.serverTimestamp(),
			notification_status: 'unread',
			message: message,
		});
	};

	render() {
		return (
			<View>
				<Card title={'Book Information'} titleStyle={{ fontSize: 20 }}>
					<Card>
						<Text style={{ fontWeight: 'bold' }}>Name: {this.state.bookName}</Text>
					</Card>

					<Card>
						<Text style={{ fontWeight: 'bold' }}>Reason: {this.state.bookReason}</Text>
					</Card>
				</Card>

				<View style={{ flex: 0.3 }}>
					<Card title={'Receiver Information'} titleStyle={{ fontSize: 20 }}>
						<Card>
							<Text style={{ fontWeight: 'bold' }}>Name: {this.state.receiverName}</Text>
						</Card>

						<Card>
							<Text style={{ fontWeight: 'bold' }}>Address: {this.state.receiverAddress}</Text>
						</Card>
					</Card>
				</View>

				<View>
					{this.state.receiverId !== this.state.userId ? (
						<TouchableOpacity
							onPress={() => {
								this.addNotification();
								this.props.navigation.navigate('MyDonation');
							}}>
							<Text>Confirm</Text>
						</TouchableOpacity> //Confirm Donation from Donor
					) : null}
				</View>
			</View>
		);
	}
}
