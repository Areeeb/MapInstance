import React from 'react';
import { View, TextInput } from 'react-native';

const InputText = ({ placeholder, value, onChangeText, secureTextEntry }) => {
    return(
        <View style={styles.containerStyle}>
            <TextInput
            placeholder={placeholder}
            placeholderTextColor="rgba(255,255,255,0.5)"
            style={styles.textInputStyle}
            autoCapitalize="none"
            underlineColorAndroid='transparent'
            autoCorrect={false}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            />
        </View>
    );
}

const styles = {
    containerStyle: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    textInputStyle: {
        height: 40,
        fontSize: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 10,
        paddingHorizontal: 10,
        color: '#fff'
    }
};

export default InputText;
