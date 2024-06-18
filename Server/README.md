# Kalakrit AI API
### Official API for Kalakrit AI. Contains translation and Prompt engine

The API translates the input text using `translate(inputText)` and calculate token usage using `token(inputText)`.
Prompt customization is done with crafting the prompts based on the below parameters - 
+ Domain
+ Tone
+ Type
+ Region

## How to setup
Add .env file and set `PORT` and `OPEN_AI_KEY` constants
```
npm install
npm start
```

## Endpoints
The API serves two endpoints
+ /api/v1/translate (POST)
+ /api/v1/token (POST)

## Request
The request is structured as followed: 
```
{
    "tone": "", //tone
    "type": "", //type
    "domain": "", //domain
    "targetMarket": "", //targetMarket  
    "data": "", //text ti be translated
    "outputLanguage": "" //Output Language
}
```