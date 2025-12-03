#!/bin/bash
# Start both the Python API server and the web server

echo "🚀 Starting Sleep Quality Website..."
echo ""

# Check if Python API is running
if pgrep -f "api_server.py" > /dev/null; then
    echo "✅ Python API server already running"
else
    echo "🔧 Starting Python API server on port 5000..."
    python3 api_server.py &
    sleep 2
fi

# Check if web server is running
if pgrep -f "python3 -m http.server 8000" > /dev/null; then
    echo "✅ Web server already running on port 8000"
else
    echo "🔧 Starting web server on port 8000..."
    python3 -m http.server 8000 &
    sleep 1
fi

echo ""
echo "✅ All servers started!"
echo ""
echo "📱 Open your browser to:"
echo "   http://localhost:8000/index.html"
echo ""
echo "📊 Subject pages:"
echo "   http://localhost:8000/subject1.html"
echo "   http://localhost:8000/subject2.html"
echo "   http://localhost:8000/subject3.html"
echo "   http://localhost:8000/subject4.html"
echo ""
echo "📝 Summaries:"
echo "   http://localhost:8000/summaries.html"
echo ""
echo "⚠️  To stop servers, run: ./STOP_SERVER.sh"
