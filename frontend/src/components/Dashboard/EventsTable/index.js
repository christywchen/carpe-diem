import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'

function EventsTable({ events }) {
    return (
        <>
            {events.length ? (<table>
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>View Event</th>
                        <th>Edit Event</th>
                    </tr>
                </thead>

                <tbody>
                    {events.map(({ name, id }) => (
                        <tr key={id}>
                            <td>{name}</td>
                            <td>
                                <Link to={`/events/${id}/edit`}>Edit Event</Link>
                            </td>
                            <td>
                                <Link to={`/events/${id}`}>View Event</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>) : (<p>Nothing to see here.</p>)}
        </>
    )
}

export default EventsTable;
