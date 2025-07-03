// Options page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeOptionsPage();
});

function initializeOptionsPage() {
    loadCurrentSettings();
    bindEventListeners();
    updatePreview();
}

function loadCurrentSettings() {
    chrome.storage.sync.get({
        theme: 'purple-pink',
        enableGlow: true,
        enableAnimation: true,
        intensity: 1,
        animationSpeed: 1
    }, function(items) {
        // Set active theme
        document.querySelector(`[data-theme="${items.theme}"]`).classList.add('active');
        
        // Set switches
        document.getElementById('enableGlow').checked = items.enableGlow;
        document.getElementById('enableAnimation').checked = items.enableAnimation;
        
        // Set sliders
        document.getElementById('intensity').value = items.intensity;
        document.getElementById('animationSpeed').value = items.animationSpeed;
        
        // Update displays
        updateIntensityDisplay();
        updateAnimationSpeedDisplay();
        updatePreview();
    });
}

function bindEventListeners() {
    // Theme selection
    document.querySelectorAll('.theme-card').forEach(card => {
        card.addEventListener('click', function() {
            selectTheme(this.dataset.theme);
        });
    });
    
    // Settings controls
    document.getElementById('enableGlow').addEventListener('change', function() {
        saveSetting('enableGlow', this.checked);
        updatePreview();
    });
    
    document.getElementById('enableAnimation').addEventListener('change', function() {
        saveSetting('enableAnimation', this.checked);
        updatePreview();
    });
    
    document.getElementById('intensity').addEventListener('input', function() {
        saveSetting('intensity', parseFloat(this.value));
        updateIntensityDisplay();
        updatePreview();
    });
    
    document.getElementById('animationSpeed').addEventListener('input', function() {
        saveSetting('animationSpeed', parseFloat(this.value));
        updateAnimationSpeedDisplay();
        updatePreview();
    });
    
    // Footer buttons
    document.getElementById('resetBtn').addEventListener('click', resetSettings);
    document.getElementById('exportBtn').addEventListener('click', exportSettings);
    document.getElementById('importBtn').addEventListener('click', importSettings);
    document.getElementById('saveBtn').addEventListener('click', saveSettings);
}

function selectTheme(theme) {
    // Remove active class from all themes
    document.querySelectorAll('.theme-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active class to selected theme
    document.querySelector(`[data-theme="${theme}"]`).classList.add('active');
    
    // Save and apply theme
    saveSetting('theme', theme);
    updatePreview();
    
    // Add selection animation
    const selectedCard = document.querySelector(`[data-theme="${theme}"]`);
    selectedCard.style.transform = 'scale(1.05)';
    setTimeout(() => {
        selectedCard.style.transform = '';
    }, 200);
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

function updateAnimationSpeedDisplay() {
    const speed = document.getElementById('animationSpeed').value;
    document.getElementById('animationSpeedValue').textContent = speed + 'x';
}

function updatePreview() {
    const settings = {
        theme: document.querySelector('.theme-card.active')?.dataset.theme || 'purple-pink',
        enableGlow: document.getElementById('enableGlow').checked,
        enableAnimation: document.getElementById('enableAnimation').checked,
        intensity: parseFloat(document.getElementById('intensity').value),
        animationSpeed: parseFloat(document.getElementById('animationSpeed').value)
    };
    
    applyPreviewTheme(settings);
}

function applyPreviewTheme(settings) {
    const themes = {
        'purple-pink': {
            primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            accent: '#667eea'
        },
        'blue-cyan': {
            primary: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
            secondary: 'linear-gradient(135deg, #00cec9 0%, #55efc4 100%)',
            accent: '#74b9ff'
        },
        'orange-red': {
            primary: 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)',
            secondary: 'linear-gradient(135deg, #ff7675 0%, #fd79a8 100%)',
            accent: '#fd79a8'
        },
        'green-blue': {
            primary: 'linear-gradient(135deg, #00b894 0%, #0984e3 100%)',
            secondary: 'linear-gradient(135deg, #55efc4 0%, #74b9ff 100%)',
            accent: '#00b894'
        },
        'dark-gold': {
            primary: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
            secondary: 'linear-gradient(135deg, #fdcb6e 0%, #f39c12 100%)',
            accent: '#fdcb6e'
        },
        'default': {
            primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            accent: '#667eea'
        }
    };
    
    const theme = themes[settings.theme];
    if (!theme) return;
    
    // Apply theme to body
    document.body.style.background = theme.primary;
    
    // Apply to preview elements
    const previewHeader = document.querySelector('.preview-header');
    const previewButtons = document.querySelectorAll('.preview-btn');
    const previewCard = document.querySelector('.preview-card');
    
    if (previewHeader) {
        previewHeader.style.background = theme.primary;
    }
    
    previewButtons.forEach(btn => {
        btn.style.background = theme.secondary;
        if (settings.enableGlow) {
            btn.style.boxShadow = `0 0 20px ${theme.accent}${Math.round(settings.intensity * 50).toString(16)}`;
        }
    });
    
    if (previewCard) {
        if (settings.enableGlow) {
            previewCard.style.boxShadow = `0 0 25px ${theme.accent}${Math.round(settings.intensity * 30).toString(16)}`;
        }
        
        if (settings.enableAnimation) {
            previewCard.style.animation = `pulseGlow ${3 / settings.animationSpeed}s ease-in-out infinite`;
        }
    }
}

function resetSettings() {
    if (confirm('Bạn có chắc chắn muốn đặt lại tất cả cài đặt về mặc định?')) {
        chrome.storage.sync.set({
            theme: 'purple-pink',
            enableGlow: true,
            enableAnimation: true,
            intensity: 1,
            animationSpeed: 1
        }, function() {
            location.reload();
        });
    }
}

function exportSettings() {
    chrome.storage.sync.get(null, function(items) {
        const settings = {
            theme: items.theme,
            enableGlow: items.enableGlow,
            enableAnimation: items.enableAnimation,
            intensity: items.intensity,
            animationSpeed: items.animationSpeed
        };
        
        const dataStr = JSON.stringify(settings, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'gradient-glow-settings.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        showNotification('Cài đặt đã được xuất thành công!', 'success');
    });
}

function importSettings() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const settings = JSON.parse(e.target.result);
                chrome.storage.sync.set(settings, function() {
                    location.reload();
                });
                showNotification('Cài đặt đã được nhập thành công!', 'success');
            } catch (error) {
                showNotification('File không hợp lệ!', 'error');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

function saveSettings() {
    showNotification('Cài đặt đã được lưu!', 'success');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(45deg, #00b894, #0984e3);' : 'background: linear-gradient(45deg, #e74c3c, #c0392b);'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes pulseGlow {
        0% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); }
        50% { box-shadow: 0 0 30px rgba(102, 126, 234, 0.5); }
        100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); }
    }
`;
document.head.appendChild(style); 