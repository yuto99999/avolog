import { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import useDetail from "@/lib/useDetail";
import { Box } from "@mui/material";

const MapComponent = ({ docId }: { docId: string }) => {
  const { documents: detail } = useDetail("Shop", docId);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (detail.length > 0 && window.google) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: detail[0].address }, (results, status) => {
        if (status === "OK" && results) {
          setLocation({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          });
        } else {
          console.error("Geocode was not successful for the following reason: " + status);
        }
      });
    }
  }, [detail]);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ width: "400px", height: "400px" }}
        center={location}
        zoom={15}
      />
    </LoadScript>
  );
};

export default MapComponent;
