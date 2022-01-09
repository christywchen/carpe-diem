import './EventCard.css';

import eventCard from '../../assets/event-card.jpg';

function EventCard({ event }) {
    const { name, date, location, eventTypeId } = event;
    const { name: eventType } = event.EventType;
    const { city: venueCity, state: venueState } = event.Venue;

    return (
        <div className='event__card--container'>
            <div className='event__card--image'>
                <div className='event__card--flag'>{eventType}</div>
                <img alt='Event Name' src={eventCard} />
            </div>
            <div className='event__card--body'>
                <h3 className='event__card--title'>{name}</h3>
                <div className='event__card--date'>{date}</div>
                <div className='event__card--location'>
                    <i class="fas fa-map-marker-alt fa-sm event__card--pin" />
                    {venueCity}, {venueState}</div>
                <div className='event__card--headliners'>Headliner: Sakuraburst</div>
                <div className='event__card--headliners'>Organizer: Sakuraburst</div>
            </div>
        </div >
    )
}

export default EventCard;
