// ===== Eternal Quest Main JavaScript =====

// ===== Goal Class Definition (Object) =====
class Goal {
    constructor(id, name, description, type, points, target = null, bonus = null) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type; // 'simple', 'eternal', 'checklist'
        this.points = parseInt(points);
        this.target = target ? parseInt(target) : null;
        this.bonus = bonus ? parseInt(bonus) : null;
        this.completed = false;
        this.progress = 0; // For checklist goals
        this.dateCreated = new Date().toISOString();
    }

    // Method to record completion
    record() {
        if (this.type === 'eternal') {
            // Eternal goals never complete
            return this.points;
        } else if (this.type === 'simple') {
            if (!this.completed) {
                this.completed = true;
                return this.points;
            }
            return 0;
        } else if (this.type === 'checklist') {
            if (this.progress < this.target) {
                this.progress++;
                if (this.progress === this.target) {
                    this.completed = true;
                    return this.points + this.bonus;
                }
                return this.points;
            }
            return 0;
        }
        return 0;
    }

    // Method to get progress string
    getProgress() {
        if (this.type === 'checklist') {
            return `${this.progress}/${this.target}`;
        } else if (this.type === 'simple') {
            return this.completed ? 'Complete' : 'Incomplete';
        } else {
            return 'Eternal';
        }
    }
}

// ===== State Management =====
let goals = [];
let totalScore = 0;

