import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Modal } from '../../../context/Modal';
import { deleteEvent } from '../../../store/event';

import './DeleteEventModal.css';

function DeleteEventModal({ eventId, eventName, published }) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        dispatch(deleteEvent(eventId, published));

        setShowModal(false)
    }

    return (
        <>
            <button className='nav__button--link' onClick={() => setShowModal(true)}>Delete</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div id='modal__container--form'>
                        <div id='modal__container--heading'>Are You Sure?</div>
                        <div className='modal__container--text delete__event--body'>
                            <div className='delete__event--name'>{eventName}</div>
                            <div className='delete__event--text'>Once you delete this event, there's no going back. </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <button className="button button__submit--primary button__modal" type="submit">Confirm</button>
                        </form>
                        <button className="button button__submit--cancel button__modal" onClick={() => setShowModal(false)}>Cancel</button>

                    </div>
                </Modal>
            )
            }
        </>

    )
}

export default DeleteEventModal;
