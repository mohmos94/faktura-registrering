// src/utils/calculations.ts

import { fakturaInformasjon } from '..//service/Interface';

export const calculateSubtotal = (items: fakturaInformasjon[]): number => {
    return items.reduce((sum, item) => sum + item.antall * item.pris, 0);
};

export const calculateTotalVat = (items: fakturaInformasjon[]): number => {
    return items.reduce((sum, item) => sum + item.antall * item.pris * (item.mva / 100), 0);
};

export const calculateTotal = (items: fakturaInformasjon[]): number => {
    const subtotal = calculateSubtotal(items);
    const totalVat = calculateTotalVat(items);
    return subtotal + totalVat;
};


export const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
};
