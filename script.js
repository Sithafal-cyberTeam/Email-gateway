// Complete Enhanced JavaScript for Sithafal Dashboard

// Global chart instances
let threatChartInstance = null;
let trafficChartInstance = null;
let securityScoreChartInstance = null;
let miniChartInstances = {};

// Configuration
const config = {
    animationDuration: 1000,
    chartColors: {
        malicious: '#1e40af',
        phishing: '#be185d',
        suspicious: '#a16207',
        detected: '#059669',
        malware: '#0891b2',
        primary: '#3b82f6',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444'
    }
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Sithafal Dashboard initializing...');
    
    // Show loading overlay
    showLoadingOverlay();
    
    // Initialize in sequence with proper timing
    setTimeout(() => {
        initializeAnimations();
        initializeEventListeners();
        initializeCharts();
        initializeCounterAnimations();
        hideLoadingOverlay();
    }, 500);
});

// Loading overlay functions
function showLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('hidden');
    }
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 1000);
    }
}

// Initialize scroll animations
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate response bars
                const barFills = entry.target.querySelectorAll('.bar-fill');
                barFills.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.getAttribute('data-width');
                        if (width) {
                            bar.style.width = width + '%';
                        }
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.1 });

    // Observe animated elements
    document.querySelectorAll('.animated').forEach(el => {
        observer.observe(el);
    });

    // Observe response bars section
    const responseSection = document.querySelector('.response-bars');
    if (responseSection) {
        observer.observe(responseSection);
    }
}

// Initialize counter animations
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-value[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animate counter numbers
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Initialize all charts with error handling
function initializeCharts() {
    console.log('📊 Initializing charts...');
    
    try {
        // Initialize charts with delays for smooth loading
        setTimeout(() => initializeThreatChart(), 200);
        setTimeout(() => initializeTrafficChart(), 400);
        setTimeout(() => initializeMiniCharts(), 600);
        setTimeout(() => initializeSecurityScoreChart(), 800);
    } catch (error) {
        console.error('❌ Error initializing charts:', error);
        handleChartError(error, 'Dashboard Charts');
    }
}

// Enhanced Threat Breakdown Chart
function initializeThreatChart() {
    const canvas = document.getElementById('threatChart');
    if (!canvas) {
        console.error('❌ Threat chart canvas not found');
        return;
    }

    console.log('📊 Initializing threat breakdown chart...');
    
    // Destroy existing chart
    if (threatChartInstance) {
        threatChartInstance.destroy();
        threatChartInstance = null;
    }

    const ctx = canvas.getContext('2d');
    
    try {
        threatChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Malicious', 'Phishing', 'Suspicious', 'Detected', 'Malware'],
                datasets: [{
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: [
                        config.chartColors.malicious,
                        config.chartColors.phishing,
                        config.chartColors.suspicious,
                        config.chartColors.detected,
                        config.chartColors.malware
                    ],
                    borderWidth: 3,
                    borderColor: '#ffffff',
                    cutout: '65%',
                    hoverOffset: 8,
                    hoverBorderWidth: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: '#1f2937',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#374151',
                        borderWidth: 1,
                        cornerRadius: 12,
                        titleFont: {
                            size: 16,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 14
                        },
                        padding: 16,
                        callbacks: {
                            label: function(context) {
                                const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((context.parsed * 100) / total);
                                return `${context.label}: ${context.parsed} (${percentage}%)`;
                            }
                        }
                    }
                },
                animation: {
                    duration: config.animationDuration * 1.5,
                    easing: 'easeOutQuart'
                },
                onHover: (event, elements) => {
                    event.native.target.style.cursor = elements.length ? 'pointer' : 'default';
                },
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        const label = threatChartInstance.data.labels[index];
                        console.log(`🎯 Clicked on ${label} segment`);
                        // Handle click event - could show detailed view
                    }
                }
            }
        });
        
        console.log('✅ Threat chart initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing threat chart:', error);
        handleChartError(error, 'Threat Chart');
    }
}

// Enhanced Traffic Chart
function initializeTrafficChart() {
    const canvas = document.getElementById('trafficChart');
    if (!canvas) {
        console.error('❌ Traffic chart canvas not found');
        return;
    }

    console.log('📊 Initializing email traffic chart...');
    
    // Destroy existing chart
    if (trafficChartInstance) {
        trafficChartInstance.destroy();
        trafficChartInstance = null;
    }

    const ctx = canvas.getContext('2d');
    const trafficData = generateTrafficData();
    
    try {
        trafficChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: trafficData.labels,
                datasets: [{
                    label: 'Email Volume',
                    data: trafficData.data,
                    backgroundColor: (context) => {
                        const value = context.parsed.y;
                        if (value > 35) return config.chartColors.danger;
                        if (value > 25) return config.chartColors.warning;
                        return config.chartColors.primary;
                    },
                    borderColor: config.chartColors.primary,
                    borderWidth: 0,
                    borderRadius: 6,
                    borderSkipped: false,
                    maxBarThickness: 35,
                    minBarLength: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: '#1f2937',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#374151',
                        borderWidth: 1,
                        cornerRadius: 12,
                        titleFont: {
                            size: 16,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 14
                        },
                        padding: 16,
                        callbacks: {
                            title: function(context) {
                                return `Time: ${context[0].label}`;
                            },
                            label: function(context) {
                                return `📧 Emails: ${context.parsed.y}`;
                            },
                            afterLabel: function(context) {
                                const value = context.parsed.y;
                                if (value > 35) return '🚨 High Traffic';
                                if (value > 25) return '⚠️ Medium Traffic';
                                return '✅ Normal Traffic';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#64748b',
                            font: {
                                size: 13,
                                weight: '500'
                            },
                            maxTicksLimit: getMaxTicks(),
                            maxRotation: 0
                        },
                        border: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 50,
                        grid: {
                            color: '#f1f5f9',
                            drawBorder: false,
                            lineWidth: 1
                        },
                        ticks: {
                            color: '#64748b',
                            font: {
                                size: 13,
                                weight: '500'
                            },
                            stepSize: 10,
                            callback: function(value) {
                                return value;
                            }
                        },
                        border: {
                            display: false
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: config.animationDuration * 2,
                    easing: 'easeOutQuart'
                },
                onHover: (event, elements) => {
                    event.native.target.style.cursor = elements.length ? 'pointer' : 'default';
                }
            }
        });
        
        console.log('✅ Traffic chart initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing traffic chart:', error);
        handleChartError(error, 'Traffic Chart');
    }
}

// Initialize mini trend charts in stat cards
function initializeMiniCharts() {
    const miniChartIds = ['emailTrendChart', 'quarantineTrendChart', 'cleanedTrendChart', 'usersTrendChart'];
    
    miniChartIds.forEach((id, index) => {
        const canvas = document.getElementById(id);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const data = generateMiniChartData(index);
        
        if (miniChartInstances[id]) {
            miniChartInstances[id].destroy();
        }
        
        miniChartInstances[id] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.data,
                    borderColor: data.color,
                    backgroundColor: `${data.color}20`,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                scales: {
                    x: { display: false },
                    y: { display: false }
                },
                elements: {
                    point: { radius: 0 }
                },
                animation: {
                    duration: config.animationDuration,
                    delay: index * 200
                }
            }
        });
    });
}

