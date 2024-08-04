// src/pages/IntroductionPage.tsx
import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import FeatureCard from '../main/FeatureCard';

const IntroductionPage: React.FC = () => {
    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h3" gutterBottom>
                    Velkommen til Faktura System
                </Typography>
                <Typography variant="body1" paragraph>
                    Vårt fakturasystem er designet for å hjelpe små og mellomstore bedrifter med å administrere sine fakturaer enkelt og effektivt. Her kan du opprette, administrere og sende fakturaer til dine kunder på en praktisk måte.
                </Typography>

                <Typography variant="h4" gutterBottom>
                    Hvordan det fungerer
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <FeatureCard
                            title="Opprett Faktura"
                            description="Opprett nye fakturaer med letthet ved å fylle inn nødvendig informasjon om varer og tjenester."
                            imageUrl="https://via.placeholder.com/300"
                            link="/create/invoice"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FeatureCard
                            title="Administrer Faktura"
                            description="Administrer alle dine fakturaer på ett sted. Rediger, se status og send dem når de er klare."
                            imageUrl="https://via.placeholder.com/300"
                            link="/manage/invoice"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FeatureCard
                            title="Send Faktura"
                            description="Send fakturaene dine direkte til kundene dine via e-post, raskt og enkelt."
                            imageUrl="https://via.placeholder.com/300"
                            link="/send/invoice"
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default IntroductionPage;
