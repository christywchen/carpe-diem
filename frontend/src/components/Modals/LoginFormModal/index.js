import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Modal } from '../../../context/Modal';
import SignUpFormModal from '../../Modals/SignUpFormModal';
import LoginForm from './LoginForm';

function LoginFormModal({ button = false }) {
    const navigate = useNavigate();

    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (sessionUser) navigate('/');
    }, [sessionUser]);

    return (
        <>
            {button ?
                <button className='button button__submit--secondary button__modal button__modal' type="submit">Want to Log In?</button> :
                <button className='button nav__button--link nav__button--link-main button__modal' onClick={() => setShowModal(true)}>Log In</button>
            }
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div id='modal__container--form modal__container--sign-up'>
                        <div id='modal__container--heading'>Log In</div>
                        <LoginForm />
                        <hr />
                        <button className='button button__submit--primary button__modal' type="submit">Demo User</button>
                        <SignUpFormModal button={true} />
                    </div>
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