// Initialize security score chart
function initializeSecurityScoreChart() {
    const canvas = document.getElementById('securityScoreChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const data = generateSecurityScoreData();
    
    if (securityScoreChartInstance) {
        securityScoreChartInstance.destroy();
    }
    
    securityScoreChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Security Score',
                data: data.data,
                borderColor: config.chartColors.success,
                backgroundColor: `${config.chartColors.success}20`,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: config.chartColors.success,
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1f2937',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#374151',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        color: '#64748b',
                        font: { size: 12 }
                    }
                },
                y: {
                    min: 60,
                    max: 100,
                    grid: {
                        color: '#f1f5f9',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#64748b',
                        font: { size: 12 }
                    }
                }
            },
            animation: {
                duration: config.animationDuration * 1.5,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Generate realistic traffic data
function generateTrafficData() {
    const labels = [];
    const data = [];
    
    const basePattern = [25, 30, 38, 30, 26, 42, 32, 28, 36, 30, 28, 24, 33, 21, 12, 23, 10, 9, 8, 10, 9, 20, 18, 22];
    
    for (let i = 0; i < 24; i++) {
        const hour = (i + 8) % 24;
        labels.push(String(hour).padStart(2, '0') + ':00');
        
        const baseValue = basePattern[i];
        const variation = Math.floor(Math.random() * 8) - 4;
        data.push(Math.max(1, baseValue + variation));
    }
    
    return { labels, data };
}

// Generate mini chart data
function generateMiniChartData(index) {
    const colors = [config.chartColors.primary, config.chartColors.danger, config.chartColors.success, config.chartColors.warning];
    const patterns = [
        [10, 15, 12, 18, 25, 20, 30],  // Email trend (increasing)
        [15, 12, 8, 10, 6, 8, 5],      // Quarantine trend (decreasing)
        [8, 12, 15, 18, 22, 25, 28],   // Cleaned trend (increasing)
        [30, 30, 29, 31, 30, 30, 30]   // Users trend (stable)
    ];
    
    return {
        labels: ['', '', '', '', '', '', ''],
        data: patterns[index],
        color: colors[index]
    };
}

// Generate security score data
function generateSecurityScoreData() {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const data = [75, 78, 82, 85, 83, 87, 85];
    
    return { labels, data };
}

// Get max ticks based on screen size
function getMaxTicks() {
    if (window.innerWidth < 480) return 6;
    if (window.innerWidth < 768) return 8;
    if (window.innerWidth < 1024) return 10;
    return 12;
}

// Initialize all event listeners
function initializeEventListeners() {
    console.log('🎧 Initializing event listeners...');
    
    initializeNavigation();
    initializeStatCards();
    initializeTimeSelector();
    initializeActivityFilters();
    initializeThreatChartPeriods();
    initializeSearchFunctionality();
    initializeExportFunctionality();
    initializeResizeHandler();
    initializeNotificationDropdown();
}

// Enhanced navigation functionality - COMPLETE VERSION
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const page = this.getAttribute('data-page');
            console.log(`🧭 Clicked navigation: ${page}`);
            
            // Remove active class from all items
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Handle page navigation
            handlePageNavigation(page);
        });
    });
}

// Fixed Page Navigation Handler
function handlePageNavigation(page) {
    console.log(`📄 Navigating to: ${page}`);
    
    // Get all page contents
    const mainContent = document.querySelector('.main-content');
    const quarantineContent = document.querySelector('.quarantine-content');
    
    // Hide all pages first
    if (mainContent) {
        mainContent.style.display = 'none';
        mainContent.classList.remove('active');
    }
    if (quarantineContent) {
        quarantineContent.style.display = 'none';
        quarantineContent.classList.remove('active');
    }
    
    // Show appropriate page
    switch(page) {
        case 'dashboard':
            if (mainContent) {
                mainContent.style.display = 'block';
                mainContent.classList.add('active');
            }
            console.log('✅ Dashboard shown');
            break;
            
        case 'quarantine':
            if (quarantineContent) {
                quarantineContent.style.display = 'block';
                quarantineContent.classList.add('active');
                
                // Initialize quarantine functionality
                setTimeout(() => {
                    initializeQuarantinePage();
                }, 200);
            }
            console.log('✅ Quarantine page shown');
            break;
            
        default:
            // Fallback to dashboard
            if (mainContent) {
                mainContent.style.display = 'block';
                mainContent.classList.add('active');
            }
            showNotification(`${page} page coming soon!`, 'info');
            break;
    }
}


// Update the navigation function to handle quarantine page
function handlePageNavigation(page) {
    // Hide all page contents first
    const mainContent = document.querySelector('.main-content');
    const quarantineContent = document.querySelector('.quarantine-content');
    
    // Remove active class from all page contents
    document.querySelectorAll('.page-content').forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });
    
    switch(page) {
        case 'dashboard':
            if (mainContent) {
                mainContent.classList.add('active');
                mainContent.style.display = 'block';
            }
            console.log('📊 Showing dashboard');
            break;
            
        case 'quarantine':
            if (quarantineContent) {
                quarantineContent.classList.add('active');
                quarantineContent.style.display = 'block';
                // Initialize quarantine functionality
                setTimeout(() => {
                    initializeQuarantinePage();
                }, 100);
            }
            console.log('🛡️ Showing quarantine page');
            break;
            
        case 'analytics':
            console.log('📈 Analytics page - Coming soon');
            showNotification('Analytics page coming soon!', 'info');
            // Fallback to dashboard
            if (mainContent) {
                mainContent.classList.add('active');
                mainContent.style.display = 'block';
            }
            break;
            
        case 'threat-intel':
            console.log('🧠 Threat Intelligence page - Coming soon');
            showNotification('Threat Intelligence page coming soon!', 'info');
            // Fallback to dashboard
            if (mainContent) {
                mainContent.classList.add('active');
                mainContent.style.display = 'block';
            }
            break;
            
        case 'reports':
            console.log('📄 Reports page - Coming soon');
            showNotification('Reports page coming soon!', 'info');
            // Fallback to dashboard
            if (mainContent) {
                mainContent.classList.add('active');
                mainContent.style.display = 'block';
            }
            break;
            
        case 'settings':
            console.log('⚙️ Settings page - Coming soon');
            showNotification('Settings page coming soon!', 'info');
            // Fallback to dashboard
            if (mainContent) {
                mainContent.classList.add('active');
                mainContent.style.display = 'block';
            }
            break;
            
        default:
            // Default to dashboard
            if (mainContent) {
                mainContent.classList.add('active');
                mainContent.style.display = 'block';
            }
            break;
    }
}


// Enhanced stat card interactions
function initializeStatCards() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
        });
        
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'translateY(-4px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1)';
            }, 100);
            
            const title = this.querySelector('.stat-title')?.textContent;
            console.log(`📊 Stat card clicked: ${title}`);
            
            // Could open a detailed modal or navigate to specific view
            showStatDetails(title, index);
        });
    });
}

// Show stat details (placeholder for modal or detailed view)
function showStatDetails(title, index) {
    console.log(`📈 Showing details for: ${title}`);
    // Implementation for showing detailed statistics
}

// Time selector functionality
function initializeTimeSelector() {
    const timeSelector = document.querySelector('.time-selector');
    if (!timeSelector) return;
    
    timeSelector.addEventListener('change', function() {
        const period = this.value;
        console.log(`⏰ Time period changed to: ${period}`);
        
        // Show loading state
        const trafficCard = this.closest('.chart-card');
        if (trafficCard) {
            trafficCard.style.opacity = '0.7';
            
            // Simulate loading
            setTimeout(() => {
                trafficCard.style.opacity = '1';
                // Regenerate chart with new data
                initializeTrafficChart();
            }, 500);
        }
    });
}

// Activity filters functionality
function initializeActivityFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const activityItems = document.querySelectorAll('.activity-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter activities
            activityItems.forEach(item => {
                const risk = item.getAttribute('data-risk');
                if (filter === 'all' || risk === filter) {
                    item.style.display = 'flex';
                    item.style.animation = 'fadeIn 0.3s ease';
                } else {
                    item.style.display = 'none';
                }
            });
            
            console.log(`🔍 Activity filter: ${filter}`);
        });
    });
    
    // Activity action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.textContent.trim();
            const activityItem = this.closest('.activity-item');
            const activityTitle = activityItem.querySelector('.activity-desc')?.textContent;
            
            console.log(`🎬 Action: ${action} for ${activityTitle}`);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            // Handle specific actions
            handleActivityAction(action, activityItem);
        });
    });
}

