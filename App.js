import React, {Component} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import TouchID from 'react-native-touch-id';

let optionalConfigObject = {
  title: 'Authentication Required', // Android
  color: '#e00606', // Android,
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  imageColor: 'black',
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  pressHandler() {
    TouchID.authenticate(
      'to demo this react native component',
      optionalConfigObject,
    )
      .then(success => {
        console.log('success', success);
        // AlertIOS.alert('authenticated Successfully');
      })
      .catch(error => {
        console.log('error', error);
        // AlertIOS.alert('Authentication Failed');
      });
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.pressHandler}>
          <Text>Authenticate with Touch ID</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default App;
