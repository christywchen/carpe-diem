import { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../../store/session';
import { Modal } from '../../../context/Modal';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';

function LoginFormModal({ button = false }) {
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
        navigate('/signup');
    }

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
                        <form onSubmit={handleDemo}>
                            <button className='button button__submit--primary button__modal' type="submit">Demo User</button>
                        </form>
                        <form onSubmit={handleRedirect}>
                            <button className='button button__submit--secondary button__modal button__modal' type="submit">Want to Sign Up?</button>
                        </form>
                        {/* <SignUpFormModal button={true} /> */}
                    </div>
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
