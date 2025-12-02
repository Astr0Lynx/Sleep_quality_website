# Website Updates - December 2, 2025

## Changes Made

### 1. ✅ Added Subject 4 Support
- Created `subject4.html` with full visualization support
- Updated code to loop through all 4 users (was only 1-3 before)
- All visualizations ready: user4/baseline_vs_sessions.png, hrv_trend.png, etc.

### 2. ✅ Updated Navigation Everywhere
All pages now have consistent navigation including:
- Home
- Subject 1, 2, 3, 4
- Overall Analysis
- **Mid Evaluation** (now accessible from all pages)
- **Final Evaluation** (now accessible from all pages)

### 3. ✅ Cleaned Evaluation Pages
Both `mid-evaluation.html` and `final-evaluation.html` are now simple, clean pages ready for PDF uploads:
- Removed all dummy content
- Added placeholder instructions
- Ready to embed PDFs

## How to Upload PDFs

### Option 1: Direct Embed (Recommended)
1. Upload your PDF files to the website folder:
   - `mid-evaluation.pdf`
   - `final-evaluation.pdf`

2. In each HTML file, uncomment this line:
   ```html
   <!-- <embed src="mid-evaluation.pdf" type="application/pdf" class="pdf-embed"> -->
   ```
   Remove the `<!--` and `-->` to make it:
   ```html
   <embed src="mid-evaluation.pdf" type="application/pdf" class="pdf-embed">
   ```

### Option 2: Google Drive Embed
1. Upload PDF to Google Drive
2. Get shareable link
3. Use Google Drive viewer:
   ```html
   <embed src="https://drive.google.com/file/d/YOUR_FILE_ID/preview" class="pdf-embed">
   ```

## Data Requirements

Make sure your ThingSpeak channel has data for all 4 users:
- **Field 7 (UserID)**: Should have values 1, 2, 3, and 4
- **Field 8 (SessionID)**: Should have values 0 (baseline), 1, 2, 3 (naps)

If Subject 2, 3, or 4 show dashes instead of values, check that you have uploaded data for those users to ThingSpeak.

## Next Steps

1. **Wait 2-5 minutes** for GitHub Pages to rebuild
2. **Hard refresh** (Ctrl+Shift+R) to see changes
3. **Upload your PDFs** when ready
4. **Verify all 4 subjects** display data correctly

## Files Modified
- subject1.html, subject2.html, subject3.html (navigation updated)
- subject4.html (NEW)
- index.html (navigation updated)
- analysis.html (navigation updated)
- mid-evaluation.html (completely redesigned)
- final-evaluation.html (completely redesigned)
- thingspeak.js (support for 4 users)
