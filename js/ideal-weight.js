/* ============================================
   FitIQ Hub - Ideal Weight Calculator Logic
   ============================================ */

   function calculateIdealWeight() {
    // Get form values
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const unit = document.querySelector('input[name="unit"]:checked').value;
    const height = parseFloat(document.getElementById('height').value);
    const age = parseFloat(document.getElementById('age').value) || null;
    const frame = document.getElementById('frame').value;

    // Validate inputs
    if (!height || height <= 0) {
        alert('Please enter a valid height.');
        return false;
    }

    // Convert to inches if metric
    let heightInches;
    if (unit === 'metric') {
        heightInches = height / 2.54; // cm to inches
    } else {
        heightInches = height;
    }

    // Validate height range (must be over 5 feet / 60 inches for formulas)
    if (heightInches < 60) {
        alert('Height must be at least 60 inches (152 cm) for accurate calculations.');
        return false;
    }

    // Calculate ideal weight using multiple formulas
    const results = {
        robinson: calculateRobinson(heightInches, gender),
        miller: calculateMiller(heightInches, gender),
        devine: calculateDevine(heightInches, gender),
        hamwi: calculateHamwi(heightInches, gender),
        bmiRange: calculateBMIRange(heightInches)
    };

    // Adjust for frame size
    const frameAdjusted = adjustForFrame(results, frame);

    // Display results
    displayResults(results, frameAdjusted, unit, age);

    return false;
}

// Robinson Formula (1983)
function calculateRobinson(heightInches, gender) {
    if (gender === 'male') {
        // 52 kg + 1.9 kg per inch over 5 feet
        return 52 + (1.9 * (heightInches - 60));
    } else {
        // 49 kg + 1.7 kg per inch over 5 feet
        return 49 + (1.7 * (heightInches - 60));
    }
}

// Miller Formula (1983)
function calculateMiller(heightInches, gender) {
    if (gender === 'male') {
        // 56.2 kg + 1.41 kg per inch over 5 feet
        return 56.2 + (1.41 * (heightInches - 60));
    } else {
        // 53.1 kg + 1.36 kg per inch over 5 feet
        return 53.1 + (1.36 * (heightInches - 60));
    }
}

// Devine Formula (1974)
function calculateDevine(heightInches, gender) {
    if (gender === 'male') {
        // 50 kg + 2.3 kg per inch over 5 feet
        return 50 + (2.3 * (heightInches - 60));
    } else {
        // 45.5 kg + 2.3 kg per inch over 5 feet
        return 45.5 + (2.3 * (heightInches - 60));
    }
}

// Hamwi Formula (1964)
function calculateHamwi(heightInches, gender) {
    if (gender === 'male') {
        // 48 kg + 2.7 kg per inch over 5 feet
        return 48 + (2.7 * (heightInches - 60));
    } else {
        // 45.5 kg + 2.2 kg per inch over 5 feet
        return 45.5 + (2.2 * (heightInches - 60));
    }
}

// Healthy BMI Range (18.5 - 24.9)
function calculateBMIRange(heightInches) {
    const heightMeters = (heightInches * 2.54) / 100;
    const minWeight = 18.5 * (heightMeters * heightMeters);
    const maxWeight = 24.9 * (heightMeters * heightMeters);
    
    return {
        min: minWeight,
        max: maxWeight,
        mid: (minWeight + maxWeight) / 2
    };
}

// Adjust for frame size
function adjustForFrame(results, frame) {
    const average = (results.robinson + results.miller + results.devine + results.hamwi) / 4;
    
    if (frame === 'small') {
        return {
            min: average * 0.90,
            max: average * 0.95,
            label: 'Small Frame Adjustment'
        };
    } else if (frame === 'large') {
        return {
            min: average * 1.05,
            max: average * 1.10,
            label: 'Large Frame Adjustment'
        };
    } else {
        return {
            min: average * 0.95,
            max: average * 1.05,
            label: 'Medium Frame'
        };
    }
}

// Convert kg to lbs
function kgToLbs(kg) {
    return kg * 2.20462;
}

// Display results
function displayResults(results, frameAdjusted, unit, age) {
    const resultsSection = document.getElementById('resultsSection');
    
    // Convert all results to display unit
    let displayUnit, conversionFactor;
    if (unit === 'imperial') {
        displayUnit = 'lbs';
        conversionFactor = 2.20462;
    } else {
        displayUnit = 'kg';
        conversionFactor = 1;
    }

    // Calculate average and display range
    const avgMin = Math.round(frameAdjusted.min * conversionFactor);
    const avgMax = Math.round(frameAdjusted.max * conversionFactor);
    
    document.getElementById('idealWeightRange').textContent = 
        `${avgMin} - ${avgMax} ${displayUnit}`;

    // Display individual formula results
    document.getElementById('robinsonResult').textContent = 
        `${Math.round(results.robinson * conversionFactor)} ${displayUnit}`;
    
    document.getElementById('millerResult').textContent = 
        `${Math.round(results.miller * conversionFactor)} ${displayUnit}`;
    
    document.getElementById('devineResult').textContent = 
        `${Math.round(results.devine * conversionFactor)} ${displayUnit}`;
    
    document.getElementById('hamwiResult').textContent = 
        `${Math.round(results.hamwi * conversionFactor)} ${displayUnit}`;
    
    document.getElementById('bmiRangeResult').textContent = 
        `${Math.round(results.bmiRange.min * conversionFactor)} - ${Math.round(results.bmiRange.max * conversionFactor)} ${displayUnit}`;

    // Update insights based on age if provided
    if (age) {
        updateInsightsWithAge(age);
    }

    // Show results section with animation
    resultsSection.classList.add('show');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Update insights with age-specific context
function updateInsightsWithAge(age) {
    const insight4 = document.getElementById('insight4');
    
    if (age < 25) {
        insight4.textContent = 'At your age, focus on building healthy habits rather than obsessing over exact numbers';
    } else if (age >= 25 && age < 40) {
        insight4.textContent = 'Your metabolism is stable - maintain a healthy weight through consistent habits';
    } else if (age >= 40 && age < 60) {
        insight4.textContent = 'Muscle mass naturally declines with age - strength training helps maintain healthy weight';
    } else {
        insight4.textContent = 'Focus on maintaining functional fitness and muscle mass more than exact weight';
    }
}

// Allow Enter key to calculate
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('idealWeightForm').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateIdealWeight();
        }
    });
});