'use strict'

import React from 'react';

import {createStackNavigator,createAppContainer} from  'react-navigation';
import MainPage from './page/MainPage';


import ArcPage from "./page/MainPage/ArcPage";
import CountDownPage from "./page/MainPage/CountDownPage";
import ImageAnimationPage from "./page/MainPage/ImageAnimationPage";
import ZygPickerPage from "./page/MainPage/ZygPickerPage";
import {StackViewStyleInterpolator} from 'react-navigation-stack';

const RootStack =createStackNavigator(
    {
        Home:MainPage,
        Arc:ArcPage,
        CountDown:CountDownPage,
        ImageAnimation:ImageAnimationPage,
        ZygPicker:ZygPickerPage,
    }
    ,{
        initialRouteName:'Home',
        // headerMode:'none',
        transitionConfig:()=>({
            screenInterpolator:StackViewStyleInterpolator.forHorizontal,
        }),

    }
)

export default createAppContainer(RootStack);