// Handle activity actions
function handleActivityAction(action, activityItem) {
    switch(action.toLowerCase()) {
        case 'investigate':
            console.log('🔍 Opening investigation panel...');
            break;
        case 'dismiss':
            activityItem.style.opacity = '0.5';
            setTimeout(() => {
                activityItem.style.display = 'none';
            }, 300);
            break;
        case 'review':
            console.log('👀 Opening review panel...');
            break;
        case 'archive':
            activityItem.style.opacity = '0.5';
            setTimeout(() => {
                activityItem.style.display = 'none';
            }, 300);
            break;
    }
}

// Threat chart period selection
function initializeThreatChartPeriods() {
    const periodBtns = document.querySelectorAll('.chart-action[data-period]');
    
    periodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const period = this.getAttribute('data-period');
            
            // Update active period
            periodBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update chart data based on period
            updateThreatChartData(period);
            
            console.log(`📅 Threat chart period: ${period}`);
        });
    });
}

// Update threat chart data based on period
function updateThreatChartData(period) {
    if (!threatChartInstance) return;
    
    let newData;
    switch(period) {
        case 'today':
            newData = [30, 25, 20, 15, 10];
            break;
        case 'week':
            newData = [35, 20, 18, 17, 10];
            break;
        case 'month':
            newData = [40, 22, 15, 13, 10];
            break;
        default:
            newData = [30, 25, 20, 15, 10];
    }
    
    threatChartInstance.data.datasets[0].data = newData;
    threatChartInstance.update('active');
    
    // Update center label
    const total = newData.reduce((a, b) => a + b, 0);
    const centerValue = document.querySelector('.center-value');
    if (centerValue) {
        animateNumberChange(centerValue, parseInt(centerValue.textContent), total);
    }
}

// Animate number changes
function animateNumberChange(element, from, to) {
    const duration = 500;
    const steps = 30;
    const stepValue = (to - from) / steps;
    let current = from;
    let step = 0;
    
    const timer = setInterval(() => {
        current += stepValue;
        element.textContent = Math.round(current);
        
        step++;
        if (step >= steps) {
            element.textContent = to;
            clearInterval(timer);
        }
    }, duration / steps);
}

// Search functionality
function initializeSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim();
        
        searchTimeout = setTimeout(() => {
            if (query.length > 2) {
                performSearch(query);
            } else {
                clearSearchResults();
            }
        }, 300);
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = this.value.trim();
            if (query) {
                performSearch(query);
            }
        }
    });
}

// Perform search
function performSearch(query) {
    console.log(`🔍 Searching for: ${query}`);
    // Implementation for search functionality
    // This could search through activities, logs, etc.
}

// Clear search results
function clearSearchResults() {
    console.log('🧹 Clearing search results');
    // Implementation to clear search results
}

// Export functionality
function initializeExportFunctionality() {
    const exportBtn = document.querySelector('.export-btn');
    if (!exportBtn) return;
    
    exportBtn.addEventListener('click', function() {
        console.log('📥 Exporting report...');
        
        // Add loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
        this.disabled = true;
        
        // Simulate export process
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
            
            // Show success message
            showNotification('Report exported successfully!', 'success');
        }, 2000);
        
        // Here you would implement actual export functionality
        generateReport();
    });
}

// Generate report
function generateReport() {
    // Implementation for generating and downloading report
    const reportData = {
        timestamp: new Date().toISOString(),
        stats: {
            totalEmails: 40,
            quarantine: 10,
            cleanedEmails: 30,
            usersProtected: 30
        },
        threats: {
            malicious: 30,
            phishing: 25,
            suspicious: 20,
            detected: 15,
            malware: 10
        }
    };
    
    console.log('📊 Report data:', reportData);
}

// Notification dropdown
function initializeNotificationDropdown() {
    const notificationBadge = document.querySelector('.notification-badge');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (!notificationBadge || !dropdownMenu) return;
    
    // Handle notification clicks
    document.querySelectorAll('.notification-item').forEach(item => {
        item.addEventListener('click', function() {
            const notification = this.querySelector('span').textContent;
            console.log(`🔔 Notification clicked: ${notification}`);
            
            // Mark as read
            this.style.opacity = '0.6';
        });
    });
}

// Window resize handler
function initializeResizeHandler() {
    let resizeTimeout;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            handleResize();
        }, 250);
    });
}

// Handle window resize
function handleResize() {
    console.log('🖥️ Window resized, updating charts...');
    
    // Update traffic chart x-axis ticks
    if (trafficChartInstance) {
        trafficChartInstance.options.scales.x.ticks.maxTicksLimit = getMaxTicks();
        trafficChartInstance.update('none');
    }
    
    // Update threat chart if needed
    if (threatChartInstance) {
        threatChartInstance.resize();
    }
    
    // Update all mini charts
Object.values(miniChartInstances).forEach(chart => {
    chart.resize();
});

// Update security score chart
if (securityScoreChartInstance) {
    securityScoreChartInstance.resize();
}

// Handle mobile sidebar
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

if (window.innerWidth <= 768) {
    if (sidebar && mainContent) {
        mainContent.style.marginLeft = '0';
    }
} else {
    if (sidebar && mainContent) {
        mainContent.style.marginLeft = '280px';
    }
}
}

