import React, { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

const Location = ({endLat, endLong}) => {
  const mapContainerRef = useRef(null);
  const [startLat, setStartLat] = useState(null);
  const [startLong, setStartLong] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setStartLat(position.coords.latitude);
        setStartLong(position.coords.longitude);
      });
    }
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOXTOKEN;
    if (startLong && startLat && mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [startLong, startLat],
        zoom: 10,
      });
      setMap(map);
      map.on("load", () => {
        const directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          unit: "metric",
          profile: "mapbox/driving-traffic",
          controls: {
            inputs: false,
            instructions: false,
            annotations: false,
            showMapboxLogo: false,
            showCredits: false,
          },
          route: true,
        });
        map.addControl(directions, "top-left");
        const startingPoint = [startLong, startLat];
        const endPoint = [endLong, endLat];

        directions.setOrigin(startingPoint);
        directions.setDestination(endPoint);
      });
    }
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [endLat, endLong, startLat, startLong]);
  return (
    <>
      <div
        className="map-container mt-4 h-56 w-11/12 mx-auto"
        ref={mapContainerRef}
      />
    </>
  );
};

export default Location;
