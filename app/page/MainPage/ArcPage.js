'use strict'

import React from 'react';

import {
    View,
    Text,
    Dimensions,
    ScrollView,
    StyleSheet,
} from 'react-native';
import TitleBarWhite from "../CustomView/TitleBarWhite";
import {Svg, Path, Circle} from 'react-native-svg';

const titleHeight = 50;
const {width, height} = Dimensions.get('screen');
const radius = 0.45 * width;
const storkeWidth = 0.05 * width;
export default class ArcPage extends React.Component {

    static navigationOptions = {
        header: <TitleBarWhite
            title={'Arcpage'}
        />,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.itemContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemTitle}>采用Circle画半圆</Text>
                    </View>
                    <Svg
                        width={width}
                        height={width}

                    >
                        <Circle
                            cx={width / 2}
                            cy={width / 2}
                            r={radius}
                            strokeDashoffset={2 * Math.PI * radius * 90 / 360}
                            stroke='#f0f'
                            strokeLinecap='round'
                            strokeDasharray={[2 * Math.PI * radius * 240 / 360, 2 * Math.PI * radius * 120 / 360]}
                            strokeWidth={0.05 * width}
                            fill='none'
                        />
                    </Svg>

                </View>

                <View style={styles.separator}/>
                <View style={styles.itemContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemTitle}>采用Path画半圆</Text>
                    </View>
                    <Svg
                        width={width}
                        height={width}

                    >
                        <Path

                            stroke='#0f0'
                            strokeDasharray={[1, (2 * Math.PI * radius - 180) / 180]}
                            strokeWidth={storkeWidth}
                            fill='transparent'
                            d={"M " + width / 2 + " " + (width / 2 - radius) + " A " + radius + " " + radius + " 0 180 1 " + width / 2 + " " + (width / 2 + radius) + "A " + radius + " " + radius + " 0 60 1 " + (width / 2 + radius * Math.sin(Math.PI * 240 / 180)) + " " + (width / 2 - radius * Math.cos(Math.PI * 240 / 180))}

                        />
                    </Svg>
                </View>

                <View style={styles.separator}/>
                <View style={styles.itemContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemTitle}>采用Path画半圆</Text>
                    </View>
                    <Svg
                        width={width}
                        height={width}

                    >
                        <Path

                            stroke='#0f0'
                            strokeDasharray={[1, (2 * Math.PI * radius - 180) / 180]}
                            strokeWidth={storkeWidth}
                            fill='transparent'
                            d={"M " + width / 2 + " " + (width / 2 - radius) + " A " + radius + " " + radius + " 0 180 1 " + width / 2 + " " + (width / 2 + radius) + "A " + radius + " " + radius + " 0 60 1 " + (width / 2 + radius * Math.sin(Math.PI * 240 / 180)) + " " + (width / 2 - radius * Math.cos(Math.PI * 240 / 180))}

                        />
                    </Svg>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        height: width + titleHeight,
        width: width,
    },
    textContainer: {
        justifyContent: 'center',
        height: titleHeight,
    },
    itemTitle: {

        width: width,
        textAlign: 'center',
        justifyContent: 'center',
    },
    separator: {
        height: 0.33,
        width: width,
        backgroundColor: '#000',
        opacity: 0.15,
    }
})