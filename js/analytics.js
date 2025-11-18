/* ============================================
   FitIQ Hub - Analytics & Tracking
   ============================================ */

/**
 * Initialize Google Analytics
 * Note: Add your Google Analytics tracking ID to the HTML file
 * Replace 'YOUR_TRACKING_ID' in the gtag script in index.html
 */

/**
 * Track calculator usage
 * @param {string} calculatorName - Name of calculator used
 * @param {object} data - Optional data object with results
 */
function trackCalculatorUse(calculatorName, data = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'calculator_used', {
            'calculator_name': calculatorName,
            'timestamp': new Date().toISOString(),
            ...data
        });
    }
    console.log(`Tracked: ${calculatorName}`, data);
}

/**
 * Track BMI calculation
 * @param {number} bmi - Calculated BMI value
 * @param {string} category - BMI category
 */
function trackBMICalculation(bmi, category) {
    trackCalculatorUse('BMI Calculator', {
        'bmi_value': bmi,
        'bmi_category': category
    });
}

/**
 * Track Body Fat calculation
 * @param {number} bodyFat - Calculated body fat percentage
 * @param {string} category - Body fat category
 */
function trackBodyFatCalculation(bodyFat, category) {
    trackCalculatorUse('Body Fat Calculator', {
        'body_fat_value': bodyFat,
        'body_fat_category': category
    });
}

/**
 * Track TDEE calculation
 * @param {number} bmr - Calculated BMR
 * @param {number} tdee - Calculated TDEE
 */
function trackTDEECalculation(bmr, tdee) {
    trackCalculatorUse('TDEE Calculator', {
        'bmr_value': bmr,
        'tdee_value': tdee
    });
}

/**
 * Track article view
 * @param {string} articleTitle - Title of article
 * @param {string} articleCategory - Category of article
 */
function trackArticleView(articleTitle, articleCategory) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'article_viewed', {
            'article_title': articleTitle,
            'article_category': articleCategory,
            'timestamp': new Date().toISOString()
        });
    }
    console.log(`Tracked article view: ${articleTitle}`);
}

/**
 * Track tool link clicks
 * @param {string} toolName - Name of tool
 */
function trackToolClick(toolName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'tool_clicked', {
            'tool_name': toolName,
            'timestamp': new Date().toISOString()
        });
    }
    console.log(`Tracked tool click: ${toolName}`);
}

/**
 * Track CTA clicks
 * @param {string} ctaText - CTA button text
 * @param {string} location - Where the CTA was located
 */
function trackCTAClick(ctaText, location) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_clicked', {
            'cta_text': ctaText,
            'cta_location': location,
            'timestamp': new Date().toISOString()
        });
    }
    console.log(`Tracked CTA click: ${ctaText} from ${location}`);
}

/**
 * Track page engagement (time on page)
 * @param {string} pageName - Name of the page
 */
function trackPageEngagement(pageName) {
    let engagementTime = 0;
    const startTime = Date.now();

    // Track when user leaves the page
    window.addEventListener('beforeunload', function() {
        engagementTime = Math.round((Date.now() - startTime) / 1000);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_engagement', {
                'page_name': pageName,
                'engagement_time_seconds': engagementTime,
                'timestamp': new Date().toISOString()
            });
        }
        console.log(`Page engagement: ${pageName} - ${engagementTime} seconds`);
    });
}

/**
 * Track scroll depth
 * @param {string} pageName - Name of the page
 */
function trackScrollDepth(pageName) {
    let maxScroll = 0;

    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        const scrollPercentage = Math.round((scrollTop + windowHeight) / documentHeight * 100);
        
        // Track at 25%, 50%, 75%, and 100%
        if (scrollPercentage > maxScroll) {
            if (scrollPercentage >= 25 && maxScroll < 25) {
                trackScrollMilestone(pageName, 25);
            }
            if (scrollPercentage >= 50 && maxScroll < 50) {
                trackScrollMilestone(pageName, 50);
            }
            if (scrollPercentage >= 75 && maxScroll < 75) {
                trackScrollMilestone(pageName, 75);
            }
            if (scrollPercentage >= 100 && maxScroll < 100) {
                trackScrollMilestone(pageName, 100);
            }
            maxScroll = scrollPercentage;
        }
    });
}

