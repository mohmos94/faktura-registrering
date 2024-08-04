// src/utils/validation.ts

interface Errors {
    accountNumber: string;
    kidNumber: string;
    dueDate: string;
    description: string;
    quantity: string;
    price: string;
    vatRate: string;
    invoiceNumber: string;
    invoiceDate: string;
}

export const validateInputs = (
    accountNumber: string,
    kidNumber: string,
    dueDate: string,
    description: string,
    quantity: number,
    price: number,
    vatRate: number,
    invoiceNumber: string,
    invoiceDate: string
): Errors => {
    const errors: Errors = {
        accountNumber: '',
        kidNumber: '',
        dueDate: '',
        description: '',
        quantity: '',
        price: '',
        vatRate: '',
        invoiceNumber: '',
        invoiceDate: '',
    };

    if (!accountNumber) {
        errors.accountNumber = 'Kontonummer er obligatorisk';
    }
    if (!kidNumber) {
        errors.kidNumber = 'KID-nummer er obligatorisk';
    }
    if (!dueDate) {
        errors.dueDate = 'Forfallsdato er obligatorisk';
    }
    if (!description) {
        errors.description = 'Varebeskrivelse er obligatorisk';
    }
    if (!invoiceNumber) {
        errors.invoiceNumber = 'Fakturanummer er obligatorisk';
    }
    if (!invoiceDate) {
        errors.invoiceDate = 'Fakturadato er obligatorisk';
    }
    if (quantity <= 0) {
        errors.quantity = 'Antall må være større enn null';
    }
    if (price <= 0) {
        errors.price = 'Pris må være større enn null';
    }
    if (vatRate < 0) {
        errors.vatRate = 'MVA-sats kan ikke være negativ';
    }
    if (dueDate && invoiceDate && new Date(dueDate) <= new Date(invoiceDate)) {
        errors.dueDate = 'Forfallsdato må være etter fakturadato';
    }

    return errors;
};
