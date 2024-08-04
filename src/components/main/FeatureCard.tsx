// src/components/main/FeatureCard.tsx
import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
    title: string;
    description: string;
    imageUrl: string;
    link: string; // The route path to navigate to
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imageUrl, link }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(link);
    };

    return (
        <Card>
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    component="img"
                    height="140"
                    image={imageUrl}
                    alt={title}
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default FeatureCard;
