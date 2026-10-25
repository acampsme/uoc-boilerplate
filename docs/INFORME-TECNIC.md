# Memòria tècnica del projecte

## 1. Objectiu i resultat

Aquest document recull les decisions i els passos tècnics seguits per
transformar UOC Boilerplate en una pàgina responsive de recomanació de la
pel·lícula *Arrival* (2016), de Denis Villeneuve. La interfície, el contingut i
els missatges estan redactats en català.

El resultat és una pàgina única amb introducció, sinopsi sense espòilers,
fitxa de la pel·lícula, arguments de recomanació i crida final a l’acció.
Inclou navegació mòbil, canvi entre tema nit i tema dia i un control per
afegir o treure la pel·lícula d’una llista temporal.

## 2. Punt de partida i estructura

S’ha mantingut l’estructura funcional del boilerplate, basada en Parcel i
organitzada dins de `src/`:

```text
src/
├── index.html
├── assets/
│   ├── images/
│   ├── scripts/
│   │   └── main.js
│   └── styles/
│       ├── _dependencies.scss
│       ├── _functions.scss
│       ├── _variables.scss
│       ├── main.scss
│       └── layouts/
│           └── _home.scss
└── views/
    └── footer.html
```

`src/index.html` continua sent l’entrada HTML de Parcel. El peu continua sent
un parcial HTML inclòs amb PostHTML; els estils i el JavaScript mantenen els
punts d’entrada i les ubicacions previstes pel projecte. El directori
`dist/` és generat per la compilació i no es modifica manualment.

## 3. Procés d’implementació

El desenvolupament s’ha fet de manera incremental:

1. **Inspecció de la plantilla:** comprovació de les ordres de Parcel, la
   configuració de PostHTML, l’estructura de Sass i el contingut inicial.
2. **Estructura semàntica:** substitució del contingut de demostració per una
   pàgina amb `header`, `nav`, `main`, seccions identificades i `footer`.
   S’hi afegeixen les etiquetes de llengua, descripció i viewport.
3. **Estils i sistema visual:** definició de la paleta, tipografia, retícula,
   il·lustració CSS del cartell, components i regles responsive.
4. **Interaccions:** programació del menú mòbil, la llista temporal i el
   selector de tema amb JavaScript del navegador, sense afegir un framework.
5. **Eines de qualitat:** incorporació de Font Awesome, Stylelint i les seves
   regles personalitzades; integració de la validació a `npm test`.
6. **Documentació i verificació:** descripció de les ordres del projecte,
   execució del linter i la compilació, i proves de renderització amb diferents
   amplades de viewport.

## 4. HTML i experiència d’usuari

El document utilitza HTML semàntic i navegació per àncores a les seccions
principals. Els encapçalaments segueixen una jerarquia coherent i les dades de
la fitxa es presenten amb una llista de definicions (`dl`, `dt`, `dd`).

El cartell combina una composició CSS original —gradients, cercles i òrbites—
amb el logotip original de *Arrival*, guardat localment a
`src/assets/images/arrival-logo.png`. El fitxer s’ha obtingut de
[Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Arrival_2016_Film.png),
que l’atribueix a Paramount Pictures i el marca com a domini públic. La pàgina
del fitxer també n’indica la possible protecció com a marca registrada; s’hi
afegeix un crèdit visible sota el cartell i cal respectar les restriccions de
marca que siguin aplicables. El recurs local evita una petició d’imatge externa
en temps d’execució. Els enllaços de tràiler apunten a una cerca pública de
tràilers a YouTube; no es carrega ni reprodueix automàticament vídeo.

## 5. Responsive i direcció visual

Els estils s’han escrit amb enfocament **mobile-first**. El disseny base
comença a 160 px i es reorganitza mitjançant punts d’interrupció a 700 px i
1000 px:

- En amplades petites, el contingut es disposa en una columna, la fitxa en
  dues columnes i la navegació es controla amb un botó de menú.
- A partir de 700 px, la presentació principal passa a dues columnes, la
  navegació es desplega en línia i la fitxa pot mostrar quatre columnes.
- A partir de 1000 px, s’amplien l’espai i les dimensions del cartell i dels
  titulars.
- Per sota de 220 px, es compacten la marca i els controls de la capçalera.

La paleta combina blau nit, cian elèctric i blau glaç per evocar l’atmosfera
de ciència-ficció i donar més contrast visual a la recomanació. La il·lustració
del cartell s’ha fet amb CSS i incorpora el logotip original de la pel·lícula;
els estats del menú, els botons i els enllaços tenen estils propis.

## 6. Organització de Sass i BEM

S’ha triat SCSS per aprofitar els mòduls, variables, funcions i nesting, i
s’ha aplicat BEM als components de la pàgina:

- `hero` és un bloc; `hero__title` n’és un element.
- `button` és un bloc reutilitzable; `button--primary` i `button--quiet` en
  són modificadors.
- Els selectors interactius es limiten a estats com `[aria-expanded="true"]`
  i `[aria-pressed="true"]`.

Les característiques Sass s’integren en l’arquitectura:

- `_variables.scss` centralitza tipografies, mides, amplades i punts
  d’interrupció. Els colors remeten a propietats personalitzades CSS perquè
  puguin canviar en temps d’execució amb el tema.
- `_functions.scss` defineix `rem($pixels)`, basada en `sass:math`; s’utilitza
  per expressar la mida base de lletra en `rem`.
- `_dependencies.scss` importa els parcials SCSS necessaris de Font Awesome i
  ajusta `$font-path` perquè Parcel trobi els fitxers de tipografia dins de
  `node_modules`.
