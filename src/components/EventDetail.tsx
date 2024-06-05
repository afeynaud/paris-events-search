import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Box } from "@mui/material";
import { CityEvent } from "../types/CityEvent";
import DOMPurify from "dompurify";
import { useStore } from "../useStore";

const EventDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<CityEvent | null>(null);
    const { getCityEventById } = useStore((state) => ({
        getCityEventById: state.getCityEventById,
    }));

    useEffect(() => {
        const fetchEvent = async () => {
            const fetchedEvent = await getCityEventById(Number(id));
            if (fetchedEvent) {
                setEvent(fetchedEvent);
            }
        };
        fetchEvent();
    }, [id, getCityEventById]);

    if (!event) {
        return <div>Loading event...</div>;
    }

    return (
        <div>
            <h2>{event.title}</h2>
            <p>{event.lead_text}</p>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.description) }} />

            <Box sx={{ width: '100%', height: '400px', marginTop: '20px' }}>
                {event.lat_lon && event.lat_lon.lat !== null && event.lat_lon.lon !== null ? (
                    <MapContainer
                        style={{ height: "100%", width: "100%" }}
                        center={[event.lat_lon.lat, event.lat_lon.lon]}
                        zoom={13}
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[event.lat_lon.lat, event.lat_lon.lon]} draggable={false}>
                            <Popup>
                                {event.title}
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.description) }} />
                            </Popup>
                        </Marker>
                    </MapContainer>
                ) : (
                    <div>Location data not available</div>
                )}
            </Box>
        </div>
    );
};

export default EventDetail;