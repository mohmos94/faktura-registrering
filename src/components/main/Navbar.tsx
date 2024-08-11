// src/components/Navbar.tsx
import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth, useClerk } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { getUserByemail, registerUser } from '../../service/API'; // Import your registerUser function
import { BrukerDTO } from '../../service/Interface'; // Import the BrukerDTO interface
import { useAuthToken } from '../../service/useAuthToken';

const Navbar: React.FC = () => {
    const { isSignedIn, userId } = useAuth(); // Use Clerk hooks to get the signed-in state and user ID
    const { user } = useClerk(); // Use Clerk hook to access user information
    const { getAuthToken } = useAuthToken();

    useEffect(() => {
        const registerNewUser = async () => {
            if (isSignedIn && userId && user) { // Ensure user is signed in and data is available
                const token = await getAuthToken(); // Get the authentication token
                if (token) {
                    const email = user.primaryEmailAddress?.emailAddress || 'default@example.com';
                    const existUser = await getUserByemail(email, token);
                    if (!existUser) {
                        const bruker: BrukerDTO = {
                            fornavn: user.firstName || 'Default', // Use Clerk's user data or set a default
                            etternavn: user.lastName || 'Default', // Use Clerk's user data or set a default
                            epost: user.primaryEmailAddress?.emailAddress || 'default@example.com', // Use Clerk's user data or set a default
                            telefonnummer: user.primaryPhoneNumber?.phoneNumber || '00000000', // Use Clerk's user data or set a default
                        };
                        try {
                            await registerUser(bruker, token); // Call the registerUser function with the token
                            console.log('User registered successfully.');
                        } catch (error) {
                            console.error('Error registering user:', error);
                        }
                    }
                }
            }
        };

        registerNewUser(); // Register the user when component mounts if they're signed in
    }, [isSignedIn, userId, user]); // Depend on isSignedIn, userId, and user to trigger useEffect

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
                    INVOICE
                </Link>
                <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none', marginRight: '16px' }}>
                    CONTACT
                </Link>
                <SignedIn>
                    <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none', marginRight: '16px' }}>
                        PROFILE
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