// Show notification function
function showNotification(message, type = 'info') {
const notification = document.createElement('div');
notification.className = `notification notification-${type}`;
notification.innerHTML = `
    <div class="notification-content">
        <i class="fas ${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    </div>
`;

// Add to DOM
document.body.appendChild(notification);

// Style the notification
notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${getNotificationColor(type)};
    color: white;
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    max-width: 400px;
`;

const content = notification.querySelector('.notification-content');
content.style.cssText = `
    display: flex;
    align-items: center;
    gap: 12px;
`;

const closeBtn = notification.querySelector('.notification-close');
closeBtn.style.cssText = `
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    margin-left: auto;
`;

// Auto remove after 5 seconds
setTimeout(() => {
    if (notification.parentNode) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
}, 5000);
}

// Get notification icon based on type
function getNotificationIcon(type) {
switch(type) {
    case 'success': return 'fa-check-circle';
    case 'error': return 'fa-exclamation-circle';
    case 'warning': return 'fa-exclamation-triangle';
    case 'info':
    default: return 'fa-info-circle';
}
}

// Get notification color based on type
function getNotificationColor(type) {
switch(type) {
    case 'success': return '#10b981';
    case 'error': return '#ef4444';
    case 'warning': return '#f59e0b';
    case 'info':
    default: return '#3b82f6';
}
}

// Error handling for charts
function handleChartError(error, chartName) {
console.error(`❌ Error in ${chartName}:`, error);

// Show user-friendly error message
const errorDiv = document.createElement('div');
errorDiv.className = 'chart-error';
errorDiv.innerHTML = `
    <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 60px 20px;
        color: #64748b;
        background: #f8fafc;
        border-radius: 12px;
        border: 2px dashed #e2e8f0;
    ">
        <i class="fas fa-exclamation-triangle" style="
            font-size: 48px;
            margin-bottom: 16px;
            color: #f59e0b;
        "></i>
        <h3 style="
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 8px;
            color: #1e293b;
        ">Unable to load ${chartName}</h3>
        <p style="
            font-size: 14px;
            margin-bottom: 20px;
            color: #64748b;
        ">There was an error loading this chart. Please try refreshing the page.</p>
        <button onclick="location.reload()" style="
            background: #3b82f6;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
        " onmouseover="this.style.background='#1d4ed8'" onmouseout="this.style.background='#3b82f6'">
            <i class="fas fa-sync-alt" style="margin-right: 8px;"></i>
            Reload Dashboard
        </button>
    </div>
`;

// Find the appropriate container and replace content
const canvasId = chartName === 'Threat Chart' ? 'threatChart' : 'trafficChart';
const canvas = document.getElementById(canvasId);
if (canvas && canvas.parentNode) {
    const container = canvas.closest('.chart-card') || canvas.parentNode;
    container.innerHTML = '';
    container.appendChild(errorDiv);
}

// Show notification
showNotification(`Failed to load ${chartName}. Please refresh the page.`, 'error');
}

// Performance optimization: Lazy load charts when scrolling
function initializeLazyLoading() {
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const chartId = entry.target.id;
            if (chartId && !entry.target.dataset.loaded) {
                entry.target.dataset.loaded = 'true';
                console.log(`👀 Chart visible: ${chartId}`);
                
                // Initialize chart if not already done
                if (chartId === 'threatChart' && !threatChartInstance) {
                    initializeThreatChart();
                } else if (chartId === 'trafficChart' && !trafficChartInstance) {
                    initializeTrafficChart();
                }
            }
        }
    });
}, { rootMargin: '50px' });

// Observe chart canvases
document.querySelectorAll('canvas').forEach(canvas => {
    chartObserver.observe(canvas);
});
}

// Real-time data simulation
function simulateRealTimeData() {
setInterval(() => {
    // Update threat chart data with small random changes
    if (threatChartInstance && Math.random() > 0.7) {
        const currentData = threatChartInstance.data.datasets[0].data;
        const newData = currentData.map(value => {
            const change = (Math.random() - 0.5) * 2; // -1 to +1
            return Math.max(0, Math.round(value + change));
        });
        
        threatChartInstance.data.datasets[0].data = newData;
        threatChartInstance.update('none');
        
        console.log('📊 Real-time threat data updated');
    }
    
    // Update stat counters
    updateRealTimeStats();
    
}, 30000); // Update every 30 seconds
}

// Update real-time statistics
function updateRealTimeStats() {
const statValues = document.querySelectorAll('.stat-value');
statValues.forEach((element, index) => {
    if (Math.random() > 0.8) { // 20% chance of update
        const currentValue = parseInt(element.textContent);
        const change = Math.floor((Math.random() - 0.5) * 6); // -3 to +3
        const newValue = Math.max(0, currentValue + change);
        
        if (newValue !== currentValue) {
            animateNumberChange(element, currentValue, newValue);
            console.log(`📈 Stat updated: ${currentValue} → ${newValue}`);
        }
    }
});
}

// Theme management
function initializeThemeManagement() {
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
    document.body.classList.add('dark-mode');
}

// Theme toggle functionality (if you add a theme toggle button)
document.addEventListener('click', function(e) {
    if (e.target.matches('[data-theme-toggle]')) {
        toggleTheme();
    }
});
}

// Toggle theme
function toggleTheme() {
document.body.classList.toggle('dark-mode');
const isDarkMode = document.body.classList.contains('dark-mode');
localStorage.setItem('darkMode', isDarkMode);

// Update charts for dark mode
updateChartsForTheme(isDarkMode);
console.log(`🎨 Theme switched to: ${isDarkMode ? 'dark' : 'light'}`);
}

// Update charts for theme
function updateChartsForTheme(isDark) {
const textColor = isDark ? '#e2e8f0' : '#64748b';
const gridColor = isDark ? '#374151' : '#f1f5f9';

// Update traffic chart
if (trafficChartInstance) {
    trafficChartInstance.options.scales.x.ticks.color = textColor;
    trafficChartInstance.options.scales.y.ticks.color = textColor;
    trafficChartInstance.options.scales.y.grid.color = gridColor;
    trafficChartInstance.update('none');
}

// Update all other charts similarly
Object.values(miniChartInstances).forEach(chart => {
    if (chart.options.scales) {
        if (chart.options.scales.x) chart.options.scales.x.ticks.color = textColor;
        if (chart.options.scales.y) chart.options.scales.y.ticks.color = textColor;
        chart.update('none');
    }
});
}

// Keyboard shortcuts
function initializeKeyboardShortcuts() {
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
    
    // Ctrl/Cmd + R for refresh (prevent default and show custom refresh)
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        refreshDashboard();
    }
    
    // Escape to close modals/dropdowns
    if (e.key === 'Escape') {
        closeAllDropdowns();
    }
});
}

// Refresh dashboard
function refreshDashboard() {
console.log('🔄 Refreshing dashboard...');
showNotification('Refreshing dashboard data...', 'info');

// Show loading on all chart cards
document.querySelectorAll('.chart-card').forEach(card => {
    card.style.opacity = '0.6';
});

// Simulate refresh
setTimeout(() => {
    // Re-initialize charts
    initializeCharts();
    
    // Reset opacity
    document.querySelectorAll('.chart-card').forEach(card => {
        card.style.opacity = '1';
    });
    
    showNotification('Dashboard refreshed successfully!', 'success');
}, 1500);
}

// Close all dropdowns
function closeAllDropdowns() {
document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
    dropdown.style.opacity = '0';
    dropdown.style.visibility = 'hidden';
    dropdown.style.transform = 'translateY(10px)';
});
}

// Debug function to check if charts are loading
function debugCharts() {
console.log('=== 🔍 Chart Debug Information ===');
console.log('Threat Chart Canvas:', document.getElementById('threatChart'));
console.log('Traffic Chart Canvas:', document.getElementById('trafficChart'));
console.log('Chart.js loaded:', typeof Chart !== 'undefined');
console.log('Threat Chart Instance:', threatChartInstance);
console.log('Traffic Chart Instance:', trafficChartInstance);
console.log('Mini Chart Instances:', miniChartInstances);
console.log('Security Score Chart Instance:', securityScoreChartInstance);
console.log('Window size:', `${window.innerWidth}x${window.innerHeight}`);
console.log('Device pixel ratio:', window.devicePixelRatio);
console.log('User agent:', navigator.userAgent);
console.log('=====================================');
}

// Add CSS animations
function addAnimationStyles() {
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
    
    .dark-mode {
        --bg-primary: #0f172a;
        --bg-secondary: #1e293b;
        --text-primary: #f1f5f9;
        --text-secondary: #cbd5e1;
        --border-color: #334155;
    }
    
    .dark-mode .sidebar {
        background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
    }
    
    .dark-mode .chart-card,
    .dark-mode .stat-card {
        background: var(--bg-secondary);
        border-color: var(--border-color);
    }
    
    .dark-mode .search-input,
    .dark-mode .time-selector,
    .dark-mode .export-btn,
    .dark-mode .date-range-picker {
        background: var(--bg-secondary);
        border-color: var(--border-color);
        color: var(--text-primary);
    }
`;
document.head.appendChild(style);
}

// Initialize everything when DOM is ready
function initializeEnhancedFeatures() {
initializeLazyLoading();
simulateRealTimeData();
initializeThemeManagement();
initializeKeyboardShortcuts();
addAnimationStyles();

console.log('🚀 All enhanced features initialized');
}

// Cleanup function for page unload
window.addEventListener('beforeunload', function() {
// Destroy all chart instances
if (threatChartInstance) {
    threatChartInstance.destroy();
    threatChartInstance = null;
}
if (trafficChartInstance) {
    trafficChartInstance.destroy();
    trafficChartInstance = null;
}
if (securityScoreChartInstance) {
    securityScoreChartInstance.destroy();
    securityScoreChartInstance = null;
}

Object.values(miniChartInstances).forEach(chart => {
    chart.destroy();
});
miniChartInstances = {};

console.log('🧹 Chart instances cleaned up');
});

// Export functions for external use
window.dashboardFunctions = {
initializeThreatChart,
initializeTrafficChart,
debugCharts,
handleResize,
refreshDashboard,
showNotification,
toggleTheme
};

// Final initialization call
setTimeout(() => {
initializeEnhancedFeatures();
debugCharts();
}, 1500);

// Success message
console.log('✅ Sithafal Dashboard JavaScript loaded successfully');
console.log('🎯 All features initialized and ready');
console.log('📊 Charts should now be visible and interactive');

