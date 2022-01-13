import React from 'react';
import { Link } from 'react-router-dom';

import './EventCard.css';

import { getDateString } from '../../../utils/date-time';

function EventCard({ event }) {
    const { id, name, startTime, description, categoryId, imageUrl, Category, Venue } = event;

    const cardStyling = {
        backgroundImage: `url("${imageUrl}")`
    }

    function getDescSummary(description) {
        if (description?.length < 75) return description;
        else return description?.slice(0, 80) + '...';
    }

    const time = getDateString(startTime);

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
                    <div className='event__card--date'>{time}</div>
                    <div className='event__card--location'>
                        <i className="fas fa-map-marker-alt fa-sm event__card--pin" />
                        {Venue ? (<>{Venue?.city}, {Venue?.state}</>) : (<>Virtual Event</>)}
                    </div>
                    <div className='event__card--description'>{getDescSummary(description)}</div>
                </div>
            </div >
        </>
    )
}

export default EventCard;
