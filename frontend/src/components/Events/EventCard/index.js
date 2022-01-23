import { userDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getRegistrations } from '../../../store/registration';
import { getDateString } from '../../../utils/date-time';

import './EventCard.css';


function EventCard({ event }) {
    // const dispatch = useDispatch();
    // const registeredEvents = useSelector(state => state.registration.user)
    const { id, name, startTime, description, categoryId, imageUrl, virtualEvent, Category, Venue } = event;

    const backgroundImage = { backgroundImage: `url("${imageUrl}")` }

    function getDescSummary(description) {
        if (description?.length < 75) return description;
        else return description?.slice(0, 80) + '...';
    }

    const [date, time] = getDateString(startTime);

    return (
        <>
            <div className='event__card--container'>
                <button
                    // onClick={ }
                    className='event__card--registration'>
                    <i className="fas fa-ticket-alt fa-md event__card--ticket"></i>
                </button>
                <Link to={`/events/${id}`}>
                    <div className='event__card--image event__card--image-default' style={imageUrl ? backgroundImage : null}>
                    </div>
                </Link>
                <div className='event__card--body'>
                    <div className={`event__card--flag event__card--flag-${categoryId}`}>{Category?.name}</div>
                    <h3 className='event__card--title'>
                        <Link to={`/events/${id}`}>
                            {name}
                        </Link>
                    </h3>
                    <div className='event__card--date'>{date}, {time}</div>
                    <div className='event__card--location'>
                        <i className="fas fa-map-marker-alt fa-sm event__card--pin" />
                        {!virtualEvent ? (<>{Venue?.city}, {Venue?.state?.toUpperCase()}</>) : (<>Virtual Event</>)}
                    </div>
                    <div className='event__card--description'>{getDescSummary(description)}</div>
                </div>
            </div >
        </>
    )
}

export default EventCard;
