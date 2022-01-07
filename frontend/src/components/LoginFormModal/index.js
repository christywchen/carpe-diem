import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import SignUpFormModal from '../SignUpFormModal';
import LoginForm from './LoginForm';

function LoginFormModal({ button = false }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {button ?
                <button className='button button__submit--secondary' type="submit">Want to Log In?</button> :
                <NavLink to='/' onClick={() => setShowModal(true)}>Sign Up</NavLink>
            }
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div id='modal__container--form modal__container--sign-up'>
                        <div id='modal__container--heading'>Log In</div>
                        <LoginForm />
                        <hr />
                        <button className='button button__submit--primary' type="submit">Demo User</button>
                        <SignUpFormModal button={true} />
                    </div>
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
