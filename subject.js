// Subject page controller
let currentSubjectId = null;
let apiClient = null;
let formManager = null;
let analyzer = null;
let subjectData = null;

function initializeSubject(subjectId) {
    currentSubjectId = subjectId;
    apiClient = new ThingSpeakAPI();
    formManager = new FormDataManager();
    analyzer = new SleepAnalyzer();
    
    loadSubjectData();
    setupForms();
    loadExistingFormData();
}

async function loadSubjectData() {
    const loadingMsg = document.getElementById('loadingMessage');
    const errorMsg = document.getElementById('errorMessage');
    
    try {
        const data = await apiClient.fetchData();
        subjectData = apiClient.parseSubjectData(data, currentSubjectId);
        
        if (subjectData) {
            displaySubjectData(subjectData);
            loadingMsg.style.display = 'none';
        } else {
            throw new Error('No data available for this subject');
        }
    } catch (error) {
        console.error('Error loading subject data:', error);
        loadingMsg.style.display = 'none';
        errorMsg.style.display = 'block';
        errorMsg.textContent = `Error: ${error.message}. Please check your ThingSpeak configuration on the home page.`;
    }
}

function displaySubjectData(data) {
    // Display baseline
    if (data.baseline) {
        document.getElementById('baselineScore').textContent = data.baseline.value.toFixed(2);
        document.getElementById('baselineTime').textContent = formatTimestamp(data.baseline.timestamp);
    }
    
    // Display nap sessions
    for (let i = 1; i <= 3; i++) {
        const napData = data[`nap${i}`];
        if (napData) {
            document.getElementById(`nap${i}Score`).textContent = napData.value.toFixed(2);
            document.getElementById(`nap${i}Time`).textContent = formatTimestamp(napData.timestamp);
        }
    }
}

function formatTimestamp(timestamp) {
    if (!timestamp) return '--';
    const date = new Date(timestamp);
    return date.toLocaleString();
}

function setupForms() {
    for (let i = 1; i <= 3; i++) {
        const form = document.getElementById(`nap${i}Form`);
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                handleFormSubmit(i);
            });
        }
    }
}

function handleFormSubmit(napNumber) {
    const form = document.getElementById(`nap${napNumber}Form`);
    const formData = new FormData(form);
    
    const responseData = {
        sleepDuration: formData.get('sleepDuration'),
        sleepQuality: formData.get('sleepQuality'),
        disturbances: formData.get('disturbances'),
        notes: formData.get('notes')
    };
    
    // Save form data
    formManager.saveResponse(currentSubjectId, napNumber, responseData);
    
    // Show success message
    const statusDiv = document.getElementById(`nap${napNumber}FormStatus`);
    statusDiv.className = 'success';
    statusDiv.textContent = 'Response saved successfully!';
    setTimeout(() => {
        statusDiv.textContent = '';
        statusDiv.className = '';
    }, 3000);
    
    // Generate and display analysis
    generateAnalysis(napNumber, responseData);
}

function loadExistingFormData() {
    const subjectFormData = formManager.getSubjectData(currentSubjectId);
    
    for (let i = 1; i <= 3; i++) {
        const napData = subjectFormData[`nap${i}`];
        if (napData) {
            // Populate form fields
            const durationInput = document.getElementById(`nap${i}Duration`);
            const qualityInput = document.getElementById(`nap${i}Quality`);
            const disturbancesInput = document.getElementById(`nap${i}Disturbances`);
            const notesInput = document.getElementById(`nap${i}Notes`);
            
            if (durationInput) durationInput.value = napData.sleepDuration || '';
            if (qualityInput) qualityInput.value = napData.sleepQuality || '';
            if (disturbancesInput) disturbancesInput.value = napData.disturbances || '';
            if (notesInput) notesInput.value = napData.notes || '';
            
            // Generate analysis for existing data
            generateAnalysis(i, napData);
        }
    }
}

function generateAnalysis(napNumber, formData) {
    if (!subjectData) return;
    
    const napSleepData = subjectData[`nap${napNumber}`];
    const baselineData = subjectData.baseline;
    
    if (!napSleepData) return;
    
    const conclusionDiv = document.getElementById(`nap${napNumber}Conclusion`);
    
    let analysis = '<p><strong>Sleep Quality Analysis:</strong></p>';
    
    // Primary analysis
    const primaryAnalysis = analyzer.analyzeSleepQuality(napSleepData, formData);
    analysis += `<p>${primaryAnalysis}</p>`;
    
    // Baseline comparison
    if (baselineData) {
        const baselineComparison = analyzer.compareWithBaseline(baselineData, napSleepData);
        analysis += `<p><strong>Baseline Comparison:</strong> ${baselineComparison}</p>`;
    }
    
    // Additional insights from form data
    if (formData.notes && formData.notes.trim()) {
        analysis += `<p><strong>Notes:</strong> ${formData.notes}</p>`;
    }
    
    conclusionDiv.innerHTML = analysis;
}