// Update the initializeSecurityScoreChart function
function initializeSecurityScoreChart() {
    const canvas = document.getElementById('securityScoreChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const data = generateSecurityScoreData();
    
    if (securityScoreChartInstance) {
        securityScoreChartInstance.destroy();
    }
    
    securityScoreChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Security Score',
                data: data.data,
                borderColor: config.chartColors.success,
                backgroundColor: `${config.chartColors.success}15`,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: config.chartColors.success,
                pointBorderColor: '#ffffff',
                pointBorderWidth: 3,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointHoverBackgroundColor: config.chartColors.success,
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1f2937',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#374151',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12,
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 },
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        label: function(context) {
                            return `Security Score: ${context.parsed.y}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        color: '#64748b',
                        font: { size: 11, weight: '500' },
                        maxTicksLimit: 7
                    },
                    border: { display: false }
                },
                y: {
                    min: 70,
                    max: 100,
                    grid: {
                        color: '#f1f5f9',
                        drawBorder: false,
                        lineWidth: 1
                    },
                    ticks: {
                        color: '#64748b',
                        font: { size: 11, weight: '500' },
                        stepSize: 5,
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    border: { display: false }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: config.animationDuration * 1.5,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Add show more countries functionality
function initializeShowMoreCountries() {
    const showMoreBtn = document.querySelector('.show-more-btn');
    if (!showMoreBtn) return;
    
    const additionalCountries = [
        { flag: '🇩🇪', name: 'Germany', count: 4, percentage: '15%' },
        { flag: '🇮🇷', name: 'Iran', count: 3, percentage: '12%' },
        { flag: '🇰🇵', name: 'North Korea', count: 2, percentage: '8%' },
        { flag: '🇧🇷', name: 'Brazil', count: 1, percentage: '4%' }
    ];
    
    let isExpanded = false;
    
    showMoreBtn.addEventListener('click', function() {
        const container = document.querySelector('.geo-threats-container');
        const icon = this.querySelector('i');
        const text = this.querySelector('span');
        
        if (!isExpanded) {
            // Add additional countries
            additionalCountries.forEach((country, index) => {
                const threatLocation = document.createElement('div');
                threatLocation.className = 'threat-location additional-country';
                threatLocation.style.opacity = '0';
                threatLocation.style.transform = 'translateY(20px)';
                
                threatLocation.innerHTML = `
                    <div class="location-info">
                        <span class="country-flag">${country.flag}</span>
                        <div class="country-details">
                            <span class="country-name">${country.name}</span>
                            <span class="threat-percentage">${country.percentage}</span>
                        </div>
                    </div>
                    <div class="threat-stats">
                        <span class="threat-count">${country.count}</span>
                        <div class="threat-bar">
                            <div class="threat-fill" style="width: ${(country.count / 12) * 60}%" data-value="${country.count}"></div>
                        </div>
                    </div>
                `;
                
                container.insertBefore(threatLocation, this.parentElement);
                
                // Animate in
                setTimeout(() => {
                    threatLocation.style.transition = 'all 0.3s ease';
                    threatLocation.style.opacity = '1';
                    threatLocation.style.transform = 'translateY(0)';
                }, index * 100);
            });
            
            icon.style.transform = 'rotate(180deg)';
            text.textContent = 'Show less countries';
            isExpanded = true;
            
        } else {
            // Remove additional countries
            const additionalElements = container.querySelectorAll('.additional-country');
            additionalElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(-20px)';
                    setTimeout(() => el.remove(), 300);
                }, index * 50);
            });
            
            icon.style.transform = 'rotate(0deg)';
            text.textContent = 'Show 4 more countries';
            isExpanded = false;
        }
    });
}

// Add this to your main initialization
document.addEventListener('DOMContentLoaded', function() {
    // ... your existing code ...
    setTimeout(() => {
        initializeShowMoreCountries();
    }, 1000);
});


// Initialize Geographic Threats Expand Functionality
function initializeGeoThreatsExpand() {
    const expandBtn = document.querySelector('.expand-btn');
    const mapViewBtn = document.querySelector('.map-view-btn');
    const collapsedItems = document.querySelectorAll('.collapsed-item');
    
    if (!expandBtn) return;
    
    let isExpanded = false;
    
    expandBtn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        const text = this.querySelector('span');
        
        if (!isExpanded) {
            // Show collapsed items
            collapsedItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('show');
                    item.style.display = 'flex';
                }, index * 100);
            });
            
            icon.classList.add('expanded');
            text.textContent = 'Show less';
            isExpanded = true;
            
        } else {
            // Hide collapsed items
            collapsedItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.remove('show');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }, index * 50);
            });
            
            icon.classList.remove('expanded');
            text.textContent = 'Show 3 more';
            isExpanded = false;
        }
    });
    
    // Map view button
    if (mapViewBtn) {
        mapViewBtn.addEventListener('click', function() {
            console.log('🗺️ Opening map view...');
            showNotification('Map view feature coming soon!', 'info');
        });
    }
}

// Initialize Progress Bar Animations
function initializeProgressAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFills = entry.target.querySelectorAll('.progress-fill');
                progressFills.forEach((fill, index) => {
                    setTimeout(() => {
                        const width = fill.getAttribute('data-width');
                        if (width) {
                            fill.style.width = width + '%';
                        }
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });

    const geoSection = document.querySelector('.geo-threats-list');
    if (geoSection) {
        observer.observe(geoSection);
    }
}

// Add to your main DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // ... your existing code ...
    setTimeout(() => {
        initializeGeoThreatsExpand();
        initializeProgressAnimations();
    }, 1000);
});

// Quarantine Page Functionality
function initializeQuarantinePage() {
    initializeQuarantineFilters();
    initializeQuarantineTable();
    initializeEmailPreview();
    initializeBulkActions();
}

// Initialize quarantine filters
function initializeQuarantineFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const quarantineRows = document.querySelectorAll('.quarantine-row');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter rows
            quarantineRows.forEach(row => {
                const risk = row.getAttribute('data-risk');
                if (filter === 'all' || risk === filter || filter === 'released') {
                    row.style.display = '';
                    row.style.animation = 'fadeIn 0.3s ease';
                } else {
                    row.style.display = 'none';
                }
            });
            
            console.log(`🔍 Quarantine filter: ${filter}`);
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.quarantine-filters .search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            
            quarantineRows.forEach(row => {
                const sender = row.querySelector('.sender-name')?.textContent.toLowerCase() || '';
                const subject = row.querySelector('.subject-text')?.textContent.toLowerCase() || '';
                
                if (sender.includes(query) || subject.includes(query)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
}

// Initialize quarantine table functionality
function initializeQuarantineTable() {
    // Select all checkbox
    const selectAllCheckbox = document.getElementById('selectAll');
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
            updateBulkActionButtons();
        });
    }
    
    // Row checkboxes
    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateBulkActionButtons();
            
            // Update select all checkbox
            const checkedCount = document.querySelectorAll('.row-checkbox:checked').length;
            const totalCount = rowCheckboxes.length;
            
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = checkedCount === totalCount;
                selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < totalCount;
            }
        });
    });
    
    // Action buttons
    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('.quarantine-row');
            showEmailPreview(row);
        });
    });
    
    document.querySelectorAll('.release-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('.quarantine-row');
            releaseEmail(row);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('.quarantine-row');
            deleteEmail(row);
        });
    });
}

// Initialize email preview modal
function initializeEmailPreview() {
    const modal = document.getElementById('emailPreviewModal');
    const overlay = modal?.querySelector('.modal-overlay');
    
    if (overlay) {
        overlay.addEventListener('click', closeEmailPreview);
    }
    
    // Modal action buttons
    document.querySelector('.release-modal-btn')?.addEventListener('click', function() {
        console.log('📧 Releasing email from modal...');
        showNotification('Email released successfully!', 'success');
        closeEmailPreview();
    });
    
    document.querySelector('.delete-modal-btn')?.addEventListener('click', function() {
        console.log('🗑️ Deleting email from modal...');
        showNotification('Email deleted successfully!', 'success');
        closeEmailPreview();
    });
}

// Initialize bulk actions
function initializeBulkActions() {
    document.querySelector('.bulk-release')?.addEventListener('click', function() {
        const checkedEmails = document.querySelectorAll('.row-checkbox:checked');
        if (checkedEmails.length === 0) {
            showNotification('Please select emails to release', 'warning');
            return;
        }
        
        console.log(`📧 Bulk releasing ${checkedEmails.length} emails...`);
        showNotification(`${checkedEmails.length} emails released successfully!`, 'success');
        
        // Remove released emails from view
        checkedEmails.forEach(checkbox => {
            const row = checkbox.closest('.quarantine-row');
            row.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => row.remove(), 300);
        });
        
        updateEmailCounts();
    });
    
    document.querySelector('.bulk-delete')?.addEventListener('click', function() {
        const checkedEmails = document.querySelectorAll('.row-checkbox:checked');
        if (checkedEmails.length === 0) {
            showNotification('Please select emails to delete', 'warning');
            return;
        }
        
        if (confirm(`Are you sure you want to delete ${checkedEmails.length} emails? This action cannot be undone.`)) {
            console.log(`🗑️ Bulk deleting ${checkedEmails.length} emails...`);
            showNotification(`${checkedEmails.length} emails deleted successfully!`, 'success');
            
            // Remove deleted emails from view
            checkedEmails.forEach(checkbox => {
                const row = checkbox.closest('.quarantine-row');
                row.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => row.remove(), 300);
            });
            
            updateEmailCounts();
        }
    });
}

// Show email preview modal
function showEmailPreview(row) {
    const modal = document.getElementById('emailPreviewModal');
    if (!modal) return;
    
    // Extract email data from row
    const sender = row.querySelector('.sender-name')?.textContent || '';
    const subject = row.querySelector('.subject-text')?.textContent || '';
    const date = row.querySelector('.date-main')?.textContent + ' ' + row.querySelector('.date-time')?.textContent || '';
    const risk = row.querySelector('.risk-badge')?.textContent.trim() || '';
    
    // Update modal content
    document.getElementById('previewSender').textContent = sender;
    document.getElementById('previewSubject').textContent = subject;
    document.getElementById('previewDate').textContent = date;
    document.getElementById('previewRisk').textContent = risk;
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    console.log('👁️ Showing email preview for:', subject);
}

// Close email preview modal
function closeEmailPreview() {
    const modal = document.getElementById('emailPreviewModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Release individual email
function releaseEmail(row) {
    const subject = row.querySelector('.subject-text')?.textContent || '';
    console.log('📧 Releasing email:', subject);
    
    showNotification('Email released successfully!', 'success');
    
    // Animate and remove row
    row.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => row.remove(), 300);
    
    updateEmailCounts();
}

// Delete individual email
function deleteEmail(row) {
    const subject = row.querySelector('.subject-text')?.textContent || '';
    
    if (confirm('Are you sure you want to delete this email? This action cannot be undone.')) {
        console.log('🗑️ Deleting email:', subject);
        
        showNotification('Email deleted successfully!', 'success');
        
        // Animate and remove row
        row.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => row.remove(), 300);
        
        updateEmailCounts();
    }
}

// Update bulk action button states
function updateBulkActionButtons() {
    const checkedCount = document.querySelectorAll('.row-checkbox:checked').length;
    const bulkActions = document.querySelectorAll('.bulk-release, .bulk-delete');
    
    bulkActions.forEach(btn => {
        if (checkedCount > 0) {
            btn.disabled = false;
            btn.style.opacity = '1';
        } else {
            btn.disabled = true;
            btn.style.opacity = '0.5';
        }
    });
}

// Update email counts in tabs and stats
function updateEmailCounts() {
    const totalEmails = document.querySelectorAll('.quarantine-row').length;
    const highRiskEmails = document.querySelectorAll('.quarantine-row.high-risk').length;
    const mediumRiskEmails = document.querySelectorAll('.quarantine-row.medium-risk').length;
    
    // Update tab counts
    document.querySelector('[data-filter="all"] .tab-count').textContent = `(${totalEmails})`;
    document.querySelector('[data-filter="high"] .tab-count').textContent = `(${highRiskEmails})`;
    document.querySelector('[data-filter="medium"] .tab-count').textContent = `(${mediumRiskEmails})`;
    
    // Update header stats
    const statNumbers = document.querySelectorAll('.quick-stat .stat-number');
    if (statNumbers[0]) statNumbers[0].textContent = totalEmails;
    if (statNumbers[1]) statNumbers[1].textContent = highRiskEmails;
    if (statNumbers[2]) statNumbers[2].textContent = mediumRiskEmails;
}

// Update the navigation function to handle quarantine page
function handlePageNavigation(page) {
    const mainContent = document.querySelector('.main-content');
    const quarantineContent = document.querySelector('.quarantine-content');
    
    // Hide all page contents
    document.querySelectorAll('.page-content').forEach(content => {
        content.classList.remove('active');
    });
    
    switch(page) {
        case 'dashboard':
            mainContent.classList.add('active');
            console.log('📊 Showing dashboard');
            break;
        case 'quarantine':
            quarantineContent.classList.add('active');
            initializeQuarantinePage();
            console.log('🛡️ Showing quarantine');
            break;
        case 'analytics':
            console.log('📈 Showing analytics');
            break;
        case 'threat-intel':
            console.log('🧠 Showing threat intelligence');
            break;
        case 'reports':
            console.log('📄 Showing reports');
            break;
        case 'settings':
            console.log('⚙️ Showing settings');
            break;
    }
}

// Add CSS animation for fadeOut
const additionalStyles = `
@keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-20px); }
}
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Make closeEmailPreview globally accessible
window.closeEmailPreview = closeEmailPreview;

