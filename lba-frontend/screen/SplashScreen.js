import LottieView from "lottie-react-native"
import React, {useState} from "react"
import {Modal} from "react-native"

const animated = require("../assets/startup_animation.json")

export default SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true)
  const closeSplashScreen = () => setIsVisible(false)

  return (
    <Modal visible={isVisible} animationType="fade">
      <LottieView
        style={{flex: 1}}
        source={animated}
        loop={false}
        autoPlay
        onAnimationFinish={closeSplashScreen}
      />
    </Modal>
  )
}
