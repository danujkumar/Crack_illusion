"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import osm from "./osm-providers";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
  CircleMarker,
  Polyline,
  getCenter,
  Circle,
  // Map
} from "react-leaflet";
// import '@page.css'
// import styles from '../styles/osm.module.css';
import { useAuth } from "@/utils/auth";

import L, { icon } from "leaflet";

import airport from "../../../public/Final_Airports.json";

const redOptions = { color: "red" };

let polylines = [];

let polylinee = [];

let polyliner = [];

const customIcon = new L.Icon({
  iconUrl: "/airport.png",
  iconSize: [38, 38],
});

const customIcon2 = new L.Icon({
  iconUrl: "/flight.png",
  iconSize: [38, 38],
});

let count = 0;
let poss = [26.253838, 81.601836];

const Page = () => {
  const [center, setCenter] = useState({ lat: 21.253838, lng: 81.601836 });
  let map = useRef();
  const [air, setAir] = useState(airport);
  const [state, setState] = useState({ latitude: 0, longitude: 0 });

  const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    setState({ latitude: lat, longitude: lng });
    console.log("Maps: ", air);
  };

  const MapEvents = () => {
    useMapEvents({
      click: handleClick,
    });
    return null;
  };

  let marker, circle;

  function getPosition(poss) {
    // console.log(position)
    var lat = poss[0];
    var long = poss[1];
    var accuracy = 50;
    console.log("Map: ", map.current);
    // if(marker) {
    //     map.current.removeLayer(marker)
    // }
    // if (circle) {
    //     map.current.removeLayer(circle)
    // }
    circle = L.circle([lat, long], { radius: accuracy } ,{pathOptions:redOptions})
    var featureGroup = L.featureGroup([circle]).addTo(map.current)
  }

  const {
    setting,
    safe,
    reliable,
    efficient,
    actual,
    departure,
    arrival,
    health,
    mounting,
    mount,
    aeroMetrics, 
    metrics,
    locate
  } = useAuth();

  useEffect(() => {
    let interval;
    
    if (count <= actual.length) {
        interval = setInterval(() => {
            count = count + 1;
            let parts = actual[count].lat.split('.');
            poss[0] = parts[0] + '.' + parts[1];
            parts = actual[count].lng.split('.');
            poss[1] = parts[0] + '.' + parts[1];
            getPosition(poss);
            if (count == actual.length) {
                clearInterval(interval);
            }
            aeroMetrics(actual[count].mph,8000-2*count,actual[count].feet);
            locate(poss[0], poss[1]);
        }, 6000);
    }
    return () => clearInterval(interval);
  }, [mount]);



  useEffect(() => {
    polylines = [];
    polylinee = [];
    polyliner = [];
    for (let i = 0; i < safe.length; i++) {
      polylines.push([safe[i].lat, safe[i].lng]);
    }
    for (let i = 0; i < efficient.length; i++) {
      polylinee.push([efficient[i].lat, efficient[i].lng]);
    }
    for (let i = 0; i < reliable.length; i++) {
      polyliner.push([reliable[i].lat, reliable[i].lng]);
    }
    mounting(true);
  }, [safe, reliable, efficient]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        justifyContent: "space-between",
      }}
      className="col bg-green-500 text-center"
    >
      <p style={{ color: "black", width: "100%", backgroundColor: "white" }}>
        latitude: {state.latitude}, longitude: {state.longitude}{" "}
      </p>

      <MapContainer
        center={center}
        zoom={7}
        style={{}}
        scrollWheelZoom={true}
        ref={map}
      >
        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />

        <MapEvents />
        {/* <LocationMarker /> */}
        {mount && <><Polyline center={poss} pathOptions={{ color: "green" }} positions={polylines} />
        <Polyline center={poss} pathOptions={{ color: "blue" }} positions={polylinee} />
        <Polyline center={poss} pathOptions={{ color: "yellow" }} positions={polyliner} /></>}
        

        {air.map((item, key) => (
          // console.log(item)
          <Marker position={[item.latitude, item.longitude]} icon={customIcon}>
            <Popup>You are herjhjkhjkhkhkhkhke</Popup>
          </Marker>
        ))}

        <Circle center={poss} pathOptions={redOptions} radius={10000} />

        <Marker position={poss} icon={customIcon2}>
          <Popup>You are herjhjkhjkhkhkhkhke</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Page;
