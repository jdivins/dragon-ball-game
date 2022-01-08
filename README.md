# Crear un joc fent servir Vanilla JS
Veure quines eines hi ha avui per construir amb Vanilla JS i Programació Orientada a Objectes un joc.

## Arrencar el projecte
1. Clonar el projecte
2. `npm install`
3. `npm run dev`

## Eines utilitzades
- [Vite](https://vitejs.dev/guide/#getting-started): Diuen que és més ràpid que webpack. Ja integra un LiveReload al modificar fitxers.
Arrencat amb `npm run dev`

## Decisions
- Fer-ho amb Programació Orientada a Objectes


## Idees
1. **Fer una PWA?**
Al fer una PWA es pot tenir accés a funcionalitats del dispositiu i es pot instal·lar com una app
2. **Fer testing?** 
3. **Registrar els moviments de la partida per poder-la simular o guardar**
4. **Incorporar un ChangeLog (control de versions)?**

___

## Com es juga
### Preparació del Joc:
1. Per ordre, cada jugador escull un lluitador i el posa a qualsevol casella del taulell. No el pot situar a:
    - Una casella verda 
    - Al costat d'un dels seus lluitadors.
2. Quan cada jugador ha escollit un màxim de 6 lluitadors comença el joc.
### Desenvolupament del Joc:
1. El jugador que té el torn treu una carta d'**Esdeveniment** (TODO)
2. El jugador que té el torn escull un dels seus lluitadors i el mou a una casella. Si el situa a:
    - Casella Vermella: Recull una carta d'**Atac**
    - Casella Blava: Recull una carta **Especial**
    - Casella Groga: Recull una carta de **Defensa**
    - Casella Verda: Ha de fer un combat amb un lluitador aleatori dels no escollits per cap jugador.
    - Casella on hi ha un lluitador d'un altre jugador: Comença un combat entre els dos lluitadors.
    - No es pot posar a una casella on ja hi hagi un lluitador del jugador que té el torn.
### Com es Combat:
1. Els dos jugadors poden Transformar el seu lluitador, si aquest ho permet.
2. El jugador atacant agafa els daus d'atac que diu la seva targeta. Extra: 
    - En cas que la seva habilitat sigui tenir un dau més d'atac afegeix un dau. 
    - En cas que l'habilitat del lluitador que es defensa sigui un dau menys per l'atacant resta un dau.
3. El jugador ha d'aconseguir fer un combo d'atac del lluitador amb els intents que indiqui la targeta de l'atacant. Si al esgotar les tirades no aconsegueix fer cap combo es suma el resultat que tingui als daus. Extra: 
    - El combo també pot ser tots els daus iguals, en aquest cas es suma la puntuació del tipus de dau i es multiplica per 2.
    - En cas que la seva habilitat sigui un intent més per atacar suma un intent. 
    - En cas que l'habilitat del lluitador que defensa sigui una tirada menys per l'atacant resta un intent.
    - A cada tirada es poden bloquejar els daus que són vàlids per fer un combo.
4. Si el combo d'atac es fa a la 1a tirada de daus, el defensor no podrà aturar l'atac.
5. Si el combo d'atac es fa després de la 1a tirada el defensor es pot protegir de l'atac.
6. El defensor ha d'aconseguir fer un combo de defensa amb els daus i tirades que indica la targeta del seu lluitador. Extra:
    - Si l'habilitat del defensor és un dau extra afegeix un dau a la defensa
    - Si l'habilitat del defensor és una tirada extra de defensa pot tirar una vegada més
    - Si l'habilitat de l'atacant és un dau menys per defensar-se, es resta un dau de defensa.
    - Si l'habilitat de l'atacant és una tirada menys per defensar-se, el defensor té una tirada menys.
7. Si el defensor aconsegueix bloquejar l'atac, no perd punts de vida. Si no ho aconsegueix es resta dels punts de vida l'atac rebut. Extra:
    - Hi ha lluitadors que poden dividir la força de l'atac. En aquest cas es dividiria l'atac pel nombre que pugui el lluitador arrodonit a l'alça.
8. Si atacant ha tret tota la vida al defensor, aquest ocupa la posició del taulell on es feia el combat. En cas que no l'atacant es retira a una de les caselles que té al voltant de la casella on hi ha hagut l'atac.
9. Fi de torn.

### Com es Transforma un lluitador:
1. Es tiren els daus de transformació.
2. El lluitador podrà escollir la transformació que tingui com a mínim el valor de transformació que hagin tret els daus.

___
# Preguntes durant projecte
- Com es pot desar un object lògic a un objecte del DOM per poder-lo trobar al fer-li click?
- En un esdeveniment de click com es pot detectar el target para sense necessitar fer un parent fins a tenir el target que es vol?


