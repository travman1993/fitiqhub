/* ============================================
   FitIQ Hub - Protein Calculator Logic
   ============================================ */

   function calculateProtein() {
    // Get form values
    const unit = document.querySelector('input[name="unit"]:checked').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const goal = document.getElementById('goal').value;

    // Validate inputs
    if (!weight || !goal || weight <= 0) {
        alert('Please enter valid weight and select a fitness goal.');
        return false;
    }

    // Convert to kg if imperial
    let weightKg = weight;
    let weightLbs = weight;

    if (unit === 'imperial') {
        weightKg = weight * 0.453592; // lbs to kg
    } else {
        weightLbs = weight / 0.453592; // kg to lbs
    }

    // Protein multiplier based on goal (in grams per pound)
    let multiplier;
    let goalName = '';

    switch (goal) {
        case 'weight-loss':
            multiplier = 0.8; // 0.8g per lb
            goalName = 'Weight Loss';
            break;
        case 'maintenance':
            multiplier = 1.0; // 1.0g per lb
            goalName = 'Maintenance';
            break;
        case 'muscle-gain':
            multiplier = 1.2; // 1.2g per lb
            goalName = 'Muscle Gain';
            break;
        case 'athletic':
            multiplier = 1.4; // 1.4g per lb
            goalName = 'Athletic Performance';
            break;
        default:
            multiplier = 1.0;
            goalName = 'Maintenance';
    }

    // Calculate daily protein requirement (using body weight in lbs)
    const proteinGrams = Math.round(weightLbs * multiplier);
    const proteinMinimum = Math.round(weightLbs * (multiplier - 0.1));
    const proteinMaximum = Math.round(weightLbs * (multiplier + 0.1));

    // Display results
    displayResults(proteinGrams, goalName, goal, weightLbs, proteinMinimum, proteinMaximum);

    return false;
}

function displayResults(proteinGrams, goalName, goalValue, weightLbs, minimum, maximum) {
    const resultsSection = document.getElementById('resultsSection');
    const proteinValue = document.getElementById('proteinValue');
    const proteinDescription = document.getElementById('proteinDescription');

    let description = '';

    // Create description based on goal
    switch (goalValue) {
        case 'weight-loss':
            description = `For weight loss, aim for ${proteinGrams}g of protein daily. This preserves muscle while creating a caloric deficit.`;
            break;
        case 'maintenance':
            description = `To maintain your current weight and composition, aim for ${proteinGrams}g of protein daily.`;
            break;
        case 'muscle-gain':
            description = `To build muscle, aim for ${proteinGrams}g of protein daily combined with resistance training.`;
            break;
        case 'athletic':
            description = `For athletic performance and recovery, aim for ${proteinGrams}g of protein daily to support training adaptation.`;
            break;
        default:
            description = `Your daily protein target is ${proteinGrams}g.`;
    }

    // Update results display
    proteinValue.textContent = proteinGrams + 'g';
    proteinDescription.textContent = description;

    // Update insights based on goal
    updateInsights(goalValue, weightLbs, proteinGrams);

    // Show results section with animation
    resultsSection.classList.add('show');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function updateInsights(goal, weightLbs, proteinGrams) {
    const insightsList = document.getElementById('insightsList') || document.querySelector('.insights-list');
    
    let insights = [];

    // Base insights
    const mealsPerDay = 3;
    const proteinPerMeal = Math.round(proteinGrams / mealsPerDay);

    if (goal === 'weight-loss') {
        insights = [
            `Aim for ~${proteinPerMeal}g of protein per meal (3 meals/day) to suppress appetite and preserve muscle`,
            'Protein has a higher thermic effect, burning more calories during digestion',
            'Combine with a moderate caloric deficit (250-500 cal below TDEE) for sustainable fat loss'
        ];
    } else if (goal === 'maintenance') {
        insights = [
            `Distribute ${proteinGrams}g across 3-4 meals (~${proteinPerMeal}g per meal) throughout the day`,
            'Include protein at every meal to maintain steady amino acid levels',
            'Balance protein intake with carbs and fats for overall health'
        ];
    } else if (goal === 'muscle-gain') {
        insights = [
            `Aim for ~${proteinPerMeal}g of protein per meal for optimal muscle protein synthesis`,
            'Consume protein within 2 hours post-workout to support muscle recovery and growth',
            'Combine with resistance training 3-5 days/week and a 250-500 cal surplus for best results'
        ];
    } else if (goal === 'athletic') {
        insights = [
            `Distribute ${proteinGrams}g across 4-5 meals for sustained muscle repair and recovery`,
            'Consume carbs + protein post-workout (3:1 ratio) to replenish glycogen and repair muscle',
            'Stay hydrated and consider timing protein around training sessions for maximum adaptation'
        ];
    }

    // Update insight list items
    if (insightsList) {
        const items = insightsList.querySelectorAll('li');
        items[0].textContent = insights[0];
        items[1].textContent = insights[1];
        items[2].textContent = insights[2];
    }
}

// Allow Enter key to calculate
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('proteinForm');
    if (form) {
        form.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateProtein();
            }
        });
    }
});