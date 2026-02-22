export interface SchoolConfig {
    /** URL-friendly identifier (e.g., 'delhi-public-school') */
    slug: string;
    /** Display name of the school */
    name: string;
    /** Optional custom logo URL */
    logo?: string;
    /** Optional primary theme color (hex) */
    primaryColor?: string;
    /** Optional target number of pledges */
    targetPledges?: number;
    /** Optional custom welcome message */
    welcomeMessage?: string;
}
