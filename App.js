import { View, Text } from 'react-native'
import React from 'react'
import AppRoutes from './src/Routers/AppRoutes'
import FlashMessage from 'react-native-flash-message'

const App = () => {
  return (
    <>
      <AppRoutes />
      <FlashMessage position={"top"} />
    </>
  )
}

export default App
