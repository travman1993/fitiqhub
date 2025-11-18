/* ============================================
   FitIQ Hub - Body Fat Calculator Logic
   ============================================ */

   function calculateBodyFat() {
    // Get form values
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const unit = document.querySelector('input[name="unit"]:checked').value;
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const neck = parseFloat(document.getElementById('neck').value);
    const waist = parseFloat(document.getElementById('waist').value);
    const hip = gender === 'female' ? parseFloat(document.getElementById('hip').value) : 0;

    // Validate inputs
    if (!age || !weight || !height || !neck || !waist || age <= 0 || weight <= 0 || height <= 0 || neck <= 0 || waist <= 0) {
        alert('Please enter valid measurements.');
        return false;
    }

    if (gender === 'female' && (!hip || hip <= 0)) {
        alert('Please enter hip circumference for female calculation.');
        return false;
    }

    // Convert to metric if imperial
    let w = weight;
    let h = height;
    let n = neck;
    let wa = waist;
    let hi = hip;

    if (unit === 'imperial') {
        w = weight * 0.453592; // lbs to kg
        h = height * 2.54; // inches to cm
        n = neck * 2.54; // inches to cm
        wa = waist * 2.54; // inches to cm
        hi = hip * 2.54; // inches to cm
    }

    // Calculate body fat using US Navy formula
    let bodyFat;
    if (gender === 'male') {
        // Male formula: Body Fat % = 86.010 × log10(waist - neck) − 70.041 × log10(height) + 36.76
        bodyFat = 86.010 * Math.log10(wa - n) - 70.041 * Math.log10(h) + 36.76;
    } else {
        // Female formula: Body Fat % = 163.205 × log10(waist + hip - neck) − 97.684 × log10(height) − 78.387
        bodyFat = 163.205 * Math.log10(wa + hi - n) - 97.684 * Math.log10(h) - 78.387;
    }

    // Round to 1 decimal place
    bodyFat = Math.round(bodyFat * 10) / 10;

    // Ensure result is realistic
    if (bodyFat < 2) bodyFat = 2;
    if (bodyFat > 60) bodyFat = 60;

    // Display results
    displayResults(bodyFat, gender, age);

    return false;
}

