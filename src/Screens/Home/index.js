//import liraries
import React, { Component, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GoogleMapKey } from '../../Constants/GoogleMapKey';
import { ImagePath } from '../../Constants/ImagePath';
import CustomButton from '../../Components/CustomButton';


// create a component
const Home = ({ navigation }) => {

  const [state, setState] = useState(
    {
      startingCords: {
        latitude: 30.7046,
        longitude: 76.7179,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      destinationCords: {
        latitude: 30.7333,
        longitude: 76.7794,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    }
  )
  const mapRef = useRef()
  const { destinationCords, startingCords } = state
  const onPressLocation = () => {
    navigation.navigate('ChooseLocation', { getCordinates: fetchValues })
  }

  const fetchValues = (data) => {
    setState({
      startingCords: {
        latitude: data.pickupCords.latitude,
        longitude: data.pickupCords.longitude,
      },
      destinationCords:{
        latitude: data.destinationCords.latitude,
        longitude: data.destinationCords.longitude
      }
    })
    console.log(" Location Data", data)
  }
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={startingCords}>
          <Marker image={ImagePath.isCurLoc} coordinate={startingCords} />
          <Marker image={ImagePath.isGreenMarker} coordinate={destinationCords} />
          <MapViewDirections
            origin={startingCords}
            destination={destinationCords}
            apikey={GoogleMapKey}
            strokeWidth={5}
            strokeColor="hotpink"
            optimizeWaypoints
            onReady={result => {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: { top: 100, bottom: 300, left: 30, right: 30 },
              })
            }}
          />
        </MapView>
      </View>
      <View style={styles.bottomCard}>
        <Text style={styles.title}>Where are you going...?</Text>
        <CustomButton btnText={'Choose Location'} onPress={onPressLocation} />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomCard: {
    backgroundColor: '#F5FCFF',
    width: '100%',
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  title: {
    fontSize: 18,
    color: '#1c1e21',

  }
});

//make this component available to the app
export default Home;
