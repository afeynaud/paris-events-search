import { Container } from '@mui/material';
import EventsMap from './components/EventsMap';
import "leaflet/dist/leaflet.css";
import './App.css';
import Agenda from './components/Agenda';

function App() {
    return (
        <Container>
           <h1>Paris events</h1>
            <EventsMap posix={[48.866667, 2.333333]} />
            <h2>Agenda</h2>
{/*            <Agenda props={ } />*/}
        </Container>
  )
}

export default App
