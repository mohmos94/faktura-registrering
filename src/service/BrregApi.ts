// src/service/BrregApi.ts
import { BrregEnhet } from './Interface'; // Assuming BrregEnhet is the appropriate interface for the response
import { BrukerDTO } from './Interface';
import { Organisasjon } from './Interface'; // Assuming Organisasjon is defined

const BASE_URL = "http://localhost:8080/api/v1/";

// Function to fetch organization data by organization number (orgnr)
export async function fetchBrregData(orgnr: string, token: string): Promise<BrregEnhet> {
    try {
        const response = await fetch(`${BASE_URL}brreg/${orgnr}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include JWT in request
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Feil med henting av organisasjonsdata: ${errorMessage}`);
        }

        const data = await response.json();
        console.log("json data:" + response.headers)
        return data as BrregEnhet;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Feil med henting av organisasjonsdata: ${error.message}`);
        } else {
            throw new Error(`Ukjent feil med henting av organisasjonsdata`);
        }
    }
}




// Function to register a user
export async function registerUser(bruker: BrukerDTO, token: string): Promise<BrukerDTO> {
    try {
        const response = await fetch(`${BASE_URL}brukere`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include JWT in request
            },
            body: JSON.stringify(bruker),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Feil ved registrering av bruker: ${errorMessage}`);
        }

        const data = await response.json();
        return data as BrukerDTO;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Feil ved registrering av bruker: ${error.message}`);
        } else {
            throw new Error(`Ukjent feil ved registrering av bruker`);
        }
    }
}


export async function getUserByemail(
    email: string,
    token: string): Promise<BrukerDTO> {
    try {
        const response = await fetch(`${BASE_URL}brukere/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include JWT in request
            },


        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.log(`Feil ved registrering av bruker: ${errorMessage}`);
        }

        const data = await response.json();
        return data as BrukerDTO;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Feil ved registrering av bruker: ${error.message}`);
        } else {
            throw new Error(`Ukjent feil ved registrering av bruker`);
        }
    }
}


export async function createOrganisasjon(organisasjon: Organisasjon, token: string): Promise<Organisasjon> {
    try {
        const response = await fetch(`${BASE_URL}organisasjoner`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include JWT in request
            },
            body: JSON.stringify(organisasjon),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Feil ved oppretting av organisasjon: ${errorMessage}`);
        }

        const data = await response.json();
        return data as Organisasjon;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Feil ved oppretting av organisasjon: ${error.message}`);
        } else {
            throw new Error(`Ukjent feil ved oppretting av organisasjon`);
        }
    }
}

