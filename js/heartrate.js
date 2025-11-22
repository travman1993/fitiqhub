/* ============================================
   FitIQ Hub - Heart Rate Calculator Logic
   ============================================ */

   function calculateHeartRate() {
    // Get form values
    const age = parseFloat(document.getElementById('age').value);
    const restingHR = parseFloat(document.getElementById('restingHR').value) || 60;
    const formula = document.querySelector('input[name="formula"]:checked').value;
    const fitnessLevel = document.getElementById('fitnessLevel').value;

    // Validate inputs
    if (!age || age <= 0 || age >= 120) {
        alert('Please enter a valid age (1-119).');
        return false;
    }

    if (restingHR < 30 || restingHR > 100) {
        alert('Please enter a valid resting heart rate (30-100 bpm).');
        return false;
    }

    // Calculate Max Heart Rate based on selected formula
    let maxHR;
    if (formula === 'tanaka') {
        // Tanaka Formula (2001) - Most accurate for average population
        maxHR = 208 - (0.7 * age);
    } else {
        // Fox Formula (1970) - Traditional
        maxHR = 220 - age;
    }

    maxHR = Math.round(maxHR);

    // Calculate training zones using both methods
    const zones = calculateTrainingZones(maxHR, restingHR, fitnessLevel);

    // Display results
    displayResults(maxHR, zones, age, restingHR, formula);

    return false;
}

function calculateTrainingZones(maxHR, restingHR, fitnessLevel) {
    // Simple percentage-based zones (most commonly used)
    const zones = {
        zone1: {
            min: Math.round(maxHR * 0.50),
            max: Math.round(maxHR * 0.60),
            name: 'Recovery'
        },
        zone2: {
            min: Math.round(maxHR * 0.60),
            max: Math.round(maxHR * 0.70),
            name: 'Aerobic'
        },
        zone3: {
            min: Math.round(maxHR * 0.70),
            max: Math.round(maxHR * 0.80),
            name: 'Tempo'
        },
        zone4: {
            min: Math.round(maxHR * 0.80),
            max: Math.round(maxHR * 0.90),
            name: 'VO2 Max'
        },
        zone5: {
            min: Math.round(maxHR * 0.90),
            max: maxHR,
            name: 'Anaerobic'
        }
    };

    // Also calculate Karvonen zones for reference (heart rate reserve method)
    const heartRateReserve = maxHR - restingHR;
    zones.karvonen = {
        zone1: Math.round(restingHR + (heartRateReserve * 0.50)),
        zone2: Math.round(restingHR + (heartRateReserve * 0.60)),
        zone3: Math.round(restingHR + (heartRateReserve * 0.70)),
        zone4: Math.round(restingHR + (heartRateReserve * 0.80)),
        zone5: Math.round(restingHR + (heartRateReserve * 0.90))
    };

    zones.heartRateReserve = heartRateReserve;
    zones.fitnessLevel = fitnessLevel;

    return zones;
}

function displayResults(maxHR, zones, age, restingHR, formula) {
    const resultsSection = document.getElementById('resultsSection');

    // Update max HR
    document.getElementById('maxHRValue').textContent = maxHR + ' bpm';
    
    let formulaText = formula === 'tanaka' 
        ? 'Tanaka (208 - 0.7×age)' 
        : 'Fox (220 - age)';
    
    document.getElementById('maxHRDescription').textContent = 
        `Your estimated maximum heart rate using ${formulaText}. ` +
        `(Resting HR: ${restingHR} bpm)`;

    // Update training zones
    document.getElementById('zone1Min').textContent = zones.zone1.min;
    document.getElementById('zone1Max').textContent = zones.zone1.max;

    document.getElementById('zone2Min').textContent = zones.zone2.min;
    document.getElementById('zone2Max').textContent = zones.zone2.max;

    document.getElementById('zone3Min').textContent = zones.zone3.min;
    document.getElementById('zone3Max').textContent = zones.zone3.max;

    document.getElementById('zone4Min').textContent = zones.zone4.min;
    document.getElementById('zone4Max').textContent = zones.zone4.max;

    document.getElementById('zone5Min').textContent = zones.zone5.min;
    document.getElementById('zone5Max').textContent = zones.zone5.max;

    // Generate insights
    const insights = generateInsights(maxHR, age, restingHR, zones.fitnessLevel);
    document.getElementById('insight1').textContent = insights[0];
    document.getElementById('insight2').textContent = insights[1];
    document.getElementById('insight3').textContent = insights[2];

    // Show results section with animation
    resultsSection.classList.add('show');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function generateInsights(maxHR, age, restingHR, fitnessLevel) {
    const insights = [];

    // Insight 1: General info
    const heartRateReserve = maxHR - restingHR;
    insights.push(
        `Your heart rate reserve is ${heartRateReserve} bpm. This is the range your heart can work with during exercise.`
    );

    // Insight 2: Fitness level specific advice
    if (fitnessLevel === 'sedentary') {
        insights.push(
            'Since you\'re sedentary, focus on building your aerobic base. Spend 80% of training time in Zones 1-2 (light to moderate). ' +
            'This creates a solid foundation before increasing intensity.'
        );
    } else if (fitnessLevel === 'light') {
        insights.push(
            'You\'re lightly active. Gradually increase Zone 2 training to build aerobic capacity. ' +
            'This is where most of your fitness gains will come from with sustainable effort.'
        );
    } else if (fitnessLevel === 'moderate') {
        insights.push(
            'As a moderately active person, you can handle a mix: 60-70% Zone 1-2, 15-20% Zone 3, ' +
            'and 10-15% Zone 4-5 for high-intensity training.'
        );
    } else if (fitnessLevel === 'very') {
        insights.push(
            'You\'re very active! You can push Zone 3-4 training 2-3 times per week. ' +
            'Remember: even elite athletes spend 50-70% of training in Zone 1-2 for recovery and base building.'
        );
    } else {
        insights.push(
            'As an athlete, your body can handle higher intensities, but don\'t ignore easy work. ' +
            'The 80/20 rule applies: 80% easy, 20% hard. This prevents burnout and builds resilience.'
        );
    }

    // Insight 3: Recovery tip
    insights.push(
        `Your resting heart rate is ${restingHR} bpm. Lower resting HR (below 60) indicates better cardiovascular fitness. ` +
        `Track this weekly to see your aerobic improvements.`
    );

    return insights;
}

// Allow Enter key to calculate
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('heartrateForm').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateHeartRate();
        }
    });
});