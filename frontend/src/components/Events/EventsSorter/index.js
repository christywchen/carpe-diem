import { NavLink } from "react-router-dom";

function EventsSorter({ elements, resource }) {
    return (
        <>
            <div className='events__container--categories'>
                <NavLink
                    to={`/events/${resource}/all`}
                    className='events__container--category'
                >
                    All
                </NavLink>
                {elements.map(element => (
                    <NavLink
                        to={`/events/${resource}/${element.id}`}
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
