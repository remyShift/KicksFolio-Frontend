import React, { createContext, useContext } from 'react';

type FormContextType = {
    setActiveInput: (inputType: string | null) => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
    const [activeInput, setActiveInput] = React.useState<string | null>(null);

    return (
        <FormContext.Provider value={{ setActiveInput }}>
            {children}
        </FormContext.Provider>
    );
}

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};