/**
 * Utility functions to test error handling scenarios in development
 */

// Function to simulate network failure by temporarily breaking the API endpoint
export const simulateNetworkFailure = () => {
    if (process.env.NODE_ENV === 'development') {
        console.log('🔧 Simulating network failure...');

        // Override fetch to simulate network error
        const originalFetch = window.fetch;
        window.fetch = () => Promise.reject(new Error('Simulated network failure'));

        // Restore after 5 seconds
        setTimeout(() => {
            window.fetch = originalFetch;
            console.log('✅ Network restored');
        }, 5000);
    }
};

// Function to simulate slow network
export const simulateSlowNetwork = () => {
    if (process.env.NODE_ENV === 'development') {
        console.log('🐌 Simulating slow network...');

        const originalFetch = window.fetch;
        window.fetch = (...args) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(originalFetch(...args));
                }, 3000); // 3 second delay
            });
        };

        // Restore after 10 seconds
        setTimeout(() => {
            window.fetch = originalFetch;
            console.log('⚡ Network speed restored');
        }, 10000);
    }
};

// Function to simulate server error
export const simulateServerError = () => {
    if (process.env.NODE_ENV === 'development') {
        console.log('🚨 Simulating server error...');

        const originalFetch = window.fetch;
        window.fetch = () => Promise.resolve(new Response('', { status: 500 }));

        // Restore after 5 seconds
        setTimeout(() => {
            window.fetch = originalFetch;
            console.log('✅ Server restored');
        }, 5000);
    }
};

// Add these functions to window for easy testing in browser console
if (process.env.NODE_ENV === 'development') {
    (window as any).testErrorHandling = {
        simulateNetworkFailure,
        simulateSlowNetwork,
        simulateServerError,
    };
}