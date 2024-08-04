// src/components/main/ManageInvoice.tsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ManageInvoice: React.FC = () => {
    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Administrer Fakturaer
                </Typography>
                <Typography variant="body1">
                    Her kan du administrere dine eksisterende fakturaer. Rediger, slett eller se status for hver faktura.
                </Typography>
            </Box>
        </Container>
    );
};

export default ManageInvoice;
