# Backend pro školení AngularJS 
_Profinit, červen 2017_

Tento projekt vznikl pro potřeby školení v AngularJS. Obsahuje jednoduchý backend přijímající REST požadavky.

Pro spuštění je potřeba nainstalovaný NodeJS. V root adresáři stačí spustit

`npm start`

Server defaultně poslouchá na portu **3000**.

Zná v tuto chvíli tři resourcy 

- GET / (HTML preview) - pro ověření, že server běží
- GET /users - dummy response
- PUT /users/new - validace příchozího BODY dle JsonSchema (viz. routes/users.js)