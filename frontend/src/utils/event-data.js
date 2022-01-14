import { getDateShort, getDateString } from "./date-time";

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
        virtualEvent,
        eventUrl,
        Venue
    } = event;

    const today = getDateShort();
    const startDay = getDateShort(startTime);

    if (virtualEvent) {
        if (today !== startDay) {
            return (
                <div className='event__details__location event__details--location-secret'>
                    <p>It's a virtual event! Check back later for the streaming link.</p>
                </div>
            )
        } else {
            return (
                <div className='event__details--location event__details--location-link'>
                    <a href={eventUrl ? eventUrl : '/'} target="_blank" rel="noreferrer noopener">Click to Start Streaming!</a>
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
                        <p>{Venue.city}, {Venue.state.toUpperCase()} {Venue.zip}</p>
                    </div>
                )
            }
        }
    }
}
