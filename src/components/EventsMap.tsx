import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { Box } from "@mui/material";
import { useStore } from "../useStore";
import DOMPurify from "dompurify";

interface MapProps {
    posix: LatLngExpression | LatLngTuple,
    zoom?: number,
}

const defaults = {
    zoom: 13,
}

const EventsMap = (Map: MapProps) => {
    const { zoom = defaults.zoom, posix } = Map
    const { cityEvents, getCityEvents } = useStore((state) => ({
        cityEvents: state.cityEvents,
        getCityEvents: state.getCityEvents,
    }));

    useEffect(() => {
        getCityEvents();
    }, [getCityEvents]);

    if (cityEvents.length === 0) {
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
                {cityEvents.map((event) => {
                    if (event.lat_lon && event.lat_lon.lat != null && event.lat_lon.lon != null) {
                        return (
                            <Marker key={event.id} position={[event.lat_lon.lat, event.lat_lon.lon]} draggable={false}>
                                <Popup>
                                    {event.title}
                                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.description) }} />
                                    <a href="" title=""></a>
                                </Popup>
                            </Marker>
                        );
                    } else {
                        return null;
                    }
                })}
            </MapContainer>
        </Box>
    )
}

export default EventsMap