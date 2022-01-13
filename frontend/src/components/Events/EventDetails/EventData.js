import { Link } from "react-router-dom";
import { getDateShort, getDateString } from "../../../utils/date-time";

export function populateDate(startTime, endTime) {
    const [sDate, sTime, sYear] = getDateString(startTime);
    const [eDate, eTime, eYear] = getDateString(endTime);

    if (sDate === eDate) {
        return (
            <>
                <div className='event__details--date-full'>{sDate}, {sYear}</div>
                <div className='event__details--date-short'>{sTime} - {eTime}</div>
            </>
        )
    } else {
        return (
            <>
                <div className='event__details--date-full'>{sDate}, {sYear}, {sTime} -</div>
                <div className='event__details--date-full'>{eDate}, {eYear}, {eTime}</div>
            </>
        )
    }
}

export function populateLocation(event) {
    const {
        startTime,
        secretLocation,
        capacity,
        virtualEvent,
        eventUrl,
        Venue
    } = event;

    const today = getDateShort();
    const startDay = getDateShort(startTime);

    if (virtualEvent) {
        if (today !== startDay) {
            return (
                <div className='event__details__location event__details--location'>
                    <p>It's a virtual event! Check back later for the streaming link.</p>
                </div>
            )
        } else {
            return (
                <div className='event__details--location event__details--location-link'>
                    <Link to={eventUrl ? eventUrl : '/'}>Click to Start Streaming!</Link>
                </div>
            )
        }
    } else {
        if (Venue) {
            if (secretLocation && today !== startDay) {
                return (
                    <div className='event__details--location event__details--location-secret'>
                        It's a secret! Location will be revealed on the day of the event.
                    </div>
                )
            } else {
                return (
                    <div className='event__details--location'>
                        <p>{Venue.name}</p>
                        <p>{Venue.address}</p>
                        <p>{Venue.city}, {Venue.state} {Venue.zip}</p>
                    </div>
                )
            }
        }
    }
}
