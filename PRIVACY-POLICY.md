# Privacy Policy - Gradient Glow Interface Pack

**Effective Date:** March 7, 2025  
**Last Updated:** March 7, 2025

## Overview

Gradient Glow Interface Pack ("the Extension") is committed to protecting your privacy. This privacy policy explains how we handle information when you use our browser extension.

## Information We Do NOT Collect

**We do not collect, store, or transmit any personal information, including but not limited to:**

- Personal identification information (name, email, address, phone number)
- Browsing history or website visit data
- Search queries or typed content
- Location data
- Device information beyond what's necessary for extension functionality
- Usage analytics or tracking data
- Cookies or similar tracking technologies

## Information We Store Locally

The extension stores the following data **locally on your device only**:

### Settings Data
- Selected theme preference (e.g., "purple-pink", "blue-cyan")
- Glow effects enable/disable status
- Animation enable/disable status  
- Effect intensity level (0.1 to 2.0)
- Animation speed setting

### Storage Method
- Data is stored using Chrome's `chrome.storage.sync` API
- This allows your settings to sync across your devices when signed into Chrome
- **No data is sent to our servers or third parties**
- You can clear this data anytime by removing the extension

## How the Extension Works

### Core Functionality
1. **Theme Application**: Injects CSS styles to change website appearance
2. **Settings Management**: Saves your preferences locally
3. **Real-time Updates**: Applies theme changes instantly

### Technical Implementation
- Uses content scripts to modify website CSS
- No network requests to external servers
- No data transmission to developers or third parties
- No background data processing beyond applying themes

## Permissions Explanation

The extension requires the following permissions:

### `storage`
- **Purpose**: Save your theme preferences and settings
- **Data**: Theme selection, glow settings, animation preferences
- **Scope**: Local device storage only

### `activeTab`
- **Purpose**: Apply themes to the currently active browser tab
- **Data**: No data collection - only CSS style injection
- **Scope**: Current tab only when extension is used

### `scripting`
- **Purpose**: Inject CSS styles to transform website appearance
- **Data**: No data collection - only style application
- **Scope**: Content styling only

### `host_permissions` (http://*/* and https://*/*)
- **Purpose**: Allow extension to work on all websites
- **Data**: No data collection - only visual theme application
- **Scope**: CSS styling only, no content access

## Third-Party Services

**We do not use any third-party services, analytics, or tracking tools.**

## Data Security

Since we don't collect any personal data:
- There is no risk of data breaches involving your personal information
- Settings are stored locally using browser's secure storage APIs
- No transmission of data over networks

## Children's Privacy

The extension does not collect any information from users of any age. It is safe for use by children under 13.

## Changes to Privacy Policy

We may update this privacy policy from time to time. Any changes will be reflected in the "Last Updated" date above. Continued use of the extension after changes constitutes acceptance of the new policy.

## Contact Information

If you have questions about this privacy policy:

- **Developer**: XMP
- **Email**: lanhanh64529@gmail.com
- **GitHub**: https://github.com/tuananh93cp/Gradient-Glow-Interface-Pack

## Data Deletion

To delete all data stored by the extension:
1. Remove the extension from your browser
2. Or use browser settings to clear extension data
3. Settings will be permanently deleted

## Compliance

This extension complies with:
- Chrome Web Store Developer Program Policies
- Firefox Add-on Policies
- General Data Protection Regulation (GDPR) principles
- California Consumer Privacy Act (CCPA) principles

---

**Summary**: Gradient Glow Interface Pack is a privacy-focused extension that only stores your visual preferences locally. We do not collect, transmit, or sell any personal information. 