/* ============================================
   FitIQ Hub - BMI Calculator Logic
   ============================================ */

   function calculateBMI() {
    // Get form values
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const unit = document.querySelector('input[name="unit"]:checked').value;

    // Validate inputs
    if (!weight || !height || weight <= 0 || height <= 0) {
        alert('Please enter valid weight and height values.');
        return false;
    }

    // Calculate BMI
    let bmi;
    if (unit === 'metric') {
        // Formula: weight (kg) / (height (m))^2
        const heightInMeters = height / 100;
        bmi = weight / (heightInMeters * heightInMeters);
    } else {
        // Formula: (weight (lbs) / (height (inches))^2) * 703
        bmi = (weight / (height * height)) * 703;
    }

    // Round to 1 decimal place
    bmi = Math.round(bmi * 10) / 10;

    // Determine category and display results
    displayResults(bmi);

    return false;
}

function displayResults(bmi) {
    const resultsSection = document.getElementById('resultsSection');
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    const bmiDescription = document.getElementById('bmiDescription');
    
    let category = '';
    let categoryColor = '';
    let description = '';
    let insights = [];

    // Determine category
    if (bmi < 18.5) {
        category = 'Underweight';
        categoryColor = 'underweight';
        description = 'Your BMI suggests you may be underweight. Consider consulting a healthcare provider about nutrition and health.';
        insights = [
            'Ensure adequate caloric intake with nutrient-dense foods',
            'Include protein-rich foods to support muscle maintenance',
            'Consult a doctor to rule out underlying health conditions'
        ];
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal Weight';
        categoryColor = 'normal';
        description = 'Your BMI falls within the normal healthy range. Maintain your current lifestyle and healthy habits.';
        insights = [
            'Continue with regular physical activity (150+ min/week)',
            'Maintain a balanced diet rich in vegetables and whole grains',
            'Regular health check-ups help track your wellness'
        ];
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        categoryColor = 'overweight';
        description = 'Your BMI suggests you are overweight. Increasing activity and monitoring diet can help.';
        insights = [
            'Aim for 150-300 minutes of moderate-intensity exercise weekly',
            'Create a slight caloric deficit through diet and exercise',
            'Focus on sustainable lifestyle changes, not quick fixes'
        ];
    } else {
        category = 'Obese';
        categoryColor = 'obese';
        description = 'Your BMI indicates obesity. Consider working with healthcare professionals to develop a health plan.';
        insights = [
            'Consult with a doctor or registered dietitian for guidance',
            'Start with low-impact exercise (walking, swimming, cycling)',
            'Aim for gradual, sustainable weight loss of 1-2 lbs per week'
        ];
    }

    // Update results display
    bmiValue.textContent = bmi;
    bmiCategory.textContent = category;
    bmiCategory.className = `bmi-category ${categoryColor}`;
    bmiDescription.textContent = description;

    // Update insights
    document.getElementById('insight1').textContent = insights[0];
    document.getElementById('insight2').textContent = insights[1];
    document.getElementById('insight3').textContent = insights[2];

    // Show results section with animation
    resultsSection.classList.add('show');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Allow Enter key to calculate
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('bmiForm').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateBMI();
        }
    });
});