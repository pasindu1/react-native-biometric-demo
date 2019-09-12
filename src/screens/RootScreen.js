/* eslint-disable */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import Biometrics from 'react-native-biometrics';
import NavigationService from '../utils/navigator';

class RootScreen extends Component{    
    _onPressAuthenticate() {
      NavigationService.navigate('SignUp')
    }

    render(){
        console.log('new component')
        return(
            <View style={{alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this._onPressAuthenticate.bind(this)}
                >
                  <Text> Go to Home Screen </Text>
                </TouchableOpacity>

            </View> 
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  }
})

export default RootScreen;