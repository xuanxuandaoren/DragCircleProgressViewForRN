'use strict'

import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    StatusBar,
}from 'react-native';
import TitleBarWhite from '../CustomView/TitleBarWhite'
const width=Dimensions.get('screen').width;
const height=Dimensions.get('screen').height;
export default class  extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header:<TitleBarWhite
                title={"Home"}
                />,
        };
    };


    constructor(props){
        super(props);
        this._initData();
        // console.warn("constructor");
        // StatusBar.setTranslucent(true);
        // StatusBar.setBackgroundColor('transparent');
        // StatusBar.setBarStyle('dark-content')
    }

    _initData(){
           let data=[
               {

                   title:'画圆弧',
                   func:()=>{
                        this.props.navigation.navigate("Arc",{title:"画圆弧"})
                   }
               }
               , {

                   title:'倒计时控件',
                   func:()=>{
                       this.props.navigation.navigate("CountDown",{title:"倒计时控件"})
                   }
               }
               , {

                   title:'自定义picker',
                   func:()=>{
                       this.props.navigation.navigate("ZygPicker",{title:"自定义Picker"})
                   }
               }
               , {

                   title:'图片动画',
                   func:()=>{
                       this.props.navigation.navigate("ImageAnimation",{title:"图片动画"})
                   }
               }


           ];
        this.state={
               dataSource:data,
        }
    }

    /**
     * 子条目
     * @param item
     * @returns {*}
     * @private
     */
    _renderItem(item){

           return (
               <TouchableOpacity style={styles.rowContainer} onPress={item.item.func}>

                <Text style={styles.title}>{item.item.title}</Text>
               </TouchableOpacity>
           )
    }

    /**
     * 分割线
     * @param item
     * @private
     */
    _itemSeparator(item){

        return (
            <View style={styles.separator} />


        )
    }


    render() {
        return (
            <SafeAreaView style={{flex:1,}}>


                <FlatList renderItem={this._renderItem} data={this.state.dataSource}  keyExtractor={(item)=>item.index}  ItemSeparatorComponent={this._itemSeparator}/>
            </SafeAreaView>
        );

    }
}

const styles=StyleSheet.create({
   container:{
        position:'absolute',
       width:width,
       height:height,
       backgroundColor: '#fff',
       flexDirection:'column'
   } ,
    rowContainer:{
        height:50,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        width:width,
    },
    separator:{
        height: 0.3,
        backgroundColor:'#000',
        opacity: 0.15,
    },
    title:{
       color:'#000',

        fontSize:16,
        opacity:0.6
    }
});