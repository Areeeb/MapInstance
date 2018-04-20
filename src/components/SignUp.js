import React, { Component } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import firebase from 'firebase';
import Banner from './Banner';
import InputText from './InputText';
import Spinner from './Spinner';

export default class SignUp extends Component{
    state = { loading: false, passwordDonotMatch: '', firstName: '', lastName: '', username: '', password: '', confirmPassword: '', signUpFailed: '' };
    

    onButtonPress() {
        const { firstName, lastName, username, password, confirmPassword } = this.state;
        this.setState({ loading: true, passwordDonotMatch: '', signUpFailed: '' });

        if(firstName == '' || lastName == '' || username == '' || password == ''){
            this.setState({ passwordDonotMatch: 'Required fields are not filled', loading: false })
        }

        else if(password.length <= 5){
            this.setState({ passwordDonotMatch: 'Password should be more than 5 characters!', loading: false });
        }

        else if(password != confirmPassword){
            this.setState({ passwordDonotMatch: 'Passwords Do Not Match', loading: false });
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(username, password)
            .then(() => {
                this.setState({ signUpFailed: 'Successfull', loading: false })
            })
            .catch((error) => {
                this.setState({ loading: 'error' } )
            });
        }
    }

    renderButton() {
        if(this.state.loading){
            return <Spinner size="small" />;
        }
        else{
            return(
                <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10}}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.onButtonPress.bind(this)} >
                        <Text style={styles.buttonTextStyle}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    render() {
        return (
            <ScrollView behavior="padding" style={styles.container}>
                <Banner />
                <InputText 
                    placeholder="First name"
                    value={this.state.firstName} 
                    onChangeText={firstName => this.setState({ firstName })} 
                />
                <InputText 
                    placeholder="Last name"
                    value={this.state.lastName} 
                    onChangeText={lastName => this.setState({ lastName })} 
                />
                <InputText 
                    placeholder="Email" 
                    value={this.state.username} 
                    onChangeText={username => this.setState({ username })} 
                />
                <InputText 
                    placeholder="password" 
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })} 
                    secureTextEntry
                />
                <InputText 
                    placeholder="Confirm Password" 
                    value={this.state.confirmPassword}
                    onChangeText={confirmPassword => this.setState({ confirmPassword })}
                    secureTextEntry
                />
                <Text style={styles.errorTextStyle}>{this.state.passwordDonotMatch}</Text>

                {this.renderButton()}

                <Text style={styles.errorTextStyle}> {this.state.signUpFailed} </Text>

            </ScrollView>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#3498db'
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
    
};