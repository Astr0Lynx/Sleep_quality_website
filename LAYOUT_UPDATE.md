# Layout Update - Text Above, Graph Below

## ✅ Changes Made (December 2, 2025)

### 🎯 Layout Philosophy
**"Text → Graph"** pattern throughout the entire dashboard:
- Each metric has a descriptive title and explanation
- Graph appears directly below its description
- No empty boxes or containers
- Clean, linear reading flow

### 📋 New Page Structure

#### 1. **Session Metrics Cards** (Top of page)
Four beautiful cards displaying metrics for each session:
- 📋 Baseline Measurement
- 😴 Nap Session 1
- 😴 Nap Session 2  
- 😴 Nap Session 3

Each card shows 8 metrics in a grid:
- ❤️ Heart Rate (BPM)
- 💓 HRV - RMSSD (ms)
- 🩸 Blood Oxygen (%)
- 📉 Min SpO2 (%)
- ⚠️ SpO2 Dips (events)
- 💪 EMG - RMS
- 🏃 Total Motion
- 📊 Data Points (samples)

#### 2. **Overview Analysis Section**
5 key visualizations with descriptions:

**Baseline vs Sessions Comparison**
- Text: "Comparison of key metrics across all sleep sessions"
- Graph: baseline_vs_sessions.png

**Heart Rate Variability (HRV) Trend**
- Text: "HRV changes across sessions - indicator of autonomic nervous system balance"
- Graph: hrv_trend.png

**Raw Biometric Time Series**
- Text: "ECG, SpO2, EMG, and motion data over time"
- Graph: raw_timeseries.png

**Signal Distribution Analysis**
- Text: "Statistical distribution of biometric signals"
- Graph: signal_distributions.png

**Correlation Heatmap**
- Text: "Relationships between different biometric measurements"
- Graph: correlation_heatmap.png

#### 3. **FFT Analysis Section**
Organized by session, each with 3 analyses:

**Baseline (Session 0)**
- ECG Frequency Analysis → fft_ecg graph
- EMG Frequency Analysis → fft_emg graph
- Motion (MPU) Frequency Analysis → fft_mpu graph

**Nap Session 1, 2, 3** (same structure for each)
- ECG Frequency Analysis → fft_ecg graph
- EMG Frequency Analysis → fft_emg graph
- Motion (MPU) Frequency Analysis → fft_mpu graph

### 🎨 Visual Design

#### Card Styling
- White background with subtle shadows
- Hover effect (lifts slightly on mouseover)
- Rounded corners (12px border-radius)
- Responsive grid layout

#### Metric Boxes
- Light gray background (#f9fafb)
- Left border accent in primary color
- Large, bold numbers
- Icon + label for each metric

#### Graph Containers
- Full-width images for maximum detail
- Descriptive text above each graph
- Subtle border and shadow
- Rounded corners

#### Session Groups (FFT)
- Light background with left border accent
- Grouped by session for easy comparison
- Clear section headers

### 🔄 Removed Items
✅ Empty "Session Metrics Overview" box - REMOVED
✅ Form sections - REMOVED (per your request)
✅ Grid layouts where graphs were side-by-side - CHANGED to vertical stack
✅ Unnecessary containers and wrappers - REMOVED

### 📱 Responsive Design
- Desktop: Full-width graphs, multi-column metric grids
- Mobile: Single column layout, stacked metrics
- All images scale to fit screen width

### 🚀 How It Works

When page loads:
1. Shows "Loading..." message
2. Fetches data from Python API
3. Creates 4 session metric cards dynamically
4. Shows all visualization sections
5. All graphs load from local `/visualizations/user{N}/` folder

### 📁 Files Modified
- `subject1.html` - New layout structure
- `subject2.html` - New layout structure  
- `subject3.html` - New layout structure
- `subject.js` - Updated to create metric cards, show sections
- `styles.css` - New styles for metric-viz-pair, session cards, etc.

### ✨ Result
Clean, professional dashboard where:
- Every graph has context (title + description)
- No confusing empty boxes
- Easy to read top-to-bottom flow
- Mobile-friendly responsive design
- Professional presentation for reports/demos

## 🎯 User Experience Flow

1. Land on page → See loading message
2. Data loads → See 4 session metric cards with all key numbers
3. Scroll down → Overview Analysis section with 5 major graphs
4. Scroll more → FFT Analysis organized by session
5. Each item: Read description → View graph → Understand insight

Perfect for presentations, reports, and analysis! 📊✨
