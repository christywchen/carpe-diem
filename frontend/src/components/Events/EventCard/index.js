import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './EventCard.css';

import eventCard from '../../../assets/event-card.jpg';

function EventCard({ eventId }) {
    const event = useSelector(state => state.event.events[eventId]);
    let { name, date, categoryId, imageUrl, Category, Venue } = event;

    console.log(imageUrl)
    if (!imageUrl) {
        imageUrl = eventCard;
    }

    const cardStyling = {
        backgroundImage: `url('${imageUrl})`
    }

    return (
        <>
            <div className='event__card--container'>
                <div className='event__card--image' style={cardStyling}>
                    <Link to={`/events/${eventId}`}>
                    </Link>
                </div>
                <div className='event__card--body'>
                    <div className={`event__card--flag event__card--flag-${categoryId}`}>{Category?.name}</div>
                    <h3 className='event__card--title'>
                        <Link to={`/events/${eventId}`}>
                            {name}
                        </Link>
                    </h3>
                    <div className='event__card--date'>{date}</div>
                    <div className='event__card--location'>
                        <i className="fas fa-map-marker-alt fa-sm event__card--pin" />
                        {Venue?.city}, {Venue?.state}
                    </div>
                    {/* <div className='event__card--headliners'>Headliner: Sakuraburst</div>
                    <div className='event__card--headliners'>Organizer: Sakuraburst</div> */}
                </div>
            </div >
        </>
    )
}

export default EventCard;
