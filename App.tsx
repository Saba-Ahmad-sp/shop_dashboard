import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/screens/HomeScreen'

const App = () => {
  return (
    <View>
      <View style={styles.seperator} />
      {/* <Text>App</Text> */}
      <HomeScreen/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  seperator:{backgroundColor:"black", width:"100%", height: 35}
})