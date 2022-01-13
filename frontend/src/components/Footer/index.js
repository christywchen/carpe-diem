import { NavLink } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <nav id='footer'>
            <a href="https://github.com/christywchen/carpe-diem" target="_blank" rel="noreferrer noopener">Project Info</a>
            <a href="https://github.com/christywchen/" target="_blank" rel="noreferrer noopener">GitHub</a>
            <a href="https://www.linkedin.com/in/christywchen" target="_blank" rel="noreferrer noopener">LinkedIn</a>
        </nav>
    )
}

export default Footer;
