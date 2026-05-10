# Work Experience Webbplats

https://workexperience-1.onrender.com/index.html

En fristående webbplats som hämtar, visar, lägger till och raderar arbetserfarenheter via en REST-baserad webbtjänst. Webbplatsen använder Fetch API för att kommunicera med backend.

Backend/API:
https://workexperience-2c2q.onrender.com/api/workexp

## Funktioner

- Visa en lista med arbetserfarenheter från databasen
- Lägga till en ny arbetserfarenhet via formulär
- Radera en arbetserfarenhet
- Validera formulärdata med JavaScript innan POST-anrop
- Visa tydliga felmeddelanden om något saknas i formuläret

## Tekniker

Projektet är byggt med:

- HTML
- CSS
- JavaScript
- Fetch API

## Arbetserfarenhet

Varje arbetserfarenhet innehåller följande information:

- `id` – unikt id för varje post
- `companyname` – företagsnamn
- `jobtitle` – arbetsroll
- `location` – plats
- `startdate` – startdatum
- `enddate` – slutdatum
- `description` – beskrivning av arbetet

## Sidor

Webbplatsen innehåller tre undersidor:

- `index.html` – visar alla arbetserfarenheter i en tabell
- `add.html` – formulär för att lägga till en ny arbetserfarenhet
- `about.html` – beskriver webbplatsens syfte, databaslösning och slutsatser

## Filstruktur
```
WorkExperience/
├── dist/
│   ├── styles/
│   |   ├── Gabriela/
│   |   ├── Raleway/
│   |   └── main.css
│   ├── about.html
│   ├── add.html
│   ├── add.js
│   ├── index.html
│   ├── index.js
├── src/
│   ├── routes/
│   |   └── workexp.js
│   ├── db.js
│   └── index.js
├── .env.example
├── package.json
├── package-lock.json
└── README.md
