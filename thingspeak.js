// ThingSpeak API Integration
class ThingSpeakAPI {
    constructor() {
        this.config = this.getConfig();
        this.baseUrl = 'https://api.thingspeak.com/channels';
    }
    
    getConfig() {
        const configStr = localStorage.getItem('thingspeakConfig');
        return configStr ? JSON.parse(configStr) : null;
    }
    
    async fetchData(results = null) {
        if (!this.config) {
            throw new Error('ThingSpeak configuration not found. Please configure on the home page.');
        }
        
        const numResults = results || this.config.numberOfResults || 100;
        const url = `${this.baseUrl}/${this.config.channelId}/feeds.json?api_key=${this.config.readApiKey}&results=${numResults}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching ThingSpeak data:', error);
            throw error;
        }
    }
    
    async fetchFieldData(fieldNumber, results = null) {
        if (!this.config) {
            throw new Error('ThingSpeak configuration not found.');
        }
        
        const numResults = results || this.config.numberOfResults || 100;
        const url = `${this.baseUrl}/${this.config.channelId}/fields/${fieldNumber}.json?api_key=${this.config.readApiKey}&results=${numResults}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching field data:', error);
            throw error;
        }
    }
    
    // Parse data for specific subject
    parseSubjectData(allData, subjectId) {
        // Assuming fields are organized per subject
        // Field mapping example:
        // Subject 1: fields 1-4 (baseline + 3 naps)
        // Subject 2: fields 5-8
        // Subject 3: fields 9-12
        
        const fieldMapping = {
            1: { baseline: 'field1', nap1: 'field2', nap2: 'field3', nap3: 'field4' },
            2: { baseline: 'field5', nap1: 'field6', nap2: 'field7', nap3: 'field8' },
            3: { baseline: 'field9', nap1: 'field10', nap2: 'field11', nap3: 'field12' }
        };
        
        const fields = fieldMapping[subjectId];
        if (!fields) return null;
        
        const feeds = allData.feeds || [];
        
        const subjectData = {
            baseline: this.extractLatestValue(feeds, fields.baseline),
            nap1: this.extractLatestValue(feeds, fields.nap1),
            nap2: this.extractLatestValue(feeds, fields.nap2),
            nap3: this.extractLatestValue(feeds, fields.nap3)
        };
        
        return subjectData;
    }
    
    extractLatestValue(feeds, fieldName) {
        // Get the latest non-null value for a field
        for (let i = feeds.length - 1; i >= 0; i--) {
            const value = feeds[i][fieldName];
            if (value !== null && value !== undefined && value !== '') {
                return {
                    value: parseFloat(value),
                    timestamp: feeds[i].created_at
                };
            }
        }
        return null;
    }
}

// Form data management
class FormDataManager {
    constructor() {
        this.storageKey = 'sleepQualityFormData';
    }
    
    saveResponse(subjectId, napNumber, formData) {
        const allData = this.getAllData();
        
        if (!allData[subjectId]) {
            allData[subjectId] = {};
        }
        
        allData[subjectId][`nap${napNumber}`] = {
            ...formData,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem(this.storageKey, JSON.stringify(allData));
    }
    
    getResponse(subjectId, napNumber) {
        const allData = this.getAllData();
        return allData[subjectId]?.[`nap${napNumber}`] || null;
    }
    
    getAllData() {
        const dataStr = localStorage.getItem(this.storageKey);
        return dataStr ? JSON.parse(dataStr) : {};
    }
    
    getSubjectData(subjectId) {
        const allData = this.getAllData();
        return allData[subjectId] || {};
    }
}

// Analysis and conclusion generation
class SleepAnalyzer {
    constructor() {
        this.formDataManager = new FormDataManager();
    }
    
    analyzeSleepQuality(sleepScore, formResponse) {
        if (!sleepScore || !formResponse) {
            return 'Insufficient data for analysis';
        }
        
        const score = typeof sleepScore === 'object' ? sleepScore.value : sleepScore;
        let analysis = [];
        
        // Sleep score interpretation
        if (score >= 80) {
            analysis.push('Excellent sleep quality detected.');
        } else if (score >= 60) {
            analysis.push('Good sleep quality with room for improvement.');
        } else if (score >= 40) {
            analysis.push('Moderate sleep quality. Consider lifestyle adjustments.');
        } else {
            analysis.push('Poor sleep quality. May require intervention.');
        }
        
        // Correlate with form responses
        if (formResponse.sleepDuration) {
            const duration = parseFloat(formResponse.sleepDuration);
            if (duration < 6) {
                analysis.push('Sleep duration is below recommended 7-9 hours.');
            } else if (duration > 9) {
                analysis.push('Sleep duration exceeds typical recommendations.');
            }
        }
        
        if (formResponse.sleepQuality) {
            analysis.push(`Self-reported quality: ${formResponse.sleepQuality}.`);
        }
        
        if (formResponse.disturbances) {
            analysis.push(`Sleep disturbances noted: ${formResponse.disturbances}.`);
        }
        
        return analysis.join(' ');
    }
    
    compareWithBaseline(baselineScore, napScore) {
        if (!baselineScore || !napScore) {
            return 'Unable to compare with baseline';
        }
        
        const baseline = typeof baselineScore === 'object' ? baselineScore.value : baselineScore;
        const nap = typeof napScore === 'object' ? napScore.value : napScore;
        
        const difference = nap - baseline;
        const percentChange = ((difference / baseline) * 100).toFixed(1);
        
        let comparison = '';
        if (difference > 0) {
            comparison = `Sleep quality improved by ${Math.abs(percentChange)}% compared to baseline.`;
        } else if (difference < 0) {
            comparison = `Sleep quality decreased by ${Math.abs(percentChange)}% compared to baseline.`;
        } else {
            comparison = 'Sleep quality remained consistent with baseline.';
        }
        
        return comparison;
    }
}
