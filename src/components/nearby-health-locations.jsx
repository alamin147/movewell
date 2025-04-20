import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { MapPin, ExternalLink, MapIcon, AlertTriangle } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const mapContainerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "0.5rem"
};

// Simple location card as fallback when map can't load
const LocationCard = ({ place, openDirections }) => (
  <div className="flex items-start p-3 bg-gray-50 rounded-md">
    <MapPin className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
    <div className="flex-1">
      <h3 className="font-medium">{place.name}</h3>
      <p className="text-sm text-gray-500">{place.vicinity || place.address}</p>
      {place.rating && (
        <p className="text-sm">Rating: {place.rating} ⭐</p>
      )}
    </div>
    {openDirections && (
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-blue-600" 
        onClick={() => openDirections(place)}
      >
        <ExternalLink className="h-4 w-4" />
      </Button>
    )}
  </div>
);

// Mock data for health locations - more realistic with coordinates
const mockLocations = [
  { 
    id: 1, 
    name: "Enam Medical College and Hospital", 
    address: "9 Dhaka - Aricha Hwy, Savar", 
    rating: 4.2,
    lat: 23.8489,
    lng: 90.2567,
    vicinity: "9 Dhaka - Aricha Hwy, Savar 1340"
  },
  { 
    id: 2, 
    name: "Savar Upazila Health Complex", 
    address: "Savar, Dhaka", 
    rating: 4.0,
    lat: 23.8436, 
    lng: 90.2569,
    vicinity: "Polashbari Rd, Savar, Dhaka"
  },
  { 
    id: 3, 
    name: "J.M.C.H Hospital Savar", 
    address: "Jamgora, Ashulia", 
    rating: 4.1,
    lat: 23.9072, 
    lng: 90.2895,
    vicinity: "Jamgora, Ashulia, Savar, Dhaka"
  },
  { 
    id: 4, 
    name: "Suhasini Medical Hospital", 
    address: "Nabinagar, Savar", 
    rating: 3.9,
    lat: 23.8921, 
    lng: 90.2651,
    vicinity: "Nabinagar Bazar Road, Savar, Dhaka"
  },
  { 
    id: 5, 
    name: "Ashulia Medical Center", 
    address: "Ashulia Main Road", 
    rating: 4.2,
    lat: 23.9170, 
    lng: 90.3257,
    vicinity: "Ashulia Main Road, Ashulia, Dhaka"
  }
];

export default function NearbyHealthLocations() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          
          // Create "nearby" locations by offsetting from current location
          const locations = mockLocations.map((location, index) => ({
            ...location,
            lat: latitude + (Math.random() * 0.01 - 0.005),
            lng: longitude + (Math.random() * 0.01 - 0.005)
          }));
          
          setNearbyLocations(locations);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Unable to retrieve your location");
          setIsLoading(false);
          // Default location if user denies permission
          setCurrentLocation({ lat: 37.7749, lng: -122.4194 }); // San Francisco as fallback
          setNearbyLocations(mockLocations);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      setCurrentLocation({ lat: 37.7749, lng: -122.4194 }); // San Francisco as fallback
      setNearbyLocations(mockLocations);
    }
  }, []);

  const openDirections = (place) => {
    if (!place || !currentLocation) return;
    
    let destination;
    
    if (place.lat && place.lng) {
      destination = `${place.lat},${place.lng}`;
    } else if (place.address) {
      destination = encodeURIComponent(place.address);
    } else {
      return;
    }
    
    const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.lat},${currentLocation.lng}&destination=${destination}&travelmode=driving`;
    window.open(url, '_blank');
  };

  // Custom icon for current location
  const currentLocationIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  // Custom icon for health locations
  const healthLocationIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  if (isLoading) {
    return (
      <Card className="p-4 text-center">
        <p className="text-gray-500">Loading nearby health locations...</p>
      </Card>
    );
  }

  if (error && nearbyLocations.length === 0) {
    return (
      <Card className="p-4">
        <div className="text-center mb-4">
          <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-red-500">{error}</p>
          <p className="text-gray-500 mt-2">Please enable location services to see health facilities near you.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 space-y-4">
      {currentLocation && (
        <div style={mapContainerStyle} className="border">
          <MapContainer 
            center={[currentLocation.lat, currentLocation.lng]} 
            zoom={14} 
            style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Current location marker */}
            <Marker 
              position={[currentLocation.lat, currentLocation.lng]}
              icon={currentLocationIcon}
            >
              <Popup>
                Your current location
              </Popup>
            </Marker>
            
            {/* Health location markers */}
            {nearbyLocations.map((place) => (
              <Marker 
                key={place.id} 
                position={[place.lat, place.lng]}
                icon={healthLocationIcon}
                eventHandlers={{
                  click: () => setSelected(place)
                }}
              >
                <Popup>
                  <div>
                    <h3 className="font-medium">{place.name}</h3>
                    <p className="text-sm">{place.vicinity || place.address}</p>
                    {place.rating && (
                      <p className="text-sm">Rating: {place.rating} ⭐</p>
                    )}
                    <Button 
                      variant="outline"
                      size="sm" 
                      className="mt-2 text-blue-600 text-xs" 
                      onClick={() => openDirections(place)}
                    >
                      Get Directions
                    </Button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
      
      <div className="space-y-2 mt-3">
        <h3 className="font-medium text-gray-700">Nearby Health Facilities</h3>
        {nearbyLocations.length > 0 ? (
          nearbyLocations.map((place) => (
            <LocationCard 
              key={place.id} 
              place={place} 
              openDirections={openDirections}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No health facilities found nearby</p>
        )}
      </div>
    </Card>
  );
}