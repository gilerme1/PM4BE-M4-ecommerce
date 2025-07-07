/* eslint-disable prettier/prettier */
export interface User {
    id: string;
    email: string;
    name: string;
    password: string;
    address: string;
    phone: string;
    country?: string; 
    city?: string;    // El ? indica que es opcional
}