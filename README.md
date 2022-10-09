# Wykres kursu walut

Zadaniem aplikacji jest wyświetlanie danych dotyczących kursu walut korzystając z API.
## Instalacja aplikacji
W katalogu projektu można uruchomić

*npm start*

Uruchamia to aplikację w trybie deweloperskim.
Należy otworzyć http://localhost:3000, aby wyświetlić projekt w przeglądarce.

Strona zostanie ponownie załadowana, gdy wprowadzone zostaną zmiany.
Można również zobaczyć wszelkie błędy lint w konsoli.


## Zastosowane technologie
Aplikacja została stworzona za pomocą biblioteki JavaScript React.js. Style dodane są w języku CSS: Cascading Style Sheets. Testy E2E aplikacja wykonuje z pomocą Cypress.io.
## Struktura aplikacji
Drzewo aplikacji:
W folderze **cypress** znajduje się plik o nazwie **spec.cy.js** z testem E2E aplikacji. 

W folderze** src** znajdują się komponenty aplikacji, ich struktura prezenuje się jak poniżej:

>index
>>App

>>>Search

>>>Chart

>>>Charts

------------



Aplikacja korzysta z dwóch rodzajów zapytań do API NBP. Podczas pierwszego ładowania pobiera dane o walucie EUR renderując jej wykres.
Pobiera również w całości tabelę A kursów walut w celu wygenerowania listy kodów - ma to na celu ułatwienie użytkownikowi wybrania prawidłowego kodu.
Podczas wyszukiwania kolejnych walut - następują kolejne zapytania do API dla konkretnych kodów walut.  Szczegółowe wyjaśnienie działania API znajduje się na stronie: http://api.nbp.pl/.

Rysowanie wykresów odbywa się za pomocą konstruowania adresu url. Więcej na temat wykresów przeczytać można tu: https://documentation.image-charts.com/line-charts/.

------------
 ## Komponenty
 
Aplikacja została zbudowana na komponentach funkcyjnych. Zarządzanie stanem odbywa się poprzez Hooki useState.

------------


### App

Główny komponent, w którym przechowywany jest stan aplikacji, zmienne oraz renderowane są pozostałe komponenty.

------------


#### Zmienne

- **endTime** - oblicza datę wstecz od todayDate - parametr można zmieniać.

Wykres obejmuje 5 dni, ponieważ kursy walut obliczane są tylko w dni robocze. W celu zwiększenia zakresu wykresu należy w poniższym kodzie zamienić liczbę 6 na zgodną z preferencjami.

>>let endTime = new Date(todayDate.getTime() - **6** &#42; 24 &#42;  60 &#42;  60 &#42; 1000);

Format czasu, na którym pracuje aplikacja to międzynarodowy format ISO 8601. 
Jest on wymagany podczas użycia API z kursami walut oraz API rysującego wykresy.

- **urls** - tablica z adresami url do multiwykresu
- **code** - wyświetlany/wybrany aktualnie kod waluty
- **codes** - tablica z wybranymi kodami do multiwykresu
- **dates** - tablica z datami, które tworzą oś X wykresów
- **values** - tablica z wartościami ostatnio wskazanej waluty
- **multipleValues** - tablica z wartościami wszystkich wskazanych walut
- **allCodes** - tablica gromadząca wszystkie kody walut z tabeli
- **singleChartSource** - tworzy zmienną singleChartSource do generowania pojedyńczego wykresu
- **source** - tworzy zmienną source do generowania multiwykresu
- **chartVisibility** - przymuje wartość true dla widocznego wykresu pojedyńczego.

------------

#### Search

Komponent, który zawiera w sobie okno wyszukiwania, przycisk szukania, przycisk zmiany wykresu oraz listę dostępnych kodów.

#### Chart

Komponent, który odpowiada za renderowanie wykresu pojedyńczego kursu. Pobiera dane z API NBP (http://api.nbp.pl/) dla konkretnej waluty oraz zakresu dni. Wykres rysowany jest za pomocą https://image-charts.com/. 

#### Charts

Komponent, który odpowiada za renderowanie wykresu wielu kursów. Pobiera dane z API NBP (http://api.nbp.pl/) dla konkretnej waluty oraz zakresu dni za każdym razem kiedy użytkownik wybierze walutę. Wykres rysowany jest za pomocą https://image-charts.com/.

### Testy E2E

Test wykonany w Cypress sprawdza podstawowe funkcjonalności aplikacji takie jak:
- renderowanie się elementów po załadowaniu
strony
- działanie przycisków oraz paska wyszukiwania
- prawidłowe ładowanie wykresów
