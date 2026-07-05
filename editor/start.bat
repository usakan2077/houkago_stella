@echo off
cd /d "%~dp0.."
start "" "http://127.0.0.1:8765/editor/"
where py >nul 2>&1
if %errorlevel% equ 0 (
  py -3 "%~dp0server.py"
) else (
  python "%~dp0server.py"
)
pause
