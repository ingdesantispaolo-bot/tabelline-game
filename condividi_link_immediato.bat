@echo off
title Condividi Matemagica Online - Link Pubblico Istantaneo
color 0a
echo ================================================================
echo   MATEMAGICA: Condivisione Online Istantanea (Tunnel HTTPS)
echo ================================================================
echo.
echo Questo strumento crea un link pubblico HTTPS temporaneo e sicuro
echo per giocare sul tuo smartphone/tablet da qualsiasi connessione 4G/5G.
echo.
echo Assicurati che il server locale sia attivo (porta 8080).
echo Generazione link pubblico in corso...
echo.
npx -y localtunnel --port 8080
pause
