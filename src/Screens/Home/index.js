//import liraries
import React, {Component, useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GoogleMapKey} from '../../Constants/GoogleMapKey';
import {ImagePath} from '../../Constants/ImagePath';
import CustomButton from '../../Components/CustomButton';
import {
  locationPermission,
  getCurrentLocation,
} from '../../Helper/LocationHelper';

// create a component

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.9222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const Home = ({navigation}) => {
  const mapRef = useRef();
  const markerRef = useRef();
  const [state, setState] = useState({
    curLoc: {
      latitude: 30.7046,
      longitude: 76.7179,
    },
    destinationCords: {},
    coordinates: new AnimatedRegion({
      latitude: 30.7046,
      longitude: 76.7179,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
  });
  const {destinationCords, curLoc, coordinates} = state;

  useEffect(() => {
    getLiveLocation();
  }, []);

  const getLiveLocation = async () => {
    const checkLocationPermission = await locationPermission();
    if (checkLocationPermission === 'granted') {
      const {latitude, longitude} = await getCurrentLocation();
      console.log('Get live location after every 5 seconds');
      animateMarker(latitude, longitude);
      setState(prevState => ({
        ...prevState,
        curLoc: {latitude, longitude},
        coordinates: new AnimatedRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      }));
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const onPressLocation = () => {
    navigation.navigate('ChooseLocation', {getCordinates: fetchValues});
  };

  const fetchValues = data => {
    setState({
      ...state,
      destinationCords: {
        latitude: data.destinationCords.latitude,
        longitude: data.destinationCords.longitude,
      },
    });
    console.log(' Location Data', data);
  };

  const animateMarker = (latitude, longitude) => {
    const newCoordinates = {
      latitude,
      longitude,
    };
    if (Platform.OS === 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinates, 7000);
      }
    } else {
      coordinates.timing(newCoordinates).start();
    }
  };

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            ...curLoc,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <Marker.Animated
            ref={markerRef}
            draggable
            image={ImagePath.isCurLoc}
            coordinate={coordinates}
          />
          {Object.keys(destinationCords).length > 0 && (
            <Marker
              draggable
              image={ImagePath.isGreenMarker}
              coordinate={destinationCords}
            />
          )}
          {Object.keys(destinationCords).length > 0 && (
            <MapViewDirections
              origin={curLoc}
              destination={destinationCords}
              apikey={GoogleMapKey}
              strokeWidth={5}
              strokeColor="hotpink"
              optimizeWaypoints={true}
              onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`,
                );
              }}
              onReady={result => {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    // top: 100,
                    // bottom: 300,
                    // left: 30,
                    // right: 30,
                  },
                });
              }}
              onError={error => {
                console.warn(error);
              }}
            />
          )}
        </MapView>
        <TouchableOpacity
          onPress={onCenter}
          style={{position: 'absolute', bottom: 20, right: 20}}>
          <Image source={ImagePath.greenIndicator} />
        </TouchableOpacity>
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
  },
});

//make this component available to the app
export default Home;
