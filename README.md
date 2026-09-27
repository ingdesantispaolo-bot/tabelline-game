# ✨ Matemagica - L'Avventura delle Tabelline & Calcoli Matematici

Un'applicazione web didattica e interattiva progettata specificamente per l'uso su **tablet** (touch screen) e desktop, finalizzata all'apprendimento intuitivo, stimolante e progressivo delle tabelline e del calcolo a mente.

---

## 🎯 Caratteristiche Principali

1. **Interfaccia Giocosa & Ottimizzata per Tablet**:
   - Tastierino numerico virtuale su schermo con pulsanti grandi (touch-target > 70px) ed ergonomici, per evitare che la tastiera di sistema del tablet copra la schermata.
   - Nessun ritardo al tocco (`touch-action: manipulation`) e blocco delle selezioni accidentali di testo.
   - Design vivace con palette cromatica ad alto contrasto, animazioni fluide e particelle/coriandoli fisici.

2. **Scala di Livelli (Modalità Avventura - 9 Livelli)**:
   - **Livello 1 (I Primi Passi)**: Tabelline del 1, 2 e 10 (approccio graduale).
   - **Livello 2 (Il Bosco dei Salti)**: Tabelline del 3, 4 e 5.
   - **Livello 3 (La Scalata Rocciosa)**: Tabelline del 6 e 7 (le più impegnative da memorizzare).
   - **Livello 4 (La Fortezza dei Campioni)**: Tabelline dell'8 e 9.
   - **Livello 5 (Il Regno del Dodici)**: Tabelline dell'11 e 12 + ripasso globale.
   - **Livello 6 (Fiume delle Somme)**: Addizioni veloci a mente fino a 100.
   - **Livello 7 (Labirinto delle Differenze)**: Sottrazioni mentali con prestiti.
   - **Livello 8 (Isola della Divisione)**: Divisioni esatte come operazione inversa della tabellina.
   - **Livello 9 (Gran Boss Matematico)**: Sfida mista con le 4 operazioni (+, -, ×, ÷).

3. **Valore Pedagogico: "Aiuto Visivo a Pallini"**:
   - In ogni momento il giocatore può premere **💡 Mostra Aiuto a Pallini**.
   - Genera dinamicamente una matrice geometrica (es. per $7 \times 8$, una griglia di 7 righe per 8 colonne di palline colorate).
   - Permette al bambino/studente di visualizzare fisicamente il significato della moltiplicazione invece di ridurla a mera memoria meccanica.

4. **Gamification & Meccaniche di Sfida**:
   - **Valutazione a 3 Stelle**: 1 stella per completamento, 2 stelle con precisione $\ge 80\%$, 3 stelle per il 100% di precisione.
   - **Moltiplicatore Combo**: risposte consecutive corrette entro pochi secondi attivano il moltiplicatore combo (x2, x3, x4, x5) con effetti sonori dedicati.
   - **Bacheca dei Trofei sbloccabili**: "Lampo di Genio", "Cecchino 100%", "Combo Master", "Mago delle Tabelline", ecc.
   - **Revisione Errori**: al termine del livello, vengono riepilogati chiaramente tutti i calcoli sbagliati con la risposta corretta.

5. **Modalità Palestra Libera**:
   - Permette di selezionare liberamente una o più tabelline specifiche da allenare (da 1 a 12).
   - Modalità senza timer e con vite illimitate per concentrarsi sullo studio rilassato.

6. **Audio Sintetizzato Nativo (Web Audio API)**:
   - Effetti sonori armonici generati in tempo reale dall'oscillatore del browser (nessun file MP3/WAV esterno, 100% affidabile e offline).
   - Tasto Mute/Audio sempre accessibile.

7. **Salvataggio Locale**:
   - Tutti i progressi, le stelle e i trofei vengono salvati automaticamente nel `localStorage` del browser.
   - Include un pulsante "Azzera Dati" se un altro giocatore vuole ricominciare da zero.

---

## 🚀 Come Giocare

### Opzione A: Sul PC o Tablet Windows (Apertura Immediata)
- Fai doppio click sul file [`apri_gioco_locale.bat`](file:///C:/Users/icopa/.gemini/antigravity/scratch/tabelline-game/apri_gioco_locale.bat) oppure apri [`index.html`](file:///C:/Users/icopa/.gemini/antigravity/scratch/tabelline-game/index.html) con Chrome, Edge o Safari.

### Opzione B: Su Tablet / iPad via Wi-Fi domestico
1. Fai doppio click su [`condividi_su_tablet_wifi.bat`](file:///C:/Users/icopa/.gemini/antigravity/scratch/tabelline-game/condividi_su_tablet_wifi.bat).
2. La finestra mostrerà l'indirizzo del tuo PC (es. `http://192.168.1.X:8080`).
3. Apri il browser (Safari o Chrome) sul tuo tablet e digita quell'indirizzo per giocare a tutto schermo comodamente dal divano o dalla scrivania!
