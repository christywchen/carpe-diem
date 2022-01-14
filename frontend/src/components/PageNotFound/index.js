import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const redirect = setTimeout(() => navigate('/'), 1350);

        return (() => clearTimeout(redirect))
    });

    return (
        <>
            <div id='main__narrow'>
                <h1>Page Not Found</h1>

                <div id='content'>
                    Oops, how'd you get here? Sending you back to the main page.
                </div>
            </div>
        </>
    )
}

export default PageNotFound;
