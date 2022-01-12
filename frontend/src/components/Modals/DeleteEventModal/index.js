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
            <button className='button nav__button--link nav__button--link-main' onClick={() => setShowModal(true)}>Delete</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div id='modal__container--form'>
                        <div id='modal__container--heading'>Are You Sure?</div>
                        <div className='modal__container--text delete__event--body'>Once you delete
                            <span className='delete__event--name'>{eventName}</span>, there's no going back.</div>
                        <form onSubmit={handleSubmit}>
                            <button className="button button__submit--primary button__modal" type="submit">Confirm Deletion</button>
                        </form>
                        <button className="button button__submit--primary button__modal" onClick={() => setShowModal(false)}>I Changed My Mind</button>

                    </div>
                </Modal>
            )
            }
        </>

    )
}

export default DeleteEventModal;
