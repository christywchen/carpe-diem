import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import LoginFormModal from '../LoginFormModal';
import SignUpForm from './SignUpForm';

function SignUpFormModal({ button = false }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {button ?
                <button className='button button__submit--secondary' type="submit">Want to Sign Up?</button> :
                <NavLink to='/' onClick={() => setShowModal(true)}>Sign Up</NavLink>
            }
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div id='modal__container--form'>
                        <div id='modal__container--heading'>Sign Up</div>
                        <div class='modal__container--text'>Join to start hosting and attending events!</div>
                        <SignUpForm />
                        <hr />
                        <button className='button button__submit--primary' type="submit">Demo User</button>
                        <LoginFormModal button={true} />
                    </div>
                </Modal>
            )}
        </>
    );
}

export default SignUpFormModal;
