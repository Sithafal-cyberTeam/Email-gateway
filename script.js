// Professional Sithafal Dashboard - Million Dollar JavaScript
// Updated based on your existing code structure

'use strict';

// Global chart instances
let threatChartInstance = null;
let trafficChartInstance = null;
let securityScoreChartInstance = null;
let miniChartInstances = {};

// Configuration
const config = {
    animationDuration: 300, // Reduced for professional feel
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

// Global variables
let currentPage = 'dashboard';
let isInitialized = false;

// Prevent zooming and scrolling issues - PROFESSIONAL FIX
function preventZoomAndScroll() {
    // Prevent zoom on mobile
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });

    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Prevent horizontal scroll
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';

    // Set viewport meta tag properly
    let viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no');
    } else {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no';
        document.head.appendChild(viewport);
    }
}

// INSTANT INITIALIZATION - NO LOADING SCREEN
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Sithafal Dashboard initializing instantly...');
    
    // Hide loading overlay immediately
    hideLoadingOverlay();
    
    // Initialize everything instantly
    preventZoomAndScroll();
    initializeAnimations();
    initializeEventListeners();
    initializeNavigation(); // Fixed navigation
    initializeCharts();
    initializeCounterAnimations();
    
    // Show dashboard by default
    handlePageNavigation('dashboard');
    
    isInitialized = true;
    console.log('✅ Dashboard initialized successfully');
});

// Professional loading overlay removal
function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'none';
        overlay.remove(); // Remove completely
    }
}

// FIXED NAVIGATION SYSTEM
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    
    console.log(`📋 Found ${navItems.length} navigation items`);
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const page = this.getAttribute('data-page');
            console.log(`🧭 Navigating to: ${page}`);
            
            // Update active states
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            
            // Show the requested page
            handlePageNavigation(page);
        });
    });
}

// FIXED PAGE NAVIGATION - NO BLANK PAGES
function handlePageNavigation(page) {
    console.log(`📄 Showing page: ${page}`);
    
    // Get all page elements
    const mainContent = document.querySelector('.main-content');
    const quarantineContent = document.querySelector('.quarantine-content');
    
    // Hide all pages
    if (mainContent) {
        mainContent.style.display = 'none';
        mainContent.classList.remove('active');
    }
    if (quarantineContent) {
        quarantineContent.style.display = 'none';
        quarantineContent.classList.remove('active');
    }
    
    // Show the requested page
    switch (page) {
        case 'dashboard':
            if (mainContent) {
                mainContent.style.display = 'block';
                mainContent.classList.add('active');
                // Refresh charts when showing dashboard
                setTimeout(() => refreshCharts(), 100);
            }
            currentPage = 'dashboard';
            break;
            
        case 'quarantine':
            if (quarantineContent) {
                quarantineContent.style.display = 'block';
                quarantineContent.classList.add('active');
                // Initialize quarantine features
                setTimeout(() => initializeQuarantinePage(), 100);
            }
            currentPage = 'quarantine';
            break;
            
        default:
            // Show coming soon notification and fallback to dashboard
            showNotification(`${page.charAt(0).toUpperCase() + page.slice(1)} page coming soon!`, 'info');
            if (mainContent) {
                mainContent.style.display = 'block';
                mainContent.classList.add('active');
            }
            currentPage = 'dashboard';
            break;
    }
    
    console.log(`✅ Page ${page} displayed successfully`);
}

// Initialize scroll animations
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate response bars
                const barFills = entry.target.querySelectorAll('.bar-fill, .progress-fill');
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
    }, { 
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Observe animated elements
    document.querySelectorAll('.animated, .response-bars, .geo-threats-list').forEach(el => {
        observer.observe(el);
    });
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
    if (typeof Chart === 'undefined') {
        console.warn('⚠️ Chart.js not loaded, skipping chart initialization');
        return;
    }

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
                        titleFont: { size: 16, weight: 'bold' },
                        bodyFont: { size: 14 },
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
                    legend: { display: false },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: '#1f2937',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#374151',
                        borderWidth: 1,
                        cornerRadius: 12,
                        titleFont: { size: 16, weight: 'bold' },
                        bodyFont: { size: 14 },
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
                        grid: { display: false },
                        ticks: {
                            color: '#64748b',
                            font: { size: 13, weight: '500' },
                            maxTicksLimit: getMaxTicks(),
                            maxRotation: 0
                        },
                        border: { display: false }
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
                            font: { size: 13, weight: '500' },
                            stepSize: 10,
                            callback: function(value) {
                                return value;
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

// ===== QUARANTINE PAGE FUNCTIONALITY =====

// FIXED QUARANTINE INITIALIZATION
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
        showNotification('Error loading quarantine page', 'error');
    }
}

