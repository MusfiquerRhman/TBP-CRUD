// types that is used in multiple files. This is a good practice to avoid duplication of code and to make the codebase more maintainable.

// Define the HTML input element ref prop
export type InputRefProp = HTMLInputElement | null;

// Define the error state for products 
export interface ErrorStateProducts {
    name: string;
    title: string;
    description: string;
}

// Define the error state interface
export interface ErrorStateUsers {
    email: string;
    password: string;
    global?: string;
}

// Define the products interface
export interface Products {
    id: number;
    name: string;
    title: string;
    description: string;
}