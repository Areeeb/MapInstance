import React from 'react';
import { View, Text } from 'react-native';

const Banner = () => {
    return (
        <View style={styles.logoStyle}>
            <Text style={styles.logoTextStyle}>BAITHAK</Text>
            <Text style={styles.text}>Meet the Right Way</Text>
        </View>
    );
}

const styles = {
    logoStyle: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
      },
    
      logoTextStyle: {
        fontSize: 48,
        color: '#fff',
        opacity: 0.7
      },
    
      text: {
        color: '#fff',
        marginTop: 0,
        opacity: 0.7
      }
};

export default Banner;