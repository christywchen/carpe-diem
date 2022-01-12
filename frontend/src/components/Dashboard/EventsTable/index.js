import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'

function EventsTable({ events }) {
    return (
        <>
            {events.length ? (<table>
                <thead>
                    <tr>
                        <th className='table'>Event</th>
                        <th className='table table__th--event-name'></th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {events.map(({ name, id, published, startTime }) => (
                        <tr key={id}>
                            <td>
                                {startTime ?
                                    (<>Date</>) :
                                    (<>--/--</ >)
                                }
                            </td>
                            <td>
                                {published === true ?
                                    (<Link to={`/events/${id}`}>{name}</Link>) :
                                    (<>{name}</ >)
                                }
                            </td>
                            <td>
                                <Link to={`/events/${id}/edit`}>Edit</Link>
                            </td>
                            <td>
                                <Link to={`/events/${id}`}>Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>) : (<p>Nothing to see here.</p>)}
        </>
    )
}

export default EventsTable;
