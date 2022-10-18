import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Gesture, GesturePad } from "react-native-gesture-login"


export default function App() {

  const [state, setState] = useState({
    password: '',
    title: 'Please input your password.',
    isWrong: false
  });

  const onRelease = (password) => {
    if (state.password === '') {

      if (password.length < 4) {
        setState({
          ...state,
          title: 'The length of your password should be at least 6.',
          isWrong: true,
        })
        return
      }

      setState({
        ...state,
        password,
        title: 'Please input your password secondly.',
      })

    } else if (state.password.length > 0) {

      if (state.password === password) {
        setState({
          ...state,
          title: 'Your password is set to ' + password,
        })

      } else {
        setState({

          password: '',
          title: 'Not the same password, try again.',
          isWrong: true,
        })
      }
    }
  }

  const onClear = (password) => {
    if (state.password === '') {
      setState({
        ...state,
        title: 'Please input your password.',
        isWrong: false,
      })
    }
  }


  const { password, title, isWrong } = state
  let textStyle, circleStyle, centerStyle, lineStyle

  if (isWrong) {
    textStyle = style.text
    circleStyle = style.circle
    centerStyle = style.center
    lineStyle = style.line
  }
  return (
    <View style={style.view}>
      <GesturePad sequence={password} />
      <Text style={textStyle}>{title}</Text>
      <Gesture
        // circleStyle={circleStyle}
        // centerStyle={{ backgroundColor: 'coral' }}
        clearTime={1000}
        linedCircleStyle={circleStyle}
        linedCenterStyle={centerStyle}
        lineStyle={lineStyle}
        onRelease={onRelease}
        onClear={onClear}
      />
    </View>
  )
}


const COLOR_RED = 'rgba(252, 13, 27, 1)'
const COLOR_RED_02 = 'rgba(252, 13, 27, 0.2)'
const COLOR_RED_04 = 'rgba(252, 13, 27, 0.4)'

const style = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  circle: {
    backgroundColor: COLOR_RED_02,
    borderColor: COLOR_RED_04,
  },
  center: {
    backgroundColor: COLOR_RED,
  },
  line: {
    backgroundColor: COLOR_RED,
  },
  text: {
    color: COLOR_RED,
  }
})