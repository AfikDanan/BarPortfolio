/**
 * Utility functions to test responsive behavior
 */

export interface ResponsiveTestResult {
    breakpoint: string;
    gridColumns: number;
    gap: string;
    padding: string;
    fontSize: string;
    isOptimal: boolean;
    recommendations: string[];
}

export const testResponsiveBreakpoints = (): ResponsiveTestResult[] => {
    const breakpoints = [
        { name: 'mobile', width: 375 },
        { name: 'mobile-large', width: 414 },
        { name: 'tablet', width: 768 },
        { name: 'tablet-large', width: 1024 },
        { name: 'desktop', width: 1280 },
        { name: 'desktop-large', width: 1920 }
    ];

    return breakpoints.map(bp => {
        const recommendations: string[] = [];
        let isOptimal = true;

        // Determine expected grid columns based on breakpoint
        let expectedColumns: number;
        let expectedGap: string;
        let expectedPadding: string;
        let expectedFontSize: string;

        if (bp.width < 640) {
            expectedColumns = 2;
            expectedGap = 'gap-4';
            expectedPadding = 'py-12';
            expectedFontSize = 'text-2xl';
        } else if (bp.width < 768) {
            expectedColumns = 3;
            expectedGap = 'gap-6';
            expectedPadding = 'py-16';
            expectedFontSize = 'text-3xl';
        } else if (bp.width < 1024) {
            expectedColumns = 4;
            expectedGap = 'gap-6';
            expectedPadding = 'py-16';
            expectedFontSize = 'text-4xl';
        } else if (bp.width < 1280) {
            expectedColumns = 5;
            expectedGap = 'gap-8';
            expectedPadding = 'py-20';
            expectedFontSize = 'text-5xl';
        } else {
            expectedColumns = 6;
            expectedGap = 'gap-8';
            expectedPadding = 'py-20';
            expectedFontSize = 'text-5xl';
        }

        // Add recommendations based on breakpoint
        if (bp.width < 640) {
            recommendations.push('Ensure touch targets are at least 44px');
            recommendations.push('Use larger tap areas for better mobile interaction');
            recommendations.push('Consider reducing animation complexity');
        }

        if (bp.width >= 640 && bp.width < 1024) {
            recommendations.push('Optimize for tablet landscape and portrait modes');
            recommendations.push('Test with virtual keyboards visible');
        }

        if (bp.width >= 1024) {
            recommendations.push('Utilize available space with larger logos');
            recommendations.push('Consider hover effects for desktop users');
        }

        return {
            breakpoint: bp.name,
            gridColumns: expectedColumns,
            gap: expectedGap,
            padding: expectedPadding,
            fontSize: expectedFontSize,
            isOptimal,
            recommendations
        };
    });
};

export const validateTouchTargets = (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect();
    const minTouchTarget = 44; // 44px minimum for accessibility

    return rect.width >= minTouchTarget && rect.height >= minTouchTarget;
};

export const testAccessibility = (): string[] => {
    const issues: string[] = [];

    // Check for proper alt text
    const images = document.querySelectorAll('.company-logo-image');
    images.forEach((img, index) => {
        const altText = img.getAttribute('alt');
        if (!altText || altText.trim() === '') {
            issues.push(`Image ${index + 1} missing alt text`);
        }
    });

    // Check for proper ARIA labels
    const logoContainers = document.querySelectorAll('.company-logo-container');
    logoContainers.forEach((container, index) => {
        const ariaLabel = container.getAttribute('aria-label');
        if (!ariaLabel) {
            issues.push(`Logo container ${index + 1} missing aria-label`);
        }
    });

    // Check for keyboard accessibility
    logoContainers.forEach((container, index) => {
        const tabIndex = container.getAttribute('tabindex');
        if (tabIndex === null) {
            issues.push(`Logo container ${index + 1} not keyboard accessible`);
        }
    });

    return issues;
};

export const logResponsiveTest = (): void => {
    console.group('🔍 Responsive Design Test Results');

    const results = testResponsiveBreakpoints();
    results.forEach(result => {
        console.group(`📱 ${result.breakpoint.toUpperCase()}`);
        console.log(`Grid Columns: ${result.gridColumns}`);
        console.log(`Gap: ${result.gap}`);
        console.log(`Padding: ${result.padding}`);
        console.log(`Font Size: ${result.fontSize}`);
        console.log(`Optimal: ${result.isOptimal ? '✅' : '❌'}`);

        if (result.recommendations.length > 0) {
            console.log('Recommendations:');
            result.recommendations.forEach(rec => console.log(`  • ${rec}`));
        }
        console.groupEnd();
    });

    const accessibilityIssues = testAccessibility();
    if (accessibilityIssues.length > 0) {
        console.group('♿ Accessibility Issues');
        accessibilityIssues.forEach(issue => console.log(`❌ ${issue}`));
        console.groupEnd();
    } else {
        console.log('♿ Accessibility: All checks passed ✅');
    }

    console.groupEnd();
};