// ===== localStorage Functions =====
function loadFromStorage() {
    try {
        const savedGoals = localStorage.getItem('eternalQuestGoals');
        const savedScore = localStorage.getItem('eternalQuestScore');
        
        if (savedGoals) {
            const parsedGoals = JSON.parse(savedGoals);
            // Recreate Goal objects from plain objects
            goals = parsedGoals.map(g => {
                const goal = new Goal(g.id, g.name, g.description, g.type, g.points, g.target, g.bonus);
                goal.completed = g.completed || false;
                goal.progress = g.progress || 0;
                goal.dateCreated = g.dateCreated;
                return goal;
            });
        }
        
        if (savedScore) {
            totalScore = parseInt(savedScore);
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        // Initialize with default data if loading fails
        initializeDefaultData();
    }
}

function saveToStorage() {
    try {
        localStorage.setItem('eternalQuestGoals', JSON.stringify(goals));
        localStorage.setItem('eternalQuestScore', totalScore.toString());
        updateScoreDisplay();
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        showFeedback('Error saving data', 'error');
    }
}

// ===== Initialize Default Data =====
function initializeDefaultData() {
    if (goals.length === 0) {
        const defaultGoals = [
            new Goal('1', 'Run a Marathon', 'Complete a full marathon race', 'simple', 1000),
            new Goal('2', 'Daily Scripture Study', 'Read scriptures every day', 'eternal', 100),
            new Goal('3', 'Temple Attendance', 'Attend the temple 10 times', 'checklist', 50, 10, 500)
        ];
        
        // Set some progress for demo
        defaultGoals[2].progress = 3;
        
        goals = defaultGoals;
        totalScore = 350;
        saveToStorage();
    }
}

// ===== UI Update Functions =====
function updateScoreDisplay() {
    const scoreElements = document.querySelectorAll('#total-score');
    const levelElements = document.querySelectorAll('#current-level');
    const level = Math.floor(totalScore / 1000) + 1;
    
    scoreElements.forEach(el => {
        if (el) el.textContent = totalScore;
    });
    
    levelElements.forEach(el => {
        if (el) el.textContent = level;
    });
}

function displayGoals(filter = 'all') {
    const goalsList = document.getElementById('goals-list');
    if (!goalsList) return;

    if (goals.length === 0) {
        goalsList.innerHTML = '<p class="loading">No goals yet. <a href="add-goal.html">Add your first goal!</a></p>';
        return;
    }

    const filteredGoals = filter === 'all' 
        ? goals 
        : goals.filter(g => g.type === filter);

    if (filteredGoals.length === 0) {
        goalsList.innerHTML = `<p class="loading">No ${filter} goals found.</p>`;
        return;
    }

    const goalsHTML = filteredGoals.map(goal => {
        const status = goal.completed ? 'completed' : '';
        const progressText = goal.getProgress();
        
        return `
            <div class="goal-item ${status}" data-id="${goal.id}">
                <div class="goal-info">
                    <h3>${goal.name}</h3>
                    <p>${goal.description}</p>
                    <span class="goal-type">${goal.type.charAt(0).toUpperCase() + goal.type.slice(1)} Goal</span>
                    <span class="goal-progress">Progress: ${progressText}</span>
                    <span class="goal-points">Points: ${goal.points}${goal.bonus ? ` + ${goal.bonus} bonus` : ''}</span>
                </div>
                <div class="goal-actions">
                    <button class="btn-primary record-btn" data-id="${goal.id}" ${goal.completed && goal.type !== 'eternal' ? 'disabled' : ''}>
                        ${goal.type === 'eternal' ? 'Record' : goal.completed ? 'Completed' : 'Record Event'}
                    </button>
                    <button class="btn-secondary delete-btn" data-id="${goal.id}">Delete</button>
                </div>
            </div>
        `;
    }).join('');

    goalsList.innerHTML = goalsHTML;

    // Add event listeners to buttons
    document.querySelectorAll('.record-btn').forEach(btn => {
        btn.addEventListener('click', handleRecordEvent);
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', handleDeleteGoal);
    });
}

function displayPreviewStats() {
    const previewStats = document.getElementById('preview-stats');
    if (!previewStats) return;

    const totalGoals = goals.length;
    const completedGoals = goals.filter(g => g.completed).length;
    const simpleGoals = goals.filter(g => g.type === 'simple').length;
    const eternalGoals = goals.filter(g => g.type === 'eternal').length;
    const checklistGoals = goals.filter(g => g.type === 'checklist').length;

    previewStats.innerHTML = `
        <div class="stats-grid">
            <div class="stat-item">
                <span class="stat-value">${totalScore}</span>
                <span class="stat-label">Total Points</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${totalGoals}</span>
                <span class="stat-label">Total Goals</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${completedGoals}</span>
                <span class="stat-label">Completed</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${simpleGoals}</span>
                <span class="stat-label">Simple</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${eternalGoals}</span>
                <span class="stat-label">Eternal</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${checklistGoals}</span>
                <span class="stat-label">Checklist</span>
            </div>
        </div>
    `;
}

// ===== Event Handlers =====
function handleRecordEvent(event) {
    const goalId = event.target.dataset.id;
    const goal = goals.find(g => g.id === goalId);
    
    if (goal) {
        const pointsEarned = goal.record();
        totalScore += pointsEarned;
        
        if (pointsEarned > 0) {
            showFeedback(`Earned ${pointsEarned} points!`, 'success');
        } else {
            showFeedback('No points earned (already completed)', 'error');
        }
        
        saveToStorage();
        displayGoals(getCurrentFilter());
        displayPreviewStats();
        updateScoreDisplay();
    }
}

function handleDeleteGoal(event) {
    const goalId = event.target.dataset.id;
    
    if (confirm('Are you sure you want to delete this goal?')) {
        goals = goals.filter(g => g.id !== goalId);
        saveToStorage();
        displayGoals(getCurrentFilter());
        displayPreviewStats();
        showFeedback('Goal deleted', 'success');
    }
}

function getCurrentFilter() {
    const activeFilter = document.querySelector('.filter-btn.active');
    return activeFilter ? activeFilter.dataset.filter : 'all';
}

function showFeedback(message, type = 'success') {
    const feedback = document.getElementById('form-feedback');
    if (feedback) {
        feedback.textContent = message;
        feedback.className = `form-feedback ${type}`;
        setTimeout(() => {
            feedback.textContent = '';
            feedback.className = 'form-feedback';
        }, 3000);
    } else {
        alert(message);
    }
}

// ===== Form Handling =====
function setupForm() {
    const form = document.getElementById('goal-form');
    if (!form) return;

    const goalTypeSelect = document.getElementById('goal-type');
    const checklistFields = document.getElementById('checklist-fields');

    // Show/hide checklist fields based on goal type
    goalTypeSelect.addEventListener('change', function() {
        if (this.value === 'checklist') {
            checklistFields.classList.remove('hidden');
        } else {
            checklistFields.classList.add('hidden');
        }
    });

    // Form validation
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Validate name
        const name = document.getElementById('goal-name');
        if (name.value.length < 3) {
            document.getElementById('name-error').textContent = 'Name must be at least 3 characters';
            name.focus();
            return;
        }

        // Validate description
        const description = document.getElementById('goal-description');
        if (description.value.length < 10) {
            document.getElementById('description-error').textContent = 'Description must be at least 10 characters';
            description.focus();
            return;
        }

        // Validate points
        const points = document.getElementById('goal-points');
        if (points.value < 1) {
            showFeedback('Points must be at least 1', 'error');
            points.focus();
            return;
        }

        // Get form values
        const goalData = {
            id: Date.now().toString(),
            name: name.value,
            description: description.value,
            type: goalTypeSelect.value,
            points: points.value
        };

        // Add checklist-specific fields if needed
        if (goalTypeSelect.value === 'checklist') {
            const target = document.getElementById('goal-target');
            const bonus = document.getElementById('goal-bonus');
            
            if (!target.value || target.value < 2) {
                showFeedback('Target must be at least 2 for checklist goals', 'error');
                return;
            }
            
            if (!bonus.value || bonus.value < 1) {
                showFeedback('Bonus must be at least 1', 'error');
                return;
            }
            
            goalData.target = target.value;
            goalData.bonus = bonus.value;
        }

        // Create new goal
        const newGoal = new Goal(
            goalData.id,
            goalData.name,
            goalData.description,
            goalData.type,
            goalData.points,
            goalData.target,
            goalData.bonus
        );

        // Add to goals array
        goals.push(newGoal);
        saveToStorage();

        // Show success message
        showFeedback('Goal created successfully!', 'success');

        // Reset form
        form.reset();
        checklistFields.classList.add('hidden');

        // Redirect after delay
        setTimeout(() => {
            window.location.href = 'goals.html';
        }, 2000);
    });

    // Reset form
    form.addEventListener('reset', function() {
        checklistFields.classList.add('hidden');
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    });
}

// ===== Mobile Menu =====
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// ===== Filter Setup =====
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Display filtered goals
            displayGoals(this.dataset.filter);
        });
    });
}

// ===== Initialize Page =====
document.addEventListener('DOMContentLoaded', function() {
    // Load data from localStorage
    loadFromStorage();
    
    // Setup common UI elements
    setupMobileMenu();
    
    // Update score display on all pages
    updateScoreDisplay();
    
    // Page-specific initializations
    const path = window.location.pathname;
    
    if (path.includes('goals.html')) {
        displayGoals();
        setupFilters();
    }
    
    if (path.includes('index.html') || path === '/' || path.endsWith('index.html')) {
        displayPreviewStats();
    }
    
    if (path.includes('add-goal.html')) {
        setupForm();
    }
    
    // Set active nav link
    const currentPage = path.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});