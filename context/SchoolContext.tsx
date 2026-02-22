import React, { createContext, useContext, ReactNode } from 'react';
import { SchoolConfig } from '../types/school';

interface SchoolContextValue {
    school: SchoolConfig | null;
    isSchoolPage: boolean;
}

const SchoolContext = createContext<SchoolContextValue>({
    school: null,
    isSchoolPage: false
});

export const useSchool = () => useContext(SchoolContext);

interface SchoolProviderProps {
    children: ReactNode;
    school: SchoolConfig | null;
}

export const SchoolProvider: React.FC<SchoolProviderProps> = ({ children, school }) => {
    return (
        <SchoolContext.Provider value={{ school, isSchoolPage: school !== null }}>
            {children}
        </SchoolContext.Provider>
    );
};
