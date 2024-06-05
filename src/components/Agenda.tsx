import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CityEvent } from '../types/CityEvent';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

interface AgendaProps {
    events: CityEvent[];
}

const transformEvent = (event: CityEvent) => ({
    id: event.id,
    title: event.title,
    start: new Date(event.date_start),
    end: new Date(event.date_end),
});

const Agenda = ({ events }: AgendaProps) => {
    console.log('Received events:', events);

    if (!events || events.length === 0) {
        return <div>Loading events...</div>;
    }

    const transformedEvents = events.map(transformEvent);

    return (
        <div className="calendar">
            <Calendar
                localizer={localizer}
                events={transformedEvents}
                defaultView="month"
                defaultDate={new Date(2024, 6, 5)}
                style={{ height: 500 }}
            />
        </div>
    );
};

export default Agenda;