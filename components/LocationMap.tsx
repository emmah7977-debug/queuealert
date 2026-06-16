"use client";

import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Location {
  id: string;
  label: string;
  address: string;
  wait: string;
  category: string;
  coords: { lat: number; lng: number };
}

interface LocationMapProps {
  locations: Location[];
  selectedLocation: Location | null;
  onSelect: (id: string) => void;
}

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapViewUpdater({ selectedLocation }: { selectedLocation: Location | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      map.flyTo([selectedLocation.coords.lat, selectedLocation.coords.lng], 14, {
        duration: 1.2,
      });
    }
  }, [selectedLocation, map]);

  return null;
}

export function LocationMap({ locations, selectedLocation, onSelect }: LocationMapProps) {
  const defaultCenter = selectedLocation
    ? [selectedLocation.coords.lat, selectedLocation.coords.lng]
    : [locations[0].coords.lat, locations[0].coords.lng];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <MapContainer
        center={defaultCenter as [number, number]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-[420px] w-full rounded-3xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapViewUpdater selectedLocation={selectedLocation} />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.coords.lat, location.coords.lng]}
            icon={markerIcon}
            eventHandlers={{
              click: () => {
                onSelect(location.id);
              },
            }}
          >
            <Popup>
              <strong>{location.label}</strong>
              <div className="text-sm">{location.wait} wait</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
