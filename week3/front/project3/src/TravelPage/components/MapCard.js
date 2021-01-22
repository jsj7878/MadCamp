import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const locations =[];
const lastlocations = [];
// {
//   name: "Location 1",
//   location: { 
//     lat: 33.365, lng: 126.56
//   },
// },

const MapCard = (locationarray) => {


  const addlocations = (locationarray) =>{
    var i;
    locations.push(locationarray);
    console.log(locations)

  }

  const mapStyles = {        
    height: 500,
    width: 700
  };
  
  const defaultCenter = {
    lat: 33.365, lng: 126.56
  }
  
  const addMarkers = async (e, aug, lat, lng) => {
    // console.log(aug);
    const {stores} = this.state;
    let stateData = stores;
    let latLng;
    latLng = {lat, lng};
    stateData.push(latLng);
    await this.setState({
      stores: stateData
    });
  }
  const displayMarkers = (lat, lng) => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={lat, lng}  />
    })
  }
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyDLTqNLX9015_waYN7su_aK_OgZIu3g5Fk'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={defaultCenter} 
        >

          {
            locations.unshift(locationarray.locationarray)
          }
          {
            locations[0].map(item => {
                return (
                <Marker key={item.name} position={item.location}/>
                )
              })
        }
        </GoogleMap>
     </LoadScript>
  )
}

export default MapCard;