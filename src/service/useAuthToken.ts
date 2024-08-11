import { useSession } from '@clerk/clerk-react';
import { useCallback } from 'react';

export const useAuthToken = () => {
    const { isLoaded, session, isSignedIn } = useSession();

    // Memoize the function to avoid re-creating on every render
    const getAuthToken = useCallback(async () => {
        if (session) {
            try {
                const token = await session.getToken();
                return token;
            } catch (error) {
                console.error('Error retrieving token:', error);
                return null;
            }
        }
        return null;
    }, [session]);

    return { getAuthToken, isLoaded, isSignedIn };
};
