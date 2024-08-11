// Define the main interface for Brreg Enhet (Entity)
export interface BrregEnhet {
    organisasjonsnummer: string; // Organization number
    navn: string; // Name of the organization
    organisasjonsform: Organisasjonsform; // Organization form
    registreringsdatoEnhetsregisteret: string; // Registration date in the entity register
    registrertIMvaregisteret: boolean; // Registered in the VAT register
    naeringskode1?: Naeringskode; // Primary industry code
    harRegistrertAntallAnsatte: boolean; // Has registered number of employees
    forretningsadresse: Adresse; // Business address
    postadresse?: Adresse; // Postal address
    stiftelsesdato: string; // Establishment date
    institusjonellSektorkode: InstitusjonellSektorkode; // Institutional sector code
    registrertIForetaksregisteret: boolean; // Registered in the business register
    registrertIStiftelsesregisteret: boolean; // Registered in the foundation register
    registrertIFrivillighetsregisteret: boolean; // Registered in the volunteer register
    konkurs: boolean; // Bankruptcy status
    underAvvikling: boolean; // Under liquidation
    underTvangsavviklingEllerTvangsopplosning: boolean; // Under forced liquidation or dissolution
    maalform: string; // Language form (e.g., Bokmål)
    aktivitet: string[]; // List of activities
}

export interface Organization {
    organisasjonsnummer: string; // Organization number
    navn: string; // Name of the organization
}

// Interface for organizational form
export interface Organisasjonsform {
    kode: string; // Code for organization form
    beskrivelse: string; // Description of organization form
}

// Interface for industry code
export interface Naeringskode {
    kode: string; // Industry code
    beskrivelse: string; // Description of industry code
}

// Interface for address
export interface Adresse {
    land: string; // Country
    landkode: string; // Country code
    postnummer: string; // Postal code
    poststed: string; // Postal area
    adresse: string[]; // List of address lines
    kommune: string; // Municipality
    kommunenummer: string; // Municipality number
}

// Interface for institutional sector code
export interface InstitusjonellSektorkode {
    kode: string; // Sector code
    beskrivelse: string; // Description of sector code
}

// In your Interface.ts or the appropriate file

export interface Betalingsinformasjon {
    kontonummer: string;
    fakturanummer: string;  // Ensure this property is included
    forfallsdato: string;
}


export interface fakturaInformasjon {
    beskrivelse: string; // Description of the item or service
    antall: number;      // Quantity of items
    pris: number;        // Price per item
    mva: number;         // VAT rate for the item or service
}




export interface BrukerDTO {
    fornavn: string;
    etternavn: string;
    epost: string;
    telefonnummer: string;
}

export interface Organisasjon {
    organisasjonsnummer: string;
    navn: string;
    organisasjonsformKode: string;
    registreringsdato: string;
    stiftelsesdato: string;
    institusjonellSektorkodeKode: string;
    maalform: string;
}

// Interface for Faktura
export interface Faktura {
    fakturanummer: string;
    fakturadato: string;
    forfallsdato: string;
    sumEksMva: number;
    mvaBelop: number;
    totalBelop: number;
    avsenderOrganisasjonsnummer: string;
    mottakerOrganisasjonsnummer: string;
    kontonummer: string;
    kidNummer?: string;
    kundenavn: string;
    postadresse: string;
    postnummerSted: string;
    notat: string;
    fakturaLinjer: FakturaLinje[];
}


// Interface for FakturaLinje (Invoice Line)
export interface FakturaLinje {
    fakturanummer: string;
    varebeskrivelse: string;
    antall: number;
    prisPerEnhet: number;
    mvaSats: number;
}


// Interface for Payment Information
export interface Betalingsinformasjon {
    kontonummer: string;
    fakturanummer: string;
    forfallsdato: string;
}

// Interface for Invoice Information (can be part of FakturaLinje)
export interface fakturaInformasjon {
    beskrivelse: string;
    antall: number;
    pris: number;
    mva: number;
}