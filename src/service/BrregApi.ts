import { BrregEnhet } from './Interface'; // Assuming BrregEnhet is the appropriate interface for the response

const BASE_URL = "http://localhost:8080/api/v1/";

// Function to fetch organization data by organization number (orgnr)
export async function fetchBrregData(orgnr: string): Promise<BrregEnhet> {
    try {
        const response = await fetch(`${BASE_URL}brreg/${orgnr}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Feil med henting av organisasjonsdata: ${errorMessage}`);
        }

        const data = await response.json();
        return data as BrregEnhet;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Feil med henting av organisasjonsdata: ${error.message}`);
        } else {
            throw new Error(`Ukjent feil med henting av organisasjonsdata`);
        }
    }
}
