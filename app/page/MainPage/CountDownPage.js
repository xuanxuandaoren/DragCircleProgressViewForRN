'use strict'

import React from 'react';
import CircleCountDownView from '../CustomView/CircleCountDownView'

import {
    View,
    Text,
    Dimensions,
    StyleSheet,
}from 'react-native';

const width  =Dimensions.get('window').width;
const height=Dimensions.get('window').height;

export default class CountDownPage extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <CircleCountDownView style={styles.circleContainer} >
                  
                </CircleCountDownView>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        height:height,
        width:width,
        flexDirection:'column',
    },
    circleContainer:{
        flex:1,

    }
})