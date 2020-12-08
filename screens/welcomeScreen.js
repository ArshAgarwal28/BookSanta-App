import * as React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import Santa from '../components/Santa';
import { ceil } from 'react-native-reanimated';

export default class WelcomeScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			emailId: '',
			password: '',
			confirmPassword: '',
			isModalVisible: false,
			firstName: '',
			lastName: '',
			address: '',
		};
	}

	signIn = async () => {
		var response = await firebase.auth().signInWithEmailAndPassword(this.state.emailId, this.state.password);
		if (response) {
			this.setState({
				isModalVisible: false,
			});
			// alert('Sign in sucessful!');
			this.props.navigation.navigate('Drawer');
		} else {
			alert('Wrong password or Email ID!');
		}
	};

	showModal = () => {
		return (
			<View>
				<Modal animationType='fade' transparent={false} visible={this.state.isModalVisible}>
					<TextInput
						placeholder='First Name...'
						style={styles.inputForm}
						onChangeText={(text) => {
							this.setState({
								firstName: text,
							});
						}}
						value={this.state.firstName}
					/>

					<TextInput
						placeholder='Last Name...'
						style={styles.inputForm}
						onChangeText={(text) => {
							this.setState({
								lastName: text,
							});
						}}
						value={this.state.lastName}
					/>

					<TextInput
						placeholder='Address...'
						style={styles.inputForm}
						onChangeText={(text) => {
							this.setState({
								address: text,
							});
						}}
						value={this.state.address}
					/>

					<TextInput
						placeholder='Email ID...'
						style={styles.inputForm}
						onChangeText={(text) => {
							this.setState({
								emailId: text,
							});
						}}
						value={this.state.emailId}
					/>

					<TextInput
						secureTextEntry={true}
						placeholder='Password...'
						style={styles.inputForm}
						onChangeText={(text) => {
							this.setState({
								password: text,
							});
						}}
						value={this.state.password}
					/>

					<TextInput
						secureTextEntry={true}
						placeholder='Confirm Password...'
						style={styles.inputForm}
						onChangeText={(text) => {
							this.setState({
								confirmPassword: text,
							});
						}}
						value={this.state.confirmPassword}
					/>
					<TouchableOpacity
						style={styles.submitButton}
						onPress={() => {
							this.signUp();
						}}>
						<Text>Submit</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.submitButton}
						onPress={() => {
							this.setState({
								isModalVisible: 'false',
							});
						}}>
						<Text>Cancel</Text>
					</TouchableOpacity>
				</Modal>
			</View>
		);
	};

	signUp = async () => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(this.state.emailId, this.state.password)
			.then(() => {
				this.signIn();
			});
		db.collection('users').add({
			emailId: this.state.emailId,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			address: this.state.address,
		});
	};

	render() {
		return (
			<View style={{ marginTop: 200, paddingTop: 45 }}>
				{/* <Santa /> */}
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>{this.showModal()}</View>
				<TextInput
					style={styles.inputStyle}
					onChangeText={(text) => {
						this.setState({
							emailId: text,
						});
					}}
					value={this.state.emailId}
					placeholder='Email ID...'
				/>

				<TextInput
					style={styles.inputStyle}
					onChangeText={(text) => {
						this.setState({
							password: text,
						});
					}}
					value={this.state.password}
					secureTextEntry={true}
					placeholder='Password...'
				/>

				<View style={styles.buttonRow}>
					<TouchableOpacity
						style={[styles.submitButton, { marginRight: 10 }]}
						onPress={() => {
							this.signIn();
						}}>
						<Text>Login</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.submitButton, { marginLeft: 10 }]}
						onPress={() => {
							this.setState({
								isModalVisible: true,
							});
						}}>
						<Text>Sign Up</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputStyle: {
		borderWidth: 2,
		alignSelf: 'center',
		textAlign: 'center',
		margin: 5,
		width: 250,
		height: 35,
	},
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
	buttonRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	modalContainer: {
		flex: 1,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'violet',
		marginRight: 30,
		marginLeft: 30,
		marginTop: 80,
		marginBottom: 80,
	},
});
