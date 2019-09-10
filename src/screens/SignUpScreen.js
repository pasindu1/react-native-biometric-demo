/* eslint-disable */
import React, {Component} from 'react';
import {View, Text} from 'react-native'

class SignUpScreen extends Component{
    render(){
        console.log('new component 2')
        return(
            <View style={{alignItems:'center', marginTop: 20}}>
                <Text>This is Your Home Screen</Text>
                <Text style={{alignSelf: 'center', padding:5}}>
                    This is a demo for locking the app unlock the app with the biometric authentication.
                </Text>
            </View>
        )
    }
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };
}
export default SignUpScreen;