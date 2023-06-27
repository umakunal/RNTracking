//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// create a component
const CustomButton = ({onPress = () => {}, btnStyle = {}, btnText}) => {
  return (
    <TouchableOpacity style={{...styles.container, ...btnStyle}} onPress={onPress}>
      <Text style={styles.btnText}>{btnText}</Text>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 16,
  },
  btnText: {
    fontSize: 16,
    color: '#1c1e21',
  }
});

//make this component available to the app
export default CustomButton;
