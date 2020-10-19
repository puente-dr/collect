import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import { IconButton } from 'react-native-paper';

import getLocation from '../../modules/geolocation';
import { theme } from '../../modules/theme';
import { residentIDQuery } from '../../services/parse/crud';

const Maps = ({ organization }) => {
  const [region, setRegion] = useState({
    latitude: 18.4861,
    longitude: -69.9312,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    retrieveMarkers();
    return function cleanup() {
      // we need to cleanup something here
    };
  }, []);

  const handleLocation = async () => {
    const currentLocation = await getLocation();
    const { latitude, longitude } = currentLocation.coords;
    setRegion({
      ...region,
      latitude,
      longitude,
    });
  };

  const retrieveMarkers = async () => {
    const queryParams = {
      skip: 0,
      offset: 0,
      limit: 10000,
      parseColumn: 'surveyingOrganization',
      parseParam: organization,
    };

    await residentIDQuery(queryParams).then((records) => {
      const residentRecords = JSON.parse(JSON.stringify(records));
      setMarkers(residentRecords);
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={region}
      >
        {markers.map((marker) => (
          marker.location && (
            <Marker
              key={marker.objectId}
              coordinate={marker.location}
              title={`${marker.fname || ''} ${marker.lname || ''}`}
              description={`Collector: ${marker.surveyingUser}`}
            />
          )
        ))}
      </MapView>
      <View style={styles.buttonStyle}>
        <IconButton
          icon="crosshairs-gps"
          onPress={handleLocation}
          color={theme.colors.primary}
          style={{ backgroundColor: theme.colors.background, opacity: 0.8 }}

        // animated
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width * 0.95,
    height: Dimensions.get('window').height / 2,
    marginTop: 10,
    borderRadius: 10
  },
  buttonStyle: {
    position: 'absolute', // use absolute position to show button on top of the map
    bottom: '0%',
    alignSelf: 'flex-end', // for align to right,
    right: 10,
  }
});

export default Maps;