@echo off
title Pubblica Matemagica Online su Vercel (Gratis e Immediato)
color 0b
echo ================================================================
echo   MATEMAGICA: Pubblicazione Online con Vercel (1-Click)
echo ================================================================
echo.
echo Questo comando pubblichera' il tuo gioco su un server globale
echo gratuito ad alta velocita' con indirizzo HTTPS (es. matemagica.vercel.app).
echo.
echo [1/2] Verifica di Node.js e npx...
where npx >nul 2>nul
if %errorlevel% neq 0 (
    echo ERRORE: Node.js/npx non trovato nel sistema.
    echo Scarica e installa Node.js da https://nodejs.org
    pause
    exit /b
)

echo [2/2] Avvio deployment Vercel in corso...
echo.
echo Segui le brevi istruzioni a schermo (premi Invio per confermare le opzioni predefinite):
echo.
npx -y vercel --prod
echo.
echo ================================================================
echo Fatto! Copia il link che ti ha fornito Vercel e invialo
echo sul tuo tablet, smartphone o condividilo con amici e parenti!
echo ================================================================
pause
