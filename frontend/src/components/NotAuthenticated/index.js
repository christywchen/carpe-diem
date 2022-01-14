import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NotAuthenticated() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState();

    useEffect(() => {
        const redirect = setTimeout(() => navigate('/'), 1350);

        return (() => clearTimeout(redirect))
        setShowModal(true);
    });

    return (
        <>
            <div id='main__narrow'>
                <h1>Not Authenticated</h1>

                <div id='content'>
                    Uh oh, you need to be registered and logged in before you can host an event. Sending you back to the main page.
                </div>
            </div>
        </>
    )
}

export default NotAuthenticated;