- `layouts/_home.scss` conté l’estil de la pàgina, amb anidació controlada per
  als modificadors BEM i els estats relacionats.
- `main.scss` importa els mòduls mitjançant `@use` i funciona com a punt únic
  d’entrada dels estils.

## 7. Dependència externa i procés de compilació

S’ha afegit **Font Awesome Free** com a dependència npm perquè les icones de
pel·lícula, lluna, sol, estrella, fletxes i marcador siguin consistents amb la
resta de la interfície. La instal·lació s’ha fet amb:

```sh
npm install @fortawesome/fontawesome-free
```

El paquet es desa com a dependència d’execució a `package.json`, i
`package-lock.json` fixa la resolució de la instal·lació. El parcial
`src/assets/styles/_dependencies.scss` importa els estils base de Font Awesome
i les variants regular i sòlida necessàries; també configura `$font-path` per
trobar les tipografies a `node_modules`. `src/assets/styles/main.scss` carrega
el parcial amb `@use`, i Parcel empaqueta els estils i les tipografies en
compilar. Les icones s’utilitzen amb classes com `fa-solid` i `fa-regular` als
fitxers HTML. No s’utilitza un CDN.

El flux de treball és el del boilerplate:

```sh
npm install
npm run dev
npm run stylelint
npm test
npm run build
```

`npm run dev` neteja els artefactes anteriors i inicia Parcel al port 8123.
`npm run build` neteja i compila per a producció; Parcel minimitza HTML, CSS i
JavaScript i desa els recursos resultants a `dist/`. Aquesta carpeta és la que
s’ha de publicar.

## 8. Interaccions JavaScript

El fitxer `src/assets/scripts/main.js` gestiona tres interaccions:

### Menú de navegació

El botó de menú actualitza `aria-expanded` i l’etiqueta accessible, i aplica
una classe a la capçalera per obrir o tancar el menú mòbil. El menú també es
tanca en seleccionar un enllaç o prémer Escape; quan Escape el tanca, el focus
torna al botó.

### Preferència dia/nit

El tema es representa amb `data-theme="day"` a l’element arrel. Les propietats
personalitzades del document defineixen els colors de cada tema i alimenten
els components de la pàgina, de manera que una única actualització de l’atribut
canvia la paleta completa.

El botó actualitza la icona, l’etiqueta visible, `aria-label`, `aria-pressed` i
el color de la barra del navegador (`meta theme-color`). La preferència
`day` o `night` s’emmagatzema a `localStorage` i es restaura en tornar a obrir
la pàgina. Si l’emmagatzematge del navegador no està disponible, es manté el
tema de nit i es registra l’error a la consola.

### Llista temporal

El control de la fitxa commuta `aria-pressed`, el text del botó i el missatge
anunciat amb `aria-live="polite"`. La llista només existeix durant la sessió
actual de la pàgina; no s’ha implementat persistència perquè el projecte no
requereix comptes d’usuari ni backend.

## 9. Accessibilitat

S’han incorporat les pràctiques següents:

- Regió d’enllaç per saltar directament al contingut i estructures HTML
  semàntiques.
- Etiquetes accessibles als controls i estat comunicat amb `aria-expanded`,
  `aria-pressed` i `aria-live`.
- Tancament del menú amb Escape i retorn del focus al control.
- Estil de focus visible per a navegació amb teclat.
- Decoració i icones marcades com a elements ocults a tecnologia de suport
  quan no aporten informació addicional.
- Etiqueta textual per a la il·lustració abstracta del cartell.
- Suport de `prefers-reduced-motion` per reduir les transicions.
- `color-scheme` sincronitzat amb el tema, perquè els controls natius del
  navegador s’adaptin al mode clar o fosc.

## 10. Metodologia i Stylelint

La convenció combina BEM per als noms de components amb les normes de
`stylelint-config-standard-scss`. Aquesta combinació manté selectors
previsibles i una base de normes coneguda, i alhora s’ajusta al SCSS i a la
nomenclatura del projecte.

La configuració de `.stylelintrc.json`:

- estén `stylelint-config-standard-scss`;
- instal·la el plugin `stylelint-order` i exigeix ordre alfabètic de
  propietats;
- valida el patró de classes BEM;
- limita la profunditat d’anidació a dos nivells;
- prohibeix selectors amb ID;
- prefereix la forma curta dels colors hexadecimals quan és possible.

La comanda `npm run stylelint` executa la validació sobre tots els SCSS de
`src/assets/styles/`. La comanda `npm test` delega en aquesta mateixa
validació; per tant, no és una suite de proves unitàries de JavaScript.

## 11. Verificació efectuada

Durant el desenvolupament s’han executat:

- `npm run stylelint` — finalitzat sense errors.
- `npm test` — finalitzat sense errors; executa Stylelint.
- `npm run build` — compilació de Parcel finalitzada i artefactes generats a
  `dist/`.
- `git diff --check` — sense errors d’espais en blanc.
- `npm audit --omit=dev` — zero vulnerabilitats reportades a dependències de
  producció.

També s’ha revisat el lloc compilat al navegador a 160, 176, 200, 220, 320,
375, 700, 1000 i 1440 px. En aquestes amplades s’ha comprovat que el control
del tema queda dins la capçalera i que no hi ha desbordament horitzontal. S’han
provat el canvi de tema, els colors resultants, l’estat accessible i la
restauració de la preferència després de recarregar la pàgina, així com
l’obertura i el tancament del menú.

## 12. Publicació i limitacions

El repositori conserva l’origen GitHub configurat per a
`acampsme/uoc-boilerplate`. La configuració recomanada per a Netlify és:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Base directory:** buit
