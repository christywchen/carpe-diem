import './Footer.css';

function Footer() {
    return (
        <nav id='footer'>
            <div className='footer__div--section'>
                <ul>
                    <li>JavaScript</li>
                    <li>Node.js</li>
                    <li>Express.js</li>
                    <li>Sequelize.js</li>
                    <li>PostgreSQL</li>
                    <li>React</li>
                    <li>Redux</li>
                    <li>HTML5</li>
                    <li>CSS3</li>
                </ul>
            </div>
            <hr className='footer__divider' />
            <div className='footer__div--section'>
                <ul>
                    <li>
                        <a href="https://github.com/christywchen/carpe-diem" target="_blank" rel="noreferrer noopener">Project Info</a>
                    </li>
                    <li>
                        <a href="https://github.com/christywchen/" target="_blank" rel="noreferrer noopener">GitHub</a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/christywchen" target="_blank" rel="noreferrer noopener">LinkedIn</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Footer;
