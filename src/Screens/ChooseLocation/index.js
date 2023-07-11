//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import AddressPickup from '../../Components/AddressPickup';
import CustomButton from '../../Components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {showError, showSucess} from '../../Helper/ToastMessage';

// create a component
const ChooseLocation = props => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    pickupCords: {},
    destinationCords: {},
  });

  const {destinationCords} = state;
  const checckValid = () => {
    if (Object.keys(destinationCords).length === 0) {
      showError('Please select destination location');
      return false;
    }
    return true;
  };

  console.log('props', props);
  const onDone = () => {
    const isValid = checckValid();
    console.log('isValid', isValid);
    if (isValid) {
      props.route.params.getCordinates({destinationCords});
      showSucess('Location selected');
      navigation.goBack();
    }
  };

  const fetchDestinationCords = (lat, lng, zipcode, city) => {
    console.log(' zipcode: ', zipcode);
    console.log(' city: ', city);
    // console.log(" latitude: ", lat);
    // console.log(" longitude: ", lng);
    setState({
      ...state,
      destinationCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{flex: 1, backgroundColor: 'white', padding: 20}}>
        <AddressPickup
          placeholderText={'Search your destination location'}
          fetchAddress={fetchDestinationCords}
        />
        <CustomButton btnText={'Done'} onPress={onDone} />
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default ChooseLocation;
