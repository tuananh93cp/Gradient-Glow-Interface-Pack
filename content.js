// Content script for Gradient Glow Interface Pack
(function() {
    'use strict';
    
    let currentTheme = 'purple-pink';
    let enableGlow = true;
    let enableAnimation = true;
    let intensity = 1;
    
    // Initialize extension
    init();
    
    function init() {
        // Load settings and apply theme
        loadSettings();
        
        // Listen for messages from popup
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            if (request.action === 'applyTheme') {
                loadSettings();
            }
        });
        
        // Watch for dynamic content changes
        observeChanges();
    }
    
    function loadSettings() {
        chrome.storage.sync.get({
            theme: 'purple-pink',
            enableGlow: true,
            enableAnimation: true,
            intensity: 1
        }, function(items) {
            currentTheme = items.theme;
            enableGlow = items.enableGlow;
            enableAnimation = items.enableAnimation;
            intensity = items.intensity;
            
            applyTheme();
        });
    }
    
    function applyTheme() {
        removeExistingStyles();
        
        if (currentTheme === 'default') {
            return; // Don't apply any custom styles
        }
        
        injectThemeStyles();
        applyGlowEffects();
        applyAnimations();
    }
    
    function removeExistingStyles() {
        const existingStyles = document.querySelectorAll('[data-gradient-glow]');
        existingStyles.forEach(style => style.remove());
    }
    
    function injectThemeStyles() {
        // Ensure head exists
        if (!document.head) {
            setTimeout(injectThemeStyles, 100);
            return;
        }
        
        const style = document.createElement('style');
        style.setAttribute('data-gradient-glow', 'theme');
        style.textContent = getThemeCSS();
        document.head.appendChild(style);
    }
    
    function getThemeCSS() {
        const themes = {
            'purple-pink': {
                primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                accent: '#667eea',
                text: '#ffffff'
            },
            'blue-cyan': {
                primary: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
                secondary: 'linear-gradient(135deg, #00cec9 0%, #55efc4 100%)',
                accent: '#74b9ff',
                text: '#ffffff'
            },
            'orange-red': {
                primary: 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)',
                secondary: 'linear-gradient(135deg, #ff7675 0%, #fd79a8 100%)',
                accent: '#fd79a8',
                text: '#ffffff'
            },
            'green-blue': {
                primary: 'linear-gradient(135deg, #00b894 0%, #0984e3 100%)',
                secondary: 'linear-gradient(135deg, #55efc4 0%, #74b9ff 100%)',
                accent: '#00b894',
                text: '#ffffff'
            },
            'dark-gold': {
                primary: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
                secondary: 'linear-gradient(135deg, #fdcb6e 0%, #f39c12 100%)',
                accent: '#fdcb6e',
                text: '#ffffff'
            }
        };
        
        const theme = themes[currentTheme];
        if (!theme) return '';
        
        return `
            /* Header and Navigation Styles */
            header, nav, .header, .nav, .navbar, .navigation {
                background: ${theme.primary} !important;
                color: ${theme.text} !important;
                border-radius: 12px !important;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2) !important;
            }
            
            /* Button Styles */
            button, .btn, .button, input[type="submit"], input[type="button"] {
                background: ${theme.secondary} !important;
                color: ${theme.text} !important;
                border: none !important;
                border-radius: 8px !important;
                padding: 12px 24px !important;
                font-weight: 500 !important;
                transition: all 0.3s ease !important;
                cursor: pointer !important;
            }
            
            button:hover, .btn:hover, .button:hover, input[type="submit"]:hover, input[type="button"]:hover {
                transform: translateY(-2px) !important;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3) !important;
            }
            
            /* Form Styles */
            input[type="text"], input[type="email"], input[type="password"], 
            input[type="search"], textarea, select {
                background: rgba(255, 255, 255, 0.1) !important;
                border: 2px solid rgba(255, 255, 255, 0.2) !important;
                border-radius: 8px !important;
                padding: 12px 16px !important;
                color: ${theme.text} !important;
                backdrop-filter: blur(10px) !important;
            }
            
            input[type="text"]:focus, input[type="email"]:focus, 
            input[type="password"]:focus, input[type="search"]:focus, 
            textarea:focus, select:focus {
                border-color: ${theme.accent} !important;
                outline: none !important;
                box-shadow: 0 0 20px rgba(102, 126, 234, 0.3) !important;
            }
            
            /* Card and Panel Styles */
            .card, .panel, .box, .container, .content-box, .widget {
                background: rgba(255, 255, 255, 0.05) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                border-radius: 16px !important;
                backdrop-filter: blur(20px) !important;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2) !important;
            }
            
            /* Link Styles */
            a, .link {
                color: ${theme.accent} !important;
                text-decoration: none !important;
                transition: all 0.3s ease !important;
            }
            
            a:hover, .link:hover {
                color: ${theme.text} !important;
                text-shadow: 0 0 10px ${theme.accent} !important;
            }
            
            /* Background Body */
            body {
                background: ${theme.primary} !important;
                background-attachment: fixed !important;
            }
            
            /* Scrollbar Styles */
            ::-webkit-scrollbar {
                width: 12px !important;
            }
            
            ::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1) !important;
                border-radius: 6px !important;
            }
            
            ::-webkit-scrollbar-thumb {
                background: ${theme.secondary} !important;
                border-radius: 6px !important;
            }
            
            ::-webkit-scrollbar-thumb:hover {
                background: ${theme.accent} !important;
            }
        `;
    }
    
    function applyGlowEffects() {
        if (!enableGlow) return;
        
        // Ensure head exists
        if (!document.head) {
            setTimeout(applyGlowEffects, 100);
            return;
        }
        
        const style = document.createElement('style');
        style.setAttribute('data-gradient-glow', 'glow');
        style.textContent = `
            /* Glow Effects */
            button, .btn, .button, input[type="submit"], input[type="button"] {
                box-shadow: 0 0 20px rgba(102, 126, 234, ${0.3 * intensity}) !important;
            }
            
            button:hover, .btn:hover, .button:hover, input[type="submit"]:hover, input[type="button"]:hover {
                box-shadow: 0 0 30px rgba(102, 126, 234, ${0.5 * intensity}) !important;
            }
            
            .card, .panel, .box, .container, .content-box, .widget {
                box-shadow: 0 0 25px rgba(102, 126, 234, ${0.2 * intensity}) !important;
            }
            
            header, nav, .header, .nav, .navbar, .navigation {
                box-shadow: 0 0 40px rgba(102, 126, 234, ${0.4 * intensity}) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    function applyAnimations() {
        if (!enableAnimation) return;
        
        // Ensure head exists
        if (!document.head) {
            setTimeout(applyAnimations, 100);
            return;
        }
        
        const style = document.createElement('style');
        style.setAttribute('data-gradient-glow', 'animations');
        style.textContent = `
            /* Animations */
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            @keyframes pulseGlow {
                0% { box-shadow: 0 0 20px rgba(102, 126, 234, ${0.3 * intensity}); }
                50% { box-shadow: 0 0 30px rgba(102, 126, 234, ${0.5 * intensity}); }
                100% { box-shadow: 0 0 20px rgba(102, 126, 234, ${0.3 * intensity}); }
            }
            
            body {
                background-size: 200% 200% !important;
                animation: gradientShift 8s ease infinite !important;
            }
            
            .card, .panel, .box, .container, .content-box, .widget {
                animation: pulseGlow 3s ease-in-out infinite !important;
            }
            
            button, .btn, .button, input[type="submit"], input[type="button"] {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    function observeChanges() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startObserving);
        } else {
            startObserving();
        }
        
        function startObserving() {
            // Check if body exists
            if (!document.body) {
                setTimeout(startObserving, 100);
                return;
            }
            
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        // Re-apply theme for new elements
                        setTimeout(applyTheme, 100);
                    }
                });
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
    
})(); 