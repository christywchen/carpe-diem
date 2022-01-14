import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../../store/session';
import { Modal } from '../../../context/Modal';
import SignUpForm from './SignUpForm';

function SignUpFormModal({ button = false }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleDemo = (e) => {
        e.preventDefault();

        const credential = 'DemoUser';
        const password = 'password';

        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                await res.json();
            });
    }

    const handleRedirect = (e) => {
        e.preventDefault();
        setShowModal(false);
        navigate('/login');
    }

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
                        <form onSubmit={handleDemo}>
                            <button className='button button__submit--primary button__modal' type="submit">Demo User</button>
                        </form>
                        <form onSubmit={handleRedirect}>
                            <button className='button button__submit--secondary button__modal button__modal' type="submit">Want to Log In?</button>
                        </form>
                        {/* <LoginFormModal button={true} /> */}
                    </div>
                </Modal>
            )}
        </>
    );
}

export default SignUpFormModal;
