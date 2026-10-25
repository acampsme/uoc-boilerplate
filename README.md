# Cinema de butxaca — Arrival

Una pàgina responsive en català per recomanar *Arrival* (2016), de Denis
Villeneuve. El projecte parteix de l’estructura del UOC Boilerplate i fa servir
Parcel, Sass, Font Awesome i Stylelint.

La [memòria tècnica](./docs/INFORME-TECNIC.md) descriu l’arquitectura, les
decisions de desenvolupament, les interaccions i les verificacions efectuades.

## Requisits previs

- Node.js 20.19 o superior.
- npm (inclòs amb Node.js).

## Posada en marxa

Cal comentar que previament he fet un fork de:
https://github.com/uoc-advanced-html-css/uoc-boilerplate.git
a https://github.com/acampsme/uoc-boilerplate.git


Clona el repositori i instal·la les dependències:

```sh
git clone https://github.com/acampsme/uoc-boilerplate.git
cd uoc-boilerplate
npm install
```

Inicia el servidor local de desenvolupament:

```sh
npm run dev
```

Parcel serveix la pàgina a `http://localhost:8123` i recompila els fitxers en
desar els canvis. Per aturar-lo, prem `Ctrl+C`.

## Validació i compilació

Stylelint valida tots els fitxers SCSS del projecte:

```sh
npm run stylelint
```

El mateix control s’executa amb `npm test`. Per generar els fitxers optimitzats
per a producció a `dist/`:

```sh
npm run build
```

El procés de desplegament ha d’utilitzar `npm run build` com a ordre de
compilació i `dist` com a directori publicable.

## Estructura

```text
src/
├── index.html
├── assets/
│   ├── scripts/main.js
│   └── styles/
│       ├── _dependencies.scss
│       ├── _functions.scss
│       ├── _variables.scss
│       ├── main.scss
│       └── layouts/_home.scss
└── views/footer.html
```

Es conserva el punt d’entrada HTML de Parcel, la inclusió del peu mitjançant
PostHTML, el punt d’entrada JavaScript, l’organització d’estils i les ordres de
desenvolupament i compilació pròpies de UOC Boilerplate.

## Decisions de disseny i desenvolupament

- **Enfocament mobile-first:** els estils base funcionen des de 160 px, amb
  ajustos compactes per a rellotges; els canvis de disposició s’introdueixen a
  700 px i 1000 px. La retícula passa d’una columna a dues, les dades de la
  pel·lícula s’adapten a l’espai i la navegació mòbil es converteix en un menú
  compacte.
- **Direcció visual:** una paleta de blau nit, cian elèctric i blau glaç
  acompanya la temàtica de la pel·lícula. El cartell combina una il·lustració
  CSS original amb el logotip de *Arrival* de Paramount Pictures, obtingut de
  [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Arrival_2016_Film.png),
  on està marcat com a domini públic; el fitxer inclou també un avís de marca
  registrada.
- **Contingut:** la presentació explica la premissa sense espòilers, afegeix
  una fitxa i argumenta tres motius personals per veure-la. Les dades són
  informatives; la valoració no s’atribueix a una plataforma concreta.
- **Accessibilitat:** s’utilitzen regions semàntiques, enllaç per saltar al
  contingut, etiquetes associades, focus visible, contrast, text alternatiu
  per a la il·lustració i avisos accessibles a les interaccions. La preferència
  de moviment reduït desactiva les transicions.
- **Interacció:** el menú mòbil informa l’estat amb `aria-expanded`, es tanca
  amb Escape o en seguir un enllaç, i el control de desar actualitza
  `aria-pressed` i anuncia el resultat. La llista és temporal i no es guarda
  entre sessions. El botó de tema alterna entre dia i nit, actualitza la
  paleta de tota la interfície, anuncia l’estat amb `aria-pressed` i recorda
  l’elecció a `localStorage`.
- **Dependència externa:** Font Awesome Free s’instal·la com a dependència npm
  i s’importen només les icones regulars i sòlides emprades. Parcel les
  incorpora a la compilació, sense dependre d’un CDN.

## Metodologia, Sass i convencions

S’aplica **BEM** per mantenir els noms de classe explícits i escalables en una
interfície d’una sola pàgina: blocs com `hero`, elements com `hero__title` i
modificadors com `button--primary`. Els estils globals es limiten al reset i
als elements base; cada secció manté els seus estils al parcial de la pàgina.

La convenció és **SCSS idiomàtic amb la guia de Stylelint Standard SCSS**:
indentació de dos espais (coherent amb `.editorconfig`), classes BEM en
minúscules, components petits, propietats ordenades alfabèticament i anidació
moderada. El disseny s’ha desenvolupat de l’estructura semàntica als estils,
i després s’ha validat amb les ordres de Stylelint i Parcel.

Les característiques Sass s’utilitzen conjuntament:

- `_variables.scss` defineix paleta, tipografia, amplada i punts d’interrupció.
- `_functions.scss` crea `rem()`, que converteix mides en píxels a rem.
- `_dependencies.scss` integra els parcials SCSS de Font Awesome.
- `layouts/_home.scss` agrupa els estils de la pàgina, amb nesting per
  modificadors BEM i estats d’interacció.
- `main.scss` importa els parcials amb `@use`, el sistema de mòduls de Sass,
  i conserva el paper de punt únic d’entrada dels estils.

## Configuració de Stylelint

La configuració de `.stylelintrc.json` estén `stylelint-config-standard-scss`,
que aporta les normes estàndard de CSS i SCSS. Les personalitzacions són:

- `stylelint-order`: exigeix ordre alfabètic de propietats per facilitar la
  lectura i reduir diferències als canvis.
- `selector-class-pattern`: valida blocs, elements i modificadors BEM.
- `max-nesting-depth: 2`: limita l’anidació i evita selectors massa específics.
- `selector-max-id: 0`: evita IDs als selectors d’estil.
- `color-hex-length: short`: manté els colors hexadecimals concisos quan és
  possible.

Executa `npm run stylelint` després de modificar Sass; ha d’acabar sense errors.
La tasca `npm test` reprodueix la mateixa validació.

## Publicació a GitHub i Netlify

Per actualitzar el repositori amb els canvis:

```sh
git status
git add README.md docs/INFORME-TECNIC.md package.json package-lock.json .stylelintrc.json src/
git commit -m "Responsive Arrival"
git push origin master
```
