#!/bin/bash
# Sleep Quality Website Startup Script

echo "🌙 Sleep Quality Website - Startup Script"
echo "=========================================="
echo ""

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✅ Python 3 found: $(python3 --version)"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source venv/bin/activate

# Install/update dependencies
echo "📥 Installing Python dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 Starting services..."
echo ""

# Start Python API server in background
echo "🐍 Starting Python API server on port 5000..."
python3 api_server.py &
API_PID=$!

# Wait a moment for API to start
sleep 2

# Start HTTP server for frontend
echo "🌐 Starting HTTP server on port 8000..."
python3 -m http.server 8000 &
HTTP_PID=$!

echo ""
echo "=========================================="
echo "✅ Both servers are running!"
echo ""
echo "📡 Python API:   http://localhost:5000"
echo "🌐 Website:      http://localhost:8000"
echo ""
echo "API Endpoints:"
echo "  • /api/status         - Check API status"
echo "  • /api/subjects       - Get all subjects"
echo "  • /api/subject/<id>   - Get specific subject"
echo "  • /api/latest         - Latest readings"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "=========================================="
echo ""

# Wait for Ctrl+C
trap "echo ''; echo '🛑 Shutting down servers...'; kill $API_PID $HTTP_PID; exit 0" INT

# Keep script running
wait
