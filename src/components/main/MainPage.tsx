// src/pages/MainPage.tsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Invoice from '../invoice/Invoice';

const MainPage: React.FC = () => {
    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h3" gutterBottom>
                    Velkommen til Faktura System
                </Typography>
                <Invoice />
            </Box>
        </Container>
    );
};

export default MainPage;
