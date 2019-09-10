/* eslint-disable */
import React, {Component} from 'react';
import {View, Text} from 'react-native';

const SLIDE_DATA = [
    {name: 'A new Adventure'},
    {name: "Let's get started"},
    {name: 'Here we go.....'}
]
const images = [
    'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
    'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
    'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
  ]
class WelcomeScreen extends Component{
    render(){   
        return(
            <Slides
                data = {images}
            />
        )
    }
}
export default WelcomeScreen;