// Quarantine Filters
function initializeQuarantineFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab[data-filter]');
    const quarantineRows = document.querySelectorAll('.quarantine-row[data-risk]');
    
    console.log(`📋 Quarantine filters: ${filterTabs.length} tabs, ${quarantineRows.length} rows`);
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            const filter = this.getAttribute('data-filter');
            console.log(`🔍 Filtering quarantine by: ${filter}`);
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter rows with animation
            quarantineRows.forEach((row, index) => {
                const risk = row.getAttribute('data-risk');
                const shouldShow = filter === 'all' || risk === filter || filter === 'released';
                
                if (shouldShow) {
                    setTimeout(() => {
                        row.style.display = '';
                        row.style.opacity = '1';
                        row.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    row.style.opacity = '0';
                    row.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        row.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.quarantine-filters .search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            const query = this.value.toLowerCase().trim();
            console.log(`🔍 Searching quarantine: "${query}"`);
            
            quarantineRows.forEach(row => {
                const sender = row.querySelector('.sender-name')?.textContent.toLowerCase() || '';
                const subject = row.querySelector('.subject-text')?.textContent.toLowerCase() || '';
                const domain = row.querySelector('.sender-domain')?.textContent.toLowerCase() || '';
                
                const matches = sender.includes(query) || subject.includes(query) || domain.includes(query) || query === '';
                
                if (matches) {
                    row.style.display = '';
                    row.style.opacity = '1';
                } else {
                    row.style.opacity = '0';
                    setTimeout(() => {
                        if (row.style.opacity === '0') {
                            row.style.display = 'none';
                        }
                    }, 200);
                }
            });
        }, 300));
    }
}

// Quarantine Table Management
function initializeQuarantineTable() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    
    console.log(`☑️ Table checkboxes: selectAll=${!!selectAllCheckbox}, rows=${rowCheckboxes.length}`);
    
    // Select all functionality
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            console.log(`☑️ Select all toggled: ${this.checked}`);
            
            rowCheckboxes.forEach((checkbox, index) => {
                setTimeout(() => {
                    checkbox.checked = this.checked;
                    const row = checkbox.closest('.quarantine-row');
                    if (row) {
                        row.classList.toggle('selected', this.checked);
                    }
                }, index * 30);
            });
            
            updateBulkActionButtons();
        });
    }
    
    // Individual row checkboxes
    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const row = this.closest('.quarantine-row');
            if (row) {
                row.classList.toggle('selected', this.checked);
            }
            
            updateBulkActionButtons();
            
            // Update select all state
            const checkedCount = document.querySelectorAll('.row-checkbox:checked').length;
            const totalCount = rowCheckboxes.length;
            
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = checkedCount === totalCount;
                selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < totalCount;
            }
        });
    });
    
    // Action buttons
    initializeRowActionButtons();
}

// Row Action Buttons
function initializeRowActionButtons() {
    // Preview buttons
    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('.quarantine-row');
            showEmailPreview(row);
        });
    });
    
    // Release buttons
    document.querySelectorAll('.release-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('.quarantine-row');
            releaseEmail(row);
        });
    });
    
    // Delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('.quarantine-row');
            deleteEmail(row);
        });
    });
}

