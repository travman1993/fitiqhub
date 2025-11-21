/* ============================================
   FitIQ Hub - Water Intake Calculator Logic
   ============================================ */

   function calculateWater() {
    // Get form values
    const unit = document.querySelector('input[name="unit"]:checked').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const activity = document.getElementById('activity').value;
    const climate = document.getElementById('climate').value;

    // Validate inputs
    if (!weight || !activity || !climate || weight <= 0) {
        alert('Please enter valid weight and select activity level and climate.');
        return false;
    }

    // Convert to kg if imperial
    let weightKg = weight;

    if (unit === 'imperial') {
        weightKg = weight * 0.453592; // lbs to kg
    }

    // Base water intake: 30-35 mL per kg
    let baseWater = weightKg * 35; // Using 35 mL as standard

    // Activity multiplier
    let activityBonus = 0;
    let activityName = '';

    switch (activity) {
        case 'sedentary':
            activityBonus = 0; // No bonus
            activityName = 'Sedentary';
            break;
        case 'lightly-active':
            activityBonus = baseWater * 0.1; // +10%
            activityName = 'Lightly Active';
            break;
        case 'moderately-active':
            activityBonus = baseWater * 0.2; // +20%
            activityName = 'Moderately Active';
            break;
        case 'very-active':
            activityBonus = baseWater * 0.3; // +30%
            activityName = 'Very Active';
            break;
        case 'athlete':
            activityBonus = baseWater * 0.4; // +40%
            activityName = 'Athlete';
            break;
        default:
            activityBonus = 0;
            activityName = 'Sedentary';
    }

    // Climate multiplier
    let climateMultiplier = 1;
    let climateName = '';

    switch (climate) {
        case 'cold':
            climateMultiplier = 1.0; // No adjustment
            climateName = 'Cold/Temperate';
            break;
        case 'warm':
            climateMultiplier = 1.1; // +10%
            climateName = 'Warm';
            break;
        case 'hot':
            climateMultiplier = 1.25; // +25%
            climateName = 'Hot/Humid';
            break;
        case 'very-hot':
            climateMultiplier = 1.4; // +40%
            climateName = 'Very Hot';
            break;
        default:
            climateMultiplier = 1.0;
            climateName = 'Temperate';
    }

    // Calculate total water intake
    let totalWater = (baseWater + activityBonus) * climateMultiplier;

    // Round to nearest 250 mL
    totalWater = Math.round(totalWater / 250) * 250;

    // Ensure minimum and maximum reasonable values
    if (totalWater < 1500) totalWater = 1500; // At least 1.5L
    if (totalWater > 4000) totalWater = 4000; // Max 4L

    // Display results
    displayResults(totalWater, weightKg, activity, climate, activityName, climateName);

    return false;
}

function displayResults(totalWater, weightKg, activity, climate, activityName, climateName) {
    const resultsSection = document.getElementById('resultsSection');
    const waterValue = document.getElementById('waterValue');
    const waterDescription = document.getElementById('waterDescription');

    // Convert to liters and oz for display
    const waterLiters = (totalWater / 1000).toFixed(1);
    const waterOz = (totalWater / 29.5735).toFixed(0); // 1 oz = 29.5735 mL

    let description = '';

    // Create description based on activity and climate
    if (activity === 'athlete') {
        description = `As an athlete with active training, you need approximately ${waterLiters}L (${waterOz} oz) of water daily. This accounts for your high activity level and potential perspiration.`;
    } else if (activity === 'very-active') {
        description = `With your very active lifestyle, aim for approximately ${waterLiters}L (${waterOz} oz) of water daily to support training and recovery.`;
    } else if (activity === 'moderately-active') {
        description = `For moderate exercise activity, drink approximately ${waterLiters}L (${waterOz} oz) of water daily to stay properly hydrated.`;
    } else if (activity === 'lightly-active') {
        description = `With light activity, aim for approximately ${waterLiters}L (${waterOz} oz) of water daily for optimal hydration.`;
    } else {
        description = `With minimal exercise, you need approximately ${waterLiters}L (${waterOz} oz) of water daily for basic hydration needs.`;
    }

    // Add climate note if applicable
    if (climate === 'very-hot') {
        description += ' Your hot climate increases these needs significantly.';
    } else if (climate === 'hot') {
        description += ' Your warm/humid climate requires extra hydration.';
    }

    // Update results display
    waterValue.textContent = waterLiters + 'L';
    waterDescription.textContent = description;

    // Update hydration tips
    updateTips(activity, climate, totalWater);

    // Show results section with animation
    resultsSection.classList.add('show');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function updateTips(activity, climate, waterAmount) {
    const liters = (waterAmount / 1000).toFixed(1);
    const perGlass = Math.round((waterAmount / 250) * 10) / 10; // Assuming 250mL per glass
    
    let tips = [];

    // Base tips
    const mealsWater = Math.round(waterAmount / 4);

    if (activity === 'athlete' || activity === 'very-active') {
        tips = [
            `Drink ${mealsWater}mL (~8 oz) of water at each main meal, plus extra before, during, and after workouts`,
            `For every hour of intense exercise, drink an additional 500-1000mL (16-32 oz) of water`,
            `Monitor urine color - pale yellow indicates proper hydration, dark yellow means you need more water`
        ];
    } else if (activity === 'moderately-active') {
        tips = [
            `Drink roughly ${mealsWater}mL (~8 oz) of water with each meal throughout the day`,
            `Add 250-500mL extra water around your workout time for proper exercise hydration`,
            `Thirst is a reliable indicator - drink when you feel thirsty, but don't wait until then`
        ];
    } else {
        tips = [
            `Aim to drink ${mealsWater}mL (~8 oz) of water with meals and in between`,
            `Spread water intake throughout the day rather than drinking large amounts at once`,
            `Start your day with a glass of water and keep a water bottle with you for easy access`
        ];
    }

    // Climate-specific tip
    if (climate === 'very-hot' || climate === 'hot') {
        tips[2] = `In hot climates, drink even more water than calculated and increase electrolyte intake through diet or sports drinks during intense activity`;
    }

    // Update tips in the DOM
    document.getElementById('tip1').textContent = tips[0];
    document.getElementById('tip2').textContent = tips[1];
    document.getElementById('tip3').textContent = tips[2];
}

// Allow Enter key to calculate
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('waterForm');
    if (form) {
        form.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateWater();
            }
        });
    }
});

// Update weight unit label on radio change
document.querySelectorAll('input[name="unit"]').forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.value === 'metric') {
            document.getElementById('weightUnit').textContent = '(kg)';
            document.getElementById('weight').placeholder = 'e.g., 75';
        } else {
            document.getElementById('weightUnit').textContent = '(lbs)';
            document.getElementById('weight').placeholder = 'e.g., 165';
        }
        document.getElementById('resultsSection').classList.remove('show');
    });
});