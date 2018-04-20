import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ onPress, children }) => {
    const { ButtonStyle, ButtonTextStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={ButtonStyle}>
            <Text style={ButtonTextStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    ButtonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderColor: '#007aff',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5
    },
    ButtonTextStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontWeight: '600',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10
    }
};

export { Button };
