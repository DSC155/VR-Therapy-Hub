// VR Therapy Hub Enhanced JavaScript - Bug Fixes Applied

// Application data
const assessmentData = {
  gad7: [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying", 
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid as if something awful might happen"
  ],
  pcl5: [
    "Repeated, disturbing, and unwanted memories of the stressful experience",
    "Repeated, disturbing dreams of the stressful experience",
    "Suddenly feeling or acting as if the stressful experience were actually happening again",
    "Feeling very upset when something reminded you of the stressful experience",
    "Having strong physical reactions when something reminded you of the stressful experience",
    "Avoiding memories, thoughts, or feelings related to the stressful experience",
    "Avoiding external reminders of the stressful experience",
    "Trouble remembering important parts of the stressful experience",
    "Having strong negative beliefs about yourself, other people, or the world",
    "Blaming yourself or someone else for the stressful experience or what happened after it",
    "Having strong negative feelings such as fear, horror, anger, guilt, or shame",
    "Loss of interest in activities that you used to enjoy",
    "Feeling distant or cut off from other people",
    "Trouble experiencing positive feelings",
    "Irritable behavior, angry outbursts, or acting aggressively",
    "Taking too many risks or doing things that could cause you harm",
    "Being 'superalert' or watchful or on guard",
    "Feeling jumpy or easily startled",
    "Having difficulty concentrating",
    "Trouble falling or staying asleep"
  ],
  phobiaCategories: {
    "Animal Type": [
      {name: "Arachnophobia", description: "Fear of spiders", prevalence: "3.5%"},
      {name: "Cynophobia", description: "Fear of dogs", prevalence: "2.8%"},
      {name: "Entomophobia", description: "Fear of insects", prevalence: "4.5%"},
      {name: "Ornithophobia", description: "Fear of birds", prevalence: "1.2%"},
      {name: "Musophobia", description: "Fear of mice and rats", prevalence: "2.1%"}
    ],
    "Natural Environment Type": [
      {name: "Acrophobia", description: "Fear of heights", prevalence: "6.4%"},
      {name: "Astraphobia", description: "Fear of storms", prevalence: "2.3%"},
      {name: "Hydrophobia", description: "Fear of water", prevalence: "1.8%"},
      {name: "Nyctophobia", description: "Fear of darkness", prevalence: "2.7%"},
      {name: "Pyrophobia", description: "Fear of fire", prevalence: "1.5%"}
    ],
    "Blood-Injection-Injury Type": [
      {name: "Hemophobia", description: "Fear of blood", prevalence: "3.0%"},
      {name: "Trypanophobia", description: "Fear of needles", prevalence: "7.0%"},
      {name: "Iatrophobia", description: "Fear of medical procedures", prevalence: "2.5%"}
    ],
    "Situational Type": [
      {name: "Aerophobia", description: "Fear of flying", prevalence: "5.0%"},
      {name: "Claustrophobia", description: "Fear of enclosed spaces", prevalence: "7.7%"},
      {name: "Dentophobia", description: "Fear of dentists", prevalence: "15.0%"},
      {name: "Amaxophobia", description: "Fear of driving", prevalence: "12.5%"}
    ],
    "Social Type": [
      {name: "Glossophobia", description: "Fear of public speaking", prevalence: "25.0%"},
      {name: "Social Phobia", description: "Fear of social situations", prevalence: "12.1%"}
    ]
  }
};

// Global state
let currentStep = 1;
let assessmentResults = {
  basicInfo: {},
  gad7Scores: {},
  phobiaRatings: {},
  pcl5Scores: {},
  biometrics: {}
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeAssessment();
  initializeDashboard();
  initializeBiometrics();
  setupEventListeners();
  
  // Set initial dark theme
  document.documentElement.setAttribute('data-color-scheme', 'dark');
});

// Navigation functionality
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  // Smooth scroll to sections
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Close mobile menu
        navMenu.classList.remove('active');
      }
    });
  });
  
  // Update active nav link on scroll
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateActiveNav);
      ticking = true;
    }
  });
  
  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
    
    ticking = false;
  }
  
  // Mobile navigation toggle - FIXED
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }
}

