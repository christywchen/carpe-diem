import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import LoginFormModal from '../../Modals/LoginFormModal';
import SignUpForm from './SignUpForm';

function SignUpFormModal({ button = false }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {button ?
                <button className='button button__submit--secondary button__modal' type="submit">Want to Sign Up?</button> :
                <button className='button nav__button--link nav__button--link-main' onClick={() => setShowModal(true)}>Sign Up</button>
            }
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div id='modal__container--form'>
                        <div id='modal__container--heading'>Sign Up</div>
                        <div className='modal__container--text'>Join to start hosting and attending events!</div>
                        <SignUpForm />
                        <hr />
                        <button className='button button__submit--primary button__modal' type="submit">Demo User</button>
                        <LoginFormModal button={true} />
                    </div>
                </Modal>
            )}
        </>
    );
}

export default SignUpFormModal;
