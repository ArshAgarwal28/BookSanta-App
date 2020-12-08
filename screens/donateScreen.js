import * as React from 'react';
import { ListItem } from 'react-native-elements';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import db from '../config';
import firebase from 'firebase';

import { AppStackNavigator } from '../components/AppStackNavigator';

import MyHeader from '../components/MyHeader';

export default class DonateScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			books: [],
		};
	}

	componentDidMount() {
		db.collection('requested_books').onSnapshot((snapshot) => {
			var requestedBookList = snapshot.docs.map((document) => document.data());
			this.setState({
				books: requestedBookList,
			});
			console.log(requestedBookList);
		});
	}

	renderItem = ({ item, i }) => {
		return (
			<ListItem
				key={i}
				title={item.bookName}
				subtitle={item.bookReason}
				titleStyle={{ color: 'black', fontWeight: 'bold' }}
				rightElement={
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate('ReceiverDetails', { details: item });
						}}>
						<Text> View </Text>
					</TouchableOpacity>
				}
				bottomDivider></ListItem>
		);
	};

	render() {
		return (
			<View>
				<MyHeader navigation={this.props.navigation} />
				<FlatList data={this.state.books} renderItem={this.renderItem} keyExtractor={this.keyExtractor} />
			</View>
		);
	}
}
