// Khởi tạo popup
document.addEventListener('DOMContentLoaded', function() {
    initializePopup();
});

function initializePopup() {
    // Load current settings
    loadSettings();
    
    // Bind events
    bindEvents();
    
    // Update intensity display
    updateIntensityDisplay();
}

function loadSettings() {
    chrome.storage.sync.get({
        theme: 'purple-pink',
        enableGlow: true,
        enableAnimation: true,
        intensity: 1
    }, function(items) {
        // Set active theme
        document.querySelector(`[data-theme="${items.theme}"]`).classList.add('active');
        
        // Set checkboxes
        document.getElementById('enableGlow').checked = items.enableGlow;
        document.getElementById('enableAnimation').checked = items.enableAnimation;
        
        // Set intensity
        document.getElementById('intensity').value = items.intensity;
        updateIntensityDisplay();
    });
}

function bindEvents() {
    // Theme selection
    document.querySelectorAll('.theme-item').forEach(item => {
        item.addEventListener('click', function() {
            selectTheme(this.dataset.theme);
        });
    });
    
    // Settings checkboxes
    document.getElementById('enableGlow').addEventListener('change', function() {
        saveSetting('enableGlow', this.checked);
        applyChanges();
    });
    
    document.getElementById('enableAnimation').addEventListener('change', function() {
        saveSetting('enableAnimation', this.checked);
        applyChanges();
    });
    
    // Intensity slider
    document.getElementById('intensity').addEventListener('input', function() {
        saveSetting('intensity', parseFloat(this.value));
        updateIntensityDisplay();
        applyChanges();
    });
    
    // Buttons
    document.getElementById('optionsBtn').addEventListener('click', function() {
        chrome.tabs.create({
            url: chrome.runtime.getURL('options.html')
        });
    });
    
    document.getElementById('resetBtn').addEventListener('click', function() {
        resetSettings();
    });
}

function selectTheme(theme) {
    // Remove active class from all themes
    document.querySelectorAll('.theme-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to selected theme
    document.querySelector(`[data-theme="${theme}"]`).classList.add('active');
    
    // Save theme
    saveSetting('theme', theme);
    
    // Apply changes
    applyChanges();
}

function saveSetting(key, value) {
    const setting = {};
    setting[key] = value;
    chrome.storage.sync.set(setting);
}

function updateIntensityDisplay() {
    const intensity = document.getElementById('intensity').value;
    const percentage = Math.round(intensity * 100);
    document.getElementById('intensityValue').textContent = percentage + '%';
}

function applyChanges() {
    // Send message to content script to apply changes
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0] && tabs[0].id) {
            // Skip chrome:// and extension pages
            if (tabs[0].url && !tabs[0].url.startsWith('chrome://') && !tabs[0].url.startsWith('chrome-extension://')) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'applyTheme'
                }, function(response) {
                    // Handle any errors silently
                    if (chrome.runtime.lastError) {
                        // Extension may not be able to run on this page
                    }
                });
            }
        }
    });
}

function resetSettings() {
    // Reset to default values
    chrome.storage.sync.set({
        theme: 'purple-pink',
        enableGlow: true,
        enableAnimation: true,
        intensity: 1
    }, function() {
        // Reload popup
        location.reload();
    });
}

// Add smooth animations
function addAnimations() {
    const items = document.querySelectorAll('.theme-item');
    items.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
} 