// Start assessment function
function startAssessment() {
  const assessmentSection = document.getElementById('assessment');
  if (assessmentSection) {
    const offsetTop = assessmentSection.offsetTop - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// Assessment wizard initialization - FIXED
function initializeAssessment() {
  renderGAD7Questions();
  renderPhobiaCategories();
  renderPCL5Questions();
  updateWizardStep(); // Initialize with step 1
}

// Render GAD-7 questions
function renderGAD7Questions() {
  const container = document.getElementById('gad7Questions');
  if (!container) return;
  
  const options = ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'];
  
  container.innerHTML = assessmentData.gad7.map((question, index) => `
    <div class="question-item" data-question="${index}">
      <div class="question-text">${index + 1}. ${question}</div>
      <div class="question-options">
        ${options.map((option, optionIndex) => `
          <button class="option-btn" data-value="${optionIndex}" onclick="selectGAD7Option(${index}, ${optionIndex}, this)">
            ${option}
          </button>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// Handle GAD-7 option selection
function selectGAD7Option(questionIndex, value, button) {
  // Remove selection from other buttons in this question
  const questionItem = button.closest('.question-item');
  questionItem.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
  
  // Add selection to clicked button
  button.classList.add('selected');
  
  // Store the answer
  assessmentResults.gad7Scores[questionIndex] = value;
  
  // Add smooth animation
  button.style.transform = 'scale(1.1)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 150);
}

// Render phobia categories
function renderPhobiaCategories() {
  const container = document.getElementById('phobiaCategories');
  if (!container) return;
  
  container.innerHTML = Object.entries(assessmentData.phobiaCategories).map(([categoryName, phobias]) => `
    <div class="phobia-category">
      <div class="category-header" onclick="toggleCategory('${categoryName}')">
        <h4>${categoryName}</h4>
        <i class="fas fa-chevron-down category-arrow"></i>
      </div>
      <div class="category-content" id="category-${categoryName.replace(/\s+/g, '')}">
        ${phobias.map((phobia, index) => `
          <div class="phobia-item">
            <div class="phobia-info">
              <h4>${phobia.name}</h4>
              <p>${phobia.description} (${phobia.prevalence} prevalence)</p>
            </div>
            <div class="fear-rating">
              ${[0, 1, 2, 3, 4, 5].map(rating => `
                <button class="rating-btn" data-rating="${rating}" 
                        onclick="selectPhobiaRating('${categoryName}', '${phobia.name}', ${rating}, this)">
                  ${rating}
                </button>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// Toggle phobia category
function toggleCategory(categoryName) {
  const content = document.getElementById(`category-${categoryName.replace(/\s+/g, '')}`);
  const arrow = content.previousElementSibling.querySelector('.category-arrow');
  
  content.classList.toggle('expanded');
  arrow.style.transform = content.classList.contains('expanded') ? 'rotate(180deg)' : 'rotate(0deg)';
}

// Handle phobia rating selection
function selectPhobiaRating(category, phobiaName, rating, button) {
  // Remove selection from other buttons in this phobia
  const phobiaItem = button.closest('.phobia-item');
  phobiaItem.querySelectorAll('.rating-btn').forEach(btn => btn.classList.remove('selected'));
  
  // Add selection to clicked button
  button.classList.add('selected');
  
  // Store the rating
  if (!assessmentResults.phobiaRatings[category]) {
    assessmentResults.phobiaRatings[category] = {};
  }
  assessmentResults.phobiaRatings[category][phobiaName] = rating;
  
  // Add smooth animation
  button.style.transform = 'scale(1.2)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 150);
}

// Render PCL-5 questions
function renderPCL5Questions() {
  const container = document.getElementById('pcl5Questions');
  if (!container) return;
  
  const options = ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'];
  
  container.innerHTML = assessmentData.pcl5.map((question, index) => `
    <div class="question-item" data-question="${index}">
      <div class="question-text">${index + 1}. ${question}</div>
      <div class="question-options">
        ${options.map((option, optionIndex) => `
          <button class="option-btn" data-value="${optionIndex}" onclick="selectPCL5Option(${index}, ${optionIndex}, this)">
            ${option}
          </button>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// Handle PCL-5 option selection
function selectPCL5Option(questionIndex, value, button) {
  // Remove selection from other buttons in this question
  const questionItem = button.closest('.question-item');
  questionItem.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
  
  // Add selection to clicked button
  button.classList.add('selected');
  
  // Store the answer
  assessmentResults.pcl5Scores[questionIndex] = value;
  
  // Add smooth animation
  button.style.transform = 'scale(1.1)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 150);
}

// Step navigation functions - FIXED
function nextStep() {
  if (validateCurrentStep()) {
    if (currentStep < 5) {
      currentStep++;
      updateWizardStep();
    } else {
      // Complete assessment and show results
      completeAssessment();
    }
  }
}

function previousStep() {
  if (currentStep > 1) {
    currentStep--;
    updateWizardStep();
  }
}

// FIXED: Proper step content visibility control
function updateWizardStep() {
  // Update step indicators
  document.querySelectorAll('.step').forEach((step, index) => {
    step.classList.remove('active', 'completed');
    if (index + 1 === currentStep) {
      step.classList.add('active');
    } else if (index + 1 < currentStep) {
      step.classList.add('completed');
    }
  });
  
  // FIXED: Update step content visibility
  document.querySelectorAll('.step-content').forEach((content, index) => {
    content.classList.remove('active');
    content.style.display = 'none';
    
    if (index + 1 === currentStep) {
      content.classList.add('active');
      content.style.display = 'block';
    }
  });
  
  // Update navigation buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (prevBtn && nextBtn) {
    prevBtn.disabled = currentStep === 1;
    nextBtn.textContent = currentStep === 5 ? 'Complete Assessment' : 'Next';
  }
}

function validateCurrentStep() {
  switch (currentStep) {
    case 1:
      // Validate basic info
      const ageRange = document.getElementById('ageRange')?.value;
      const primaryConcern = document.getElementById('primaryConcern')?.value;
      
      if (!ageRange || !primaryConcern) {
        showNotification('Please complete all required fields', 'error');
        return false;
      }
      
      assessmentResults.basicInfo = { ageRange, primaryConcern };
      return true;
      
    case 2:
      // Validate GAD-7 completion (at least 1 question for demo)
      if (Object.keys(assessmentResults.gad7Scores).length < 1) {
        showNotification('Please answer at least one GAD-7 question', 'warning');
        return false;
      }
      return true;
      
    case 3:
      // Validate at least some phobia ratings
      const totalRatings = Object.values(assessmentResults.phobiaRatings).reduce(
        (total, category) => total + Object.keys(category).length, 0
      );
      if (totalRatings === 0) {
        showNotification('Please rate at least one phobia', 'warning');
        return false;
      }
      return true;
      
    case 4:
      // Validate PCL-5 completion (at least 1 question for demo)
      if (Object.keys(assessmentResults.pcl5Scores).length < 1) {
        showNotification('Please answer at least one PCL-5 question', 'warning');
        return false;
      }
      return true;
      
    case 5:
      // Biometrics step is always valid
      return true;
      
    default:
      return true;
  }
}

function completeAssessment() {
  calculateScores();
  generateRecommendations();
  showResults();
}

function calculateScores() {
  // Calculate GAD-7 score
  const gad7Total = Object.values(assessmentResults.gad7Scores).reduce((sum, score) => sum + score, 0);
  assessmentResults.gad7Total = gad7Total;
  
  // Calculate PCL-5 score
  const pcl5Total = Object.values(assessmentResults.pcl5Scores).reduce((sum, score) => sum + score, 0);
  assessmentResults.pcl5Total = pcl5Total;
  
  // Calculate highest phobia fears
  const phobiaScores = [];
  Object.entries(assessmentResults.phobiaRatings).forEach(([category, phobias]) => {
    Object.entries(phobias).forEach(([phobia, rating]) => {
      if (rating > 2) { // Only include significant fears
        phobiaScores.push({ category, phobia, rating });
      }
    });
  });
  
  assessmentResults.significantPhobias = phobiaScores.sort((a, b) => b.rating - a.rating);
}

function generateRecommendations() {
  const { gad7Total, pcl5Total, significantPhobias } = assessmentResults;
  const recommendations = {
    vrEnvironments: [],
    sessionFrequency: 'Weekly',
    therapyType: 'Standard Exposure Therapy',
    riskLevel: 'Low'
  };
  
  // Determine risk level and therapy intensity
  if (gad7Total >= 15 || pcl5Total >= 50) {
    recommendations.riskLevel = 'High';
    recommendations.sessionFrequency = 'Twice weekly';
    recommendations.therapyType = 'Intensive Exposure Therapy';
  } else if (gad7Total >= 10 || pcl5Total >= 33) {
    recommendations.riskLevel = 'Moderate';
    recommendations.sessionFrequency = 'Weekly';
    recommendations.therapyType = 'Progressive Exposure Therapy';
  }
  
  // Recommend VR environments based on phobias
  const environmentMap = {
    'Acrophobia': 'height',
    'Aerophobia': 'flying',
    'Glossophobia': 'social',
    'Social Phobia': 'social',
    'Hemophobia': 'medical',
    'Trypanophobia': 'medical',
    'Iatrophobia': 'medical'
  };
  
  significantPhobias.forEach(phobia => {
    const env = environmentMap[phobia.phobia];
    if (env && !recommendations.vrEnvironments.includes(env)) {
      recommendations.vrEnvironments.push(env);
    }
  });
  
  // Default to height therapy if no specific phobias identified
  if (recommendations.vrEnvironments.length === 0) {
    recommendations.vrEnvironments.push('height');
  }
  
  assessmentResults.recommendations = recommendations;
}

function showResults() {
  const resultsContainer = document.getElementById('assessmentResults');
  const { gad7Total, pcl5Total, significantPhobias, recommendations } = assessmentResults;
  
  const environmentNames = {
    height: 'Height Therapy',
    flying: 'Flying Simulation',
    social: 'Social Training',
    medical: 'Medical Training'
  };
  
  resultsContainer.innerHTML = `
    <div class="results-summary">
      <h4>Assessment Summary</h4>
      <div class="score-grid">
        <div class="score-item">
          <div class="score-label">GAD-7 Anxiety Score</div>
          <div class="score-value ${getScoreClass(gad7Total, 'gad7')}">${gad7Total}/21</div>
        </div>
        <div class="score-item">
          <div class="score-label">PCL-5 PTSD Score</div>
          <div class="score-value ${getScoreClass(pcl5Total, 'pcl5')}">${pcl5Total}/80</div>
        </div>
        <div class="score-item">
          <div class="score-label">Risk Level</div>
          <div class="score-value ${recommendations.riskLevel.toLowerCase()}">${recommendations.riskLevel}</div>
        </div>
      </div>
      
      <div class="recommendations">
        <h5>Recommended VR Environments</h5>
        <div class="env-recommendations">
          ${recommendations.vrEnvironments.map(env => `
            <div class="recommended-env">
              <i class="fas fa-${getEnvironmentIcon(env)}"></i>
              <span>${environmentNames[env]}</span>
            </div>
          `).join('')}
        </div>
        
        <div class="therapy-plan">
          <h5>Personalized Therapy Plan</h5>
          <div class="plan-details">
            <div class="plan-item">
              <strong>Therapy Type:</strong> ${recommendations.therapyType}
            </div>
            <div class="plan-item">
              <strong>Session Frequency:</strong> ${recommendations.sessionFrequency}
            </div>
            <div class="plan-item">
              <strong>Focus Areas:</strong> ${significantPhobias.slice(0, 3).map(p => p.phobia).join(', ') || 'General anxiety management'}
            </div>
          </div>
        </div>
      </div>
      
      <div class="results-actions">
        <button class="btn btn--primary" onclick="viewDashboard()">
          <i class="fas fa-chart-line"></i>
          View Dashboard
        </button>
        <button class="btn btn--outline" onclick="downloadResults()">
          <i class="fas fa-download"></i>
          Download Results
        </button>
      </div>
    </div>
  `;
  
  // Show results step
  document.querySelectorAll('.step-content').forEach(content => {
    content.classList.remove('active');
    content.style.display = 'none';
  });
  
  const resultsStep = document.getElementById('results');
  resultsStep.style.display = 'block';
  resultsStep.classList.add('active');
  
  // Hide navigation buttons
  const wizardNav = document.querySelector('.wizard-navigation');
  if (wizardNav) {
    wizardNav.style.display = 'none';
  }
}

function getScoreClass(score, type) {
  if (type === 'gad7') {
    if (score >= 15) return 'high-score';
    if (score >= 10) return 'moderate-score';
    return 'low-score';
  } else if (type === 'pcl5') {
    if (score >= 50) return 'high-score';
    if (score >= 33) return 'moderate-score';
    return 'low-score';
  }
  return '';
}

function getEnvironmentIcon(env) {
  const icons = {
    height: 'building',
    flying: 'plane',
    social: 'users',
    medical: 'user-md'
  };
  return icons[env] || 'vr-cardboard';
}

function viewDashboard() {
  const dashboardSection = document.getElementById('dashboard');
  if (dashboardSection) {
    const offsetTop = dashboardSection.offsetTop - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

function downloadResults() {
  const results = {
    timestamp: new Date().toISOString(),
    scores: {
      gad7: assessmentResults.gad7Total,
      pcl5: assessmentResults.pcl5Total
    },
    recommendations: assessmentResults.recommendations,
    significantPhobias: assessmentResults.significantPhobias
  };
  
  const dataStr = JSON.stringify(results, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `vr-therapy-assessment-${new Date().toISOString().split('T')[0]}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

// Biometric simulation - ENHANCED
function initializeBiometrics() {
  let biometricInterval;
  
  function updateBiometrics() {
    // Simulate realistic biometric data with subtle variations
    const baseHeartRate = 72;
    const heartRate = baseHeartRate + Math.floor(Math.random() * 10 - 5);
    const heartRateElement = document.getElementById('heartRate');
    if (heartRateElement) {
      heartRateElement.textContent = `${heartRate} bpm`;
    }
    
    const baseSystolic = 120;
    const baseDiastolic = 80;
    const systolic = baseSystolic + Math.floor(Math.random() * 10 - 5);
    const diastolic = baseDiastolic + Math.floor(Math.random() * 6 - 3);
    const bloodPressureElement = document.getElementById('bloodPressure');
    if (bloodPressureElement) {
      bloodPressureElement.textContent = `${systolic}/${diastolic}`;
    }
    
    const stressLevels = ['Low', 'Normal', 'Moderate'];
    const currentStress = stressLevels[Math.floor(Math.random() * stressLevels.length)];
    const stressLevelElement = document.getElementById('stressLevel');
    if (stressLevelElement) {
      stressLevelElement.textContent = currentStress;
    }
    
    // Store biometric data
    assessmentResults.biometrics = {
      heartRate,
      bloodPressure: `${systolic}/${diastolic}`,
      stressLevel: currentStress,
      timestamp: new Date().toISOString()
    };
  }
  
  // Start biometric updates when step 5 becomes active
  function startBiometricsIfActive() {
    const step5 = document.getElementById('step5');
    if (step5 && step5.classList.contains('active') && step5.style.display !== 'none') {
      if (!biometricInterval) {
        biometricInterval = setInterval(updateBiometrics, 3000);
        updateBiometrics(); // Initial update
      }
    } else if (biometricInterval) {
      clearInterval(biometricInterval);
      biometricInterval = null;
    }
  }
  
  // Monitor for step changes
  setInterval(startBiometricsIfActive, 1000);
}

// Dashboard progress rings initialization
function initializeDashboard() {
  const progressRings = document.querySelectorAll('.progress-ring');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const ring = entry.target;
        const progress = ring.getAttribute('data-progress');
        
        // Animate the progress ring
        ring.style.setProperty('--progress', progress);
        
        // Animate the number
        const valueElement = ring.querySelector('.progress-value');
        if (valueElement) {
          animateNumber(valueElement, 0, parseInt(progress), 2000);
        }
      }
    });
  }, observerOptions);
  
  progressRings.forEach(ring => observer.observe(ring));
}

function animateNumber(element, start, end, duration) {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.round(start + (end - start) * easeOutQuart);
    
    element.textContent = `${current}%`;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// Environment card interactions
function setupEventListeners() {
  // Environment cards hover effects
  const environmentCards = document.querySelectorAll('.environment-card');
  environmentCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
    
    card.addEventListener('click', function() {
      const environment = this.getAttribute('data-environment');
      showEnvironmentDetails(environment);
    });
  });
  
  // Add click handlers for resource cards
  const resourceCards = document.querySelectorAll('.resource-card');
  resourceCards.forEach(card => {
    const button = card.querySelector('.btn');
    if (button) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const title = card.querySelector('h4').textContent;
        showNotification(`Opening ${title}...`, 'info');
      });
    }
  });
}

function showEnvironmentDetails(environment) {
  const environments = {
    height: {
      name: 'Height Therapy',
      description: 'Gradual exposure to heights in a safe, controlled virtual environment',
      features: ['Progressive height levels', 'Safety protocols', 'Biometric monitoring'],
      duration: '15-30 minutes per session'
    },
    flying: {
      name: 'Flying Simulation',
      description: 'Realistic flight experience to overcome aerophobia',
      features: ['Airport familiarization', 'Takeoff simulation', 'Turbulence training'],
      duration: '20-45 minutes per session'
    },
    social: {
      name: 'Social Training',
      description: 'Practice social interactions in various virtual scenarios',
      features: ['Public speaking', 'Group interactions', 'Performance feedback'],
      duration: '25-40 minutes per session'
    },
    medical: {
      name: 'Medical Training',
      description: 'Overcome medical procedure anxiety through exposure',
      features: ['Consultation scenarios', 'Injection training', 'Surgical observations'],
      duration: '10-25 minutes per session'
    }
  };
  
  const env = environments[environment];
  if (env) {
    showNotification(`${env.name}: ${env.description}`, 'info');
  }
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) {
    existing.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${getNotificationIcon(type)}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

function getNotificationIcon(type) {
  const icons = {
    success: 'check-circle',
    error: 'exclamation-triangle',
    warning: 'exclamation-circle',
    info: 'info-circle'
  };
  return icons[type] || 'info-circle';
}

// Smooth scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Add scroll to top button functionality
window.addEventListener('scroll', function() {
  let scrollBtn = document.getElementById('scrollToTop');
  if (!scrollBtn) {
    scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollToTop';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.onclick = scrollToTop;
    document.body.appendChild(scrollBtn);
  }
  
  if (window.scrollY > 500) {
    scrollBtn.style.display = 'flex';
  } else {
    scrollBtn.style.display = 'none';
  }
});

// Performance optimization - Debounce resize events
let resizeTimeout;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
    // Handle responsive adjustments
    const isMobile = window.innerWidth <= 768;
    document.body.classList.toggle('mobile-view', isMobile);
  }, 250);
});

// Enhanced accessibility
document.addEventListener('keydown', function(e) {
  // ESC key to close modals/notifications
  if (e.key === 'Escape') {
    const notification = document.querySelector('.notification');
    if (notification) {
      notification.remove();
    }
    
    // Close mobile menu
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    if (navMenu && navToggle) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  }
  
  // Tab navigation enhancement
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', function() {
  document.body.classList.remove('keyboard-navigation');
});

// Error handling for missing elements
window.addEventListener('error', function(e) {
  console.error('VR Therapy Hub Error:', e.error);
  showNotification('An error occurred. Please refresh the page.', 'error');
});

// Service worker registration for offline functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('SW registered: ', registration);
      })
      .catch(function(registrationError) {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
function openVREnvironment(page) {
  window.location.href = page; // Opens VR scene in same tab
}
