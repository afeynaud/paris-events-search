import { useEffect } from "react";
import { Container } from '@mui/material';
import EventsMap from './components/EventsMap';
import "leaflet/dist/leaflet.css";
import './App.css';
import Agenda from './components/Agenda';
import { useStore } from "./useStore";

function App() {
    const { cityEvents, getCityEvents } = useStore((state) => ({
        cityEvents: state.cityEvents,
        getCityEvents: state.getCityEvents,
    }));

    useEffect(() => {
        getCityEvents();
    }, [getCityEvents]);

    return (
        <Container>
           <h1>Paris events</h1>
            <EventsMap posix={[48.866667, 2.333333]} events={cityEvents} />
            <h2>Agenda</h2>
            <Agenda events={cityEvents} />
        </Container>
  )
}

export default App