// Email Preview Modal
function initializeEmailPreview() {
    const modal = document.getElementById('emailPreviewModal');
    if (!modal) return;
    
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    
    // Close on overlay click
    if (overlay) {
        overlay.addEventListener('click', closeEmailPreview);
    }
    
    // Close on close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeEmailPreview);
    }
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeEmailPreview();
        }
    });
    
    // Modal action buttons
    const releaseModalBtn = modal.querySelector('.release-modal-btn');
    const deleteModalBtn = modal.querySelector('.delete-modal-btn');
    
    if (releaseModalBtn) {
        releaseModalBtn.addEventListener('click', function() {
            console.log('📧 Releasing email from modal...');
            showNotification('Email released successfully!', 'success');
            closeEmailPreview();
        });
    }
    
    if (deleteModalBtn) {
        deleteModalBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this email? This action cannot be undone.')) {
                console.log('🗑️ Deleting email from modal...');
                showNotification('Email deleted successfully!', 'success');
                closeEmailPreview();
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
    
    // Extract email data
    const sender = row.querySelector('.sender-name')?.textContent || 'Unknown Sender';
    const subject = row.querySelector('.subject-text')?.textContent || 'No Subject';
    const dateMain = row.querySelector('.date-main')?.textContent || '';
    const dateTime = row.querySelector('.date-time')?.textContent || '';
    const risk = row.querySelector('.risk-badge')?.textContent.trim() || 'Unknown Risk';
    
    // Update modal content
    const elements = {
        previewSender: document.getElementById('previewSender'),
        previewSubject: document.getElementById('previewSubject'),
        previewDate: document.getElementById('previewDate'),
        previewRisk: document.getElementById('previewRisk')
    };
    
    if (elements.previewSender) elements.previewSender.textContent = sender;
    if (elements.previewSubject) elements.previewSubject.textContent = subject;
    if (elements.previewDate) elements.previewDate.textContent = `${dateMain} ${dateTime}`;
    if (elements.previewRisk) elements.previewRisk.textContent = risk;
    
    // Show modal with animation
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.9)';
    
    requestAnimationFrame(() => {
        modal.style.transition = `all ${config.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        modal.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    });
    
    document.body.style.overflow = 'hidden';
    console.log('👁️ Email preview shown:', subject);
}

// Close Email Preview
function closeEmailPreview() {
    const modal = document.getElementById('emailPreviewModal');
    if (!modal) return;
    
    modal.style.transition = `all ${config.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, config.animationDuration);
}

// Bulk Actions
function initializeBulkActions() {
    const bulkReleaseBtn = document.querySelector('.bulk-release');
    const bulkDeleteBtn = document.querySelector('.bulk-delete');
    
    if (bulkReleaseBtn) {
        bulkReleaseBtn.addEventListener('click', function() {
            const checkedEmails = document.querySelectorAll('.row-checkbox:checked');
            
            if (checkedEmails.length === 0) {
                showNotification('Please select emails to release', 'warning');
                return;
            }
            
            console.log(`📧 Bulk releasing ${checkedEmails.length} emails...`);
            
            // Animate release
            checkedEmails.forEach((checkbox, index) => {
                const row = checkbox.closest('.quarantine-row');
                setTimeout(() => {
                    animateRowRemoval(row);
                }, index * 100);
            });
            
            showNotification(`${checkedEmails.length} emails released successfully!`, 'success');
            setTimeout(() => updateEmailCounts(), 500);
        });
    }
    
    if (bulkDeleteBtn) {
        bulkDeleteBtn.addEventListener('click', function() {
            const checkedEmails = document.querySelectorAll('.row-checkbox:checked');
            
            if (checkedEmails.length === 0) {
                showNotification('Please select emails to delete', 'warning');
                return;
            }
            
            const confirmMessage = `Are you sure you want to delete ${checkedEmails.length} email${checkedEmails.length > 1 ? 's' : ''}? This action cannot be undone.`;
            
            if (confirm(confirmMessage)) {
                console.log(`🗑️ Bulk deleting ${checkedEmails.length} emails...`);
                
                // Animate deletion
                checkedEmails.forEach((checkbox, index) => {
                    const row = checkbox.closest('.quarantine-row');
                    setTimeout(() => {
                        animateRowRemoval(row);
                    }, index * 100);
                });
                
                showNotification(`${checkedEmails.length} emails deleted successfully!`, 'success');
                setTimeout(() => updateEmailCounts(), 500);
            }
        });
    }
}

// Individual Email Actions
function releaseEmail(row) {
    const subject = row.querySelector('.subject-text')?.textContent || 'Email';
    console.log('📧 Releasing email:', subject);
    
    animateRowRemoval(row);
    showNotification('Email released successfully!', 'success');
    setTimeout(() => updateEmailCounts(), 300);
}

function deleteEmail(row) {
    const subject = row.querySelector('.subject-text')?.textContent || 'Email';
    
    if (confirm('Are you sure you want to delete this email? This action cannot be undone.')) {
        console.log('🗑️ Deleting email:', subject);
        
        animateRowRemoval(row);
        showNotification('Email deleted successfully!', 'success');
        setTimeout(() => updateEmailCounts(), 300);
    }
}

// Professional Row Removal Animation
function animateRowRemoval(row) {
    if (!row) return;
    
    row.style.transition = `all ${config.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    row.style.opacity = '0';
    row.style.transform = 'translateX(-100%)';
    row.style.height = row.offsetHeight + 'px';
    
    setTimeout(() => {
        row.style.height = '0';
        row.style.padding = '0';
        row.style.margin = '0';
        
        setTimeout(() => {
            row.remove();
        }, config.animationDuration);
    }, config.animationDuration / 2);
}

// Update Action Button States
function updateBulkActionButtons() {
    const checkedCount = document.querySelectorAll('.row-checkbox:checked').length;
    const bulkActions = document.querySelectorAll('.bulk-release, .bulk-delete');
    
    bulkActions.forEach(btn => {
        if (checkedCount > 0) {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
            btn.classList.add('enabled');
        } else {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
            btn.classList.remove('enabled');
        }
    });
    
    // Update button text with count
    const releaseBtn = document.querySelector('.bulk-release');
    const deleteBtn = document.querySelector('.bulk-delete');
    
    if (releaseBtn) {
        const text = checkedCount > 0 ? `Release (${checkedCount})` : 'Bulk Release';
        releaseBtn.innerHTML = `<i class="fas fa-unlock"></i> ${text}`;
    }
    
    if (deleteBtn) {
        const text = checkedCount > 0 ? `Delete (${checkedCount})` : 'Bulk Delete';
        deleteBtn.innerHTML = `<i class="fas fa-trash"></i> ${text}`;
    }
}

// Update Email Counts
function updateEmailCounts() {
    const totalEmails = document.querySelectorAll('.quarantine-row').length;
    const highRiskEmails = document.querySelectorAll('.quarantine-row.high-risk').length;
    const mediumRiskEmails = document.querySelectorAll('.quarantine-row.medium-risk').length;
    
    console.log(`📊 Updating counts - Total: ${totalEmails}, High: ${highRiskEmails}, Medium: ${mediumRiskEmails}`);
    
    // Update tab counts
    const tabCounts = {
        all: document.querySelector('[data-filter="all"] .tab-count'),
        high: document.querySelector('[data-filter="high"] .tab-count'),
        medium: document.querySelector('[data-filter="medium"] .tab-count')
    };
    
    const newCounts = {
        all: totalEmails,
        high: highRiskEmails,
        medium: mediumRiskEmails
    };
    
    Object.keys(tabCounts).forEach(key => {
        const element = tabCounts[key];
        if (element) {
            element.style.transform = 'scale(1.2)';
            element.textContent = `(${newCounts[key]})`;
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    });
    
    // Update header stats
    const statNumbers = document.querySelectorAll('.quarantine-header .quick-stat .stat-number');
    const newStatValues = [totalEmails, highRiskEmails, mediumRiskEmails];
    
    statNumbers.forEach((stat, index) => {
        if (stat && newStatValues[index] !== undefined) {
            animateStatUpdate(stat, newStatValues[index]);
        }
    });
    
    updateBulkActionButtons();
}

// Animate Stat Update
function animateStatUpdate(element, newValue) {
    const currentValue = parseInt(element.textContent) || 0;
    
    if (currentValue === newValue) return;
    
    const duration = 500;
    const steps = 20;
    const stepValue = (newValue - currentValue) / steps;
    let current = currentValue;
    let step = 0;
    
    const timer = setInterval(() => {
        step++;
        current += stepValue;
        
        if (step >= steps) {
            element.textContent = newValue;
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, duration / steps);
}

// Initialize all event listeners - KEEPING YOUR EXISTING STRUCTURE
function initializeEventListeners() {
    console.log('🎧 Initializing event listeners...');
    
    initializeStatCards();
    initializeTimeSelector();
    initializeActivityFilters();
    initializeThreatChartPeriods();
    initializeSearchFunctionality();
    initializeExportFunctionality();
    initializeResizeHandler();
    initializeNotificationDropdown();
}

// Enhanced stat card interactions (keeping your code)
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
            this.style.transform = 'translateY(-4px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1)';
            }, 100);
            
            const title = this.querySelector('.stat-title')?.textContent;
            console.log(`📊 Stat card clicked: ${title}`);
            showStatDetails(title, index);
        });
    });
}

// Show stat details
function showStatDetails(title, index) {
    console.log(`📈 Showing details for: ${title}`);
    showNotification(`Detailed ${title} analytics coming soon!`, 'info');
}

// Time selector functionality (keeping your code)
function initializeTimeSelector() {
    const timeSelector = document.querySelector('.time-selector');
    if (!timeSelector) return;

    timeSelector.addEventListener('change', function() {
        const period = this.value;
        console.log(`⏰ Time period changed to: ${period}`);

        const trafficCard = this.closest('.chart-card');
        if (trafficCard) {
            trafficCard.style.opacity = '0.7';
            setTimeout(() => {
                trafficCard.style.opacity = '1';
                initializeTrafficChart();
            }, 500);
        }
    });
}

// Activity filters functionality (keeping your code)
function initializeActivityFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const activityItems = document.querySelectorAll('.activity-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

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

            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);

            handleActivityAction(action, activityItem);
        });
    });
}

// Handle activity actions (keeping your code)
function handleActivityAction(action, activityItem) {
    switch(action.toLowerCase()) {
        case 'investigate':
            console.log('🔍 Opening investigation panel...');
            showNotification('Investigation panel coming soon!', 'info');
            break;
        case 'dismiss':
            activityItem.style.opacity = '0.5';
            setTimeout(() => {
                activityItem.style.display = 'none';
            }, 300);
            break;
        case 'review':
            console.log('👀 Opening review panel...');
            showNotification('Review panel coming soon!', 'info');
            break;
        case 'archive':
            activityItem.style.opacity = '0.5';
            setTimeout(() => {
                activityItem.style.display = 'none';
            }, 300);
            break;
    }
}

// Threat chart period selection (keeping your code)
function initializeThreatChartPeriods() {
    const periodBtns = document.querySelectorAll('.chart-action[data-period]');

    periodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const period = this.getAttribute('data-period');

            periodBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            updateThreatChartData(period);
            console.log(`📅 Threat chart period: ${period}`);
        });
    });
}

// Update threat chart data based on period (keeping your code)
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

    const total = newData.reduce((a, b) => a + b, 0);
    const centerValue = document.querySelector('.center-value');
    if (centerValue) {
        animateNumberChange(centerValue, parseInt(centerValue.textContent), total);
    }
}

// Animate number changes (keeping your code)
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

// Search functionality (keeping your code)
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

// Perform search (keeping your code)
function performSearch(query) {
    console.log(`🔍 Searching for: ${query}`);
    showNotification(`Searching for "${query}"...`, 'info');
}

// Clear search results
function clearSearchResults() {
    console.log('🧹 Clearing search results');
}

// Export functionality (keeping your code)
function initializeExportFunctionality() {
    const exportBtn = document.querySelector('.export-btn');
    if (!exportBtn) return;

    exportBtn.addEventListener('click', function() {
        console.log('📥 Exporting report...');

        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
        this.disabled = true;

        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
            showNotification('Report exported successfully!', 'success');
        }, 2000);

        generateReport();
    });
}

// Generate report (keeping your code)
function generateReport() {
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

// COMPLETELY FIXED Notification Dropdown - Class-Based Control
function initializeNotificationDropdown() {
    const notificationDropdown = document.getElementById('notificationDropdown');
    const notificationBadge = notificationDropdown?.querySelector('.notification-badge');
    const dropdownMenu = notificationDropdown?.querySelector('.dropdown-menu');
    const notificationItems = notificationDropdown?.querySelectorAll('.notification-item');
    const markAllReadBtn = notificationDropdown?.querySelector('.mark-all-read');
    const viewAllBtn = notificationDropdown?.querySelector('.view-all-notifications');
    
    if (!notificationDropdown || !notificationBadge || !dropdownMenu) {
        console.error('❌ Notification dropdown elements not found');
        return;
    }
    
    console.log('🔔 Initializing notification dropdown...');

    // Ensure dropdown is completely hidden initially
    notificationDropdown.classList.remove('show');
    dropdownMenu.style.display = 'none';

    let isOpen = false;
    let hoverTimeout;

    function showDropdown() {
        if (isOpen) return;
        
        clearTimeout(hoverTimeout);
        isOpen = true;
        
        console.log('🔔 Showing notification dropdown');
        
        // Add show class to make it visible
        notificationDropdown.classList.add('show');
        
        // Small delay to ensure CSS takes effect
        setTimeout(() => {
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.transform = 'translateY(0) scale(1)';
        }, 10);
    }
    
    function hideDropdown() {
        if (!isOpen) return;
        
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
            console.log('🔔 Hiding notification dropdown');
            
            isOpen = false;
            
            // Animate out
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.transform = 'translateY(10px) scale(0.95)';
            
            // Remove show class after animation
            setTimeout(() => {
                notificationDropdown.classList.remove('show');
                dropdownMenu.style.display = 'none';
            }, 250);
        }, 200);
    }

    // Event listeners
    notificationBadge.addEventListener('mouseenter', showDropdown);
    notificationDropdown.addEventListener('mouseleave', hideDropdown);
    
    // Keep open when hovering over dropdown
    dropdownMenu.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
    });

    // Click to toggle (for mobile)
    notificationBadge.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (isOpen) {
            hideDropdown();
        } else {
            showDropdown();
        }
    });

    // Individual notification clicks
    notificationItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const notification = this.querySelector('span').textContent;
            console.log(`🔔 Notification clicked: ${notification}`);
            
            // Mark as read
            this.style.opacity = '0.6';
            this.style.background = 'rgba(59, 130, 246, 0.05)';
            
            updateNotificationBadge();
            showNotification('Notification marked as read', 'success');
        });
    });

    // Mark all as read
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('🔔 Mark all notifications as read');
            
            notificationItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0.6';
                    item.style.background = 'rgba(59, 130, 246, 0.05)';
                }, index * 50);
            });
            
            // Update badge
            const badge = notificationBadge.querySelector('.badge');
            if (badge) {
                badge.style.transform = 'scale(0)';
                setTimeout(() => {
                    badge.textContent = '0';
                    badge.style.display = 'none';
                }, 200);
            }
            
            showNotification('All notifications marked as read', 'success');
        });
    }

    // View all notifications
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            hideDropdown();
            showNotification('Notifications page coming soon!', 'info');
        });
    }

    // Close on outside click
    document.addEventListener('click', function(e) {
        if (!notificationDropdown.contains(e.target)) {
            hideDropdown();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isOpen) {
            hideDropdown();
        }
    });

    console.log('✅ Notification dropdown initialized successfully');
}

// Update notification badge count
function updateNotificationBadge() {
    const badge = document.querySelector('.notification-badge .badge');
    const unreadItems = document.querySelectorAll('.notification-item:not([style*="opacity: 0.6"])');
    
    if (badge) {
        const count = unreadItems.length;
        badge.textContent = count;
        
        if (count === 0) {
            badge.style.transform = 'scale(0)';
            setTimeout(() => {
                badge.style.display = 'none';
            }, 200);
        }
    }
}



// Window resize handler (keeping your code with fixes)
function initializeResizeHandler() {
    let resizeTimeout;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            handleResize();
        }, 250);
    });
}

// Handle window resize (improved)
function handleResize() {
    console.log('🖥️ Window resized, updating layout...');

    // Refresh all charts
    refreshCharts();
    
    // Handle responsive sidebar
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const quarantineContent = document.querySelector('.quarantine-content');

    if (window.innerWidth <= 1024) {
        if (sidebar) sidebar.classList.add('mobile');
        if (mainContent) mainContent.style.marginLeft = '0';
        if (quarantineContent) quarantineContent.style.marginLeft = '0';
    } else {
        if (sidebar) sidebar.classList.remove('mobile');
        if (mainContent) mainContent.style.marginLeft = '240px';
        if (quarantineContent) quarantineContent.style.marginLeft = '240px';
    }
}

// Refresh Charts
function refreshCharts() {
    Object.values(miniChartInstances).forEach(chart => {
        if (chart && typeof chart.resize === 'function') {
            chart.resize();
        }
    });

    if (threatChartInstance && typeof threatChartInstance.resize === 'function') {
        threatChartInstance.resize();
    }

    if (trafficChartInstance && typeof trafficChartInstance.resize === 'function') {
        trafficChartInstance.resize();
    }

    if (securityScoreChartInstance && typeof securityScoreChartInstance.resize === 'function') {
        securityScoreChartInstance.resize();
    }
}

// ===== UTILITY FUNCTIONS =====

// Professional Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icons[type] || icons.info}"></i>
            <span class="notification-message">${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Style notification
    const styles = {
        success: '#059669',
        error: '#dc2626',
        warning: '#d97706',
        info: '#1e40af'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 24px;
        right: 24px;
        background: ${styles[type] || styles.info};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform ${config.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
        font-weight: 500;
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
        opacity: 0.8;
        transition: opacity ${config.animationDuration}ms ease;
    `;
    
    closeBtn.addEventListener('click', () => removeNotification(notification));
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.8');
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            removeNotification(notification);
        }
    }, 5000);
}

