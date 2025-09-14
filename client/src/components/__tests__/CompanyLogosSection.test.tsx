import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { CompanyLogosSection } from '../CompanyLogosSection';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
        p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
        button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
        h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    },
    useReducedMotion: () => false,
}));

// Mock responsive hook
jest.mock('../../hooks/useResponsive', () => ({
    useResponsive: () => ({
        isMobile: false,
        isTablet: false,
        isTouchDevice: false,
    }),
}));

// Mock responsive test utility
jest.mock('../../utils/responsiveTest', () => ({
    logResponsiveTest: jest.fn(),
}));

describe('CompanyLogosSection Error Handling', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('displays loading skeleton while fetching data', async () => {
        // Mock a delayed response
        mockedAxios.get.mockImplementation(() =>
            new Promise(resolve => setTimeout(() => resolve({ data: [] }), 100))
        );

        render(<CompanyLogosSection />);

        // Should show loading skeleton
        expect(screen.getByText('Loading company logos...')).toBeInTheDocument();

        // Wait for loading to complete
        await waitFor(() => {
            expect(screen.queryByText('Loading company logos...')).not.toBeInTheDocument();
        });
    });

    it('displays error state when API call fails', async () => {
        mockedAxios.get.mockRejectedValue(new Error('Network error'));

        render(<CompanyLogosSection />);

        await waitFor(() => {
            expect(screen.getByText('Unable to Load Company Logos')).toBeInTheDocument();
            expect(screen.getByText(/Failed to load company logos/)).toBeInTheDocument();
            expect(screen.getByText('Try Again')).toBeInTheDocument();
        });
    });

    it('displays timeout error message for timeout errors', async () => {
        const timeoutError = new Error('timeout');
        timeoutError.name = 'ECONNABORTED';
        mockedAxios.isAxiosError.mockReturnValue(true);
        mockedAxios.get.mockRejectedValue({
            code: 'ECONNABORTED',
            isAxiosError: true,
        });

        render(<CompanyLogosSection />);

        await waitFor(() => {
            expect(screen.getByText(/Request timed out/)).toBeInTheDocument();
        });
    });

    it('allows retry functionality', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network error'))
            .mockResolvedValueOnce({ data: [{ id: '1', name: 'Test Company', logoUrl: '/test.png' }] });

        render(<CompanyLogosSection />);

        // Wait for error state
        await waitFor(() => {
            expect(screen.getByText('Try Again')).toBeInTheDocument();
        });

        // Click retry button
        fireEvent.click(screen.getByText('Try Again'));

        // Should show loading again
        expect(screen.getByText('Loading company logos...')).toBeInTheDocument();

        // Wait for successful load
        await waitFor(() => {
            expect(screen.queryByText('Unable to Load Company Logos')).not.toBeInTheDocument();
        });
    });

    it('displays empty state when no companies are returned', async () => {
        mockedAxios.get.mockResolvedValue({ data: [] });

        render(<CompanyLogosSection />);

        await waitFor(() => {
            expect(screen.getByText('No Company Logos Available')).toBeInTheDocument();
            expect(screen.getByText(/Company logos will appear here/)).toBeInTheDocument();
        });
    });

    it('limits retry attempts to 3', async () => {
        mockedAxios.get.mockRejectedValue(new Error('Network error'));

        render(<CompanyLogosSection />);

        // Wait for initial error
        await waitFor(() => {
            expect(screen.getByText('Try Again')).toBeInTheDocument();
        });

        // Retry 3 times
        for (let i = 0; i < 3; i++) {
            fireEvent.click(screen.getByText('Try Again'));
            await waitFor(() => {
                expect(screen.getByText('Try Again')).toBeInTheDocument();
            });
        }

        // After 3 retries, should show max attempts message
        await waitFor(() => {
            expect(screen.getByText(/Maximum retry attempts reached/)).toBeInTheDocument();
            expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
        });
    });
});