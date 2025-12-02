# Sleep Quality Monitoring Website

A comprehensive web-based dashboard for analyzing sleep quality data from ThingSpeak IoT platform, integrated with advanced Python analysis.

## 🌟 Features

- **Real-time Data Display**: Live biometric data from ThingSpeak
- **Advanced Analysis**: HRV (Heart Rate Variability), FFT analysis, event detection
- **Multi-Subject Support**: Monitor up to 4 subjects with baseline and 3 sleep sessions each
- **Interactive Visualizations**: Charts, graphs, and real-time updates
- **Python Backend**: Flask API serving processed analysis data

## 📊 Data Structure

### ThingSpeak Channel Configuration
- **Channel ID**: 3188672
- **API Key**: W1N28S1IJEC81SI6

### Data Fields
1. **Field 1**: BPM (Heart Rate)
2. **Field 2**: SpO2 (Blood Oxygen Saturation)
3. **Field 3**: ECG (Electrocardiogram)
4. **Field 4**: Temperature (unused/zero values)
5. **Field 5**: EMG (Electromyography)
6. **Field 6**: MPU (Motion/Movement)
7. **Field 7**: UserID (1-4 for different subjects)
8. **Field 8**: SessionID (0=baseline, 1-3=sleep sessions)

## 🚀 Quick Start

### Option 1: Automated Startup (Recommended)

```bash
./start.sh
```

This will:
1. Create a Python virtual environment
2. Install all dependencies
3. Start the Python API server (port 5000)
4. Start the web server (port 8000)

### Option 2: Manual Setup

#### 1. Install Python Dependencies

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install requirements
pip install -r requirements.txt
```

#### 2. Start the Python API Server

```bash
python3 api_server.py
```

The API will run on http://localhost:5000

#### 3. Start the Web Server

In a new terminal:

```bash
python3 -m http.server 8000
```

The website will be available at http://localhost:8000

## 📡 API Endpoints

### `/api/status`
Check API health and connection status

**Response:**
```json
{
  "status": "ok",
  "channel": "3188672",
  "total_entries": 1234,
  "users": [1, 2, 3, 4],
  "sessions": [0, 1, 2, 3]
}
```

### `/api/subjects`
Get processed data for all subjects

**Response includes:**
- HRV metrics (RMSSD, SDNN)
- SpO2 statistics and dip count
- EMG and motion analysis
- Latest readings
- Raw data points

### `/api/subject/<id>`
Get detailed data for a specific subject (1-4)

### `/api/latest`
Get the most recent readings from all active subjects

### `/api/refresh`
Force a data refresh from ThingSpeak

## 📁 Project Structure

```
Sleep_quality_website/
├── index.html              # Homepage
├── subject1.html           # Subject 1 data page
├── subject2.html           # Subject 2 data page
├── subject3.html           # Subject 3 data page
├── analysis.html           # Overall analysis page
├── config.js               # ThingSpeak configuration
├── thingspeak.js           # ThingSpeak API integration
├── real-time-data.js       # Real-time data management
├── subject.js              # Subject page logic
├── data-visualization.js   # Chart rendering
├── styles.css              # Styling
├── api_server.py           # Python Flask API (NEW!)
├── sleep_analysis_main.py  # Full Python analysis script
├── requirements.txt        # Python dependencies
├── start.sh               # Automated startup script
└── README.md              # This file
```

## 🔬 Analysis Features

The Python backend provides:

### 1. **HRV Analysis**
- RMSSD (Root Mean Square of Successive Differences)
- SDNN (Standard Deviation of NN intervals)

### 2. **Signal Processing**
- Moving average smoothing
- Artifact removal
- FFT (Fourier Transform) analysis

### 3. **Event Detection**
- Movement episodes
- SpO2 dip events
- Low HRV periods

### 4. **Per-Session Metrics**
- Mean BPM, SpO2, EMG
- Total motion
- Data quality indicators

## 🎨 User Interface

### Homepage (`index.html`)
- Project overview
- Live data feed
- Navigation to subject pages
- Connection status

### Subject Pages (`subject1-3.html`)
- Real-time biometric readings
- Baseline vs nap session comparisons
- Response forms for qualitative data
- Analysis and conclusions

### Analysis Page (`analysis.html`)
- Cross-subject comparisons
- Statistical summaries
- Overall conclusions

## 🐛 Debugging

### Debug Data Page

Open `debug_data.html` to:
- View raw ThingSpeak data
- Analyze data by subject/session
- Check latest readings
- Verify data structure

### Common Issues

**"Connection Error" on website:**
- Make sure Python API server is running (`python3 api_server.py`)
- Check if ThingSpeak channel has data
- Verify API key is correct in `config.js`

**"No data for Subject X":**
- Check if your sensors are sending UserID field correctly (field7)
- Verify SessionID is set (field8: 0=baseline, 1-3=sleep)
- Use debug page to see raw data structure

**API server won't start:**
```bash
# Check if port 5000 is already in use
lsof -i :5000

# Kill existing process
kill -9 <PID>
```

## 📊 Data Flow

```
ThingSpeak IoT Platform
         ↓
  [Real-time Sensor Data]
         ↓
   Python API Server
   (api_server.py)
         ↓
  [Analysis & Processing]
   • HRV calculation
   • Feature extraction
   • Event detection
         ↓
    JSON API Endpoints
         ↓
   JavaScript Frontend
   (thingspeak.js)
         ↓
   Web Dashboard Display
```

## 🔧 Configuration

### Change ThingSpeak Channel

Edit `config.js`:

```javascript
const THINGSPEAK_CONFIG = {
    channelId: 'YOUR_CHANNEL_ID',
    readApiKey: 'YOUR_API_KEY',
    numberOfResults: 8000,
    // ...
};
```

Also update in `api_server.py`:

```python
CHANNEL_ID = "YOUR_CHANNEL_ID"
READ_API_KEY = "YOUR_API_KEY"
```

### Adjust Subjects/Sessions

In `api_server.py`:

```python
USERS = [1, 2, 3, 4]  # Modify user IDs
SESSIONS = [0, 1, 2, 3]  # Session types
```

## 📝 Analysis Script

For comprehensive offline analysis, run:

```bash
python3 sleep_analysis_main.py
```

This generates:
- ✅ Raw session CSV files
- ✅ FFT analysis plots
- ✅ Per-user reports
- ✅ Inter-user comparisons
- ✅ Global summary report
- ✅ ZIP archive of all results

## 🔐 Security Notes

- API keys are currently hardcoded for development
- For production, use environment variables
- Enable HTTPS for sensitive health data
- Consider authentication for multi-user deployments

## 📚 Dependencies

### Python (Backend)
- Flask 3.0.0 - Web framework
- Flask-CORS 4.0.0 - Cross-origin support
- Pandas 2.1.4 - Data processing
- NumPy 1.26.2 - Numerical computing
- SciPy 1.11.4 - Scientific computing
- Requests 2.31.0 - HTTP library

### JavaScript (Frontend)
- No external dependencies (vanilla JS)
- Compatible with modern browsers

## 👥 Contributors

Sleep Quality Research Project
Embedded Systems Workshop
Semester 3, 2025

## 📄 License

Academic/Research Project

---

**Need Help?** Check the debug page at `debug_data.html` or review the browser console (F12) for detailed error messages.
