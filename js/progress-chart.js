/* ============================================
   FitIQ Hub - Year-End Progress Chart Logic
   ============================================ */

   function generateChart() {
    const startWeight = parseFloat(document.getElementById('startWeight').value);
    const endWeight = parseFloat(document.getElementById('endWeight').value);
    const startBodyFat = parseFloat(document.getElementById('startBodyFat').value) || null;
    const endBodyFat = parseFloat(document.getElementById('endBodyFat').value) || null;
    const startWorkouts = parseFloat(document.getElementById('startWorkouts').value);
    const endWorkouts = parseFloat(document.getElementById('endWorkouts').value);
    const primaryGoal = document.getElementById('primaryGoal').value;
    const goalAchievement = parseFloat(document.getElementById('goalAchievement').value);
    const biggestWin = document.getElementById('biggestWin').value.trim();

    if (!startWeight || !endWeight || !startWorkouts || !endWorkouts || !primaryGoal || isNaN(goalAchievement)) {
        alert('Please fill in all required fields.');
        return false;
    }

    const weightChange = endWeight - startWeight;
    const weightChangePercent = ((weightChange / startWeight) * 100).toFixed(1);
    const bodyFatChange = startBodyFat && endBodyFat ? (endBodyFat - startBodyFat).toFixed(1) : null;
    const workoutsChange = endWorkouts - startWorkouts;
    const totalWorkouts = Math.round(endWorkouts * 52);

    displaySummary({
        weightChange,
        bodyFatChange,
        totalWorkouts,
        goalAchievement
    });

    displayMetrics({
        startWeight,
        endWeight,
        weightChange,
        weightChangePercent,
        startBodyFat,
        endBodyFat,
        bodyFatChange,
        startWorkouts,
        endWorkouts,
        workoutsChange
    });

    displayAchievements({
        weightChange,
        bodyFatChange,
        totalWorkouts,
        goalAchievement,
        biggestWin
    });

    displayMilestones({
        weightChange,
        bodyFatChange,
        workoutsChange,
        goalAchievement
    });

    displayGoals(primaryGoal, goalAchievement);

    document.getElementById('resultsSection').classList.add('show');
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    return false;
}

function displaySummary(data) {
    const container = document.getElementById('summaryStats');
    
    let html = `
        <div class="stat-card">
            <div class="stat-value">${Math.abs(data.weightChange).toFixed(1)}</div>
            <div class="stat-label">lbs ${data.weightChange > 0 ? 'Gained' : 'Lost'}</div>
        </div>
    `;

    if (data.bodyFatChange !== null) {
        html += `
            <div class="stat-card">
                <div class="stat-value">${Math.abs(data.bodyFatChange)}%</div>
                <div class="stat-label">Body Fat ${data.bodyFatChange > 0 ? 'Gained' : 'Lost'}</div>
            </div>
        `;
    }

    html += `
        <div class="stat-card">
            <div class="stat-value">${data.totalWorkouts}</div>
            <div class="stat-label">Workouts This Year</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${data.goalAchievement}%</div>
            <div class="stat-label">Goal Achieved</div>
        </div>
    `;

    container.innerHTML = html;
}

