import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import DeleteEventModal from '../../Modals/DeleteEventModal';

import { getDateShort } from '../../../utils/date-time';

function EventsTable({ events }) {
    return (
        <>
            {events.length ? (<table>
                <thead>
                    <tr>
                        <th className='table table__th--name'>Date</th>
                        <th className='table table__th--event-name'>Event</th>
                        <th className='table table__th--name'>Edit</th>
                        <th className='table table__th--name'>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {events.map(({ name, id, published, startTime }) => (
                        <tr className='table__tr--record' key={id}>
                            <td className='table__td--attrib'>
                                {console.log(getDateShort(startTime))}
                                {startTime ?
                                    getDateShort(startTime) :
                                    (<>TBD</ >)
                                }
                            </td>
                            <td className='table__td--attrib table__td--event-name'>
                                {published === true ?
                                    (<Link to={`/events/${id}`}>{name}</Link>) :
                                    (<>{name}</ >)
                                }
                            </td>
                            <td className='table__td--attrib'>
                                <Link to={`/events/${id}/edit`}>Edit</Link>
                            </td>
                            <td className='table__td--attrib'>
                                <DeleteEventModal eventId={id} eventName={name} published={published} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>) : (<p>Nothing to see here.</p>)}
        </>
    )
}

export default EventsTable;
