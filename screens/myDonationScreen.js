        import * as React from 'react';
        import { View, TouchableOpacity, Text, TextInput } from 'react-native';
        import firebase from 'firebase';
        import db from '../config';

        export default class MyDonation extends React.Component {
        constructor() {
        super();
        this.state = {
            donorId: firebase.auth().currentUser.email,
            donorName: '',
            allDonations: [],
        };
        this.requestRef = null;
        }
        sendBook = (bookDetails) => {
        if (bookDetails.request_status === 'bookSend') {
            var request_status = 'donor_interested';
            db.collection('all_donations').doc(bookDetails.doc_id).update({
                request_status = "donor_interested"
            })
            this.sendNotification(bookDetails, request_status)
        } else {
            var request_status = 'bookSend';
            db.collection('all_donation').doc(bookDetails.doc_id).update({
                request_status: 'bookSend'
            })
        }
        };

        sendNotification = (bookDetails, request_status) => {
        var request_id = bookDetails.request_id;
        var donor_id = bookDetails.donorId;
        db.collection('all_notifications').where('requestId', '==', request_id).where('donorId', '==', donor_id).get().then((snapshot) => {
            snapshot.forEach((doc)=>{
                var message = '';
                if (request_status === 'bookSend') {
                    message = this.state.donorName + ' sent you a book'
                } else {
                    message = this.state.donorName + ' has shown interest in donation'
                }
                db.collection('all_notifications').doc(doc.id).update({
                    message: message,
                    notification_status: 'unread',
                    date: firebase.firestore.FieldValue.serverTimestamp()
                })
            })
        })
        }


        render() {
        return (
            <View>
                <Text>Donation Screen</Text>
            </View>
        );
        }
        }
