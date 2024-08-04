// src/components/main/CreateInvoice.tsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const CreateInvoice: React.FC = () => {
    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Opprett Faktura
                </Typography>
                <Typography variant="body1">
                    Her kan du opprette en ny faktura ved å fylle ut all nødvendig informasjon om varene eller tjenestene du tilbyr.
                </Typography>
            </Box>
        </Container>
    );
};

export default CreateInvoice;
