import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from 'react-router-dom';
import { LatLngExpression, LatLngTuple } from "leaflet";
import { Box } from "@mui/material";
import { CityEvent } from '../types/CityEvent';
import DOMPurify from "dompurify";

interface MapProps {
    posix: LatLngExpression | LatLngTuple;
    zoom?: number;
    events: CityEvent[];
}

const defaults = {
    zoom: 13,
};

const EventsMap = ({ zoom = defaults.zoom, posix, events }: MapProps) => {
    if (events.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ width: '100%' }}>
            <MapContainer
                style={{ height: "720px", width: "720px" }}
                center={posix}
                attributionControl={true}
                zoom={zoom}
                minZoom={3}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {events.map((event) => {
                    if (event.lat_lon && event.lat_lon.lat != null && event.lat_lon.lon != null) {
                        return (
                            <Marker key={event.id} position={[event.lat_lon.lat, event.lat_lon.lon]} draggable={false}>
                                <Popup>
                                    {event.title}
                                    <p>
                                        <Link to={`/event/${event.id}`}>Détail de l'événement</Link>
                                    </p>
                                </Popup>
                            </Marker>
                        );
                    } else {
                        return null;
                    }
                })}
            </MapContainer>
        </Box>
    );
};

export default EventsMap;