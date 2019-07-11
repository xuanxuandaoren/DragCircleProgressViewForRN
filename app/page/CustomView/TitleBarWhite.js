'use strict'

import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    Platform,
    Dimensions
} from 'react-native';
import {SafeAreaView} from 'react-navigation';

const width = Dimensions.get("screen").width;
const titleHeight = 50;


export default class TitleBarWhite extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('transparent')
        if (Platform.OS == 'android') {
            StatusBar.setTranslucent(true);
        }
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{this.props.title}</Text>

                </View>
                <View style={styles.sparator}/>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: StatusBar.currentHeight + titleHeight,
        width: width,
        justifyContent:'flex-end',
        // color:'red',
    },
    contentContainer: {
        height: titleHeight,
        width: width,
        // backgroundColor: 'red',
        justifyContent: "center",
        flexDirection:'column',

    },
    title: {
        alignSelf: 'center',
        textAlign: 'center',
        color: '#000',
        fontSize: 16,

    },
    sparator:{
        height:0.3,
        backgroundColor:'#000',
        opacity:0.15,

    }
})