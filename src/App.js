/* eslint-disable */

import React, {Component} from 'react';
import RootNavigator from './navigators/RootNavigator'
import NavigationService from './utils/navigator'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import Fingerprint from './components/FingerPrint'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

class App extends Component{
    render(){
        return(
            <Provider store={createStoreWithMiddleware(reducers)}>
                <Fingerprint>
                    <RootNavigator 
                        ref={component => {    
                            NavigationService.setTopLevelNavigator(component)
                        }}
                    />
                </Fingerprint> 
            </Provider>
        )
    }
}

export default App;