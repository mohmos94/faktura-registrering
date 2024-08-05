// src/hooks/useAuthToken.ts
import { useSession } from '@clerk/clerk-react';

export const useAuthToken = () => {
    const { isLoaded, session, isSignedIn } = useSession();

    // Function to retrieve the token
    const getAuthToken = async () => {
        if (session) {
            try {
                // Retrieve the JWT token
                const token = await session.getToken();
                return token;
            } catch (error) {
                console.error('Error retrieving token:', error);
                return null;
            }
        }
        return null;
    };

    return { getAuthToken, isLoaded, isSignedIn };
};
