import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import EventsMap from "./components/EventsMap";
import Agenda from "./components/Agenda";
import EventDetail from "./components/EventDetail";
import { useStore } from "./useStore";
import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
    const { cityEvents, getCityEvents } = useStore((state) => ({
        cityEvents: state.cityEvents,
        getCityEvents: state.getCityEvents,
    }));

    React.useEffect(() => {
        getCityEvents();
    }, [getCityEvents]);

    if (cityEvents.length === 0) {
        return <div>Loading events...</div>;
    }

    return (
        <Router>
            <Container>
                <h1>Paris Events</h1>
                <Routes>
                    <Route path="/" element={<>
                        <EventsMap posix={[48.866667, 2.333333]} events={cityEvents} />
                        <h2>Agenda</h2>
                        <Agenda events={cityEvents} />
                    </>} />
                    <Route path="/event/:id" element={<EventDetail />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;