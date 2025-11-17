// Configuration management for ThingSpeak
document.addEventListener('DOMContentLoaded', function() {
    // Load existing configuration
    loadConfig();
    
    // Handle configuration form submission
    const configForm = document.getElementById('configForm');
    if (configForm) {
        configForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveConfig();
        });
    }
});

function saveConfig() {
    const channelId = document.getElementById('channelId').value;
    const readApiKey = document.getElementById('readApiKey').value;
    const numberOfResults = document.getElementById('numberOfResults').value;
    
    if (!channelId || !readApiKey) {
        showStatus('Please fill in all required fields', 'error');
        return;
    }
    
    const config = {
        channelId: channelId,
        readApiKey: readApiKey,
        numberOfResults: numberOfResults
    };
    
    localStorage.setItem('thingspeakConfig', JSON.stringify(config));
    showStatus('Configuration saved successfully!', 'success');
}

function loadConfig() {
    const config = getConfig();
    if (config) {
        const channelIdInput = document.getElementById('channelId');
        const readApiKeyInput = document.getElementById('readApiKey');
        const numberOfResultsInput = document.getElementById('numberOfResults');
        
        if (channelIdInput) channelIdInput.value = config.channelId || '';
        if (readApiKeyInput) readApiKeyInput.value = config.readApiKey || '';
        if (numberOfResultsInput) numberOfResultsInput.value = config.numberOfResults || 100;
    }
}

function getConfig() {
    const configStr = localStorage.getItem('thingspeakConfig');
    return configStr ? JSON.parse(configStr) : null;
}

function showStatus(message, type) {
    const statusDiv = document.getElementById('configStatus');
    if (statusDiv) {
        statusDiv.className = type;
        statusDiv.textContent = message;
        setTimeout(() => {
            statusDiv.textContent = '';
            statusDiv.className = '';
        }, 5000);
    }
}
