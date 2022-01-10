import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './EventCard.css';

import eventCard from '../../assets/event-card.jpg';

function EventCard({ eventId }) {
    const event = useSelector(state => state.event.events[eventId]);
    const { name, date, categoryId } = event;
    const { city: venueCity, state: venueState } = event.Venue;
    const { name: category } = event.Category;

    return (
        <>
            <div className='event__card--container'>
                <div className='event__card--image'>
                    <Link to={`/events/${eventId}`}>
                        <img alt='Event Name' src={eventCard} />
                    </Link>
                </div>
                <div className='event__card--body'>
                    <div className={`event__card--flag event__card--flag-${categoryId}`}>{category}</div>
                    <h3 className='event__card--title'>{name}
                    </h3>
                    <div className='event__card--date'>{date}</div>
                    <div className='event__card--location'>
                        <i className="fas fa-map-marker-alt fa-sm event__card--pin" />
                        {venueCity}, {venueState}</div>
                    <div className='event__card--headliners'>Headliner: Sakuraburst</div>
                    <div className='event__card--headliners'>Organizer: Sakuraburst</div>
                </div>
            </div >
        </>
    )
}

export default EventCard;
