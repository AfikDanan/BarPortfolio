/**
 * Interface for company data used in the Company Logos section
 */
export interface Company {
    /** Unique identifier for the company */
    id: string;

    /** Display name of the company */
    name: string;

    /** URL path to the company logo image */
    logoUrl: string;

    /** Optional descriptive alt text for accessibility (screen readers) */
    altText?: string;

    /** Optional company website URL for potential future linking functionality */
    website?: string;
}