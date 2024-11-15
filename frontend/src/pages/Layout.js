import { Outlet, Link } from "react-router-dom";
import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, NavbarText } from 'reactstrap';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { token, logout } = useAuth();

    const toggle = () => setIsOpen(!isOpen);

    const handleSignOut = () => {
        logout();
        window.location.href = '/Login';
    };

    return (
        <>
            <Navbar className="m-2" expand="md">
                <NavbarBrand href="/">
                    <img
                        alt="logo"
                        src="/logo.png"
                        style={{
                            height: 40,
                            width: 40,
                        }}
                    />
                </NavbarBrand>
                <NavbarText>Notes</NavbarText>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto" navbar>
                        {token ? (
                            <>
                                <NavItem>
                                    <NavLink tag={Link} to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="#" onClick={handleSignOut}>Sign Out</NavLink>
                                </NavItem>
                            </>
                        ) : (
                            <>
                                <NavItem>
                                    <NavLink tag={Link} to="/SignUp">Sign Up</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/Login">Login</NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>

            <Outlet />
        </>
    );
};

export default Layout;