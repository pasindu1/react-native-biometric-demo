/* eslint-disable */
import React, {Component} from 'react';
import {View, AppState, PanResponder} from 'react-native';
import Biometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-community/async-storage';

let myVar = null;
let startTimeMS = null;
let AWAIT_TIME = 15 * 1000;

class FingerPrint extends Component {
  constructor(props) {
    super(props);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {
        if (gestureState.dx == 0 && gestureState.dy == 0) {
          this.getStartTimeInSeconds.bind(this);
          if (myVar !== null) {
            clearTimeout(myVar);
          }
          myVar = setTimeout(this._openAuthenticator.bind(this), AWAIT_TIME);
        }
      }
    });
    this.state = {
      appState: AppState.currentState,
      pointerTouches: null,
    };
  }

  getStartTimeInSeconds() {
    startTimeMS = new Date().getTime();
    return startTimeMS;
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('fingerPrintToken');
      if (value !== null) {
        // We have data!!
        // const timeDifference = timestampNew - value;
        this._openAuthenticator();
      } else if (value === null && myVar === null) {
        myVar = setTimeout(this._openAuthenticator.bind(this), AWAIT_TIME);
        this.getStartTimeInSeconds.bind(this);
      }
    } catch (error) {
      // Error retrieving data
      console.log('error', error);
    }
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this._retrieveData();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _openAuthenticator() {
    Biometrics.isSensorAvailable().then(biometryType => {
      if (biometryType === Biometrics.TouchID) {
        if (this.state.pointerTouches === null) {
          this.setState({pointerTouches: 'none'});
        }
        Biometrics.simplePrompt('Confirm fingerprint')
          .then(x => {
            console.log('successful fingerprint provided', x);
            this.setState({pointerTouches: null});
            this.getStartTimeInSeconds.bind(this);
            myVar = setTimeout(this._openAuthenticator.bind(this), AWAIT_TIME);
          })
          .catch(error => {
            console.log(error);
            if (
              error
                .toString()
                .includes('User cancelled fingerprint authorization')
            ) {
              this.getStartTimeInSeconds.bind(this);
              setTimeout(this._openAuthenticator.bind(this), 0.05);
            }
          });
      } else {
        console.log('Biometrics not supported');
      }
    });
  }

  _storeData = async () => {
    const timestamp = (new Date() / 1000) | 0;

    try {
      await AsyncStorage.setItem('fingerPrintToken', timestamp.toString());
    } catch (error) {
      // Error saving data
      console.log('error', error);
    }
  };

  _clearData = async () => {
    try {
      await AsyncStorage.removeItem('fingerPrintToken');
    } catch (error) {
      // Error saving data
      console.log('error', error);
    }
  };

  _handleAppStateChange = nextAppState => {
    if (nextAppState === 'background' || nextAppState === 'inactive') {
      this._storeData();
    } else if (nextAppState === 'active') {
      this._clearData();
    }
    this.setState({appState: nextAppState});
  };

  render() {
    return (
      <View
        style={{flex: 1}}
        {...this._panResponder.panHandlers}
        pointerEvents={this.state.pointerTouches}>
        {this.props.children}
      </View>
    );
  }
}
export default FingerPrint;