function displayResults(bodyFat, gender, age) {
    const resultsSection = document.getElementById('resultsSection');
    const bodyfatValue = document.getElementById('bodyfatValue');
    const bodyfatCategory = document.getElementById('bodyfatCategory');
    const bodyfatDescription = document.getElementById('bodyfatDescription');
    
    let category = '';
    let categoryColor = '';
    let description = '';
    let insights = [];
    let categories = [];

    // Determine category based on gender
    if (gender === 'male') {
        if (bodyFat < 6) {
            category = 'Essential Fat';
            categoryColor = 'underweight';
            description = 'This is the minimum body fat required for basic physiological functions. Only recommended for competitive athletes.';
            insights = [
                'This level is only sustainable short-term for elite athletes',
                'Risk of hormonal imbalance and reduced immune function',
                'Not recommended for general population'
            ];
        } else if (bodyFat >= 6 && bodyFat < 14) {
            category = 'Athletic';
            categoryColor = 'normal';
            description = 'Excellent body composition typical of athletes and fitness enthusiasts.';
            insights = [
                'Requires consistent exercise and disciplined nutrition',
                'Muscle definition is clearly visible',
                'Sustainable with proper training and diet'
            ];
        } else if (bodyFat >= 14 && bodyFat < 18) {
            category = 'Fit';
            categoryColor = 'normal';
            description = 'Good health and fitness level with visible abdominal definition.';
            insights = [
                'Good balance of health and daily living',
                'Some visible muscle definition',
                'Easier to maintain than athletic level'
            ];
        } else if (bodyFat >= 18 && bodyFat < 25) {
            category = 'Average';
            categoryColor = 'overweight';
            description = 'Normal, healthy body fat range for average adults.';
            insights = [
                'Most people fall into this range',
                'Minimal muscle definition visible',
                'Good foundation to build upon'
            ];
        } else {
            category = 'Above Average';
            categoryColor = 'obese';
            description = 'Body fat exceeds average levels. Consider increasing activity and improving diet.';
            insights = [
                'Increased risk of chronic diseases',
                'Focus on sustainable lifestyle changes',
                'Consult healthcare providers for personalized guidance'
            ];
        }

        categories = [
            { label: 'Essential Fat', range: '2-6%', color: '#2196F3' },
            { label: 'Athletic', range: '6-14%', color: '#4CAF50' },
            { label: 'Fit', range: '14-18%', color: '#8BC34A' },
            { label: 'Average', range: '18-25%', color: '#FF9800' },
            { label: 'Above Average', range: '25%+', color: '#F44336' }
        ];
    } else {
        if (bodyFat < 14) {
            category = 'Essential Fat';
            categoryColor = 'underweight';
            description = 'This is the minimum body fat required for basic physiological functions. Only recommended for competitive athletes.';
            insights = [
                'This level is only sustainable short-term for elite athletes',
                'Risk of hormonal imbalance and reproductive issues',
                'Not recommended for general population'
            ];
        } else if (bodyFat >= 14 && bodyFat < 21) {
            category = 'Athletic';
            categoryColor = 'normal';
            description = 'Excellent body composition typical of athletes and fitness enthusiasts.';
            insights = [
                'Requires consistent exercise and disciplined nutrition',
                'Muscle definition is clearly visible',
                'Sustainable with proper training and diet'
            ];
        } else if (bodyFat >= 21 && bodyFat < 25) {
            category = 'Fit';
            categoryColor = 'normal';
            description = 'Good health and fitness level with visible muscle tone.';
            insights = [
                'Good balance of health and daily living',
                'Some visible muscle tone',
                'Easier to maintain than athletic level'
            ];
        } else if (bodyFat >= 25 && bodyFat < 32) {
            category = 'Average';
            categoryColor = 'overweight';
            description = 'Normal, healthy body fat range for average adults.';
            insights = [
                'Most women fall into this range',
                'Less visible muscle definition',
                'Good foundation to build upon'
            ];
        } else {
            category = 'Above Average';
            categoryColor = 'obese';
            description = 'Body fat exceeds average levels. Consider increasing activity and improving diet.';
            insights = [
                'Increased risk of chronic diseases',
                'Focus on sustainable lifestyle changes',
                'Consult healthcare providers for personalized guidance'
            ];
        }

        categories = [
            { label: 'Essential Fat', range: '10-14%', color: '#2196F3' },
            { label: 'Athletic', range: '14-21%', color: '#4CAF50' },
            { label: 'Fit', range: '21-25%', color: '#8BC34A' },
            { label: 'Average', range: '25-32%', color: '#FF9800' },
            { label: 'Above Average', range: '32%+', color: '#F44336' }
        ];
    }

    // Update results display
    bodyfatValue.textContent = bodyFat + '%';
    bodyfatCategory.textContent = category;
    bodyfatCategory.className = `bmi-category ${categoryColor}`;
    bodyfatDescription.textContent = description;

    // Update insights
    document.getElementById('insight1').textContent = insights[0];
    document.getElementById('insight2').textContent = insights[1];
    document.getElementById('insight3').textContent = insights[2];

    // Update category chart
    const chartHtml = categories.map(cat => `
        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
            <div style="width: 30px; height: 30px; background-color: ${cat.color}; border-radius: var(--radius-sm);"></div>
            <span>${cat.label}: ${cat.range}</span>
        </div>
    `).join('');
    document.getElementById('bodyfatChart').innerHTML = chartHtml;

    // Show results section with animation
    resultsSection.classList.add('show');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Allow Enter key to calculate
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('bodyfatForm').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateBodyFat();
        }
    });
});