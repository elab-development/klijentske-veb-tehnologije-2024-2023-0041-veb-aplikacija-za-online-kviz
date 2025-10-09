Pokretanje projekta na lokalnoj mašini:

1. **Kloniranje repozitorijuma:**
git clone https://github.com/elab-development/klijentske-veb-tehnologije-2024-2023-0041-veb-aplikacija-za-online-kviz

2. **Pristupanje direktorijumu projekta:**
cd klijentske-veb-tehnologije-2024-2023-0041-veb-aplikacija-za-online-kviz

3. **Instalacija NPM paketa:**
npm install

4. **Pokretanje aplikacije:**
npm start

Opis funkcionalnosti projekta:
- **Registracija korisnika** - Omogućava kreiranje novog korisničkog naloga unosom korisničkog imena, e-mail adrese i lozinke. Sistem proverava ispravnost unetih podataka i sprečava registraciju duplih naloga.

- **Prijavljivanje i odjavljivanje korisnika** - Korisnici se prijavljuju pomoću korisničkog imena i lozinke. Sistem omogućava sigurno odjavljivanje iz naloga i završetak sesije.

- **Pregled i filtriranje kvizova** - Korisnik može pregledati sve dostupne kvizove u aplikaciji. Postoji mogućnost filtriranja kvizova po tematskoj grupi i težini.

- **Pokretanje i rešavanje kviza** - Korisnik može izabrati željeni kviz i započeti rešavanje. Sistem prikazuje pitanja jedno po jedno sa ponuđenim odgovorima. Nakon završetka, korisnik dobija informaciju o broju tačnih  i netacnih odgovora i procentu uspešnosti.

- **Evidencija i čuvanje rezultata** - Sistem automatski beleži rezultate svakog pokušaja kviza. Rezultati se povezuju sa nalogom korisnika i čuvaju u local storage.

- **Statistika korisnika** - Korisnik može pregledati svoju ličnu statistiku: broj pokusaja odredjenog kviza, najbolji rezultat i prosečan uspeh, najbolje vreme i prosecno vreme. Administrator ima uvid u statistiku svih korisnika.

- **Administratorske funkcionalnosti** - Administrator može dodavati nove kvizove i pitanja. Može menjati sadržaj postojećih kvizova i pitanja. Može brisati kvizove i pitanja koja više nisu potrebna.