console.log('🛡️ Quarantine page functionality initialized');

// Quarantine Page Functionality
function initializeQuarantinePage() {
    console.log('🛡️ Initializing quarantine page...');
    
    // Initialize all quarantine features
    initializeQuarantineFilters();
    initializeQuarantineTable();
    initializeEmailPreview();
    initializeBulkActions();
    
    console.log('✅ Quarantine page initialized');
}

// Initialize quarantine filters
function initializeQuarantineFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const quarantineRows = document.querySelectorAll('.quarantine-row');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter rows
            quarantineRows.forEach(row => {
                const risk = row.getAttribute('data-risk');
                if (filter === 'all' || risk === filter || filter === 'released') {
                    row.style.display = '';
                    row.style.animation = 'fadeIn 0.3s ease';
                } else {
                    row.style.display = 'none';
                }
            });
            
            console.log(`🔍 Quarantine filter: ${filter}`);
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.quarantine-filters .search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            
            quarantineRows.forEach(row => {
                const sender = row.querySelector('.sender-name')?.textContent.toLowerCase() || '';
                const subject = row.querySelector('.subject-text')?.textContent.toLowerCase() || '';
                
                if (sender.includes(query) || subject.includes(query)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
}

// Initialize quarantine table functionality
function initializeQuarantineTable() {
    // Select all checkbox
    const selectAllCheckbox = document.getElementById('selectAll');
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
            updateBulkActionButtons();
        });
    }
    
    // Row checkboxes
    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateBulkActionButtons();
            
            // Update select all checkbox
            const checkedCount = document.querySelectorAll('.row-checkbox:checked').length;
            const totalCount = rowCheckboxes.length;
            
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = checkedCount === totalCount;
                selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < totalCount;
            }
        });
    });
    
    // Action buttons
    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('.quarantine-row');
            showEmailPreview(row);
        });
    });
    
    document.querySelectorAll('.release-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('.quarantine-row');
            releaseEmail(row);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('.quarantine-row');
            deleteEmail(row);
        });
    });
}

