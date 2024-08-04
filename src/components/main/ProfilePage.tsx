// src/pages/ProfilePage.tsx
import React from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { Container, Typography, Box, Button, Avatar, List, ListItem, ListItemText, Divider } from '@mui/material';

const ProfilePage: React.FC = () => {
    const { user } = useUser();
    const clerk = useClerk();

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
        if (confirmDelete) {
            try {
                await clerk.user?.delete();
                alert('Account deleted successfully.');
                clerk.signOut();
            } catch (error) {
                alert('An error occurred while deleting your account.');
            }
        }
    };

    // Dummy data for invoices
    const createdInvoices = [
        { id: 1, title: 'Invoice 001', date: '2024-08-01' },
        { id: 2, title: 'Invoice 002', date: '2024-08-02' },
    ];

    const approvedInvoices = [
        { id: 1, title: 'Invoice 101', date: '2024-07-25' },
    ];

    if (!user) {
        return <Typography variant="body1">User not found. Please log in again.</Typography>;
    }

    return (
        <Container maxWidth="md">
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Profile
                </Typography>
                <Box display="flex" alignItems="center" mb={2}>
                    <Avatar
                        alt={user.fullName || 'User'}
                        src={user.imageUrl}
                        sx={{ width: 100, height: 100, marginRight: 2 }}
                    />
                    <div>
                        <Typography variant="body1">
                            <strong>Name:</strong> {user.fullName || 'No name provided'}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Email:</strong> {user.emailAddresses[0].emailAddress}
                        </Typography>
                    </div>
                </Box>
                <Divider />
                <Box mt={4}>
                    <Typography variant="h5" gutterBottom>
                        Created Invoices
                    </Typography>
                    <List>
                        {createdInvoices.map(invoice => (
                            <ListItem key={invoice.id}>
                                <ListItemText
                                    primary={invoice.title}
                                    secondary={`Date: ${invoice.date}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box mt={4}>
                    <Typography variant="h5" gutterBottom>
                        Approved Invoices
                    </Typography>
                    <List>
                        {approvedInvoices.map(invoice => (
                            <ListItem key={invoice.id}>
                                <ListItemText
                                    primary={invoice.title}
                                    secondary={`Date: ${invoice.date}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box mt={4}>
                    <Button variant="contained" color="secondary" onClick={handleDeleteAccount}>
                        Delete Account
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ProfilePage;
