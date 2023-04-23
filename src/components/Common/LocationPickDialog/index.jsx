import { Dialog } from '@mui/material';
import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from '@reach/combobox';
import '@reach/combobox/styles.css';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import Geocode from 'react-geocode';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import CustomMarker from '../../../assets/images/pin-icon.png';
import './LocationPickDialog.scss';
Geocode.setApiKey(import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.enableDebug();

const LocationPickDialog = (props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });
  console.log(isLoaded);
  const { onClose, open } = props;
  return (
    <Dialog onClose={onClose} open={open} maxWidth="md">
      <div className="location-dialog">{isLoaded && <Map onClose={onClose} />}</div>
    </Dialog>
  );
};

const Map = ({ onClose }) => {
  const [center, setCenter] = useState({});
  const [activeMarker, setActiveMarker] = useState(null);
  const [location, setLocation] = useState({
    address: '',
    city: '',
    district: '',
    country: '',
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    setCenter({ lat, lng });
  }, []);

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    }

    function showPosition(position) {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      panTo({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      console.log('Latitude: ' + position.coords.latitude + ' Longitude: ' + position.coords.longitude);
    }
    getLocation();
  }, []);

  useEffect(() => {
    Geocode.fromLatLng(center.lat, center.lng).then(
      (response) => {
        console.log(response);
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = getCity(addressArray),
          district = getDistrict(addressArray),
          country = getCountry(addressArray);
        setLocation({
          address: address ? address : '',
          city: city ? city : '',
          district: district ? district : '',
          country: country ? country : '',
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }, [center]);

  const handleMarkerDragEnd = (e) => {
    let newLat = e.latLng.lat(),
      newLng = e.latLng.lng();
    panTo({ lat: newLat, lng: newLng });
    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        console.log(response);
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = getCity(addressArray),
          district = getDistrict(addressArray),
          country = getCountry(addressArray);
        setLocation({
          address: address ? address : '',
          city: city ? city : '',
          district: district ? district : '',
          country: country ? country : '',
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };
  console.log(location);

  const getDistrict = (addressArray) => {
    let district = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        (('administrative_area_level_2' === addressArray[i].types[0] && 'political' === addressArray[i].types[1]) ||
          ('locality' === addressArray[i].types[0] && 'political' === addressArray[i].types[1]))
      ) {
        district = addressArray[i].long_name;
        return district;
      }
    }
  };

  const getCity = (addressArray) => {
    let state = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
        state = addressArray[i].long_name;
        return state;
      }
    }
  };

  const getCountry = (addressArray) => {
    let country = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && 'country' === addressArray[i].types[0]) {
        country = addressArray[i].long_name;
        return country;
      }
    }
  };

  const handlePickLocation = () => {
    onClose();
  };

  return (
    <div className="map-pick">
      <Search panTo={panTo} />

      <GoogleMap
        onLoad={onMapLoad}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={{ width: '100%', height: '340px' }}
        center={center}
        zoom={13}
      >
        <Marker
          position={center}
          onClick={() => setActiveMarker(true)}
          options={{ icon: CustomMarker }}
          draggable
          onDragEnd={(e) => handleMarkerDragEnd(e)}
        >
          {activeMarker ? <InfoWindow onCloseClick={() => setActiveMarker(null)}></InfoWindow> : null}
        </Marker>
      </GoogleMap>
      <div className="address-group">
        {/* <Locate panTo={panTo} /> */}
        <div className="form-group">
          <label htmlFor="address">Địa chỉ</label>
          <input type="text" disabled value={location.address || ''} />
        </div>
        <div className="form-group">
          <label htmlFor="district">Quận, huyện</label>
          <input type="text" disabled value={location.district || ''} />
        </div>
        <div className="form-group">
          <label htmlFor="city">Tỉnh,Thành phố</label>
          <input type="text" disabled value={location.city || ''} />
        </div>
        <div className="form-group">
          <label htmlFor="country">Đất nước</label>
          <input type="text" disabled value={location.country || ''} />
        </div>
      </div>
      <button onClick={handlePickLocation}>OK</button>
    </div>
  );
};

// function Locate({ panTo }) {
//   return (
//     <button
//       className="locate"
//       onClick={() => {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             panTo({
//               lat: position.coords.latitude,
//               lng: position.coords.longitude,
//             });
//           },
//           () => null
//         );
//       }}
//     >
//       <img src="/compass.svg" alt="compass" />
//     </button>
//   );
// }

function Search({ panTo }) {
  console.log(panTo);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  console.log(ready, value, status, data);

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log('😱 Error: ', error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput value={value} onChange={handleInput} disabled={!ready} placeholder="Search your location" />
        <ComboboxPopover style={{ zIndex: 3000 }}>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ place_id, description }) => {
                console.log(place_id, description);
                return <ComboboxOption key={place_id} value={description} />;
              })}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default LocationPickDialog;
