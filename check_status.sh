#!/bin/bash
# Quick check and restart script for Sleep Quality Website

echo "🔍 Checking Sleep Quality Website Status..."
echo ""

# Check if Python API is running
if curl -s http://localhost:5000/api/status > /dev/null 2>&1; then
    echo "✅ Python API Server: Running on port 5000"
else
    echo "❌ Python API Server: NOT running"
    echo "   Starting Python API..."
    cd "/home/khushi/collegee/sem3/Embedded Systems Workshop/Sleep_quality_website"
    source venv/bin/activate
    nohup python3 api_server.py > api_server.log 2>&1 &
    sleep 3
    if curl -s http://localhost:5000/api/status > /dev/null 2>&1; then
        echo "   ✅ Python API started successfully"
    else
        echo "   ❌ Failed to start Python API. Check api_server.log"
    fi
fi

# Check if HTTP server is running
if curl -s http://localhost:8000 > /dev/null 2>&1; then
    echo "✅ HTTP Server: Running on port 8000"
else
    echo "❌ HTTP Server: NOT running"
    echo "   Please start it manually with: python3 -m http.server 8000"
fi

echo ""
echo "🌐 Access the website at: http://localhost:8000"
echo "📡 API endpoint at: http://localhost:5000/api/status"
echo ""

# Test API data
echo "📊 Testing API data availability..."
DATA=$(curl -s http://localhost:5000/api/status 2>/dev/null)
if [ -n "$DATA" ]; then
    ENTRIES=$(echo "$DATA" | python3 -c "import sys, json; print(json.load(sys.stdin).get('total_entries', 0))" 2>/dev/null)
    echo "   Total data entries: $ENTRIES"
else
    echo "   ⚠️  Unable to fetch API data"
fi

echo ""
echo "✨ Done!"
