/* eslint-disable */
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';

const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 200
const BAR_SPACE = 10

class Slides extends Component {
    constructor(props){
        super(props)
        
    }

    render() {

        return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={10}
            pagingEnabled
        />
        );
    }
}

export default Slides;