// Initialize email preview modal
function initializeEmailPreview() {
    const modal = document.getElementById('emailPreviewModal');
    const overlay = modal?.querySelector('.modal-overlay');
    
    if (overlay) {
        overlay.addEventListener('click', closeEmailPreview);
    }
    
    // Modal action buttons
    document.querySelector('.release-modal-btn')?.addEventListener('click', function() {
        console.log('📧 Releasing email from modal...');
        showNotification('Email released successfully!', 'success');
        closeEmailPreview();
    });
    
    document.querySelector('.delete-modal-btn')?.addEventListener('click', function() {
        console.log('🗑️ Deleting email from modal...');
        showNotification('Email deleted successfully!', 'success');
        closeEmailPreview();
    });
}

// Initialize bulk actions
function initializeBulkActions() {
    document.querySelector('.bulk-release')?.addEventListener('click', function() {
        const checkedEmails = document.querySelectorAll('.row-checkbox:checked');
        if (checkedEmails.length === 0) {
            showNotification('Please select emails to release', 'warning');
            return;
        }
        
        console.log(`📧 Bulk releasing ${checkedEmails.length} emails...`);
        showNotification(`${checkedEmails.length} emails released successfully!`, 'success');
        
        // Remove released emails from view
        checkedEmails.forEach(checkbox => {
            const row = checkbox.closest('.quarantine-row');
            row.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => row.remove(), 300);
        });
        
        updateEmailCounts();
    });
    
    document.querySelector('.bulk-delete')?.addEventListener('click', function() {
        const checkedEmails = document.querySelectorAll('.row-checkbox:checked');
        if (checkedEmails.length === 0) {
            showNotification('Please select emails to delete', 'warning');
            return;
        }
        
        if (confirm(`Are you sure you want to delete ${checkedEmails.length} emails? This action cannot be undone.`)) {
            console.log(`🗑️ Bulk deleting ${checkedEmails.length} emails...`);
            showNotification(`${checkedEmails.length} emails deleted successfully!`, 'success');
            
            // Remove deleted emails from view
            checkedEmails.forEach(checkbox => {
                const row = checkbox.closest('.quarantine-row');
                row.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => row.remove(), 300);
            });
            
            updateEmailCounts();
        }
    });
}

// Show email preview modal
function showEmailPreview(row) {
    const modal = document.getElementById('emailPreviewModal');
    if (!modal) return;
    
    // Extract email data from row
    const sender = row.querySelector('.sender-name')?.textContent || '';
    const subject = row.querySelector('.subject-text')?.textContent || '';
    const dateMain = row.querySelector('.date-main')?.textContent || '';
    const dateTime = row.querySelector('.date-time')?.textContent || '';
    const risk = row.querySelector('.risk-badge')?.textContent.trim() || '';
    
    // Update modal content
    document.getElementById('previewSender').textContent = sender;
    document.getElementById('previewSubject').textContent = subject;
    document.getElementById('previewDate').textContent = `${dateMain} ${dateTime}`;
    document.getElementById('previewRisk').textContent = risk;
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    console.log('👁️ Showing email preview for:', subject);
}

// Close email preview modal
function closeEmailPreview() {
    const modal = document.getElementById('emailPreviewModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Release individual email
function releaseEmail(row) {
    const subject = row.querySelector('.subject-text')?.textContent || '';
    console.log('📧 Releasing email:', subject);
    
    showNotification('Email released successfully!', 'success');
    
    // Animate and remove row
    row.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => row.remove(), 300);
    
    updateEmailCounts();
}

// Delete individual email
function deleteEmail(row) {
    const subject = row.querySelector('.subject-text')?.textContent || '';
    
    if (confirm('Are you sure you want to delete this email? This action cannot be undone.')) {
        console.log('🗑️ Deleting email:', subject);
        
        showNotification('Email deleted successfully!', 'success');
        
        // Animate and remove row
        row.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => row.remove(), 300);
        
        updateEmailCounts();
    }
}

// Update bulk action button states
function updateBulkActionButtons() {
    const checkedCount = document.querySelectorAll('.row-checkbox:checked').length;
    const bulkActions = document.querySelectorAll('.bulk-release, .bulk-delete');
    
    bulkActions.forEach(btn => {
        if (checkedCount > 0) {
            btn.disabled = false;
            btn.style.opacity = '1';
        } else {
            btn.disabled = true;
            btn.style.opacity = '0.5';
        }
    });
}

// Update email counts in tabs and stats
function updateEmailCounts() {
    const totalEmails = document.querySelectorAll('.quarantine-row').length;
    const highRiskEmails = document.querySelectorAll('.quarantine-row.high-risk').length;
    const mediumRiskEmails = document.querySelectorAll('.quarantine-row.medium-risk').length;
    
    // Update tab counts
    const allTab = document.querySelector('[data-filter="all"] .tab-count');
    const highTab = document.querySelector('[data-filter="high"] .tab-count');
    const mediumTab = document.querySelector('[data-filter="medium"] .tab-count');
    
    if (allTab) allTab.textContent = `(${totalEmails})`;
    if (highTab) highTab.textContent = `(${highRiskEmails})`;
    if (mediumTab) mediumTab.textContent = `(${mediumRiskEmails})`;
    
    // Update header stats
    const statNumbers = document.querySelectorAll('.quick-stat .stat-number');
    if (statNumbers[0]) statNumbers[0].textContent = totalEmails;
    if (statNumbers[1]) statNumbers[1].textContent = highRiskEmails;
    if (statNumbers[2]) statNumbers[2].textContent = mediumRiskEmails;
}

// Make closeEmailPreview globally accessible
window.closeEmailPreview = closeEmailPreview;


document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Dashboard initializing...');
    
    // Debug: Check if elements exist
    console.log('Main content found:', !!document.querySelector('.main-content'));
    console.log('Quarantine content found:', !!document.querySelector('.quarantine-content'));
    console.log('Nav items found:', document.querySelectorAll('.nav-item').length);
    
    // Your existing initialization code...
    setTimeout(() => {
        initializeAnimations();
        initializeEventListeners();
        initializeCharts();
        initializeCounterAnimations();
        hideLoadingOverlay();
    }, 500);
});

// QUARANTINE PAGE FUNCTIONALITY - COMPLETE
function initializeQuarantinePage() {
    console.log('🛡️ Initializing quarantine page...');
    
    try {
        initializeQuarantineFilters();
        initializeQuarantineTable();
        initializeEmailPreview();
        initializeBulkActions();
        
        console.log('✅ Quarantine page initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing quarantine page:', error);
    }
}

// Quarantine Filters
function initializeQuarantineFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const quarantineRows = document.querySelectorAll('.quarantine-row');
    
    console.log(`📋 Found ${filterTabs.length} filter tabs and ${quarantineRows.length} quarantine rows`);
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            console.log(`🔍 Filtering by: ${filter}`);
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter rows
            quarantineRows.forEach(row => {
                const risk = row.getAttribute('data-risk');
                if (filter === 'all' || risk === filter) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.quarantine-filters .search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            console.log(`🔍 Searching for: ${query}`);
            
            quarantineRows.forEach(row => {
                const sender = row.querySelector('.sender-name')?.textContent.toLowerCase() || '';
                const subject = row.querySelector('.subject-text')?.textContent.toLowerCase() || '';
                
                if (sender.includes(query) || subject.includes(query) || query === '') {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
}

// Quarantine Table
function initializeQuarantineTable() {
    // Select all checkbox
    const selectAllCheckbox = document.getElementById('selectAll');
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    
    console.log(`☑️ Found select all checkbox: ${!!selectAllCheckbox}, row checkboxes: ${rowCheckboxes.length}`);
    
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            console.log(`☑️ Select all toggled: ${this.checked}`);
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
            updateBulkActionButtons();
        });
    }
    
    // Individual checkboxes
    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateBulkActionButtons();
            
            const checkedCount = document.querySelectorAll('.row-checkbox:checked').length;
            const totalCount = rowCheckboxes.length;
            
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = checkedCount === totalCount;
                selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < totalCount;
            }
        });
    });
    
    // Action buttons
    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('.quarantine-row');
            showEmailPreview(row);
        });
    });
    
    document.querySelectorAll('.release-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('.quarantine-row');
            releaseEmail(row);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('.quarantine-row');
            deleteEmail(row);
        });
    });
    
    console.log('✅ Quarantine table initialized with all event listeners');
}

