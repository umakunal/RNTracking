//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GoogleMapKey} from '../../Constants/GoogleMapKey';

// create a component
const AddressPickup = ({placeholderText, fetchAddress}) => {
  const onPressAddress = (data, details) => {
    console.log('Details', details);
    let resLength = details.address_components;
    let zipcode = '';
    let filterResCity = details.address_components.filter(val => {
      if (val.types.includes('locality') || val.types.includes('sublocality')) {
        return val;
      }
      if (val.types.includes('postal_code')) {
        let postalCode = val.long_name;
        zipcode = postalCode;
      }

      return false;
    });
    let dataTextCityObject =
      filterResCity.length > 0
        ? filterResCity[0]
        : details.address_components[
            resLength > 1 ? resLength - 2 : resLength - 1
          ];
    let cityText =
      dataTextCityObject.long_name && dataTextCityObject.long_name.length > 17
        ? dataTextCityObject.short_name
        : dataTextCityObject.long_name;
    console.log('zipCode=====>', zipcode);
    console.log('cityText=====>', cityText);
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    fetchAddress(lat, lng, zipcode, cityText);
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
