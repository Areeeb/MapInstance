import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, Keyboard } from 'react-native';
import { List, ListItem, Left, Body, Content } from 'native-base';
import RNGooglePlaces from 'react-native-google-places';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class SearchBarExample extends Component {
    state = { predictionArray: [] }
    
    predictArray = [];
    EmptyObject = {};

    onChange() {
        if(this.props.change){
            this.props.change = false;
            {this.reRender()}
        }
    }

    

    reRender() {
        this.predictArray = {};
        for(var i=0; i< this.props.predict.length; i++){
            this.predictArray[i] = { 
                primaryText: this.props.predict[i].primaryText, 
                secondaryText: this.props.predict[i].secondaryText, 
                placeID: this.props.predict[i].placeID 
            };
        }
        //console.log('prediction array recieved ', this.predictArray);
    }

    getSelectedAddress(placeID) {

        RNGooglePlaces.lookUpPlaceByID(placeID)
        .then((results) => 
        {
            {this.props.try(results)}
            
            {this.props.predictPredictions(this.EmptyObject)}
        })
        .catch((error) => console.log(error.message));

        
    }

    render() {
        {this.reRender()};
        return (
            
            <View style={styles2.searchResultWrapper}>
                    <List
                        dataArray={this.predictArray}
                        renderRow={(item) =>
                            <View>

                                <ListItem onPress={() => this.getSelectedAddress(item.placeID)} button avatar>
                                    <Left style={styles2.leftContainer}>
                                        <Icon name="location-on" style={styles2.leftIcon} />
                                    </Left>
                                    <Body>
                                        <Text style={styles2.primaryText}>{item.primaryText}</Text>
                                        <Text style={styles2.secondaryText}>{item.secondaryText}</Text>
                                    </Body>
                                </ListItem>
                            </View>
                        }
                    />

            </View>



        );
    }
}


const styles2 = {
    searchResultWrapper: {
        top: 53,
        position: "absolute",
        width: Dimensions.get("window").width,
        height: 1000,
        backgroundColor: '#fff',
        opacity: 0.9
    },
    primaryText: {
        fontWeight: 'bold',
        color: '#373737'
    },
    secondaryText: {
        fontWeight: 'normal',
        color: '#7D7D7D'
    },
    leftContainer: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        borderLeftColor: '#7D7D7D'
    },
    leftIcon: {
        fontSize: 20,
        color: '#7D7D7D'
    },
    distance: {
        fontSize: 12
    }
};

/*

*/