import React, { Component } from 'react';
import { TextInput, View, Dimensions, Keyboard } from 'react-native';
import { Container, Header, InputGroup, Text, Input, Icon, Button } from 'native-base';
import RNGooglePlaces from 'react-native-google-places';
import SearchList from './SearchList';

export default class SearchBarExample extends Component {
    
    constructor(props){
        super(props);
    }
    ListRender = true;

    state = { 
        value: '' , 
        hasValue: false,
        predictions: {}
    }

    componentWillMount() {
        console.log('component will mount');
        this.setState({ hasValue: false });
    }

    componentDidMount() {
        console.log('component did mount');
        this.setState({ hasValue: false });
    }

/*
  componentWillReceiveProps(nextProps) {
    this.setState({ hasValue: nextProps.list });
  }
*/
    getAddressPredictions(value) {
        RNGooglePlaces.getAutocompletePredictions(value,
            {
                country: "PK"
            }
        )
            .then((results) => {
                //console.log('predictions from google places ', results);
                this.setState({ value: value, hasValue: true, predictions: results })
            })
            .catch((error) => console.log(error.message));
    }


    handleInput(val) {
        //console.log('input value', val);
        this.getAddressPredictions(val);
        this.setState({ value: this.state.value, hasValue: this.state.hasValue, predictions: this.state.predictions })
    }

    predictPredictions = (predictions) => {
        this.setState({ predictions: predictions });
    }

    render() {
        this.ListRender = true;
        console.log('rendering search bar and has value is', this.state.predictions);
        if(Object.keys(this.state.predictions).length == 0){
            this.ListRender = false;
            console.log('list render ',this.ListRender);
        }

        return (
            <Container style={styles2.container}>
                <View style={styles2.searchBox}>

                    <InputGroup>
                        <Icon name="search" size={15} color="blue" />
                        <Input
                            style={styles2.inputSearch}
                            placeholder="Search"
                            onChangeText={(value) => this.handleInput(value)}
                        />
                    </InputGroup>
                </View>
                {
                 this.ListRender && 
                 <SearchList predict={this.state.predictions} change={true} try={this.props.try} predictPredictions={this.predictPredictions} />
                }

                
            </Container>

                
        );
    }
}
/*






const Search = () => (
    <Container>
        <Header searchBar rounded>
            <InputGroup>
                <Icon name="ios-search" />
                <Input placeholder="Search" />
            </InputGroup>
            <Button transparent>
                Search
            </Button>
        </Header>
    </Container>
)*/


const styles2 = {
    searchBox: {
        top: 0,
        position: "absolute",
        width: Dimensions.get("window").width
    },
    inputWrapper: {
        marginLeft: 15,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 0,
        backgroundColor: '#fff',
        opacity: 0.9,
        borderRadius: 7
    },
    secondInputWrapper: {
        marginLeft: 15,
        marginRight: 10,
        marginTop: 0,
        backgroundColor: '#fff',
        opacity: 0.9,
        borderRadius: 7
    },
    inputSearch: {
        width: Dimensions.get("screen").width
    },
    label: {
        fontSize: 10,
        fontStyle: "italic",
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 0
    },
    container: {
        width: Dimensions.get("screen").width
    }
};



/*

        <Container>
                <Header searchBar rounded style={styles2.inputSearch} >
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder='Search' />
                    </Item>
                    
                </Header>
            </Container>


*/