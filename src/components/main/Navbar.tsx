// src/components/Navbar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Faktura System
                    </Link>
                </Typography>
                <Link to="/main" style={{ color: 'inherit', textDecoration: 'none', marginRight: '16px' }}>
                    Main
                </Link>
                <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none', marginRight: '16px' }}>
                    Contact
                </Link>
                <SignedIn>
                    <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none', marginRight: '16px' }}>
                        Profile
                    </Link>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <SignInButton mode="modal" />
                </SignedOut>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
