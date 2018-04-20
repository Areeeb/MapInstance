import React, { Component } from 'react';
import { Text, 
    TouchableWithoutFeedback, 
    View,
    LayoutAnimation,
    UIManager,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';


class ListItem extends Component {
    componentWillUpdate() {
        if(Platform.OS === "android"){
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

        }

        LayoutAnimation.spring();
    }

    renderDescription() {
        const { library, /*selectedLibrarayId*/ expanded } = this.props;

        if(expanded){
            return (
                <CardSection>
                    <Text style={{ flex: 1 }}> {library.description} </Text>
                </CardSection>
            );
        }
        /*if(library.id === selectedLibrarayId) {
            return (
                <Text> {library.description} </Text>
            );
        }*/
    }

    render() {
        const { TitleTextStyle } = styles;
        const { title, id } = this.props.library;
        console.log(this.props.actions);

        return(
            <TouchableWithoutFeedback onPress={() => this.props.selectLibrary(id)} >
                <View>
                    <CardSection >
                        <Text style={TitleTextStyle}> {title} </Text>
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    TitleTextStyle: {
        fontSize: 20,
        paddingLeft: 20
    }
};

const mapStateToProps = (state, ownProps) => {
    const expanded = state.selectedLibrarayId === ownProps.library.id;

    return { expanded };
    /*return { selectedLibrarayId: state.selectedLibrarayId };*/
}

export default connect(mapStateToProps, actions)(ListItem);