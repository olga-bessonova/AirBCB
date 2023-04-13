import './GoogleMap.css';
import {useState, useRef, useEffect} from 'react';

const GoogleMap = ({lng, lat}) => {

  const [map, setMap] = useState();
  const mapRef = useRef();
  const marker = useRef({});
  const averageLatLng = {lat:  40.75, lng:  -73.99};

  useEffect(() => {
  //   benches.forEach((bench) => {
  //     averageLatLng.lat += bench.lat;
  //     averageLatLng.lng += bench.lng;
  //   })

    // averageLatLng.lat = 40.75
    // averageLatLng.lng = -73.99

    setMap(
      new window.google.maps.Map(
        mapRef.current, 
        {
          center: {lat:lat, lng: lng},
          zoom: 13.5
        }
      )
    )
  }, []);

  useEffect(() => {
    marker.current = new window.google.maps.Marker(
            {
              position: {lat: lat, lng: lng},
              map: map,
            }
          );
  })

  // 2nd useEffect puts markers
  // useEffect(() => {
  //   benches.forEach((bench) => {
  //     markers.current[bench.id] = new window.google.maps.Marker(
  //       {
  //         position: {lat: bench.lat, lng: bench.lng},
  //         map: map,
  //         title: `${bench.title}`,
  //         label: `$${bench.price}`
  //         // icon: {url:""}
  //       }
  //     );

  //     markers.current[bench.id].addListener('click', () => {
  //       alert(`This is ${bench.title}!`)
  //     })
  //   })

  // },[map])

  return (
    <div id="map" ref={mapRef}></div>
    );
};

export default GoogleMap;

