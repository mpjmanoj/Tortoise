import { SchoolConfig } from '../types/school';
import schoolsData from '../data/schools.json';

/**
 * Get school configuration by slug
 * Returns null if school not found
 */
export const getSchoolBySlug = (slug: string): SchoolConfig | null => {
    const school = schoolsData.schools.find(s => s.slug === slug);
    return school || null;
};

/**
 * Get all schools
 */
export const getAllSchools = (): SchoolConfig[] => {
    return schoolsData.schools;
};

/**
 * Generate shareable link for a school
 */
export const getSchoolLink = (slug: string, baseUrl: string = ''): string => {
    return `${baseUrl}/school/${slug}`;
};
