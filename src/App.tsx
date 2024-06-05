import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Button, Container } from "@mui/material";
import EventsMap from "./components/EventsMap";
import Agenda from "./components/Agenda";
import EventDetail from "./components/EventDetail";
import { useStore } from "./useStore";
import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
    const [searchName, setSearchName] = useState<string|null>("");
    const [selectedDate, setSelectedDate] = useState<Date|null>(null);
    const { cityEvents, getCityEvents } = useStore((state) => ({
        cityEvents: state.cityEvents,
        getCityEvents: state.getCityEvents,
    }));

    useEffect(() => {
        getCityEvents();
    }, [getCityEvents]);

    if (cityEvents.length === 0) {
        return <div>Loading events...</div>;
    }

    const handleSearchNameChange = (event) => {
        setSearchName(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleRefreshEvents = () => {
        setSearchName(null);
        setSelectedDate(null);
        getCityEvents();
    };

    const filteredEvents = cityEvents.filter((event) => {
        if (searchName && !event.title.toLowerCase().includes(searchName.toLowerCase())) {
            return false;
        }
        if (selectedDate && new Date(event.date_start).getDate() !== selectedDate?.getDate()) {
            return false;
        }
        return true;
    });

    return (
        <Router>
            <Container>
                <h1>Paris Events</h1>
                <Routes>
                    <Route path="/" element={
                        <>
                            <TextField
                                label="Search by event name"
                                value={searchName}
                                onChange={handleSearchNameChange}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Select date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />
                            </LocalizationProvider>
                            <Button variant="contained" onClick={handleRefreshEvents}>Refresh Events</Button>
                            <EventsMap posix={[48.866667, 2.333333]} events={filteredEvents} />
                            <h2>Agenda</h2>
                            <Agenda events={filteredEvents} />
                        </>
                    } />
                    <Route path="/event/:id" element={<EventDetail />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;