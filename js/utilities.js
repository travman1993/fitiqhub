/* ============================================
   FitIQ Hub - Utility Functions
   ============================================ */

/**
 * Format a number with commas
 * @param {number} num - The number to format
 * @returns {string} - Formatted number string
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Round a number to specified decimal places
 * @param {number} num - The number to round
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {number} - Rounded number
 */
function roundTo(num, decimals = 1) {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Convert pounds to kilograms
 * @param {number} lbs - Weight in pounds
 * @returns {number} - Weight in kilograms
 */
function lbsToKg(lbs) {
    return roundTo(lbs * 0.453592, 1);
}

/**
 * Convert kilograms to pounds
 * @param {number} kg - Weight in kilograms
 * @returns {number} - Weight in pounds
 */
function kgToLbs(kg) {
    return roundTo(kg / 0.453592, 1);
}

/**
 * Convert inches to centimeters
 * @param {number} inches - Height in inches
 * @returns {number} - Height in centimeters
 */
function inchesToCm(inches) {
    return roundTo(inches * 2.54, 1);
}

/**
 * Convert centimeters to inches
 * @param {number} cm - Height in centimeters
 * @returns {number} - Height in inches
 */
function cmToInches(cm) {
    return roundTo(cm / 2.54, 1);
}

/**
 * Validate age input
 * @param {number} age - Age to validate
 * @returns {boolean} - True if valid
 */
function isValidAge(age) {
    return age > 0 && age < 150;
}

/**
 * Validate weight input
 * @param {number} weight - Weight to validate
 * @returns {boolean} - True if valid
 */
function isValidWeight(weight) {
    return weight > 0 && weight < 1000;
}

/**
 * Validate height input
 * @param {number} height - Height to validate
 * @returns {boolean} - True if valid
 */
function isValidHeight(height) {
    return height > 0 && height < 300;
}

/**
 * Validate measurement input
 * @param {number} value - Value to validate
 * @returns {boolean} - True if valid
 */
function isValidMeasurement(value) {
    return value > 0 && value < 1000;
}

/**
 * Calculate BMI
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {number} - BMI value
 */
function calculateBMI(weight, height) {
    const heightInMeters = height / 100;
    return roundTo(weight / (heightInMeters * heightInMeters), 1);
}

/**
 * Get BMI category
 * @param {number} bmi - BMI value
 * @returns {object} - Object with category, color, and description
 */
function getBMICategory(bmi) {
    if (bmi < 18.5) {
        return {
            category: 'Underweight',
            color: 'underweight',
            description: 'Your BMI suggests you may be underweight.'
        };
    } else if (bmi < 25) {
        return {
            category: 'Normal Weight',
            color: 'normal',
            description: 'Your BMI falls within the normal healthy range.'
        };
    } else if (bmi < 30) {
        return {
            category: 'Overweight',
            color: 'overweight',
            description: 'Your BMI suggests you are overweight.'
        };
    } else {
        return {
            category: 'Obese',
            color: 'obese',
            description: 'Your BMI indicates obesity.'
        };
    }
}

/**
 * Calculate BMR using Mifflin-St Jeor formula
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @param {number} age - Age in years
 * @param {string} gender - 'male' or 'female'
 * @returns {number} - BMR value
 */
function calculateBMR(weight, height, age, gender) {
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    return Math.round(bmr);
}

/**
 * Calculate TDEE
 * @param {number} bmr - Basal Metabolic Rate
 * @param {number} activityLevel - Activity multiplier (1.2 - 1.9)
 * @returns {number} - TDEE value
 */
function calculateTDEE(bmr, activityLevel) {
    return Math.round(bmr * activityLevel);
}

/**
 * Calculate body fat percentage using US Navy formula (Male)
 * @param {number} waist - Waist circumference in cm
 * @param {number} neck - Neck circumference in cm
 * @param {number} height - Height in cm
 * @returns {number} - Body fat percentage
 */
function calculateBodyFatMale(waist, neck, height) {
    const bodyFat = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    return roundTo(Math.max(2, Math.min(60, bodyFat)), 1);
}

/**
 * Calculate body fat percentage using US Navy formula (Female)
 * @param {number} waist - Waist circumference in cm
 * @param {number} hip - Hip circumference in cm
 * @param {number} neck - Neck circumference in cm
 * @param {number} height - Height in cm
 * @returns {number} - Body fat percentage
 */
function calculateBodyFatFemale(waist, hip, neck, height) {
    const bodyFat = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
    return roundTo(Math.max(2, Math.min(60, bodyFat)), 1);
}

/**
 * Get body fat category
 * @param {number} bodyFat - Body fat percentage
 * @param {string} gender - 'male' or 'female'
 * @returns {object} - Object with category and description
 */
function getBodyFatCategory(bodyFat, gender) {
    if (gender === 'male') {
        if (bodyFat < 6) {
            return { category: 'Essential Fat', color: 'underweight' };
        } else if (bodyFat < 14) {
            return { category: 'Athletic', color: 'normal' };
        } else if (bodyFat < 18) {
            return { category: 'Fit', color: 'normal' };
        } else if (bodyFat < 25) {
            return { category: 'Average', color: 'overweight' };
        } else {
            return { category: 'Above Average', color: 'obese' };
        }
    } else {
        if (bodyFat < 14) {
            return { category: 'Essential Fat', color: 'underweight' };
        } else if (bodyFat < 21) {
            return { category: 'Athletic', color: 'normal' };
        } else if (bodyFat < 25) {
            return { category: 'Fit', color: 'normal' };
        } else if (bodyFat < 32) {
            return { category: 'Average', color: 'overweight' };
        } else {
            return { category: 'Above Average', color: 'obese' };
        }
    }
}

/**
 * Validate form and show error if invalid
 * @param {array} fields - Array of field objects {element, min, max, name}
 * @returns {boolean} - True if all valid
 */
function validateFields(fields) {
    for (let field of fields) {
        const element = document.getElementById(field.element);
        const value = parseFloat(element.value);

        if (!value || value < field.min || value > field.max) {
            alert(`Please enter a valid ${field.name} (${field.min} - ${field.max})`);
            element.focus();
            return false;
        }
    }
    return true;
}

/**
 * Scroll to element smoothly
 * @param {string} elementId - ID of element to scroll to
 */
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * Show/hide element with animation
 * @param {string} elementId - ID of element
 * @param {boolean} show - True to show, false to hide
 */
function toggleElement(elementId, show = true) {
    const element = document.getElementById(elementId);
    if (element) {
        if (show) {
            element.classList.add('show');
        } else {
            element.classList.remove('show');
        }
    }
}

/**
 * Reset all inputs in a form
 * @param {string} formId - ID of form
 */
function resetForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
    }
}

/**
 * Format currency
 * @param {number} num - Number to format
 * @returns {string} - Formatted currency string
 */
function formatCurrency(num) {
    return '$' + formatNumber(Math.round(num));
}

/**
 * Get current year for copyright
 * @returns {number} - Current year
 */
function getCurrentYear() {
    return new Date().getFullYear();
}

/**
 * Debounce function for event handlers
 * @param {function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {function} - Debounced function
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if value is numeric
 * @param {*} value - Value to check
 * @returns {boolean} - True if numeric
 */
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * Clamp number between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Clamped value
 */
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}