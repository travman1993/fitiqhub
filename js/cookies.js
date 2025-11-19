/* ============================================
   FitIQ Hub - Cookie Consent Banner
   GDPR & CCPA Compliant
   ============================================ */

/**
 * Cookie Consent Manager
 * Handles user cookie preferences and banner display
 */

class CookieConsentManager {
    constructor() {
        this.CONSENT_COOKIE_NAME = 'fitiq_cookie_consent';
        this.CONSENT_DURATION = 365; // days
        this.banner = null;
        this.preferences = {
            essential: true, // Always enabled
            analytics: false,
            advertising: false
        };
        
        this.init();
    }

    /**
     * Initialize cookie consent manager
     */
    init() {
        // Check if user has already made a choice
        const savedPreferences = this.getConsentPreferences();
        
        if (savedPreferences) {
            this.preferences = savedPreferences;
            this.applyConsent();
        } else {
            // First visit - show banner
            this.showBanner();
        }
    }

    /**
     * Get stored consent preferences
     */
    getConsentPreferences() {
        const cookie = document.cookie.split('; ').find(row => 
            row.startsWith(this.CONSENT_COOKIE_NAME + '=')
        );
        
        if (cookie) {
            try {
                return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
            } catch (e) {
                console.error('Error parsing consent cookie:', e);
                return null;
            }
        }
        return null;
    }

