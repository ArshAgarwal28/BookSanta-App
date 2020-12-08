import * as React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class SettingScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			firstName: '',
			lastName: '',
			emailId: '',
			password: '',
			address: '',
			docId: '',
		};
	}

	getUserDetails = async () => {
		var user = firebase.auth().currentUser;
		var email = user.email;
		await db
			.collection('users')
			.where('emailId', '==', email)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					var data = doc.data();
					this.setState(
						{
							emailId: data.emailId,
							firstName: data.firstName,
							lastName: data.lastName,
							address: data.address,
							password: data.password,
							docId: doc.id,
						},
						() => {
							console.log(this.state.emailId);
						}
					);
				});
			});
	};

	updateDetails = async () => {
		var user = firebase.auth().currentUser;

		db.collection('users')
			.doc(this.state.docId)
			.update({
				emailId: this.state.emailId,
				password: this.state.password,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				address: this.state.address,
			})
			.then(() => {
				user.updateEmail(this.state.emailId);
			});
	};
	componentDidMount() {
		this.getUserDetails();
	}

	render() {
		return (
			<View>
				<TextInput
					style={styles.formInput}
					onChangeText={(text) => {
						this.setState({
							emailId: text,
						});
					}}
					value={this.state.emailId}
				/>

				<TextInput
					style={styles.formInput}
					onChangeText={(text) => {
						this.setState({
							password: text,
						});
					}}
					value={this.state.password}
				/>

				<TextInput
					style={styles.formInput}
					onChangeText={(text) => {
						this.setState({
							address: text,
						});
					}}
					value={this.state.address}
				/>

				<TextInput
					style={styles.formInput}
					onChangeText={(text) => {
						this.setState({
							firstName: text,
						});
					}}
					value={this.state.firstName}
				/>

				<TextInput
					style={styles.formInput}
					onChangeText={(text) => {
						this.setState({
							lastName: text,
						});
					}}
					value={this.state.lastName}
				/>

				<TouchableOpacity
					style={styles.formButton}
					onPress={() => {
						this.updateDetails();
					}}>
					<Text>Update</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	formInput: {
		borderWidth: 2,
		padding: 10,
		margin: 5,
		alignSelf: 'center',
		alignContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
	},

	formButton: {
		borderWidth: 2,
		padding: 7,
		backgroundColor: 'aqua',
		alignItems: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		marginTop: 2,
	},
});
