# Opis
Front-endowa część projektu z przedmiotu Programowanie aplikacji webowych.
## Wykorzystane technologie:
* React
* Redux
* ECMAScript 2015
* Webpack
* Babel
* JQuery
* SASS

# Instrukcje
Projekt wykorzystuje paczki NPM (Node Package Manager), więc do instalacji i developmentu wymagany jest zainstalowany Node.js oraz NPM.

## Instalacja
* Sklonuj bądź skopiuj pliki projektu z repozytorium.
* W katalogu głównym uruchom polecenie **npm install**. Pobierze on paczki niezbędne do działania aplikacji, wypisane w pliku **package.json**.

## Konfiguracja
* W pliku **webpack.config.js** w polu **entry** zmień ścieżkę na katalog w którym projekt znajduje się na Twoim dysku. Można też podać ścieżkę relatywną, lecz istnieje błąd w Webpacku pod Windows, który może dublować moduły (nie powinien występować jeżeli wykorzystywany jest Bash on Windows).
* Właściwy plik konfiguracyjny to **appconfig.json**, w nim dokonujemy zmian w miarę potrzeb. Obecnie wykorzystywaną konfigurację wybieramy w polu **inUse**. Natomiast jeżeli w module potrzebujemy zaimportować konfigurację, to importujemy plik **config.js**.

## Uruchamianie
Projekt można uruchomić na kilka sposobów:
* Jeżeli wykorzystywany jest serwer http jak np. Apache, wystarczy cały projekt umieścić w katalogu obsługiwanym przez ów serwer.
* Jeżeli nie posiadamy żadnego serwera http, można zainstalować prosty serwer działający w środowisku Node.js o nazwie **http-server**. Aby go zainstalować wpisujemy w terminalu/wierszu poleceń npm install -g http-server
* Ponieważ projekt korzysta z Webpacka, można też użyć paczki webpack-dev-server. Obserwuje on pliki projektu i w momencie wykrycia zmiany builduje go i udostępnia uruchamiając własny serwer http. Aby go uruchomić wystarczy w terminalu/wierszu poleceń wpisać polecenie **npm run devserv**. 