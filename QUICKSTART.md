# Quick Start Guide

## Getting Started

This is a simple, static website that requires no installation or build process. Just open the HTML files in your web browser!

### Step 1: Open the Website
Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, or Edge).

### Step 2: Configure ThingSpeak
On the home page, scroll to the "ThingSpeak Configuration" section and enter:
- **Channel ID**: Your ThingSpeak channel ID
- **Read API Key**: Your ThingSpeak read API key
- **Results per Query**: Number of data points to fetch (default: 100)

Click "Save Configuration" - your settings will be saved in the browser.

### Step 3: View Subject Data
Navigate to any subject page using the navigation menu. Each subject page shows:
- **3 Nap Sessions** (at the top)
- **Baseline Measurement** (at the bottom with orange background)

### Step 4: Fill Out Response Forms
For each nap session, complete the response form:
1. Enter sleep duration in hours
2. Rate sleep quality from 1-10
3. Describe any sleep disturbances
4. Add additional notes

Click "Save Response" to store the data.

### Step 5: View Analysis
Go to the "Overall Analysis" page to see:
- Summary table of all subjects and sessions
- Comparative analysis
- All submitted response forms
- Overall conclusions and recommendations

## ThingSpeak Field Mapping

The website expects ThingSpeak fields to be organized as follows:

| Subject   | Baseline | Nap 1  | Nap 2  | Nap 3  |
|-----------|----------|--------|--------|--------|
| Subject 1 | Field 1  | Field 2| Field 3| Field 4|
| Subject 2 | Field 5  | Field 6| Field 7| Field 8|
| Subject 3 | Field 9  | Field 10| Field 11| Field 12|

If your ThingSpeak channel uses different field numbers, you can modify the `fieldMapping` object in `thingspeak.js`.

## Features

### Data Persistence
- All configuration and form responses are saved in your browser's localStorage
- Data persists between sessions (until you clear browser data)
- Each subject and nap session has independent storage

### Analysis Features
- **Individual Analysis**: Each nap session shows analysis correlating sleep scores with form responses
- **Baseline Comparison**: Compares each nap session with the subject's baseline
- **Overall Analysis**: Comparative analysis across all subjects with statistics and insights

### No Internet Required
After loading the page once, the website works offline (except for fetching new ThingSpeak data).

## Troubleshooting

### "Configuration not found" Error
- Go to the home page and configure your ThingSpeak settings
- Make sure Channel ID and Read API Key are correct

### No Data Showing
- Verify your ThingSpeak channel has data in the expected fields
- Check that your Read API Key has proper permissions
- Open browser console (F12) to see detailed error messages

### Forms Not Saving
- Make sure your browser allows localStorage
- Check that you're not in private/incognito mode
- Try a different browser if the issue persists

## Browser Requirements
- Modern browser with ES6 JavaScript support
- localStorage must be enabled
- JavaScript must be enabled

## Support
For questions or issues, please refer to the detailed README.md file.
