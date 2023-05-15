import React, { useEffect, useState } from 'react';
import './ProvidersOnMap.scss';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import Rating from '../Rating';
import { NavLink } from 'react-router-dom';
import CustomMarker from '../../../assets/images/man.png';
import { useSelector } from 'react-redux';

const markers = [
  {
    id: 1,
    name: 'Messi',
    image:
      'https://icdn.dantri.com.vn/thumb_w/680/2023/04/01/afp-messi-1-167911043942020387261-75-0-625-881-crop-1679110702236160038944-1679118122610-1680330659064.jpeg',
    position: { lng: 108.23831923305988, lat: 16.065472698854286 },
    price: 120000,
    rate: 5,
  },
  {
    id: 2,
    name: 'Kevin De Bruyne',
    image: 'https://images2.thanhnien.vn/uploaded/gianglao/2020_09_12/debruynevuakientao_ATHO.jpg?width=500',
    position: { lng: 108.2451904, lat: 16.0642639 },
    price: 90000,
    rate: 4,
  },
  {
    id: 3,
    name: 'Pedri',
    image:
      'https://www.coachesvoice.com/wp-content/webpc-passthru.php?src=https://www.coachesvoice.com/wp-content/uploads/2021/10/PedriMobile-1.jpg&nocache=1',
    position: { lng: 108.24490003287794, lat: 16.041361049554652 },
    price: 200000,
    rate: 4,
  },
  {
    id: 4,
    name: 'Steven Gerrard',
    image: 'https://resources.premierleague.com/premierleague/photos/players/250x250/p1814.png',
    position: { lng: 108.2199588, lat: 16.0472002 },
    price: 150000,
    rate: 5,
  },
];

const ProvidersOnMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY, // Add your API key
  });
  return <div className="provider-on-map">{isLoaded && <Map />}</div>;
};

const Map = () => {
  const { providerList, loading, conditions } = useSelector((state) => state.providerCustomer);
  console.log(providerList.data);
  const [center, setCenter] = useState({});
  useEffect(() => {
    getLocation();
  }, []);
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
    console.log('Latitude: ' + position.coords.latitude + ' Longitude: ' + position.coords.longitude);
  }

  useEffect(() => {
    console.log('change - ,', conditions);
    setCenter({
      lat: parseFloat(providerList?.data?.[0]?.location?.[0].coords_latitude),
      lng: parseFloat(providerList?.data?.[0]?.location?.[0].coords_longitude),
    });
  }, [providerList]);
  console.log(center);
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  // const handleOnLoad = (map) => {
  //   const bounds = new google.maps.LatLngBounds();
  //   console.log(bounds);
  //   markers.forEach(({ position }) => bounds.extend(position));
  //   map.fitBounds(bounds);
  // };

  return (
    <GoogleMap
      // onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: '100vw', height: '100vh' }}
      center={center}
      zoom={12}
    >
      {providerList?.data?.map((provider, index) => {
        return (
          <Marker
            key={provider?.id}
            position={{
              lat: parseFloat(provider?.location?.[0].coords_latitude),
              lng: parseFloat(provider?.location?.[0].coords_longitude),
            }}
            onClick={() => handleActiveMarker(provider?.id)}
            options={{ icon: CustomMarker }}
          >
            {activeMarker === provider?.id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div className="gmap-infowindow">
                  <div className="gmap-image">
                    <div>
                      <img src={provider?.avatar?.url} alt="Placeholder image" />
                    </div>
                  </div>
                  <div className="gmap-detail pt-1">
                    <p className="marker-name mb-1">{provider?.full_name}</p>
                    <div className="marker-des mb-1">
                      <span className="mr-2">
                        <Rating starNumber={provider?.avg_star} />
                      </span>
                      <span>
                        Giá từ <span style={{ fontWeight: 800 }}>{provider?.price} vnđ</span>
                      </span>
                    </div>
                    <NavLink className="marker-view-detail event-tracking" to={`/finding-provider/${provider?.id}`}>
                      Xem Chi Tiết
                    </NavLink>
                  </div>
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        );
      })}
    </GoogleMap>
  );
};

export default ProvidersOnMap;
