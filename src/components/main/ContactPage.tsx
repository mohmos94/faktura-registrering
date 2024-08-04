// src/components/main/ContactPage.tsx
import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Grid, Avatar } from '@mui/material';

const ContactPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form submitted', { name, email, message });
        alert('Your message has been sent!');
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <Container maxWidth="md">
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Contact Us
                </Typography>

                {/* Developer Section */}
                <Box mt={4}>
                    <Typography variant="h5" gutterBottom>
                        Our Team
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Avatar alt="Developer Name" src="https://via.placeholder.com/300" sx={{ width: 80, height: 80 }} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6">Developed by:</Typography>
                                    <Typography variant="body1">Your Name</Typography>
                                    <Typography variant="body2">Lead Developer</Typography>
                                    <Typography variant="body2">your.email@example.com</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Avatar alt="Developer Name" src="https://via.placeholder.com/300" sx={{ width: 80, height: 80 }} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6">Developed by:</Typography>
                                    <Typography variant="body1">Developer 2</Typography>
                                    <Typography variant="body2">Developer Role</Typography>
                                    <Typography variant="body2">developer2@example.com</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>

                {/* Contact Information */}
                <Box mt={4}>
                    <Typography variant="h5" gutterBottom>
                        Contact Information
                    </Typography>
                    <Typography variant="body1">
                        For any inquiries or support, please reach out to us:
                    </Typography>
                    <Typography variant="body2">
                        Phone: +47 123 456 789
                    </Typography>
                    <Typography variant="body2">
                        Email: <a href="mailto:support@example.com">support@example.com</a>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Office Hours: Monday - Friday, 09:00 - 17:00
                    </Typography>
                </Box>

                {/* Contact Form */}
                <Box mt={4}>
                    <Typography variant="h5" gutterBottom>
                        Send Us a Message
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            label="Message"
                            multiline
                            rows={4}
                            fullWidth
                            margin="normal"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                        <Box mt={2}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Send Message
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Container>
    );
};

export default ContactPage;
