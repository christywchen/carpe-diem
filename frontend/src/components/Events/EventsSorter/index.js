import { NavLink } from "react-router-dom";

import './EventsSorter.css';

function EventsSorter({ elements, resource }) {
    return (
        <>
            <div className='events__container--categories'>
                <NavLink
                    to={`${resource}/all/events/all`}
                    className={({ isActive }) => 'events__category--link' + (isActive ? ' event__category--active' : '')}
                >
                    All
                </NavLink>
                {elements.map(element => (
                    <NavLink
                        to={`/${resource}/${element.id}/events/all`}
                        key={element.id}
                        className={({ isActive }) => 'events__category--link' + (isActive ? ' event__category--active' : '')}
                    >
                        {element.name}
                    </NavLink>
                ))}
            </div>
        </>
    )
}

export default EventsSorter;
