import React, { useEffect, useState } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { Container, Typography, Box, Button, Avatar, List, ListItem, ListItemText, Divider } from '@mui/material';
import { getFakturaByOrgNummer, getOrganisationName } from '../../service/API'; // Import the function to fetch invoices
import { Faktura, Organisasjon } from '../../service/Interface'; // Import the Faktura interface
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const ProfilePage: React.FC = () => {
    const { user } = useUser();
    const clerk = useClerk();
    const [invoices, setInvoices] = useState<Faktura[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [organization, setOrganization] = useState<Organisasjon | null>(null);

    // Grouped invoices by mottakerOrganisasjonsnummer
    const groupedInvoices = invoices.reduce((acc, invoice) => {
        const key = invoice.mottakerOrganisasjonsnummer;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(invoice);
        return acc;
    }, {} as Record<string, Faktura[]>);

    useEffect(() => {
        const fetchInvoices = async () => {
            if (user && user.publicMetadata && user.publicMetadata.organisasjonsnummer) {
                const orgNummer = user.publicMetadata.organisasjonsnummer as string;
                const token = await clerk.session?.getToken();

                if (token) {
                    try {
                        const fetchedInvoices = await getFakturaByOrgNummer(orgNummer, token);
                        setInvoices(fetchedInvoices);
                    } catch (err) {
                        setError('An error occurred while fetching invoices.');
                    }
                } else {
                    setError('Unable to authenticate.');
                }
            } else {
                setError('Organization number not found.');
            }
            setLoading(false);
        };

        fetchInvoices();
    }, [user, clerk]);



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

    if (loading) {
        return <Typography variant="body1">Loading invoices...</Typography>;
    }

    if (error) {
        return <Typography variant="body1" color="error">{error}</Typography>;
    }

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
                        Invoices by Organization
                    </Typography>
                    <List>
                        {Object.entries(groupedInvoices).map(([orgNum, invoices]) => (
                            <ListItem key={orgNum} button component={Link} to={`/invoices/${orgNum}`}>
                                <ListItemText
                                    primary={`Organization ${orgNum}`}
                                    secondary={`${invoices.length} invoice(s)`}
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
