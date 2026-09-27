@echo off
title Server Locale Matemagica per Tablet Wi-Fi
echo ===================================================================
echo     MATEMAGICA: Server Locale per Tablet / iPad / Smartphone
echo ===================================================================
echo.
echo Indirizzo IP del tuo PC nella rete locale:
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    echo   -> http:%%a:8080
)
echo.
echo Apri Safari o Chrome sul tuo Tablet e digita uno degli indirizzi sopra!
echo Premi CTRL+C in questa finestra per arrestare il server.
echo.
python -m http.server 8080 --bind 0.0.0.0
pause
