// src/components/main/SendInvoice.tsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const SendInvoice: React.FC = () => {
    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Send Fakturaer
                </Typography>
                <Typography variant="body1">
                    Send dine fakturaer direkte til kundene dine via e-post raskt og enkelt.
                </Typography>
            </Box>
        </Container>
    );
};

export default SendInvoice;
