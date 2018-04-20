import React, { Component } from 'react';
import { StyleSheet, View, Text, PermissionsAndroid, Dimensions, StatusBar } from 'react-native';
import firebase from 'firebase';
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, Animated } from 'react-native-maps';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';
import { Header } from './src/components/common';
import LibraryList from './src/components/LibraryList';
import Search from './src/components/Search';

const styles = StyleSheet.create({
  container:
  {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 50,
    bottom: 0,
    right: 0,
    left: 0
  }
});

locationObject = { longitude: 67.14661980047822, latitude: 24.92065206134702, latitudeDelta: 0.042, longitudeDelta: 0.035 };
locationObject2 = {};

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA0Hbhk3k9EZQyciEKdXucr-VvwU0X5urs",
  authDomain: "techstack-8aa47.firebaseapp.com",
  databaseURL: "https://techstack-8aa47.firebaseio.com",
  projectId: "techstack-8aa47",
  storageBucket: "",
  messagingSenderId: "936625664763"
});

class App extends Component {
  state = { isMapReady: false, myLocation: locationObject };
  constructor(props) {
    super(props);
    this.tryMethod = this.tryMethod.bind(this);
    this.locationRef = this.getRef().child('location');
  }

  componentWillMount() {
    
    { this.getInitialState() }
  }

  componentDidMount() {
    //console.log('component did mount', this.state.myLocation);

  }

  getRef() {
    return firebaseApp.database().ref();
  }

  getInitialState() {
    navigator.geolocation.getCurrentPosition(
      (position) => this.setState({
        myLocation: { longitude: position.coords.longitude, latitude: position.coords.latitude, latitudeDelta: 0.042, longitudeDelta: 0.035 }
      }),
      (error) => console.log(error),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 0 }
    );

    return {
      region: new AnimatedRegion({
        longitude: this.state.myLocation.longitude,
        latitude: this.state.myLocation.latitude,
        latitudeDelta: this.state.myLocation.latitudeDelta,
        longitudeDelta: this.state.myLocation.longitudeDelta
      }),
    };
  }

  onRegionChange(region) {
    locationObject = { longitude: 90.026800, latitude: 24.917907, latitudeDelta: 0.042, longitudeDelta: 0.035 };
    //console.log(locationObject);

  }

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  }

  tryMethod(value) {
    console.log('selected place', value);
    this.setState({
      myLocation: { longitude: value.longitude, latitude: value.latitude, latitudeDelta: 0.042, longitudeDelta: 0.035 }
    });
    this.locationRef.push(value);

  }

  getNewRegion() {
    console.log('get new region');
    
  }

  onMarkerPress = (e) => {
    console.log(e);
  }

//-----------------------------------------
/*  onRegionComplete(region){
    console.log(region);
  }*/
//-----------------------------------------
/*componentDidMount(){
  this._map.animateToRegion(this.state.myLocation, 100);
}*/
//-----------------------------------------


  render() {
    console.log('region:', this.state.myLocation);
    const { myLocation } = this.state;
    return (
      <View style={styles.container}>
         <StatusBar 
            backgroundColor='blue'
            barStyle='light-content'
         />

         <MapView style={styles.map}
//---------------------------------------------------------
         //ref={component => {this._map = component;}}
         //onRegionChangeComplete={region => this.setState({ myLocation: region })}
//---------------------------------------------------------
          region={this.state.myLocation}
          //onRegionChangeComplete={this.onRegionChange()}
          showsUserLocation
          showsMyLocationButton
          onLayout={this.onMapLayout}
        >
        
        { this.state.isMapReady && 
          <MapView.Marker
            ref={marker => { this.marker = marker; }}
            coordinate={this.state.myLocation}
            pinColor="green"
            onPress={e => this.onMarkerPress(e.nativeEvent)}
          />
        }
        </MapView> 
        
        <Search try={this.tryMethod} />
      </View>
    );
  }
};

export default App;


/*
      

*/