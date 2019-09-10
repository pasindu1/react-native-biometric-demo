/* eslint-disable */
import React, {Component} from 'react';
import {View, AppState, PanResponder} from 'react-native';
import Biometrics from 'react-native-biometrics';
import NavigationService from '../../utils/navigator';

let myVar = null;
let startTimeMS = null;
let AWAIT_TIME = 15 * 1000;

class FingerPrint extends Component {
  constructor(props) {
    super(props);
    this._panResponder = PanResponder.create({
      //   onStartShouldSetPanResponder: (evt, gestureState) => {
      //     if (myVar !== null) {
      //       clearTimeout(myVar);
      //     }
      //     console.log('new')
      //     return true;

      //   },
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {
        if (gestureState.dx == 0 && gestureState.dy == 0) {
          this.getStartTimeInSeconds.bind(this);
          if (myVar !== null) {
            clearTimeout(myVar);
          }
          myVar = setTimeout(this._openAuthenticator.bind(this), AWAIT_TIME);
        }
      },
      //   onPanResponderRelease: (evt, gestureState) => {
      //     this.getStartTimeInSeconds.bind(this);
      //     if (myVar !== null) {
      //         clearTimeout(myVar);
      //       }
      //     myVar = setTimeout(this._openAuthenticator.bind(this), AWAIT_TIME);
      //   },
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

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    if (myVar === null) {
      setTimeout(this._openAuthenticator.bind(this), AWAIT_TIME);
      this.getStartTimeInSeconds.bind(this);
    }
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

  _handleAppStateChange = nextAppState => {
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
