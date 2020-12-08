import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class RequestScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			userId: firebase.auth().currentUser.email,
			bookName: '',
			bookReason: '',
		};
	}

	createUniqueID() {
		return Math.random().toString(36).substring(7);
	}

	addRequest = () => {
		var userId = this.state.userId;
		var randomRequestId = this.createUniqueID();

		db.collection('requested_books').add({
			bookName: this.state.bookName,
			userId: this.state.userId,
			request_id: randomRequestId,
			bookReason: this.state.bookReason,
		});
	};

	render() {
		return (
			<View>
				<MyHeader navigation={this.props.navigation} />

				<TextInput
					placeholder='Book Name...'
					style={styles.inputForm}
					onChangeText={(text) => {
						this.setState({
							bookName: text,
						});
					}}
					value={this.state.bookName}
				/>

				<TextInput
					placeholder='Reason for your book...'
					style={styles.inputForm}
					onChangeText={(text) => {
						this.setState({
							bookReason: text,
						});
					}}
					multiline
					value={this.state.bookReason}
				/>

				<TouchableOpacity
					style={styles.submitButton}
					onPress={() => {
						this.addRequest();
					}}>
					<Text>Submit</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputForm: {
		borderWidth: 2,
		alignSelf: 'center',
		textAlign: 'center',
		margin: 5,
		width: 250,
		height: 35,
	},

	submitButton: {
		borderWidth: 2,
		backgroundColor: 'aqua',
		marginTop: 10,
		padding: 5,
		alignSelf: 'center',
		alignItems: 'center',
		width: 75,
		// marginLeft: 35,
	},
});
