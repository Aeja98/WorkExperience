# DT207G Backend-baserad Webbutveckling
## Moment 2: Introduktion till webbtjänster

En webbsida skapad för att användare ska kunna se tidigare arbetserfarenheter med möjlighet att addera och radera erfarenheterna.

## Länk
En liveversion finns tillgänglig här:

## Installation

APIet och webbplatsen byggdes med hjälp av en MySQL-databas tillsammans med följande verktyg:

- Node.js
- Express
- MySQL
- mysql2 (npm paket)
- CORS
- dotenv
- HTML5, CSS3, JavaScript

APIet använder en MySQL-databas som heter `workexp` som innehåller en tabell med namnet `workexperiences` och har följande fält:

| Tabell-namn   | Fält                              |
|---------------|-----------------------------------|
| `id`          | INT (Auto Increment, Primary Key) |
| `companyname` | VARCHAR(100)                      |
| `jobtitle`    | VARCHAR(100)                      |
| `location`    | VARCHAR(100)                      |
| `startdate`   | DATE                              |
| `enddate`     | DATE (nullable)                   |

## Användning

| Metod  | Ändpunkt                | Beskrivning        |
|--------|-------------------------|--------------------|
| GET    | `/api/workexp`          | Hämtar alla tillgängliga arbetserfarenheter        |
| POST   | `/api/workexp`          | Lagrar ny arbetserfarenhet     |
| PUT    | `/api/workexp/:id`      | Uppdaterar ett existerande efrarenhet med angivet ID       |
| DELETE | `/api/workexp/:id`      | Raderar en erfarenhet med anngivet ID      |

Ett objekt returneras som JSON medföljande struktur:

```
{
    "id": "1",
    "companyname": "Förskola",
    "jobtitle": "Pedagog",
    "location": "123 Skolans gata",
    "startdate": "2000-01-01T22:00:00.000Z",
    "enddate": "2025-01-01T22:00:00.000Z",
}
```
