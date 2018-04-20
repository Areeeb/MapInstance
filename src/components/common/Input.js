import React from 'react';
import { TextInput, Text, View } from 'react-native';

const Input = ({ Label, placeholder, value, onChangeText, secureTextEntry }) => {
    const { ContainerStyle, InputStyle, LabelStyle } = styles;

    return (
        <View style={ContainerStyle}>
            <Text style={LabelStyle}> {Label} </Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                style={InputStyle}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                autoCorrect={false}
            />
        </View>
    );
}

const styles = {
    ContainerStyle: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        flexDirection: 'row'
    },
    LabelStyle: {
        flex: 1,
        fontSize: 18,
        paddingLeft: 20
    },
    InputStyle: {
        flex: 2,
        paddingLeft: 5,
        paddingRight: 5,
        color: '#000',
        lineHeight: 23
    }
};

export { Input };

