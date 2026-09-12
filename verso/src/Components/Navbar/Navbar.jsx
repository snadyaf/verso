import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';

import './Navbar.css';

export default function Navbar() {

    const items = [
        {
            label: 'Início'
        },
        {
            label: 'Explorar'
        },
        {
            label: 'Minha Biblioteca'
        }
    ];

    const start = (
        <div className="navbar-logo">
            <span className="logo-icon">V</span>
            <span className="logo-text">VERSO</span>
        </div>
    );

    const end = (
        <div className="navbar-actions">

            <Button
                icon="pi pi-search"
                className="navbar-icon-button"
                text
            />

            <Button
                icon="pi pi-sun"
                className="navbar-icon-button"
                text
            />

            <Button
                icon="pi pi-book"
                className="navbar-icon-button"
                text
            />

            <Avatar
                label="A"
                shape="circle"
                className="navbar-avatar"
            />

        </div>
    );

    return (
        <Menubar
            model={items}
            start={start}
            end={end}
            className="navbar"
        />
    );
}