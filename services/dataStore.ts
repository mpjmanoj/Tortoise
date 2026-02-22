import { UserData } from '../types';

// Google Apps Script Web App URL — stored in .env as VITE_SCRIPT_URL
const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL as string;

interface SaveOptions {
  schoolSlug?: string;
  schoolName?: string;
}

export const saveUserData = async (userData: UserData, options?: SaveOptions): Promise<boolean> => {
  try {
    const payload = {
      timestamp: new Date().toISOString(),
      fullName: userData.fullName,
      email: userData.email,
      phone: `${userData.countryCode}${userData.phone}`,
      commitment: 'Tortoise Conservation Guardian',
      photoStatus: userData.photo ? 'Uploaded' : 'None',
      score: userData.score || 0,
      // Include school info if available
      schoolSlug: options?.schoolSlug || 'general',
      schoolName: options?.schoolName || 'General Public'
    };

    // Submit tortoise guardian data

    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Important for Google Apps Script
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return true;
  } catch (error) {
    console.error('Error saving guardian commitment:', error);
    return false;
  }
};