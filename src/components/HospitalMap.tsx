import React from 'react';
import * as L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { usePosition } from 'use-position';


type State = {
  lat: number,
  lng: number,
  zoom: number,
}

class HospitalMap extends React.Component {

  getCurrentLoc(): {latitude: number, longitude: number}  {
    const watch = true;
    let latitude: number;
    let longitude: number;
    let pos = usePosition(watch);

    latitude = pos.latitude as number;
    longitude = pos.longitude as number;

    return {latitude, longitude};
    
  }

  loc = this.getCurrentLoc();

  state: State = {
    lat: this.loc.latitude,
    lng: this.loc.longitude,
    zoom: 13,
  }

  render() {
    const position: L.LatLng = L.latLng(this.state.lat, this.state.lng);
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    );
  }
}


export default HospitalMap;