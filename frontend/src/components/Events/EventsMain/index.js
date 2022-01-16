import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getAllCategories } from '../../../store/category';

import EventsSorter from '../EventsSorter';
import EventsList from '../EventsList';

import './EventsMain.css';

function EventsMain() {
    const dispatch = useDispatch();
    const categoriesObj = useSelector(state => state.category.categories);
    const categories = Object.values(categoriesObj);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    return (
        <>
            <div className='events__container--title'>
                <h1>Upcoming Events</h1>
                <EventsSorter elements={categories} resource={'categories'} />
            </div>

            <Routes>
                <Route path='categories/:id' element={<EventsList />} />
            </Routes>
        </ >
    )
}

export default EventsMain;
