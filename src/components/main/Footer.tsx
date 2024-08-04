// src/components/Footer.tsx
import React from 'react';
import { Container, Box, Typography, Grid, Link } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import logo from '../../img/ebilag.png';
const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#f5f5f5',
                padding: '20px 0',
                marginTop: '40px',
                borderTop: '1px solid #e0e0e0',
            }}
        >
            <Container>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center">
                            <InfoIcon sx={{ mr: 1 }} />
                            <Typography variant="h6">Testelskap AS</Typography>
                        </Box>
                        <Typography variant="body2">
                            888999777 MVA Foretaksregisteret
                        </Typography>
                        <Typography variant="body2">
                            Ringvegen 10A, 2066 Jessheim, Norge
                        </Typography>
                        <Typography variant="body2">
                            Telefon: +47 123 456 789
                        </Typography>
                        <Typography variant="body2">
                            E-post: <Link href="mailto:testelskap@email.no">testelskap@email.no</Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ textAlign: 'right' }}>
                        <Typography variant="body2" gutterBottom>
                            © {new Date().getFullYear()} Testelskap AS. Alle rettigheter forbeholdt.
                        </Typography>
                        <img
                            src={logo}
                            alt="Company Logo"
                            style={{ maxWidth: '100px', marginTop: '10px', borderRadius: 50 }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
