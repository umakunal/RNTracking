//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GoogleMapKey} from '../../Constants/GoogleMapKey';

// create a component
const AddressPickup = ({placeholderText, fetchAddress}) => {
  const onPressAddress = (data, details) => {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    fetchAddress(lat, lng);
    // console.log('Details', details);
  };
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder={placeholderText}
        onPress={onPressAddress}
        query={{
          key: GoogleMapKey,
          language: 'en',
        }}
        styles={{
          textInputContainer: styles.containerStyle,
          textInput: styles.textInputStyle,
        }}
        disableScroll={true}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerStyle: {
    backgroundColor: 'white',
  },
  textInputStyle: {
    height: 48,
    color: '#1c1e21',
    fontSize: 16,
    backgroundColor: '#F3F3F3',
  },
});

//make this component available to the app
export default AddressPickup;
