/* eslint-disable */
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import LoginScreen from '../screens/RootScreen';
import SignUpScreen from '../screens/SignUpScreen';


const navigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    SignUp: {
      screen: SignUpScreen
    }
  },
  {
    initialRouteName: 'Login',
  },
);
const AppContainer = createAppContainer(navigator);

export default AppContainer;

