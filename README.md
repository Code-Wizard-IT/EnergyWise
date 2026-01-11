# EnergyWise PWA

**Applicazione Progressive Web App per il monitoraggio e l'ottimizzazione dei consumi energetici domestici.**

## 🚀 Caratteristiche

- 📱 **Installabile** come app nativa su smartphone e desktop
- 💡 **Monitoraggio consumi** in tempo reale
- 📊 **Analisi dettagliate** con grafici interattivi
- 💰 **Calcolo costi** basato sulla tua tariffa
- 🔔 **Notifiche** per picchi di consumo
- 📷 **Scansione bollette** (OCR)
- 🌙 **Funziona offline** grazie al Service Worker

## 📲 Installazione come PWA

### Su iPhone/iPad:
1. Apri l'app in Safari
2. Tocca il pulsante "Condividi" (icona quadrata con freccia)
3. Scorri e tocca "Aggiungi alla schermata Home"
4. Tocca "Aggiungi"

### Su Android:
1. Apri l'app in Chrome
2. Tocca il menu (tre puntini in alto a destra)
3. Tocca "Installa app" o "Aggiungi a schermata Home"

### Su Desktop (Chrome/Edge):
1. Apri l'app nel browser
2. Clicca l'icona di installazione nella barra degli indirizzi
3. Clicca "Installa"

## 🛠️ Sviluppo Locale

```bash
# Installa dipendenze
npm install

# Avvia server di sviluppo
npm run dev

# Build per produzione
npm run build

# Anteprima build
npm run preview
```

## 📁 Struttura Progetto

```
├── public/
│   ├── manifest.json      # Configurazione PWA
│   ├── sw.js              # Service Worker
│   └── icons/             # Icone app
├── screens/               # Schermate dell'app
├── components/            # Componenti riutilizzabili
├── App.tsx                # Componente principale
├── types.ts               # TypeScript types
└── vite.config.ts         # Configurazione Vite
```

## 🎨 Generare Icone

1. Apri `public/icons/generate.html` nel browser
2. Clicca "Genera e Scarica Icone"
3. Le icone PNG verranno scaricate automaticamente
4. Spostale nella cartella `public/icons/`

## 🚀 Deploy su Vercel

1. Collega il repository a Vercel
2. Vercel rileverà automaticamente la configurazione Vite
3. Deploy automatico ad ogni push

## 📱 Modalità di Visualizzazione

- **Browser**: Mostra il frame del telefono (demo/sviluppo)
- **PWA Standalone**: Schermo intero senza frame (installata)

## ⚡ Stack Tecnologico

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build**: Vite
- **Hosting**: Vercel (gratuito)

## 📄 Licenza

MIT License - Code Wizard IT
