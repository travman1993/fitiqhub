/* ============================================
   FitIQ Hub - TDEE Calculator Logic
   ============================================ */

   function calculateTDEE() {
    // Get form values
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const unit = document.querySelector('input[name="unit"]:checked').value;
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activityLevel = parseFloat(document.getElementById('activity').value);

    // Validate inputs
    if (!age || !weight || !height || age <= 0 || weight <= 0 || height <= 0) {
        alert('Please enter valid measurements.');
        return false;
    }

    // Convert to metric if imperial
    let w = weight;
    let h = height;

    if (unit === 'imperial') {
        w = weight * 0.453592; // lbs to kg
        h = height * 2.54; // inches to cm
    }

    // Calculate BMR using Mifflin-St Jeor formula
    let bmr;
    if (gender === 'male') {
        // BMR = (10 × weight) + (6.25 × height) − (5 × age) + 5
        bmr = (10 * w) + (6.25 * h) - (5 * age) + 5;
    } else {
        // BMR = (10 × weight) + (6.25 × height) − (5 × age) − 161
        bmr = (10 * w) + (6.25 * h) - (5 * age) - 161;
    }

    // Round BMR
    bmr = Math.round(bmr);

    // Calculate TDEE
    const tdee = Math.round(bmr * activityLevel);

    // Display results
    displayResults(bmr, tdee);

    return false;
}

function displayResults(bmr, tdee) {
    const resultsSection = document.getElementById('resultsSection');
    
    // Update BMR and TDEE
    document.getElementById('bmrtValue').textContent = bmr + ' kcal';
    document.getElementById('bmrDescription').textContent = 'Calories burned at rest daily';
    
    document.getElementById('tdeeValue').textContent = tdee + ' kcal';
    document.getElementById('tdeeDescription').textContent = 'Total calories burned with your activity level';

    // Calculate goal-based calories
    const aggressiveCut = tdee - 500;
    const moderateCut = tdee - 250;
    const maintenance = tdee;
    const moderateBulk = tdee + 250;
    const aggressiveBulk = tdee + 500;

    // Update calorie targets
    document.getElementById('aggressiveCut').textContent = aggressiveCut;
    document.getElementById('moderateCut').textContent = moderateCut;
    document.getElementById('maintenance').textContent = maintenance;
    document.getElementById('moderateBulk').textContent = moderateBulk;
    document.getElementById('aggressiveBulk').textContent = aggressiveBulk;

    // Show results section with animation
    resultsSection.classList.add('show');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Allow Enter key to calculate
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('tdeeForm').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateTDEE();
        }
    });
});