import { NavLink } from "react-router-dom";

function EventsSorter({ elements, resource }) {
    return (
        <>
            <div className='events__container--categories'>
                <NavLink
                    to={`${resource}/all/events/all`}
                    className='events__container--category'
                >
                    All
                </NavLink>
                {elements.map(element => (
                    <NavLink
                        to={`/${resource}/${element.id}/events/all`}
                        key={element.id}
                        className='events__container--category'
                    >
                        {element.name}
                    </NavLink>
                ))}
            </div>
        </>
    )
}

export default EventsSorter;