/**
 * Track scroll milestone
 * @param {string} pageName - Name of the page
 * @param {number} percentage - Scroll percentage
 */
function trackScrollMilestone(pageName, percentage) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'scroll_depth', {
            'page_name': pageName,
            'scroll_percentage': percentage,
            'timestamp': new Date().toISOString()
        });
    }
    console.log(`Tracked scroll: ${pageName} - ${percentage}%`);
}

/**
 * Track form submissions
 * @param {string} formName - Name of the form
 * @param {object} formData - Form data submitted
 */
function trackFormSubmission(formName, formData = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submitted', {
            'form_name': formName,
            'timestamp': new Date().toISOString(),
            ...formData
        });
    }
    console.log(`Tracked form submission: ${formName}`, formData);
}

/**
 * Track error events
 * @param {string} errorType - Type of error
 * @param {string} errorMessage - Error message
 */
function trackError(errorType, errorMessage) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'error', {
            'error_type': errorType,
            'error_message': errorMessage,
            'timestamp': new Date().toISOString()
        });
    }
    console.error(`Tracked error: ${errorType} - ${errorMessage}`);
}

/**
 * Track conversion event (e.g., calculator used + article read)
 * @param {string} conversionType - Type of conversion
 * @param {object} data - Conversion data
 */
function trackConversion(conversionType, data = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'conversion_type': conversionType,
            'timestamp': new Date().toISOString(),
            ...data
        });
    }
    console.log(`Tracked conversion: ${conversionType}`, data);
}

/**
 * Initialize all analytics tracking
 * Call this on page load
 */
function initializeAnalytics() {
    // Get page name from document title
    const pageName = document.title.split(' - ')[0] || 'Unknown Page';
    
    // Track page engagement
    trackPageEngagement(pageName);
    
    // Track scroll depth
    trackScrollDepth(pageName);
    
    // Track all CTA buttons
    document.querySelectorAll('.cta-button, .article-cta-button, .tool-cta, .article-link').forEach(button => {
        button.addEventListener('click', function() {
            const text = this.textContent.trim();
            const location = pageName;
            trackCTAClick(text, location);
        });
    });
    
    // Track all tool links
    document.querySelectorAll('.related-tool-link').forEach(link => {
        link.addEventListener('click', function() {
            const toolName = this.querySelector('strong')?.textContent || 'Unknown Tool';
            trackToolClick(toolName);
        });
    });
    
    console.log('Analytics initialized for:', pageName);
}

// Initialize analytics when DOM is ready
document.addEventListener('DOMContentLoaded', initializeAnalytics);

/**
 * Custom event tracking template
 * Use this for tracking specific user interactions
 * 
 * Example:
 * trackCustomEvent('user_interaction', {
 *     'action': 'clicked_button',
 *     'button_id': 'calculate-btn',
 *     'page': 'BMI Calculator'
 * });
 */
function trackCustomEvent(eventName, eventData = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'timestamp': new Date().toISOString(),
            ...eventData
        });
    }
    console.log(`Tracked event: ${eventName}`, eventData);
}

/**
 * Track calculator results sharing (if implemented)
 * @param {string} platform - Social media platform
 * @param {string} calculator - Calculator name
 */
function trackShare(platform, calculator) {
    trackCustomEvent('share', {
        'platform': platform,
        'calculator': calculator
    });
}

/**
 * Log page load performance metrics
 */
function trackPerformance() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_performance', {
                'page_load_time_ms': pageLoadTime,
                'timestamp': new Date().toISOString()
            });
        }
        console.log(`Page load time: ${pageLoadTime}ms`);
    }
}

// Track performance metrics on page load
window.addEventListener('load', trackPerformance);