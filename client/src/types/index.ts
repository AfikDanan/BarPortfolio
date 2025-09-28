export interface Project {
    id: string;
    title: string;
    client: string;
    description: string;
    overview: string;
    role: string;
    process: string;
    tools: string[];
    duration: string;
    impact: string;
    imageUrl: string;
    detailImages: string[];
    category: 'mobile' | 'web' | 'complex-systems';
    year: string;
    featured: boolean;
    headerColor: string;
}

export interface ContactForm {
    name: string;
    email: string;
    message: string;
}

export interface AdminUser {
    username: string;
    password: string;
}

export interface AppState {
    projects: Project[];
    isAdmin: boolean;
    currentSection: string;
    isLoading: boolean;
}

// Export Company interface
export type { Company } from './Company';
