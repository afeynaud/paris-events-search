import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fr from 'date-fns/locale/fr';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CityEvent } from '../types/CityEvent';

const locales = {
    'fr': fr,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
    defaultLocale: 'fr',
});

const messages = {
    allDay: 'Toute la journée',
    previous: 'Précédent',
    next: 'Suivant',
    today: "Aujourd'hui",
    month: 'Mois',
    week: 'Semaine',
    day: 'Jour',
    agenda: 'Agenda',
    date: 'Date',
    time: 'Heure',
    event: 'Événement',
    showMore: (total: number) => `+ ${total} plus`,
};

interface AgendaProps {
    events: CityEvent[];
}

const transformEvent = (event: CityEvent) => ({
    id: event.id,
    title: <Link to={`/event/${event.id}`}>{event.title}</Link>,
    start: new Date(event.date_start),
    end: new Date(event.date_end),
});

const Agenda = ({ events }: AgendaProps) => {
    console.log(events);

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
                messages={messages}
                culture="fr"
            />
        </div>
    );
};

export default Agenda;