// Remove Notification
function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, config.animationDuration);
}

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Data Generation Functions (keeping your existing ones)
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

function generateMiniChartData(index) {
    const colors = [config.chartColors.primary, config.chartColors.danger, config.chartColors.success, config.chartColors.warning];
    const patterns = [
        [10, 15, 12, 18, 25, 20, 30],
        [15, 12, 8, 10, 6, 8, 5],
        [8, 12, 15, 18, 22, 25, 28],
        [30, 30, 29, 31, 30, 30, 30]
    ];

    return {
        labels: ['', '', '', '', '', '', ''],
        data: patterns[index],
        color: colors[index]
    };
}

function generateSecurityScoreData() {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const data = [75, 78, 82, 85, 83, 87, 85];
    return { labels, data };
}

function getMaxTicks() {
    if (window.innerWidth < 480) return 6;
    if (window.innerWidth < 768) return 8;
    if (window.innerWidth < 1024) return 10;
    return 12;
}

function handleChartError(error, chartName) {
    console.error(`❌ Error in ${chartName}:`, error);
    showNotification(`Failed to load ${chartName}. Please refresh the page.`, 'error');
}

// Make functions globally accessible
window.closeEmailPreview = closeEmailPreview;
window.showNotification = showNotification;
window.debugDashboard = function() {
    console.log('🔍 Dashboard Debug Info:');
    console.log('- Initialized:', isInitialized);
    console.log('- Current page:', currentPage);
    console.log('- Chart instances:', Object.keys(miniChartInstances));
    console.log('- Threat chart:', !!threatChartInstance);
    console.log('- Traffic chart:', !!trafficChartInstance);
    console.log('- Navigation items:', document.querySelectorAll('.nav-item[data-page]').length);
    console.log('- Quarantine rows:', document.querySelectorAll('.quarantine-row').length);
    console.log('- Viewport:', window.innerWidth + 'x' + window.innerHeight);
};

console.log('✅ Sithafal Dashboard JavaScript loaded and ready');

