import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <NavLink to='/' onClick={() => setShowModal(true)}>Log In</NavLink>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div id='modal__container--form'>
                        <div id='modal__container--heading'>Log In</div>
                        <LoginForm />
                    </div>
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
