'use strict'

import {
    Dimensions,
}from 'react-native';

//UI 设计图的宽度
const designWidth=1080;
//UI 设计图的高度
const designHeight=2160;

const unitWidth=Dimensions.get('screen').width/designWidth;
const unitHeight=Dimensions.get('screen').height/designHeight;

export {
    unitWidth,
    unitHeight,
};