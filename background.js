// Background script for Gradient Glow Interface Pack
chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === 'install') {
        // Set default settings on first install
        chrome.storage.sync.set({
            theme: 'purple-pink',
            enableGlow: true,
            enableAnimation: true,
            intensity: 1
        });
        
        // Open welcome page
        chrome.tabs.create({
            url: chrome.runtime.getURL('options.html')
        });
    }
    
    // Context menu creation (optional feature)
    // Uncomment if you add "contextMenus" permission to manifest
    /*
    try {
        chrome.contextMenus.create({
            id: 'gradient-glow-options',
            title: 'Gradient Glow Options',
            contexts: ['all']
        });
    } catch (error) {
        console.log('Context menu already exists');
    }
    */
});

// Listen for storage changes
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (namespace === 'sync') {
        // Notify all tabs about settings changes
        chrome.tabs.query({}, function(tabs) {
            tabs.forEach(function(tab) {
                // Skip chrome:// and extension pages
                if (tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
                    chrome.tabs.sendMessage(tab.id, {
                        action: 'applyTheme'
                    }, function(response) {
                        // Ignore errors for tabs that can't receive messages
                        if (chrome.runtime.lastError) {
                            // Silent error handling
                        }
                    });
                }
            });
        });
    }
});

// Context menu click handler (disabled - requires contextMenus permission)
/*
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === 'gradient-glow-options') {
        chrome.tabs.create({
            url: chrome.runtime.getURL('options.html')
        });
    }
});
*/

// Handle keyboard shortcuts (if available)
if (chrome.commands && chrome.commands.onCommand) {
    chrome.commands.onCommand.addListener(function(command) {
        switch(command) {
            case 'toggle-extension':
                toggleExtension();
                break;
            case 'cycle-theme':
                cycleTheme();
                break;
        }
    });
}

function toggleExtension() {
    chrome.storage.sync.get(['extensionEnabled'], function(items) {
        const enabled = items.extensionEnabled !== false;
        chrome.storage.sync.set({
            extensionEnabled: !enabled
        });
    });
}

function cycleTheme() {
    const themes = ['purple-pink', 'blue-cyan', 'orange-red', 'green-blue', 'dark-gold', 'default'];
    
    chrome.storage.sync.get(['theme'], function(items) {
        const currentTheme = items.theme || 'purple-pink';
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];
        
        chrome.storage.sync.set({
            theme: nextTheme
        });
        
        // Notification disabled (requires notifications permission)
        // Uncomment if you add "notifications" permission to manifest
        /*
        if (chrome.notifications) {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icons/icon48.png',
                title: 'Gradient Glow',
                message: `Switched to ${nextTheme.replace('-', ' ')} theme`
            });
        }
        */
    });
} 