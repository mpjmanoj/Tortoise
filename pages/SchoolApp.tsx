import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { SchoolProvider } from '../context/SchoolContext';
import { getSchoolBySlug } from '../utils/schoolUtils';
import App from '../App';

/**
 * School-specific page that wraps the main App with school context
 * URL: /school/:slug
 */
const SchoolApp: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    // Get school config by slug
    const school = slug ? getSchoolBySlug(slug) : null;

    // If school not found, redirect to home
    if (!school) {
        return <Navigate to="/" replace />;
    }

    // Update page title with school name
    React.useEffect(() => {
        document.title = `${school.name} | Tortoise Guardians 🐢`;
    }, [school.name]);


    return (
        <SchoolProvider school={school}>
            <App />
        </SchoolProvider>
    );
};

export default SchoolApp;
