import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar } from 'react-native';
import firebase from 'firebase';
import Spinner from './Spinner';

export default class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <TouchableOpacity style={styles.buttonStyle} onPress={this.onButtonPress.bind(this)}>
        <Text style={styles.buttonTextStyle}>LOGIN</Text>
      </TouchableOpacity>
    );
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          //translucent
          //hidden
        />
        <TextInput
          placeholder="username or email"
          placeholderTextColor="rgba(255,255,255,0.5)"
          style={styles.textInputStyle}
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          underlineColorAndroid='transparent'
          autoCorrect={false}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          placeholder="password"
          placeholderTextColor="rgba(255,255,255,0.5)"
          secureTextEntry
          ref={(input) => this.passwordInput = input}
          returnKeyType="go"
          underlineColorAndroid='transparent'
          style={styles.textInputStyle}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          tintColor={'blue'}
        />

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        {this.renderButton()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      padding: 20
  },

  textInputStyle: {
    height: 40,
    fontSize: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff'
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

  errorTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center'
  }
});
