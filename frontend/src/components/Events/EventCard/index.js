import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './EventCard.css';


function EventCard({ event }) {
    const { id, name, date, categoryId, imageUrl, Category, Venue } = event;

    const cardStyling = {
        backgroundImage: `url('${imageUrl})`
    }

    return (
        <>
            <div className='event__card--container'>
                <div className='event__card--image event__card--image-default' style={imageUrl ? cardStyling : null}>
                    <Link to={`/events/${id}`}>
                    </Link>
                </div>
                <div className='event__card--body'>
                    <div className={`event__card--flag event__card--flag-${categoryId}`}>{Category?.name}</div>
                    <h3 className='event__card--title'>
                        <Link to={`/events/${id}`}>
                            {name}
                        </Link>
                    </h3>
                    <div className='event__card--date'>{date}</div>
                    <div className='event__card--location'>
                        <i className="fas fa-map-marker-alt fa-sm event__card--pin" />
                        {Venue?.city}, {Venue?.state}
                    </div>
                    <div className='event__card--headliners'>Headliner: Sakuraburst</div>
                    <div className='event__card--headliners'>Organizer: Sakuraburst</div>
                </div>
            </div >
        </>
    )
}

export default EventCard;