function displayMetrics(data) {
    const container = document.getElementById('progressMetrics');
    
    let html = '<h3 style="font-size: var(--fs-lg); margin-bottom: var(--spacing-md);">📈 Your Progress Breakdown</h3>';

    const weightDirection = data.weightChange > 0 ? 'positive' : 'negative';
    const weightSymbol = data.weightChange > 0 ? '+' : '';
    html += `
        <div class="metric-card">
            <div class="metric-header">
                <span style="font-weight: var(--fw-bold);">💪 Body Weight</span>
                <span class="metric-change ${weightDirection}">${weightSymbol}${data.weightChange.toFixed(1)} lbs (${weightSymbol}${data.weightChangePercent}%)</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: var(--fs-sm); color: var(--text-light-gray);">
                <span>Start: ${data.startWeight} lbs</span>
                <span>Current: ${data.endWeight} lbs</span>
            </div>
        </div>
    `;

    if (data.bodyFatChange !== null) {
        const bfDirection = data.bodyFatChange < 0 ? 'positive' : 'negative';
        const bfSymbol = data.bodyFatChange > 0 ? '+' : '';
        html += `
            <div class="metric-card">
                <div class="metric-header">
                    <span style="font-weight: var(--fw-bold);">🔥 Body Fat %</span>
                    <span class="metric-change ${bfDirection}">${bfSymbol}${data.bodyFatChange}%</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: var(--fs-sm); color: var(--text-light-gray);">
                    <span>Start: ${data.startBodyFat}%</span>
                    <span>Current: ${data.endBodyFat}%</span>
                </div>
            </div>
        `;
    }

    const workoutDirection = data.workoutsChange > 0 ? 'positive' : 'negative';
    const workoutSymbol = data.workoutsChange > 0 ? '+' : '';
    html += `
        <div class="metric-card">
            <div class="metric-header">
                <span style="font-weight: var(--fw-bold);">📅 Workout Frequency</span>
                <span class="metric-change ${workoutDirection}">${workoutSymbol}${data.workoutsChange.toFixed(1)} workouts/week</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: var(--fs-sm); color: var(--text-light-gray);">
                <span>Start: ${data.startWorkouts}x/week</span>
                <span>Current: ${data.endWorkouts}x/week</span>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

function displayAchievements(data) {
    const container = document.getElementById('achievementBadges');
    let badges = [];

    if (data.weightChange <= -10) badges.push('🏆 Lost 10+ lbs');
    if (data.weightChange <= -20) badges.push('💎 Lost 20+ lbs');
    if (data.weightChange <= -30) badges.push('🌟 Lost 30+ lbs');
    if (data.weightChange >= 10) badges.push('💪 Gained 10+ lbs');

    if (data.bodyFatChange !== null) {
        if (data.bodyFatChange <= -5) badges.push('🔥 Lost 5%+ Body Fat');
        if (data.bodyFatChange <= -10) badges.push('⚡ Lost 10%+ Body Fat');
    }

    if (data.totalWorkouts >= 100) badges.push('📅 100+ Workouts');
    if (data.totalWorkouts >= 150) badges.push('🔥 150+ Workouts');
    if (data.totalWorkouts >= 200) badges.push('⚡ 200+ Workouts');

    if (data.goalAchievement === 100) badges.push('🏆 Goal Crusher');
    if (data.goalAchievement >= 75) badges.push('🎯 Nearly There');

    if (data.biggestWin) {
        badges.push(`🌟 ${data.biggestWin}`);
    }

    if (badges.length === 0) {
        badges.push('🌱 Started Your Journey');
    }

    container.innerHTML = badges.map(badge => `<span class="achievement-badge">${badge}</span>`).join('');
}

function displayMilestones(data) {
    const container = document.getElementById('milestoneGrid');
    let milestones = [];

    if (Math.abs(data.weightChange) > 5) {
        milestones.push({
            icon: '⚖️',
            title: 'Weight Progress',
            desc: `${Math.abs(data.weightChange).toFixed(1)} lbs ${data.weightChange > 0 ? 'gained' : 'lost'}`
        });
    }

    if (data.bodyFatChange !== null && Math.abs(data.bodyFatChange) > 1) {
        milestones.push({
            icon: '🔥',
            title: 'Body Recomp',
            desc: `${Math.abs(data.bodyFatChange)}% body fat ${data.bodyFatChange > 0 ? 'gained' : 'lost'}`
        });
    }

    if (data.workoutsChange > 0) {
        milestones.push({
            icon: '📈',
            title: 'Consistency',
            desc: `+${data.workoutsChange.toFixed(1)} workouts/week`
        });
    }

    if (data.goalAchievement >= 75) {
        milestones.push({
            icon: '🎯',
            title: 'Goal Achieved',
            desc: `${data.goalAchievement}% complete`
        });
    }

    if (milestones.length === 0) {
        milestones.push({
            icon: '🌱',
            title: 'Journey Started',
            desc: 'Taking the first steps'
        });
    }

    container.innerHTML = milestones.map(m => `
        <div class="milestone-card">
            <div class="milestone-icon">${m.icon}</div>
            <div style="font-weight: var(--fw-bold); margin-bottom: var(--spacing-xs);">${m.title}</div>
            <div style="font-size: var(--fs-sm); color: var(--text-light-gray);">${m.desc}</div>
        </div>
    `).join('');
}

function displayGoals(primaryGoal, achievementLevel) {
    const container = document.getElementById('goalsList');
    
    const goalStrategies = {
        'weight-loss': {
            title: '2025 Weight Loss Strategy',
            goals: [
                'Set a realistic deficit: 250-500 cal/day for sustainable fat loss',
                'Track your food for the first 30 days to build awareness',
                'Aim for 0.5-1% body weight loss per week'
            ]
        },
        'muscle-gain': {
            title: '2025 Muscle Building Strategy',
            goals: [
                'Eat in a 250-500 calorie surplus to support growth',
                'Progressive overload: increase weight or reps each week',
                'Get 0.7-1g protein per pound of body weight daily'
            ]
        },
        'strength': {
            title: '2025 Strength Strategy',
            goals: [
                'Focus on compound movements: squat, bench, deadlift',
                'Follow a structured program (5x5, 5/3/1, etc.)',
                'Track every workout to ensure progressive overload'
            ]
        },
        'endurance': {
            title: '2025 Endurance Strategy',
            goals: [
                'Build a base: 3-4 cardio sessions per week',
                'Increase weekly mileage by no more than 10%',
                'Include one long session weekly for stamina'
            ]
        },
        'consistency': {
            title: '2025 Consistency Strategy',
            goals: [
                'Schedule workouts like appointments—non-negotiable',
                'Start small: commit to 3x/week minimum',
                'Track streaks to build momentum and accountability'
            ]
        },
        'health': {
            title: '2025 Health Strategy',
            goals: [
                'Move daily: 7,000-10,000 steps as baseline',
                'Sleep 7-9 hours consistently for recovery',
                'Add resistance training 2-3x/week for longevity'
            ]
        }
    };

    const strategy = goalStrategies[primaryGoal] || goalStrategies['health'];
    
    let html = `<h4>${strategy.title}</h4>`;
    html += '<ul style="margin-left: var(--spacing-lg); color: var(--text-light-gray);">';
    strategy.goals.forEach(goal => {
        html += `<li style="margin-bottom: var(--spacing-sm);">${goal}</li>`;
    });
    html += '</ul>';

    if (achievementLevel >= 75) {
        html += `
            <div style="margin-top: var(--spacing-lg); padding: var(--spacing-md); background: rgba(0, 230, 118, 0.1); border-radius: var(--radius-md); border: 1px solid var(--primary-color);">
                <strong style="color: var(--primary-color);">You crushed 2024! 🚀</strong>
                <p style="margin: var(--spacing-sm) 0 0 0; color: var(--text-light-gray); font-size: var(--fs-sm);">You've proven you can do this. Now take everything you learned and level up even more in 2025.</p>
            </div>
        `;
    } else if (achievementLevel >= 50) {
        html += `
            <div style="margin-top: var(--spacing-lg); padding: var(--spacing-md); background: rgba(0, 230, 118, 0.1); border-radius: var(--radius-md); border: 1px solid var(--primary-color);">
                <strong style="color: var(--primary-color);">You're halfway there! 💪</strong>
                <p style="margin: var(--spacing-sm) 0 0 0; color: var(--text-light-gray); font-size: var(--fs-sm);">The momentum is building. Stay consistent and 2025 will be your breakthrough year.</p>
            </div>
        `;
    } else {
        html += `
            <div style="margin-top: var(--spacing-lg); padding: var(--spacing-md); background: rgba(0, 230, 118, 0.1); border-radius: var(--radius-md); border: 1px solid var(--primary-color);">
                <strong style="color: var(--primary-color);">Fresh start for 2025! 🌱</strong>
                <p style="margin: var(--spacing-sm) 0 0 0; color: var(--text-light-gray); font-size: var(--fs-sm);">Every expert was once a beginner. Use what you learned in 2024 and commit to small, consistent actions in 2025.</p>
            </div>
        `;
    }

    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('progressForm').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateChart();
        }
    });
});