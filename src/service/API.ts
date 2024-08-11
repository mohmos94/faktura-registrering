import { BrregEnhet, Faktura, FakturaLinje } from './Interface'; // Assuming BrregEnhet is the appropriate interface for the response
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

export async function saveOrganization(orgnr: string, token: string): Promise<BrregEnhet> {
    try {
        const response = await fetch(`${BASE_URL}brreg/organisation/orgnr/${orgnr}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include JWT in request
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Feil med lagring av organisasjonsdata: ${errorMessage}`);
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


export async function getOrganisationName(orgnr: string, token: string): Promise<Organisasjon> {
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
        return data as Organisasjon;
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


// Function to create a new Faktura
export async function createFaktura(faktura: Faktura, token: string): Promise<void> {
    try {
        const response = await fetch(`${BASE_URL}fakturaer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include JWT in request
            },
            body: JSON.stringify(faktura),
        });

        console.log("body: " + faktura)
        console.log("fakura sendt: " + response)

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Feil ved oppretting av faktura: ${errorMessage}`);
        }

        const data = await response.text();
        alert(data);

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Feil ved oppretting av faktura: ${error.message}`);
        } else {
            throw new Error(`Ukjent feil ved oppretting av faktura`);
        }
    }
}

// Function to get Faktura by organization number (orgnr)
export async function getFakturaByOrgNummer(orgnr: string, token: string): Promise<Faktura[]> {
    try {
        const response = await fetch(`${BASE_URL}fakturaer/org/${orgnr}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include JWT in request
            }
        });

        console.log("mosti er dum ")

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Feil ved henting av fakturaer: ${errorMessage}`);
        }

        const data = await response.json();
        return data as Faktura[];
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Feil ved henting av fakturaer: ${error.message}`);
        } else {
            throw new Error(`Ukjent feil ved henting av fakturaer`);
        }
    }
}



// Function to create a new FakturaLinje
export async function createFakturaLinje(fakturaLinje: FakturaLinje, token: string): Promise<FakturaLinje> {
    try {
        const response = await fetch(`${BASE_URL}fakturalinjer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include JWT in request
            },
            body: JSON.stringify(fakturaLinje),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Feil ved oppretting av fakturalinje: ${errorMessage}`);
        }

        const data = await response.json();
        return data as FakturaLinje;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Feil ved oppretting av fakturalinje: ${error.message}`);
        } else {
            throw new Error(`Ukjent feil ved oppretting av fakturalinje`);
        }
    }
}

// Function to get FakturaLinjer by fakturanummer
export async function getFakturaLinjerByFakturaNummer(fakturanummer: string, token: string): Promise<FakturaLinje[]> {
    try {
        const response = await fetch(`${BASE_URL}fakturalinjer/faktura/${fakturanummer}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include JWT in request
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Feil ved henting av fakturalinjer: ${errorMessage}`);
        }

        const data = await response.json();
        return data as FakturaLinje[];

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Feil ved henting av fakturalinjer: ${error.message}`);
        } else {
            throw new Error(`Ukjent feil ved henting av fakturalinjer`);
        }
    }
}

export async function oppdaterNotatFelt(fakturanummer: string, notat: string, token: string): Promise<boolean> {
    try {
        const response = await fetch(`${BASE_URL}fakturaer/oppdater/fakturanr/${fakturanummer}/notat`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ notat }) // Sender notatet som JSON i body
        });

        console.log("mosti sender en notat")

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Feil ved oppdatering av notat: ${errorMessage}`);
        }

        return true; // Returner true hvis oppdateringen var vellykket
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Feil ved oppdatering av notat: ${error.message}`);
        } else {
            throw new Error(`Ukjent feil ved oppdatering av notat`);
        }
    }
}


// Function to get Faktura by fakturanummer
export async function getFakturaByFakturaNummer(fakturanummer: string, token: string): Promise<Faktura> {
    try {
        const response = await fetch(`${BASE_URL}fakturaer/org/fakturanr/${fakturanummer}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Feil ved henting av faktura: ${errorMessage}`);
        }

        const data = await response.json();
        return data as Faktura;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Feil ved henting av faktura: ${error.message}`);
        } else {
            throw new Error(`Ukjent feil ved henting av faktura`);
        }
    }
}

