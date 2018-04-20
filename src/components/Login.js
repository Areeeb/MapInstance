import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import LoginForm from './LoginForm';
import Spinner from './Spinner';
import Banner from './Banner';

export default class Login extends Component {
  state = { loggedIn: null };

  componentWillMount(){
    

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ loggedIn: true });
      }
      else{
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={styles.containerButton}>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => firebase.auth().signOut()}>
              <Text style={styles.buttonTextStyle}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={{ paddingBottom: 87 }}>
            <Spinner size="large" style={styles.buttonStyle} />
          </View>
        );

    }
  }

  render() {
    return (
      <View behavior="padding" style={styles.container}>
        <Banner />
        <View>
          {this.renderContent()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  },

  containerButton: {
      padding: 20
  },

  


  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#2980b9'
  },

  buttonTextStyle: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    opacity: 0.7,
    fontWeight: '700'
  },

});
