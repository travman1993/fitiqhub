/* ============================================
   FitIQ Hub - Calorie Deficit Calculator Logic
   ============================================ */

   function calculateDeficit() {
    // Get form values
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const unit = document.querySelector('input[name="unit"]:checked').value;
    const age = parseFloat(document.getElementById('age').value);
    const currentWeight = parseFloat(document.getElementById('currentWeight').value);
    const goalWeight = parseFloat(document.getElementById('goalWeight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activityLevel = parseFloat(document.getElementById('activity').value);
    const rate = document.getElementById('rate').value;

    // Validate inputs
    if (!age || !currentWeight || !goalWeight || !height) {
        alert('Please fill in all required fields.');
        return false;
    }

    if (age <= 0 || currentWeight <= 0 || goalWeight <= 0 || height <= 0) {
        alert('Please enter valid positive numbers.');
        return false;
    }

    if (goalWeight >= currentWeight) {
        alert('Goal weight must be less than current weight for a calorie deficit plan.');
        return false;
    }

    // Convert to metric if imperial
    let weight = currentWeight;
    let goal = goalWeight;
    let h = height;

    if (unit === 'imperial') {
        weight = currentWeight * 0.453592; // lbs to kg
        goal = goalWeight * 0.453592;
        h = height * 2.54; // inches to cm
    }

    // Calculate current BMR using Mifflin-St Jeor formula
    const currentBMR = calculateBMR(weight, h, age, gender);
    const goalBMR = calculateBMR(goal, h, age, gender);

    // Calculate TDEE (Total Daily Energy Expenditure)
    const currentTDEE = Math.round(currentBMR * activityLevel);
    const goalTDEE = Math.round(goalBMR * activityLevel);

    // Determine deficit based on rate
    let deficitPerDay;
    let lbsPerWeek;
    
    switch(rate) {
        case 'conservative':
            deficitPerDay = 250;
            lbsPerWeek = 0.5;
            break;
        case 'moderate':
            deficitPerDay = 500;
            lbsPerWeek = 1.0;
            break;
        case 'aggressive':
            deficitPerDay = 750;
            lbsPerWeek = 1.5;
            break;
        case 'maximum':
            deficitPerDay = 1000;
            lbsPerWeek = 2.0;
            break;
        default:
            deficitPerDay = 500;
            lbsPerWeek = 1.0;
    }

    // Calculate target calories
    let targetCalories = currentTDEE - deficitPerDay;

    // Safety checks - never go below minimum safe calories
    const minCalories = gender === 'male' ? 1500 : 1200;
    if (targetCalories < minCalories) {
        targetCalories = minCalories;
        deficitPerDay = currentTDEE - targetCalories;
        alert(`Warning: Adjusted to minimum safe calories (${minCalories} cal/day). Deficit reduced to ${deficitPerDay} calories.`);
    }

    // Calculate weight to lose
    const weightToLose = weight - goal;
    const weightToLoseDisplay = unit === 'imperial' ? weightToLose * 2.20462 : weightToLose;

    // Calculate timeline (3500 calories = 1 lb of fat)
    const totalCalorieDeficit = weightToLose * 2.20462 * 3500; // Convert to lbs and multiply by 3500
    const weeksToGoal = Math.ceil(totalCalorieDeficit / (deficitPerDay * 7));
    
    // Calculate goal date
    const today = new Date();
    const goalDate = new Date(today);
    goalDate.setDate(today.getDate() + (weeksToGoal * 7));

    // Calculate macros
    const macros = calculateMacros(targetCalories, weight, unit);

    // Display results
    displayResults({
        targetCalories,
        deficitPerDay,
        weeklyDeficit: deficitPerDay * 7,
        currentTDEE,
        goalTDEE,
        weightToLose: weightToLoseDisplay,
        weeksToGoal,
        goalDate,
        macros,
        unit
    });

    return false;
}

// Calculate BMR using Mifflin-St Jeor formula
function calculateBMR(weight, height, age, gender) {
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    return Math.round(bmr);
}

// Calculate recommended macros
function calculateMacros(calories, weight, unit) {
    // Protein: 0.8-1g per lb of body weight (use 1g for deficit to preserve muscle)
    const weightLbs = unit === 'imperial' ? weight : weight * 2.20462;
    const proteinGrams = Math.round(weightLbs * 1.0);
    const proteinCalories = proteinGrams * 4;

    // Fat: 25-30% of total calories (use 25% for more carbs during deficit)
    const fatCalories = Math.round(calories * 0.25);
    const fatGrams = Math.round(fatCalories / 9);

    // Carbs: remaining calories
    const carbCalories = calories - proteinCalories - fatCalories;
    const carbGrams = Math.round(carbCalories / 4);

    return {
        protein: proteinGrams,
        fat: fatGrams,
        carbs: carbGrams
    };
}

// Display results
function displayResults(data) {
    const resultsSection = document.getElementById('resultsSection');
    
    // Format unit display
    const weightUnit = data.unit === 'imperial' ? 'lbs' : 'kg';
    
    // Update primary calorie target
    document.getElementById('targetCalories').textContent = `${data.targetCalories} cal/day`;
    document.getElementById('deficitAmount').textContent = `${data.deficitPerDay} calorie deficit per day`;

    // Update weight loss info
    document.getElementById('totalLoss').textContent = `${data.weightToLose.toFixed(1)} ${weightUnit}`;
    document.getElementById('timeline').textContent = `${data.weeksToGoal} weeks`;
    
    // Format goal date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('goalDate').textContent = data.goalDate.toLocaleDateString('en-US', options);

    // Update calorie breakdown
    document.getElementById('currentTDEE').textContent = `${data.currentTDEE} cal`;
    document.getElementById('goalTDEE').textContent = `${data.goalTDEE} cal`;
    document.getElementById('dailyDeficit').textContent = `-${data.deficitPerDay} cal`;
    document.getElementById('weeklyDeficit').textContent = `-${data.weeklyDeficit} cal`;

    // Update macro recommendations
    document.getElementById('proteinGrams').textContent = `${data.macros.protein}g (${data.macros.protein * 4} cal)`;
    document.getElementById('fatGrams').textContent = `${data.macros.fat}g (${data.macros.fat * 9} cal)`;
    document.getElementById('carbGrams').textContent = `${data.macros.carbs}g (${data.macros.carbs * 4} cal)`;

    // Show results section with animation
    resultsSection.classList.add('show');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Allow Enter key to calculate
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('deficitForm').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateDeficit();
        }
    });
});