    /**
     * Save consent preferences to cookie
     */
    saveConsentPreferences(preferences) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + (this.CONSENT_DURATION * 24 * 60 * 60 * 1000));
        
        const cookieValue = encodeURIComponent(JSON.stringify(preferences));
        document.cookie = `${this.CONSENT_COOKIE_NAME}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
    }

    /**
     * Create and show cookie consent banner
     */
    showBanner() {
        const bannerHTML = `
            <div id="cookieConsentBanner" class="cookie-consent-banner" role="dialog" aria-label="Cookie Consent">
                <div class="cookie-consent-content">
                    <div class="cookie-consent-text">
                        <h3 style="margin: 0 0 var(--spacing-sm) 0; font-size: var(--fs-base);">🍪 Cookie Preferences</h3>
                        <p style="margin: 0 0 var(--spacing-sm) 0; font-size: var(--fs-sm); color: var(--text-light-gray);">
                            We use cookies to improve your experience. You can choose which cookies to allow.
                        </p>
                        <div class="cookie-consent-options">
                            <label class="cookie-option">
                                <input type="checkbox" name="cookie-essential" checked disabled>
                                <span>Essential (always required)</span>
                            </label>
                            <label class="cookie-option">
                                <input type="checkbox" name="cookie-analytics">
                                <span>Analytics (understand how you use our site)</span>
                            </label>
                            <label class="cookie-option">
                                <input type="checkbox" name="cookie-advertising">
                                <span>Advertising (show relevant ads)</span>
                            </label>
                        </div>
                        <p style="margin: var(--spacing-sm) 0 0 0; font-size: var(--fs-xs); color: var(--text-medium-gray);">
                            <a href="cookie-policy.html" style="color: var(--primary-color); text-decoration: underline;">Read our Cookie Policy</a>
                        </p>
                    </div>
                    <div class="cookie-consent-buttons">
                        <button id="cookieRejectBtn" class="cookie-btn cookie-btn-reject">Reject</button>
                        <button id="cookieAcceptBtn" class="cookie-btn cookie-btn-accept">Accept All</button>
                    </div>
                </div>
            </div>
        `;

        // Add banner to page
        document.body.insertAdjacentHTML('beforeend', bannerHTML);
        this.banner = document.getElementById('cookieConsentBanner');

        // Inject CSS if not already there
        this.injectBannerCSS();

        // Add event listeners
        document.getElementById('cookieAcceptBtn').addEventListener('click', () => this.acceptAll());
        document.getElementById('cookieRejectBtn').addEventListener('click', () => this.rejectNonEssential());

        // Add custom preferences button
        this.addPreferencesButton();
    }

    /**
     * Inject CSS for cookie banner
     */
    injectBannerCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .cookie-consent-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: var(--bg-darker, #0F1217);
                border-top: 2px solid var(--primary-color, #00E676);
                z-index: 9999;
                padding: var(--spacing-lg, 24px);
                box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
                animation: slideUp 0.3s ease-out;
            }

            @keyframes slideUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            .cookie-consent-content {
                max-width: 1200px;
                margin: 0 auto;
                display: grid;
                grid-template-columns: 1fr auto;
                gap: var(--spacing-lg, 24px);
                align-items: center;
            }

            .cookie-consent-text {
                color: var(--text-white, #FFFFFF);
            }

            .cookie-consent-text h3 {
                color: var(--primary-color, #00E676);
                font-size: var(--fs-lg, 18px);
                font-weight: 700;
            }

            .cookie-consent-text p {
                color: var(--text-light-gray, #CCCCCC);
            }

            .cookie-consent-options {
                display: grid;
                gap: var(--spacing-md, 16px);
                margin: var(--spacing-lg, 24px) 0;
            }

            .cookie-option {
                display: flex;
                align-items: center;
                gap: var(--spacing-sm, 8px);
                cursor: pointer;
                font-size: var(--fs-sm, 14px);
                color: var(--text-light-gray, #CCCCCC);
            }

            .cookie-option input[type="checkbox"] {
                width: 18px;
                height: 18px;
                cursor: pointer;
                accent-color: var(--primary-color, #00E676);
            }

            .cookie-option input[type="checkbox"]:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .cookie-option span {
                flex: 1;
            }

            .cookie-consent-buttons {
                display: flex;
                gap: var(--spacing-md, 16px);
                flex-wrap: wrap;
                justify-content: flex-end;
            }

            .cookie-btn {
                padding: var(--spacing-md, 16px) var(--spacing-lg, 24px);
                border: none;
                border-radius: var(--radius-lg, 12px);
                font-weight: 600;
                font-size: var(--fs-sm, 14px);
                cursor: pointer;
                transition: all 0.3s ease;
                font-family: inherit;
                white-space: nowrap;
            }

            .cookie-btn-accept {
                background-color: var(--primary-color, #00E676);
                color: #000000;
            }

            .cookie-btn-accept:hover {
                background-color: var(--primary-dark, #00C853);
                box-shadow: 0 4px 12px rgba(0, 230, 118, 0.3);
                transform: translateY(-2px);
            }

            .cookie-btn-reject {
                background-color: transparent;
                color: var(--text-light-gray, #CCCCCC);
                border: 1px solid var(--border-color, #2A3035);
            }

            .cookie-btn-reject:hover {
                background-color: var(--bg-dark, #1A1F25);
                border-color: var(--primary-color, #00E676);
                color: var(--primary-color, #00E676);
            }

            /* Mobile responsive */
            @media (max-width: 768px) {
                .cookie-consent-content {
                    grid-template-columns: 1fr;
                    gap: var(--spacing-md, 16px);
                }

                .cookie-consent-banner {
                    padding: var(--spacing-md, 16px);
                }

                .cookie-consent-buttons {
                    width: 100%;
                }

                .cookie-btn {
                    flex: 1;
                    padding: var(--spacing-md, 16px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Add preferences button to footer or page
     */
    addPreferencesButton() {
        // Add to existing footer if possible
        const footer = document.querySelector('.footer-bottom');
        if (footer) {
            const settingsBtn = document.createElement('div');
            settingsBtn.style.marginTop = 'var(--spacing-lg)';
            settingsBtn.style.textAlign = 'center';
            
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = 'Cookie Settings';
            link.style.color = 'var(--primary-color)';
            link.style.fontSize = 'var(--fs-sm)';
            link.style.textDecoration = 'underline';
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPreferencesModal();
            });
            
            settingsBtn.appendChild(link);
            footer.appendChild(settingsBtn);
        }
    }

    /**
     * Accept all cookies
     */
    acceptAll() {
        this.preferences = {
            essential: true,
            analytics: true,
            advertising: true
        };
        this.saveConsentPreferences(this.preferences);
        this.applyConsent();
        this.removeBanner();
    }

    /**
     * Reject non-essential cookies
     */
    rejectNonEssential() {
        this.preferences = {
            essential: true,
            analytics: false,
            advertising: false
        };
        this.saveConsentPreferences(this.preferences);
        this.applyConsent();
        this.removeBanner();
    }

    /**
     * Save custom preferences
     */
    saveCustomPreferences(preferences) {
        this.preferences = {
            essential: true, // Always true
            analytics: preferences.analytics,
            advertising: preferences.advertising
        };
        this.saveConsentPreferences(this.preferences);
        this.applyConsent();
        this.removeBanner();
    }

    /**
     * Apply consent settings (load/disable tracking)
     */
    applyConsent() {
        if (this.preferences.analytics) {
            this.enableAnalytics();
        } else {
            this.disableAnalytics();
        }

        if (this.preferences.advertising) {
            this.enableAdvertising();
        } else {
            this.disableAdvertising();
        }
    }

    /**
     * Enable Google Analytics
     */
    enableAnalytics() {
        // If Google Analytics script is present but blocked, enable it
        if (window.gtag) {
            window.gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    }

    /**
     * Disable Google Analytics
     */
    disableAnalytics() {
        // Disable analytics
        if (window.gtag) {
            window.gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    }

    /**
     * Enable advertising
     */
    enableAdvertising() {
        if (window.gtag) {
            window.gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
            });
        }
    }

    /**
     * Disable advertising
     */
    disableAdvertising() {
        if (window.gtag) {
            window.gtag('consent', 'update', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
            });
        }
    }

    /**
     * Remove banner from DOM
     */
    removeBanner() {
        if (this.banner && this.banner.parentNode) {
            this.banner.style.animation = 'slideDown 0.3s ease-out';
            setTimeout(() => {
                if (this.banner && this.banner.parentNode) {
                    this.banner.parentNode.removeChild(this.banner);
                }
            }, 300);
        }
    }

    /**
     * Show preferences modal
     */
    showPreferencesModal() {
        const modalHTML = `
            <div id="cookiePreferencesModal" class="cookie-preferences-modal" role="dialog" aria-label="Cookie Preferences">
                <div class="cookie-preferences-content">
                    <h2>Cookie Preferences</h2>
                    <p>Manage your cookie preferences below:</p>
                    
                    <div class="cookie-preferences-list">
                        <div class="cookie-preference-item">
                            <h4>Essential Cookies</h4>
                            <p>Required for website functionality. Cannot be disabled.</p>
                            <input type="checkbox" checked disabled>
                        </div>
                        <div class="cookie-preference-item">
                            <h4>Analytics Cookies</h4>
                            <p>Help us understand how you use our site.</p>
                            <input type="checkbox" id="pref-analytics" ${this.preferences.analytics ? 'checked' : ''}>
                        </div>
                        <div class="cookie-preference-item">
                            <h4>Advertising Cookies</h4>
                            <p>Used to show relevant ads and measure effectiveness.</p>
                            <input type="checkbox" id="pref-advertising" ${this.preferences.advertising ? 'checked' : ''}>
                        </div>
                    </div>

                    <div class="cookie-preferences-buttons">
                        <button id="preferencesCloseBtn" class="cookie-btn cookie-btn-reject">Cancel</button>
                        <button id="preferencesSaveBtn" class="cookie-btn cookie-btn-accept">Save Preferences</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Style modal
        const modal = document.getElementById('cookiePreferencesModal');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: var(--spacing-lg);
        `;

        const content = modal.querySelector('.cookie-preferences-content');
        content.style.cssText = `
            background-color: var(--bg-darker);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--spacing-2xl);
            max-width: 500px;
            color: var(--text-white);
        `;

        // Add event listeners
        document.getElementById('preferencesCloseBtn').addEventListener('click', () => {
            modal.parentNode.removeChild(modal);
        });

        document.getElementById('preferencesSaveBtn').addEventListener('click', () => {
            const prefs = {
                analytics: document.getElementById('pref-analytics').checked,
                advertising: document.getElementById('pref-advertising').checked
            };
            this.saveCustomPreferences(prefs);
            modal.parentNode.removeChild(modal);
        });
    }
}

// Initialize cookie consent manager when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new CookieConsentManager();
});

/**
 * Global function to update cookie preferences
 * Can be called from other scripts
 */
window.updateCookiePreferences = function(preferences) {
    const manager = new CookieConsentManager();
    manager.saveCustomPreferences(preferences);
};

/**
 * Global function to reset cookie consent
 * User can call this to see banner again
 */
window.resetCookieConsent = function() {
    document.cookie = 'fitiq_cookie_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    location.reload();
};