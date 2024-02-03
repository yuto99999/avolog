import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = ({ address }: { address: string }) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const center = {
    lat: lat,
    lng: lng,
  };

  async function geocode() {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK" && results) {
        setLat(results[0].geometry.location.lat());
        setLng(results[0].geometry.location.lng());
      }
    });
  }

  return (
    <>
      <LoadScript
        googleMapsApiKey={"AIzaSyA7iKYZvXllu1uShfNlugKDoJPqzxH0BYs"}
        onLoad={() => geocode()}
      >
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "50vh" }}
          center={center}
          zoom={15}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default Map;
