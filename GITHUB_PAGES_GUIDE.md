# Hosting Sleep Quality Website on GitHub Pages 🚀

## 📋 Prerequisites

- [x] Your code is already in a GitHub repository (`Astr0Lynx/Sleep_quality_website`)
- [x] You're on the `main` branch
- [ ] Need to configure GitHub Pages

---

## ⚠️ IMPORTANT: Limitations with GitHub Pages

### What WON'T Work on GitHub Pages:

1. **Python Flask API Server** ❌
   - GitHub Pages only serves static files (HTML, CSS, JS, images)
   - Your `api_server.py` cannot run on GitHub Pages
   - You'll need to rely on **direct ThingSpeak access** only

2. **localhost URLs** ❌
   - Any references to `http://localhost:5000` or `http://localhost:8000` won't work
   - These are local development URLs

### What WILL Work:

1. **Static HTML/CSS/JS** ✅
2. **Visualization Images** ✅ (already in `/visualizations/`)
3. **Direct ThingSpeak API calls** ✅ (from JavaScript)

---

## 🔧 Step 1: Modify Code for GitHub Pages

### Update `subject.js` to use ThingSpeak only:

You need to remove the Python API fallback since it won't work on GitHub Pages.

**Option A: Quick Fix (Manual)**
1. Open `subject.js`
2. Find the `loadSubjectDataDirect()` function
3. Comment out or remove the Python API section
4. Keep only the ThingSpeak direct access

**Option B: I can create a GitHub Pages version for you**

Would you like me to create a `subject-gh-pages.js` that works without the Python API?

---

## 🚀 Step 2: Enable GitHub Pages

### Via GitHub Website:

1. **Go to your repository:**
   - Navigate to: https://github.com/Astr0Lynx/Sleep_quality_website

2. **Click Settings:**
   - In the repository, click the "Settings" tab

3. **Navigate to Pages:**
   - In the left sidebar, scroll down and click "Pages"

4. **Configure Source:**
   - Under "Build and deployment"
   - Source: Select "Deploy from a branch"
   - Branch: Select `main` (or `master`)
   - Folder: Select `/ (root)` 
   - Click "Save"

5. **Wait for Deployment:**
   - GitHub will build and deploy your site
   - Takes 1-5 minutes
   - You'll see a message: "Your site is live at https://astr0lynx.github.io/Sleep_quality_website/"

---

## 📝 Step 3: Update Configuration

### Update `config.js` (if needed):

Make sure your ThingSpeak configuration is correct:

```javascript
const THINGSPEAK_CONFIG = {
    channelId: '3188672',
    readApiKey: 'W1N28S1IJEC81SI6',
    baseUrl: 'https://api.thingspeak.com',
    updateInterval: 30000, // 30 seconds
    maxResults: 8000
};
```

**Note:** Your API key is public in the code. This is okay for READ-ONLY keys, but don't commit WRITE keys!

---

## 🔄 Step 4: Push Changes to GitHub

```bash
# Navigate to your project
cd "/home/khushi/collegee/sem3/Embedded Systems Workshop/Sleep_quality_website"

# Check what's changed
git status

# Add all changes
git add .

# Commit with a message
git commit -m "Prepare for GitHub Pages deployment"

# Push to GitHub
git push origin main
```

---

## 🌐 Step 5: Access Your Live Site

After deployment completes, your website will be available at:

**https://astr0lynx.github.io/Sleep_quality_website/**

Or if you have a custom domain configured:
**https://yourdomain.com**

---

## 🛠️ Alternative: Host Python API Separately

If you want to keep the Python API functionality, you have options:

### Option 1: Host Python API on a Cloud Platform

**Free Options:**
- **Render.com** (Free tier available)
- **Railway.app** (Free tier with limitations)
- **PythonAnywhere** (Free tier for basic apps)
- **Fly.io** (Free tier available)

**Steps:**
1. Deploy `api_server.py` to one of these platforms
2. Get a public URL (e.g., `https://your-app.render.com`)
3. Update `subject.js` to use this URL instead of `localhost:5000`

### Option 2: Use GitHub Pages + External API

```javascript
// In subject.js, update the API URL
const API_URL = 'https://your-python-api.render.com';

// Then in loadSubjectDataDirect():
const response = await fetch(`${API_URL}/api/subject/${currentSubjectId}`);
```

---

## ⚡ Quick Deploy Commands

Here's the complete workflow:

```bash
# 1. Navigate to project
cd "/home/khushi/collegee/sem3/Embedded Systems Workshop/Sleep_quality_website"

# 2. Stage all files
git add .

# 3. Commit
git commit -m "Deploy to GitHub Pages"

# 4. Push to GitHub
git push origin main

# 5. Wait 2-5 minutes, then visit:
# https://astr0lynx.github.io/Sleep_quality_website/
```

---

## 🔍 Troubleshooting

### Issue: Site not loading after 5 minutes
**Solution:** 
- Check GitHub Actions tab for build errors
- Make sure GitHub Pages is enabled in Settings

### Issue: Images not showing
**Solution:**
- Check image paths are relative (not absolute)
- Example: `visualizations/user1/hrv_trend.png` (good)
- NOT: `/home/khushi/...` (bad)

### Issue: Data not loading
**Solution:**
- Check browser console (F12)
- Verify ThingSpeak API key is correct
- Check CORS settings (ThingSpeak usually allows cross-origin)

### Issue: Python API not working
**Expected:** GitHub Pages can't run Python. Either:
- Use ThingSpeak direct access only, OR
- Host Python API elsewhere (Render, Railway, etc.)

---

## 📊 Current Setup Summary

Your website currently tries to load data in this order:

1. **Try Python API** (`localhost:5000`) → ❌ Won't work on GitHub Pages
2. **Fallback to ThingSpeak** → ✅ Will work on GitHub Pages

Since step 1 will fail, it will automatically use step 2, so your site should still work!

---

## ✅ Recommended Approach for You

**Option 1: Simple (GitHub Pages only)**
1. Keep code as-is (Python API will fail gracefully)
2. Enable GitHub Pages
3. Site will use ThingSpeak direct access
4. Everything works except Python-enhanced analysis

**Option 2: Full Featured (GitHub Pages + Cloud API)**
1. Deploy `api_server.py` to Render.com (free)
2. Update `subject.js` with Render URL
3. Enable GitHub Pages
4. Site uses cloud-hosted Python API
5. Everything works fully!

---

## 🎯 Next Steps

1. **Tell me which option you prefer:**
   - Simple (GitHub Pages only)? 
   - Full featured (need to deploy Python API)?

2. **I can help you:**
   - Create GitHub Pages compatible version
   - Set up Render.com deployment
   - Update configurations

Let me know how you'd like to proceed! 🚀

---

## 📚 Resources

- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **Render.com (Python hosting):** https://render.com/
- **ThingSpeak API Docs:** https://www.mathworks.com/help/thingspeak/

---

**Your GitHub Pages URL (once enabled):**
🔗 **https://astr0lynx.github.io/Sleep_quality_website/**