// Email Preview Modal
function initializeEmailPreview() {
    const modal = document.getElementById('emailPreviewModal');
    const overlay = modal?.querySelector('.modal-overlay');
    
    if (overlay) {
        overlay.addEventListener('click', closeEmailPreview);
    }
    
    // Modal buttons
    const releaseModalBtn = document.querySelector('.release-modal-btn');
    const deleteModalBtn = document.querySelector('.delete-modal-btn');
    
    if (releaseModalBtn) {
        releaseModalBtn.addEventListener('click', function() {
            console.log('📧 Releasing email from modal...');
            showNotification('Email released successfully!', 'success');
            closeEmailPreview();
        });
    }
    
    if (deleteModalBtn) {
        deleteModalBtn.addEventListener('click', function() {
            console.log('🗑️ Deleting email from modal...');
            showNotification('Email deleted successfully!', 'success');
            closeEmailPreview();
        });
    }
}

// Bulk Actions
function initializeBulkActions() {
    const bulkReleaseBtn = document.querySelector('.bulk-release');
    const bulkDeleteBtn = document.querySelector('.bulk-delete');
    
    if (bulkReleaseBtn) {
        bulkReleaseBtn.addEventListener('click', function() {
            const checkedEmails = document.querySelectorAll('.row-checkbox:checked');
            console.log(`📧 Bulk release clicked, ${checkedEmails.length} emails selected`);
            
            if (checkedEmails.length === 0) {
                showNotification('Please select emails to release', 'warning');
                return;
            }
            
            showNotification(`${checkedEmails.length} emails released successfully!`, 'success');
            
            checkedEmails.forEach(checkbox => {
                const row = checkbox.closest('.quarantine-row');
                row.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => row.remove(), 300);
            });
            
            updateEmailCounts();
        });
    }
    
    if (bulkDeleteBtn) {
        bulkDeleteBtn.addEventListener('click', function() {
            const checkedEmails = document.querySelectorAll('.row-checkbox:checked');
            console.log(`🗑️ Bulk delete clicked, ${checkedEmails.length} emails selected`);
            
            if (checkedEmails.length === 0) {
                showNotification('Please select emails to delete', 'warning');
                return;
            }
            
            if (confirm(`Are you sure you want to delete ${checkedEmails.length} emails? This action cannot be undone.`)) {
                showNotification(`${checkedEmails.length} emails deleted successfully!`, 'success');
                
                checkedEmails.forEach(checkbox => {
                    const row = checkbox.closest('.quarantine-row');
                    row.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => row.remove(), 300);
                });
                
                updateEmailCounts();
            }
        });
    }
}

// Show Email Preview
function showEmailPreview(row) {
    const modal = document.getElementById('emailPreviewModal');
    if (!modal) {
        console.error('❌ Email preview modal not found');
        return;
    }
    
    // Extract data from row
    const sender = row.querySelector('.sender-name')?.textContent || 'Unknown';
    const subject = row.querySelector('.subject-text')?.textContent || 'No Subject';
    const dateMain = row.querySelector('.date-main')?.textContent || '';
    const dateTime = row.querySelector('.date-time')?.textContent || '';
    const risk = row.querySelector('.risk-badge')?.textContent.trim() || 'Unknown';
    
    // Update modal content
    const previewSender = document.getElementById('previewSender');
    const previewSubject = document.getElementById('previewSubject');
    const previewDate = document.getElementById('previewDate');
    const previewRisk = document.getElementById('previewRisk');
    
    if (previewSender) previewSender.textContent = sender;
    if (previewSubject) previewSubject.textContent = subject;
    if (previewDate) previewDate.textContent = `${dateMain} ${dateTime}`;
    if (previewRisk) previewRisk.textContent = risk;
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    console.log('👁️ Email preview shown for:', subject);
}

// Close Email Preview
function closeEmailPreview() {
    const modal = document.getElementById('emailPreviewModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Release Email
function releaseEmail(row) {
    const subject = row.querySelector('.subject-text')?.textContent || 'Email';
    console.log('📧 Releasing email:', subject);
    
    showNotification('Email released successfully!', 'success');
    
    row.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        row.remove();
        updateEmailCounts();
    }, 300);
}

// Delete Email
function deleteEmail(row) {
    const subject = row.querySelector('.subject-text')?.textContent || 'Email';
    
    if (confirm('Are you sure you want to delete this email? This action cannot be undone.')) {
        console.log('🗑️ Deleting email:', subject);
        
        showNotification('Email deleted successfully!', 'success');
        
        row.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            row.remove();
            updateEmailCounts();
        }, 300);
    }
}

// Update Bulk Action Buttons
function updateBulkActionButtons() {
    const checkedCount = document.querySelectorAll('.row-checkbox:checked').length;
    const bulkActions = document.querySelectorAll('.bulk-release, .bulk-delete');
    
    bulkActions.forEach(btn => {
        if (checkedCount > 0) {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        } else {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
        }
    });
}

// Update Email Counts
function updateEmailCounts() {
    const totalEmails = document.querySelectorAll('.quarantine-row').length;
    const highRiskEmails = document.querySelectorAll('.quarantine-row.high-risk').length;
    const mediumRiskEmails = document.querySelectorAll('.quarantine-row.medium-risk').length;
    
    // Update tab counts
    const allTabCount = document.querySelector('[data-filter="all"] .tab-count');
    const highTabCount = document.querySelector('[data-filter="high"] .tab-count');
    const mediumTabCount = document.querySelector('[data-filter="medium"] .tab-count');
    
    if (allTabCount) allTabCount.textContent = `(${totalEmails})`;
    if (highTabCount) highTabCount.textContent = `(${highRiskEmails})`;
    if (mediumTabCount) mediumTabCount.textContent = `(${mediumRiskEmails})`;
    
    // Update header stats
    const statNumbers = document.querySelectorAll('.quarantine-header .quick-stat .stat-number');
    if (statNumbers[0]) statNumbers[0].textContent = totalEmails;
    if (statNumbers[1]) statNumbers[1].textContent = highRiskEmails;
    if (statNumbers[2]) statNumbers[2].textContent = mediumRiskEmails;
    
    console.log(`📊 Updated counts - Total: ${totalEmails}, High: ${highRiskEmails}, Medium: ${mediumRiskEmails}`);
}

// Make functions globally available
window.closeEmailPreview = closeEmailPreview;
window.showEmailPreview = showEmailPreview;
window.releaseEmail = releaseEmail;
window.deleteEmail = deleteEmail;


// TEMPORARY DEBUG - Add this to test
function debugQuarantine() {
    console.log('🔍 QUARANTINE DEBUG:');
    console.log('- Quarantine content element:', document.querySelector('.quarantine-content'));
    console.log('- Main content element:', document.querySelector('.main-content'));
    console.log('- Nav items with data-page:', document.querySelectorAll('[data-page]').length);
    console.log('- Quarantine nav item:', document.querySelector('[data-page="quarantine"]'));
    console.log('- Filter tabs:', document.querySelectorAll('.filter-tab').length);
    console.log('- Quarantine rows:', document.querySelectorAll('.quarantine-row').length);
    
    // Test navigation manually
    const quarantineNav = document.querySelector('[data-page="quarantine"]');
    if (quarantineNav) {
        console.log('✅ Quarantine nav found, testing click...');
        quarantineNav.click();
    }
}

// Call this in console to test
window.debugQuarantine = debugQuarantine;
