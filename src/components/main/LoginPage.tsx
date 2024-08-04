// src/pages/LoginPage.tsx
import React from 'react';
import { RedirectToSignIn } from '@clerk/clerk-react';

const LoginPage: React.FC = () => {
    // Clerk handles redirect to their own hosted sign-in page
    return <RedirectToSignIn />;
};

export default LoginPage;
