import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';

function SignUpFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <NavLink to='/' onClick={() => setShowModal(true)}>Register</NavLink>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div id='modal__container--form'>
                        <div id='modal__container--heading'>Sign Up</div>
                        <SignUpForm />
                    </div>
                </Modal>
            )}
        </>
    );
}

export default SignUpFormModal;
