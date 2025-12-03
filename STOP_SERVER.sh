#!/bin/bash
# Stop all running servers

echo "🛑 Stopping all servers..."

# Stop Python API server
pkill -f "api_server.py"
echo "✅ Stopped Python API server"

# Stop web server
pkill -f "python3 -m http.server 8000"
echo "✅ Stopped web server"

echo ""
echo "✅ All servers stopped!"
