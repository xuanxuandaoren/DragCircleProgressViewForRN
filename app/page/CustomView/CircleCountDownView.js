'use strict'

import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text
} from 'react-native';


import { Svg, Circle, Line, G, Defs, Rect, Polygon, ClipPath, Path } from 'react-native-svg';
const width = Dimensions.get('screen').width;
var operateWidth = 0;
var operateHeight = 0;
var totalWidth = 0;
var totalHeight = 0;
var outerRadius = 0;
var centerX = 0;
var centerY = 0;
var innerRadius;
var rows = Array.apply(null, Array(180)).map((_, i) => 0 + i);
var circleCount = 0;

var pointerLocationX = 0;
var pointerLocationY = 0;

var sliding = false;

var lastAngle = 0;

export default class CircleCountDownView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allAngle: props.angle ? props.angle : 0,
            action: false,

        }

        circleCount = props.angle ? props.angle % 360 : 0;
        rows.length = 360;


        this._onLayout = this._onLayout.bind(this);
        this._getTimeText = this._getTimeText.bind(this);
        this._doCountDown = this._doCountDown.bind(this);
        this.updatePointerByAngle = this.updatePointerByAngle.bind(this);
    }


    _doCountDown() {
        let tempAngle = this.state.allAngle - 0.1,
            circleCount = tempAngle % 360;
        if (tempAngle * 10 < 1) {
            tempAngle = 0,
                clearInterval(this.timer);
            // todo 
            //定时结束
            if (this.props.onCountDownEnd) {
                this.props.onCountDownEnd();
            }
        }
        this.setState({
            allAngle: tempAngle,
        })
    }

    componentDidMount() {

        if (this.state.allAngle > 0) {
            this.timer = setInterval(() => {
                this._doCountDown();
            }, 1000);

        }
    }
    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    /**
     * 测量事件
     * @param {Obj} nativeEvent 测量事件
     * 
     * 
     */
    _onLayout(e) {

        if (operateHeight == 0) {
            if (e.nativeEvent.layout.height == 0 || e.nativeEvent.layout.width == 0) {
                operateHeight = width;
                operateWidth = width;
                // 控件总宽高
                totalHeight = width;
                totalWidth = width;



            } else {
                operateHeight = Math.min(e.nativeEvent.layout.width, e.nativeEvent.layout.height);
                operateWidth = operateHeight;

                totalHeight = e.nativeEvent.layout.height;
                totalWidth = e.nativeEvent.layout.width;
            }

            centerX = totalWidth / 2;
            centerY = totalHeight / 2;
            outerRadius = operateHeight * 0.5 * 0.9;
            innerRadius = outerRadius - 24;

            this.forceUpdate();

        }
    }
    /**
     * 根据手势求角度
     * @param {number} event 触摸事件
     */
    _getAngleByEvent(event) {

        let tempAngle = Math.atan((totalHeight / 2 - event.nativeEvent.locationY) / (event.nativeEvent.locationX - totalWidth / 2)) * 180 / Math.PI
        if (event.nativeEvent.locationX >= totalWidth / 2 && event.nativeEvent.locationY < totalHeight / 2) {//第一象限

            tempAngle = 90 - tempAngle;
        } else if (event.nativeEvent.locationX > totalWidth / 2 && event.nativeEvent.locationY >= totalHeight / 2) {//第二象限
            tempAngle = 90 - tempAngle;
        } else if (event.nativeEvent.locationX <= totalWidth / 2 && event.nativeEvent.locationY > totalHeight / 2) {//第三象限
            tempAngle = 270 - tempAngle;
        } else {//第四象限
            tempAngle = 270 - tempAngle;
        }



        // if(this.sta)
        return tempAngle;
    }

    _updateAllAngle(event) {
        let tempAngle = this._getAngleByEvent(event);
        if (tempAngle > 280 && lastAngle >= 0 && lastAngle < 80) {

            circleCount--;

        } else if (tempAngle >= 0 && tempAngle < 80 && lastAngle > 280) {
            circleCount++;
        }

        if (circleCount <= -1) {
            circleCount = -1;
        }

        let tempAllAngle = circleCount * 360 + tempAngle;
        if (tempAllAngle < 0) {
            tempAllAngle = 0;
        }


        lastAngle = tempAngle;
        this.setState({
            allAngle: tempAllAngle,
        })

    }

    /**
     * 是否在点击范围内
     */
    updatePointerByAngle(event) {
        let x = centerX + outerRadius * Math.sin(this.state.allAngle * Math.PI / 180);
        let y = centerY - outerRadius * Math.cos(this.state.allAngle * Math.PI / 180);
        // console.log(Math.abs(event.nativeEvent.locationX+x), '---- updatePointerByAngle  ----', Math.abs(event.nativeEvent.locationY - y));
        console.log(event.nativeEvent.locationX, '---- updatePointerByAngle  ----', x);
        if (Math.pow(event.nativeEvent.locationX - x, 2) + Math.pow(event.nativeEvent.locationY - y, 2) <= Math.pow(25, 2)) {

            return true;
        } else {

            return false;
        }
    }
    /**
     * 取消定时
     */
    cancleCountDown() {
        // 取消定时 
        this.setState({
            allAngle: 0,
        })
        circleCount = 0;
        if (this.timer) {
            clearInterval(this.timer);
        }

        if (this.props.onCountDownCancel) {
            this.props.onCountDownCancel();
        }
    }
    /**
     *  
     * @param {event} event 当手指落下时
     */
    _onTouchDown(event) {

        sliding = this.updatePointerByAngle(event);
        if (sliding) {
            lastAngle = this.state.allAngle % 360;
            this.setState({
                action: true,
            })


            if (this.timer) {
                clearInterval(this.timer);
            }
            this._updateAllAngle(event);

            if (this.props.onCountDownStart) {
                this.props.onCountDownStart();
            }
        }

        if (Math.pow(event.nativeEvent.locationX - centerX, 2) + Math.pow(event.nativeEvent.locationY - centerY, 2) <= Math.pow(0.5 * innerRadius, 2)) {

            this.cancleCountDown();
        }

    }

    _onTouchMove(event) {
        if (sliding) {
            this._updateAllAngle(event);
        }
    }

    _onTouchUp(event) {

        this._getAngleByEvent(event);

        if (sliding) {
            if (parseInt(this.state.allAngle * 10) <= 0) {
                circleCount = 0;
                this.setState({
                    allAngle: 0,
                    action: false,
                })

            } else {

                this.timer = setInterval(() => {
                    this._doCountDown();
                }, 1000);



                this.setState({
                    action: false,
                })
            }

            sliding = false;
            lastAngle = 0;

            if (this.props.onCountDownSlect) {
                this.props.onCountDownSlect(this.state.allAngle);
            }
        }



    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.angle && Math.abs(nextProps.angle - this.state.allAngle) >= 1) {
            this.setState({
                allAngle: nextProps.angle,
            })
        }
    }

    /**
     * 获取圆的路径
     */
    _getCirclePath() {


        // this.state.allAngle = 60;
        // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
        // A 画圆弧 rx x轴的半径 ry y轴的半径  x-axis-rotation 表示弧形旋转的情况   large-arc-flag 角度大小  sweep-flag 大圆还是小圆 x 结束的x坐标 y 结束的y坐标
       
        if (this.state.allAngle < 180) {
            return "M " + centerX + " " + (centerY - innerRadius) + " A " + innerRadius + " " + innerRadius + " 0 0 1 " + (centerX + innerRadius * Math.sin(Math.PI * this.state.allAngle / 180)) + " " + (centerY - innerRadius * Math.cos(Math.PI * this.state.allAngle / 180));
        } else {
            return "M " + centerX + " " + (centerY - innerRadius) + " A " + innerRadius + " " + innerRadius + " 0 0 1 " + centerX + " " + (centerY + innerRadius) + "A " + innerRadius + " " + innerRadius + " 0 0 1 " + (centerX + innerRadius * Math.sin(Math.PI * this.state.allAngle / 180)) + " " + (centerY - innerRadius * Math.cos(Math.PI * this.state.allAngle / 180));
        }
    }
    /**
     * 获取为选中圆的路径
     */
    _getUnCirclePath() {
        let angleTemp=this.state.allAngle
        if (angleTemp > 180) {
            return "M " + centerX + " " + (centerY - innerRadius) + " A " + innerRadius + " " + innerRadius + " 0 0 0 " + (centerX + innerRadius * Math.sin(Math.PI * angleTemp / 180)) + " " + (centerY - innerRadius * Math.cos(Math.PI * angleTemp / 180));
        } else {
            return "M " + centerX + " " + (centerY - innerRadius) + " A " + innerRadius + " " + innerRadius + " 0 0 0 " + centerX + " " + (centerY + innerRadius) + "A " + innerRadius + " " + innerRadius + " 0 0 0 " + (centerX + innerRadius * Math.sin(Math.PI * angleTemp / 180)) + " " + (centerY - innerRadius * Math.cos(Math.PI * angleTemp / 180));
        }
    }
    /**s
     * 获取事件
     */
    _getTimeText() {
        let secondsCounts = parseInt(this.state.allAngle * 10);

        let hour = parseInt(secondsCounts / 3600);

        if (hour < 10) {
            hour = '0' + hour;
        }

        let mins = parseInt(secondsCounts % 3600 / 60);
        if (mins < 10) {
            mins = '0' + mins;
        }
        let seconds = parseInt(secondsCounts % 3600 % 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return hour + ":" + mins + ":" + seconds;
    }

    _getSubText() {
        if (this.state.action) {
            return "松手执行延迟";
        } else if (this.state.allAngle * 10 >= 1) {
            return '点击后关闭滑动';
        } else {
            return "滑动上部按钮调节事件";
        }
    }
    render() {

        let circle;

        if (this.state.allAngle > 360) {
            circle = (
                <Circle
                    cy={centerY}
                    cx={centerX}
                    r={innerRadius}
                    originX={centerX}
                    originY={centerY}
                    stroke={'#3CFFB0'}
                    strokeDasharray={[1, (2 * Math.PI * innerRadius - 180) / 180]}
                    strokeWidth='20'
                    fill='transparent'
                />

            )

        } else {
            circle = (
                <Path

                    stroke='#3CFFB0'
                    strokeDasharray={[1, (2 * Math.PI * innerRadius - 180) / 180]}

                    strokeWidth='20'
                    fill='transparent'

                    d={this._getCirclePath()}

                />
            )

        }


        return (
            <View onLayout={e => { this._onLayout(e) }} >
                {operateHeight != 0 &&
                    < View style={[styles.container, { width: operateWidth, height: operateHeight }]}

                    >

                        <Svg height={totalHeight} width={totalWidth} style={{ position: 'absolute', }}>
                            <Circle 
                                r={outerRadius}
                                cx={centerX}
                                cy={centerY}
                                stroke='#fff'
                                strokeWidth={1}
                                fill='none'
                            
                            />

                               {circle}

                            {this.state.allAngle < 360 &&
                                <Path

                                    stroke='#fff'
                                    strokeDasharray={[1, (2 * Math.PI * innerRadius - 180) / 180]}

                                    strokeWidth='20'
                                    fill='transparent'

                                    d={this._getUnCirclePath()}
                                />
                            }


                         









                        </Svg>
                        {/* 指示点位置 */}
                        <View style={{ width: operateWidth, height: operateHeight, position: 'absolute', transform: [{ rotate: this.state.allAngle % 360 + 'deg' }] }}>
                            <Image style={[styles.pointer, { top: operateHeight / 2 - outerRadius - 15 }]} source={this.state.action || this.state.allAngle == 0 ? require('../resources/thumb_off.png') : require('../resources/thumb_on.png')} />
                        </View>



                        {/* 字体 */}
                        <View style={{ position: 'absolute' }} onStartShouldSetResponder={() => true} onResponderGrant={() => { this.cancleCountDown() }}>
                            <Text style={[styles.timeStr, this.state.allAngle == 0 ? { color: '#FFFFFF' } : { color: '#3CFFB0', }]}>{this._getTimeText()}</Text>
                            <Text style={styles.timeDesStr} >{this._getSubText()}</Text>
                        </View>

                        {/* 手势响应事件 */}
                        <View style={{ width: totalWidth, height: totalHeight, backgroundColor: 'transparent', position: 'absolute' }} onMoveShouldSetResponder={()=>true} onStartShouldSetResponder={() => true} onResponderGrant={event => { this._onTouchDown(event); }} onResponderMove={event => { this._onTouchMove(event) }} onResponderRelease={event => this._onTouchUp(event)} >

                        </View>
                    </View>
                }
            </View>
        )
    }
}




var styles = StyleSheet.create({
    container: {
        backgroundColor: '#2E1F4A',
        alignItems: 'center',
        justifyContent: 'center',

    },
    pointer: {
        height: 30,
        width: 40,
        alignSelf: 'center',
        resizeMode: 'contain',
        backgroundColor: '#2E1F4A',
        padding: 10,
    },
    timeStr: {
        fontSize: 36,
        textAlign: 'center',
    },
    timeDesStr: {
        fontSize: 11,
        color: '#FFFFFF',
        textAlign: 'center',
        opacity: 0.5
    }
});