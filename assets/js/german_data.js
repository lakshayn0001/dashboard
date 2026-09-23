/**
 * assets/js/german_data.js
 * Comprehensive German A1 Curriculum Dataset & Interactive Speech Engine
 * for Lakshay Nagpal's Cockpit Dashboard
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DATASETS
  // =========================================================================

  const ALPHABET_DATA = [
    { letter: 'A (a)', name: 'ah', ipa: 'Pronunciation: ah', example: 'der Apfel (apple)', note: 'Open vowel sound' },
    { letter: 'B (be)', name: 'bay', ipa: 'Pronunciation: bay', example: 'das Buch (book)', note: 'Sounds like English B' },
    { letter: 'C (ce)', name: 'tsay / say', ipa: 'Pronunciation: tsay / say', example: 'der Computer', note: 'Usually sounds like "ts" before e/i' },
    { letter: 'D (de)', name: 'day', ipa: 'Pronunciation: day', example: 'der Tag (day)', note: 'Sounds like "t" at the end of words' },
    { letter: 'E (e)', name: 'eh', ipa: 'Pronunciation: eh', example: 'das Essen (food)', note: 'Short or long open e sound' },
    { letter: 'F (ef)', name: 'eff', ipa: 'Pronunciation: eff', example: 'der Freund (friend)', note: 'Standard F sound' },
    { letter: 'G (ge)', name: 'gay', ipa: 'Pronunciation: gay', example: 'gut (good)', note: 'Hard "g" as in "get"' },
    { letter: 'H (ha)', name: 'hah', ipa: 'Pronunciation: hah', example: 'das Haus (house)', note: 'Silent when following a vowel (lengthens it)' },
    { letter: 'I (i)', name: 'ee', ipa: 'Pronunciation: ee', example: 'die Idee (idea)', note: 'Long "ee" sound' },
    { letter: 'J (jot)', name: 'yot', ipa: 'Pronunciation: yot', example: 'ja (yes)', note: 'Sounds like English "Y"' },
    { letter: 'K (ka)', name: 'kah', ipa: 'Pronunciation: kah', example: 'klein (small)', note: 'Standard K sound' },
    { letter: 'L (el)', name: 'ell', ipa: 'Pronunciation: ell', example: 'die Lösung (solution)', note: 'Light L sound' },
    { letter: 'M (em)', name: 'emm', ipa: 'Pronunciation: emm', example: 'der Morgen (morning)', note: 'Standard M sound' },
    { letter: 'N (en)', name: 'enn', ipa: 'Pronunciation: enn', example: 'die Nacht (night)', note: 'Standard N sound' },
    { letter: 'O (o)', name: 'oh', ipa: 'Pronunciation: oh', example: 'das Ohr (ear)', note: 'Pure round O sound' },
    { letter: 'P (pe)', name: 'pay', ipa: 'Pronunciation: pay', example: 'das Problem (problem)', note: 'Standard P sound' },
    { letter: 'Q (ku)', name: 'koo', ipa: 'Pronunciation: koo', example: 'die Quelle (source)', note: 'Almost always paired as "qu", pronounced "kv"' },
    { letter: 'R (er)', name: 'air', ipa: 'Pronunciation: air (rolled/guttural)', example: 'die Ruhe (peace)', note: 'Guttural in throat or softly tapped' },
    { letter: 'S (es)', name: 'ess', ipa: 'Pronunciation: ess', example: 'die Sonne (sun)', note: 'Sounds like "z" before vowels; "sh" before p/t' },
    { letter: 'T (te)', name: 'tay', ipa: 'Pronunciation: tay', example: 'der Tag (day)', note: 'Standard T sound' },
    { letter: 'U (u)', name: 'oo', ipa: 'Pronunciation: oo', example: 'und (and)', note: 'Like "oo" in "moon"' },
    { letter: 'V (fau)', name: 'fow', ipa: 'Pronunciation: fow (like f)', example: 'der Vater (father)', note: 'IMPORTANT: Sounds like "F" in native German words' },
    { letter: 'W (we)', name: 'vay', ipa: 'Pronunciation: vay', example: 'das Wasser (water)', note: 'IMPORTANT: Sounds like English "V" (not double-u)' },
    { letter: 'X (ix)', name: 'iks', ipa: 'Pronunciation: iks', example: 'das Xylofon', note: 'Sounds like "ks"' },
    { letter: 'Y (ypsilon)', name: 'üp-si-lon', ipa: 'Pronunciation: üp-si-lon', example: 'die Typen', note: 'Often pronounced like "ü"' },
    { letter: 'Z (zet)', name: 'tset', ipa: 'Pronunciation: tset', example: 'das Ziel (goal)', note: 'IMPORTANT: Always sounds like "ts" in "cats"' },
    { letter: 'Ä (ä)', name: 'A-Umlaut', ipa: 'Pronunciation: like "air" but shorter', example: 'die Äpfel (apples)', note: 'Can be written as "ae" if umlaut is unavailable' },
    { letter: 'Ö (ö)', name: 'O-Umlaut', ipa: 'Pronunciation: like "ur" with lips rounded', example: 'das Öl (oil) / schön', note: 'Can be written as "oe" if umlaut is unavailable' },
    { letter: 'Ü (ü)', name: 'U-Umlaut', ipa: 'Pronunciation: like "ee" with lips rounded', example: 'die Übung (exercise)', note: 'Can be written as "ue" if umlaut is unavailable' },
    { letter: 'ß (Eszett)', name: 'scharfes S', ipa: 'Pronunciation: double "s" sound (ss)', example: 'groß (big) / weiß (white)', note: 'Used after long vowels/diphthongs; no word starts with ß' }
  ];

  const BASICS_DATA = [
    { de: 'Hallo', en: 'Hello', cat: 'Greeting', note: 'Universal friendly greeting', ex: 'Hallo, wie geht es dir?' },
    { de: 'Tschüss', en: 'Goodbye / Bye', cat: 'Farewell (Informal)', note: 'Most common informal bye', ex: 'Tschüss, bis morgen!' },
    { de: 'Auf Wiedersehen!', en: 'Goodbye! (Formal)', cat: 'Farewell (Formal)', note: 'Standard polite formal farewell', ex: 'Auf Wiedersehen und schönen Tag noch!' },
    { de: 'Entschuldigung', en: 'Sorry / Excuse me', cat: 'Courtesy', note: 'Essential polite phrase', ex: 'Entschuldigung, wo ist der Bahnhof?' },
    { de: 'bitte', en: 'Please / You are welcome', cat: 'Courtesy', note: 'Used for please, here you go, and welcome', ex: 'Ein Glas Wasser, bitte.' },
    { de: 'danke', en: 'Thank you', cat: 'Courtesy', note: 'Standard gratitude', ex: 'Mir geht es gut, danke.' },
    { de: 'Vielen Dank für deine Hilfe!', en: 'Thank you very much for your help!', cat: 'Courtesy', note: 'Warm appreciation', ex: 'Vielen Dank für deine Hilfe, du warst eine große Unterstützung!' },
    { de: 'ja', en: 'Yes', cat: 'Particle', note: 'Affirmative', ex: 'Ja, das stimmt.' },
    { de: 'nein', en: 'No', cat: 'Particle', note: 'Negative', ex: 'Nein, danke.' },
    { de: 'Guten Morgen / Guten Tag / Gute Nacht', en: 'Good morning / Good day / Good night', cat: 'Time Greetings', note: 'Standard time-based greetings', ex: 'Guten Morgen, wie geht es dir?' }
  ];

  const PRONOUNS_DATA = [
    { de: 'ich', en: 'I', type: 'Personal (1st Sing)', ex: 'Ich lerne Deutsch.' },
    { de: 'du', en: 'you (informal singular)', type: 'Personal (2nd Sing)', ex: 'Kommst du heute mit?' },
    { de: 'er', en: 'he', type: 'Personal (3rd Sing Masc)', ex: 'Er kommt aus Deutschland.' },
    { de: 'sie', en: 'she', type: 'Personal (3rd Sing Fem)', ex: 'Sie spricht gut Englisch.' },
    { de: 'es', en: 'it', type: 'Personal (3rd Sing Neut)', ex: 'Es regnet heute.' },
    { de: 'wir', en: 'we', type: 'Personal (1st Plural)', ex: 'Wir wohnen zusammen.' },
    { de: 'ihr', en: 'you (informal plural / y\'all)', type: 'Personal (2nd Plural)', ex: 'Woher kommt ihr?' },
    { de: 'sie (Plural)', en: 'they', type: 'Personal (3rd Plural)', ex: 'Sie sind freundlich.' },
    { de: 'Sie (groß)', en: 'you (formal singular & plural)', type: 'Personal (Formal)', ex: 'Wie heißen Sie?' }
  ];

  const QUESTIONS_DATA = [
    { de: 'Wer', en: 'Who', note: 'Subject pronoun interrogative', ex: 'Wer ist das?' },
    { de: 'Was', en: 'What', note: 'Thing / Action interrogative', ex: 'Was machst du heute?' },
    { de: 'Wo', en: 'Where (Stationary)', note: 'Location interrogative', ex: 'Wo wohnst du?' },
    { de: 'Woher', en: 'Where from (Origin)', note: 'Origin interrogative', ex: 'Woher kommst du?' },
    { de: 'Wie', en: 'How', note: 'Manner interrogative', ex: 'Wie geht es Ihnen?' },
    { de: 'Warum', en: 'Why', note: 'Reason interrogative', ex: 'Warum lernst du Deutsch?' },
    { de: 'Wann', en: 'When', note: 'Time interrogative', ex: 'Wann beginnt der Kurs?' }
  ];

  const NEGATIVES_DATA = [
    { de: 'kein / keine', en: 'no / not a / none', note: 'Negates nouns with indefinite or zero article', ex: 'Ich habe kein Geld.' },
    { de: 'nicht', en: 'not', note: 'Negates verbs, adjectives, adverbs, proper nouns', ex: 'Das ist nicht gut.' },
    { de: 'nichts', en: 'nothing', note: 'Pronounced [NIKHTS]', ex: 'Ich weiß nichts darüber.' },
    { de: 'nie', en: 'never', note: 'Pronounced [NEE]', ex: 'Ich war noch nie in Berlin.' },
    { de: 'niemals', en: 'never ever', note: 'Stronger emphasis [NEE-maals]', ex: 'Ich werde das niemals vergessen.' },
    { de: 'niemand', en: 'nobody / no one', note: 'Pronounced [NEE-maant]', ex: 'Niemand ist zu Hause.' }
  ];

  const CALENDAR_DAYS = [
    { de: 'der Montag', pl: 'die Montage', en: 'Monday', ex: 'Am Montag beginne ich die Arbeit.' },
    { de: 'der Dienstag', pl: 'die Dienstage', en: 'Tuesday', ex: 'Am Dienstag habe ich Deutschklasse.' },
    { de: 'der Mittwoch', pl: 'die Mittwoche', en: 'Wednesday', ex: 'Am Mittwoch gehe ich ins Fitnessstudio.' },
    { de: 'der Donnerstag', pl: 'die Donnerstage', en: 'Thursday', ex: 'Am Donnerstag ist mein Kurstag.' },
    { de: 'der Freitag', pl: 'die Freitage', en: 'Friday', ex: 'Am Freitag treffe ich meine Freunde.' },
    { de: 'der Samstag', pl: 'die Samstage', en: 'Saturday', ex: 'Am Samstag fahre ich Fahrrad.' },
    { de: 'der Sonntag', pl: 'die Sonntage', en: 'Sunday', ex: 'Am Sonntag ruhe ich mich aus.' },
    { de: 'der Wochentag', pl: 'die Wochentage', en: 'day of the week / weekday', ex: 'Welcher Wochentag ist heute?' },
    { de: 'das Wochenende', pl: 'die Wochenenden', en: 'weekend', ex: 'Schönes Wochenende!' }
  ];

  const CALENDAR_MONTHS = [
    { de: 'der Januar', en: 'January', ex: 'Im Januar ist es sehr kalt.' },
    { de: 'der Februar', en: 'February', ex: 'Der Februar ist der kürzeste Monat.' },
    { de: 'der März', en: 'March', ex: 'Im März beginnt der Frühling.' },
    { de: 'der April', en: 'April', ex: 'Der April macht, was er will.' },
    { de: 'der Mai', en: 'May', ex: 'Im Mai blühen die Blumen.' },
    { de: 'der Juni', en: 'June', ex: 'Der Sommer fängt im Juni an.' },
    { de: 'der Juli', en: 'July', ex: 'Im Juli haben viele Leute Urlaub.' },
    { de: 'der August', en: 'August', ex: 'Der August ist meistens sehr warm.' },
    { de: 'der September', en: 'September', ex: 'Im September fängt die Schule an.' },
    { de: 'der Oktober', en: 'October', ex: 'Im Oktober wird es herbstlich.' },
    { de: 'der November', en: 'November', ex: 'Im November regnet es oft.' },
    { de: 'der Dezember', en: 'December', ex: 'Im Dezember feiern wir Weihnachten.' }
  ];

  const TIME_ADVERBS = [
    { de: 'der Morgen', pl: 'die Morgen', en: 'morning', ex: 'Guten Morgen, wie geht es dir?' },
    { de: 'der Tag', pl: 'die Tage', en: 'day', ex: 'Heute ist ein schöner Tag.' },
    { de: 'der Abend', pl: 'die Abende', en: 'evening', ex: 'Am Abend koche ich gerne.' },
    { de: 'die Nacht', pl: 'die Nächte', en: 'night', ex: 'Gute Nacht und schlaf gut!' },
    { de: 'gestern', en: 'yesterday', ex: 'Gestern war ich zu Hause.' },
    { de: 'heute', en: 'today', ex: 'Heute habe ich viel zu tun.' },
    { de: 'jetzt', en: 'now', ex: 'Wir müssen jetzt gehen.' },
    { de: 'morgen', en: 'tomorrow', ex: 'Wir sehen uns morgen.' },
    { de: 'später', en: 'later', ex: 'Können wir später sprechen?' }
  ];

  const NOUNS_DATA = [
    { art: 'der', de: 'Freund', pl: 'die Freunde', en: 'friend', ex: 'Mein Freund wohnt in Berlin.' },
    { art: 'der', de: 'Vorschlag', pl: 'die Vorschläge', en: 'suggestion', ex: 'Danke für deinen guten Vorschlag.' },
    { art: 'die', de: 'Arbeit', pl: 'die Arbeiten', en: 'work', ex: 'Er beginnt die Arbeit um acht Uhr.' },
    { art: 'die', de: 'Bedingung', pl: 'die Bedingungen', en: 'condition', ex: 'Unter welchen Bedingungen arbeiten Sie?' },
    { art: 'die', de: 'Beziehung', pl: 'die Beziehungen', en: 'relationship', ex: 'Sie führen eine glückliche Beziehung.' },
    { art: 'die', de: 'Entscheidung', pl: 'die Entscheidungen', en: 'decision', ex: 'Das war eine schwere Entscheidung.' },
    { art: 'die', de: 'Entwicklung', pl: 'die Entwicklungen', en: 'development', ex: 'Die Entwicklung der Technologie ist sehr schnell.' },
    { art: 'die', de: 'Erfahrung', pl: 'die Erfahrungen', en: 'experience', ex: 'Sie hat viel Erfahrung im Beruf.' },
    { art: 'die', de: 'Familie', pl: 'die Familien', en: 'family', ex: 'Meine Familie ist klein.' },
    { art: 'die', de: 'Gelegenheit', pl: 'die Gelegenheiten', en: 'opportunity', ex: 'Nutzen Sie diese gute Gelegenheit.' },
    { art: 'die', de: 'Herausforderung', pl: 'die Herausforderungen', en: 'challenge', ex: 'Das neue Projekt ist eine große Herausforderung.' },
    { art: 'die', de: 'Idee', pl: 'die Ideen', en: 'idea', ex: 'Ich habe eine tolle Idee für unser Projekt.' },
    { art: 'die', de: 'Lösung', pl: 'die Lösungen', en: 'solution', ex: 'Wir müssen schnell eine Lösung finden.' },
    { art: 'die', de: 'Meinung', pl: 'die Meinungen', en: 'opinion', ex: 'Meiner Meinung nach ist das richtig.' },
    { art: 'die', de: 'Schule', pl: 'die Schulen', en: 'school', ex: 'Die Kinder gehen zur Schule.' },
    { art: 'die', de: 'Situation', pl: 'die Situationen', en: 'situation', ex: 'Wir befinden uns in einer schwierigen Situation.' },
    { art: 'die', de: 'Teamarbeit', pl: '-', en: 'teamwork', ex: 'Gute Teamarbeit ist der Schlüssel.' },
    { art: 'die', de: 'Verantwortung', pl: 'die Verantwortungen', en: 'responsibility', ex: 'Er übernimmt die Verantwortung für das Team.' },
    { art: 'die', de: 'Verbesserung', pl: 'die Verbesserungen', en: 'improvement', ex: 'Es gibt immer Raum für Verbesserungen.' },
    { art: 'die', de: 'Vereinbarung', pl: 'die Vereinbarungen', en: 'agreement', ex: 'Wir haben eine neue Vereinbarung getroffen.' },
    { art: 'die', de: 'Zeit', pl: 'die Zeiten', en: 'time', ex: 'Ich habe keine Zeit.' },
    { art: 'das', de: 'Brot', pl: 'die Brote', en: 'bread', ex: 'Ich esse gerne frisches Brot.' },
    { art: 'das', de: 'Buch', pl: 'die Bücher', en: 'book', ex: 'Ich lese ein interessantes Buch.' },
    { art: 'das', de: 'Ding', pl: 'die Dinge', en: 'thing', ex: 'Kleine Dinge machen den Unterschied.' },
    { art: 'das', de: 'Ergebnis', pl: 'die Ergebnisse', en: 'result', ex: 'Das Ergebnis der Prüfung war sehr gut.' },
    { art: 'das', de: 'Essen', pl: '-', en: 'food', ex: 'Das Essen schmeckt lecker.' },
    { art: 'das', de: 'Frühstück', pl: 'die Frühstücke', en: 'breakfast', ex: 'Das Frühstück ist fertig.' },
    { art: 'das', de: 'Getränk', pl: 'die Getränke', en: 'drink', ex: 'Möchtest du ein kaltes Getränk?' },
    { art: 'das', de: 'Haus', pl: 'die Häuser', en: 'house', ex: 'Das Haus ist sehr groß.' },
    { art: 'das', de: 'Leben', pl: 'die Leben', en: 'life', ex: 'Das Leben ist schön.' },
    { art: 'das', de: 'Problem', pl: 'die Probleme', en: 'problem', ex: 'Kein Problem, ich helfe dir gern.' },
    { art: 'das', de: 'Wasser', pl: 'die Wässer', en: 'water', ex: 'Ich trinke jeden Tag viel Wasser.' },
    { art: 'das', de: 'Wissen', pl: '-', en: 'knowledge', ex: 'Wissen ist Macht.' },
    { art: 'das', de: 'Ziel', pl: 'die Ziele', en: 'goal', ex: 'Mein Ziel ist es, fließend Deutsch zu sprechen.' },
    { art: 'plural', de: 'die Eltern', pl: 'die Eltern', en: 'parents', ex: 'Meine Eltern wohnen in Indien.' },
    { art: 'plural', de: 'die Hausaufgaben', pl: 'die Hausaufgaben', en: 'homework', ex: 'Hast du deine Hausaufgaben gemacht?' },
    { art: 'plural', de: 'die Lebensmittel', pl: 'die Lebensmittel', en: 'groceries / food items', ex: 'Ich kaufe Lebensmittel im Supermarkt.' },
    { art: 'das', de: 'Österreich', pl: '-', en: 'Austria', ex: 'Wien ist die Hauptstadt von Österreich.' }
  ];

  const VERBS_DATA = [
    { de: 'arbeiten', en: 'to work', type: 'Regular', ex: 'Er möchte in Berlin arbeiten.' },
    { de: 'aufstehen', en: 'to get up / wake up', type: 'Separable (steht auf)', ex: 'Ich stehe jeden Tag um 6 Uhr früh auf.' },
    { de: 'auswärts essen', en: 'to eat out / dine out', type: 'Phrase / Verb', ex: 'Am Freitag essen wir auswärts.' },
    { de: 'bedeuten', en: 'to mean / signify', type: 'Regular', ex: 'Was bedeutet dieses Wort?' },
    { de: 'besuchen', en: 'to visit', type: 'Inseparable', ex: 'Ich besuche am Wochenende meine Großeltern.' },
    { de: 'erreichen', en: 'to reach / achieve', type: 'Inseparable', ex: 'Wir haben unser Ziel erreicht.' },
    { de: 'essen', en: 'to eat', type: 'Irregular (du isst, er isst)', ex: 'Wir essen um 19 Uhr zu Abend.' },
    { de: 'frühstücken', en: 'to have breakfast', type: 'Regular', ex: 'Ich frühstücke jeden Morgen um 7 Uhr.' },
    { de: 'kochen', en: 'to cook', type: 'Regular', ex: 'Heute koche ich Pasta.' },
    { de: 'reisen', en: 'to travel', type: 'Regular', ex: 'Ich reise sehr gerne.' },
    { de: 'schreiben', en: 'to write', type: 'Irregular (schrieb, geschrieben)', ex: 'Ich schreibe eine E-Mail.' },
    { de: 'trinken', en: 'to drink', type: 'Irregular (trank, getrunken)', ex: 'Ich möchte einen Kaffee trinken.' },
    { de: 'verbringen', en: 'to spend (time)', type: 'Irregular (verbrachte)', ex: 'Ich verbringe viel Zeit mit Lernen.' },
    { de: 'verstehen', en: 'to understand', type: 'Inseparable', ex: 'Verstehst du mich?' },
    { de: 'üben', en: 'to practice', type: 'Regular', ex: 'Man muss jeden Tag üben.' }
  ];

  const ADJECTIVES_DATA = [
    { de: 'alt', en: 'old', opp: 'neu (new)', ex: 'Dieses Gebäude ist sehr alt.' },
    { de: 'neu', en: 'new', opp: 'alt (old)', ex: 'Ich habe ein neues Auto gekauft.' },
    { de: 'groß', en: 'big / tall', opp: 'klein (small)', ex: 'Die Stadt ist sehr groß.' },
    { de: 'klein', en: 'small', opp: 'groß (big)', ex: 'Das Zimmer ist klein aber gemütlich.' },
    { de: 'gut', en: 'good', opp: 'schlecht (bad)', ex: 'Das ist eine gute Idee.' },
    { de: 'schlecht', en: 'bad', opp: 'gut (good)', ex: 'Das Wetter ist heute schlecht.' },
    { de: 'Nicht gut', en: 'not good', opp: 'gut (good)', ex: 'Mir geht es heute nicht gut.' },
    { de: 'schnell', en: 'fast / quick', opp: 'langsam (slow)', ex: 'Der Zug fährt sehr schnell.' },
    { de: 'langsam', en: 'slow', opp: 'schnell (fast)', ex: 'Bitte sprechen Sie etwas langsamer.' },
    { de: 'leicht', en: 'easy / light', opp: 'schwer (heavy/hard)', ex: 'Die Prüfung war ziemlich leicht.' },
    { de: 'schwer', en: 'difficult / heavy', opp: 'leicht (easy/light)', ex: 'Der Koffer ist sehr schwer.' },
    { de: 'einfach', en: 'easy / simple', opp: 'schwierig (difficult)', ex: 'Die Aufgabe ist einfach.' },
    { de: 'schwierig', en: 'difficult', opp: 'einfach (simple)', ex: 'Deutsch lernen ist nicht so schwierig.' },
    { de: 'warm', en: 'warm', opp: 'kalt (cold)', ex: 'Im Sommer ist es schön warm.' },
    { de: 'kalt', en: 'cold', opp: 'warm (warm)', ex: 'Im Winter ist es oft sehr kalt.' },
    { de: 'gesund', en: 'healthy', opp: 'ungesund (unhealthy)', ex: 'Obst und Gemüse sind gesund.' },
    { de: 'glücklich', en: 'happy', opp: 'traurig (sad)', ex: 'Wir sind sehr glücklich hier.' },
    { de: 'traurig', en: 'sad', opp: 'glücklich (happy)', ex: 'Warum bist du traurig?' },
    { de: 'dankbar', en: 'grateful / thankful', opp: '-', ex: 'Ich bin sehr dankbar.' },
    { de: 'falsch', en: 'wrong / incorrect', opp: 'richtig (correct)', ex: 'Diese Antwort ist falsch.' },
    { de: 'müde', en: 'tired', opp: 'ausgeruht (rested)', ex: 'Ich bin heute sehr müde.' },
    { de: 'schön', en: 'beautiful / nice', opp: 'hässlich (ugly)', ex: 'Die Blumen sind sehr schön.' },
    { de: 'unmöglich', en: 'impossible', opp: 'möglich (possible)', ex: 'Nichts ist unmöglich.' },
    { de: 'wichtig', en: 'important', opp: 'unwichtig (unimportant)', ex: 'Pünktlichkeit ist wichtig.' },
    { de: 'regelmäßig', en: 'regularly (adverb)', opp: 'unregelmäßig', ex: 'Ich mache regelmäßig Sport.' },
    { de: 'zu Hause', en: 'at home (adverbial)', opp: 'auswärts / unterwegs', ex: 'Ich bin heute zu Hause.' },
    { de: 'genug', en: 'enough (adverb)', opp: 'zu wenig', ex: 'Hast du genug gegessen?' },
    { de: 'hier', en: 'here', opp: 'dort (there)', ex: 'Ich bleibe hier.' },
    { de: 'dort', en: 'there', opp: 'hier (here)', ex: 'Dort drüben steht ein Bus.' }
  ];

  const CONJUNCTIONS_DATA = [
    {
      word: 'und',
      en: 'and',
      type: 'Coordinating (Position 0)',
      rule: 'Word order does not change. Subject + Verb stay in normal positions.',
      exDe: 'Kaffee und Tee bitte. / Wir wohnen zusammen und lernen Deutsch.',
      exEn: 'Coffee and tea please. / We live together and learn German.'
    },
    {
      word: 'weil',
      en: 'because',
      type: 'Subordinating (Verb-Kicker)',
      rule: 'Pushes the conjugated verb to the very END of the clause.',
      exDe: 'Ich bleibe zu Hause, weil ich müde bin. / Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.',
      exEn: 'I stay home because I am tired. / I learn German because I want to work in Germany.'
    },
    {
      word: 'wenn',
      en: 'if / when (conditional)',
      type: 'Subordinating (Verb-Kicker)',
      rule: 'Conditional clause. Verb moves to end. If starting with Wenn, the main clause starts with its verb.',
      exDe: 'Wenn ich genug Zeit habe, besuche ich meine Freunde am Wochenende.',
      exEn: 'If I have enough time, I visit my friends at the weekend.'
    },
    {
      word: 'obwohl',
      en: 'although / even though',
      type: 'Subordinating (Verb-Kicker)',
      rule: 'Concessive clause. Pushes verb to end. Expresses a contrast or surprising condition.',
      exDe: 'Obwohl ich gestern müde war, habe ich meine Hausaufgaben gemacht.',
      exEn: 'Although I was tired yesterday, I did my homework.'
    },
    {
      word: 'nachdem',
      en: 'after',
      type: 'Subordinating (Verb-Kicker)',
      rule: 'Temporal clause indicating preceding action. Pushes conjugated auxiliary/verb to the end.',
      exDe: 'Nachdem ich gefrühstückt hatte, bin ich zur Arbeit gegangen.',
      exEn: 'After I had breakfast, I went to work.'
    }
  ];

  const DIALOGUES_DATA = [
    { id: 1, de: 'Am Wochenende verbringe ich Zeit mit meinen Freunden.', en: 'On the weekend, I spend time with my friends.', type: 'Sentence (Weekend plans)' },
    { id: 2, de: 'Auf Wiedersehen!', en: 'Goodbye! (formal)', type: 'Phrase / Interjection' },
    { id: 3, de: 'Bitte schreiben Sie langsam, ich verstehe es nicht so gut.', en: "Please write slowly, I don't understand it very well.", type: 'Sentence (Clarification)' },
    { id: 4, de: 'Danke für deine Unterstützung!', en: 'Thank you for your support!', type: 'Sentence / Phrase' },
    { id: 5, de: 'Das klingt nach einer guten Idee.', en: 'That sounds like a good idea.', type: 'Sentence' },
    { id: 6, de: 'Es ist wichtig, seine Ziele zu haben.', en: 'It is important to have goals.', type: 'Sentence' },
    { id: 7, de: 'Ich bin 24 Jahre alt.', en: 'I am 24 years old.', type: 'Phrase' },
    { id: 8, de: 'Ich bin dankbar für die kleinen Dinge im Leben.', en: 'I am grateful for the little things in life.', type: 'Sentence (Gratitude)' },
    { id: 9, de: 'Ich bin mir nicht sicher, ob das funktionieren wird.', en: "I'm not sure if that will work.", type: 'Sentence' },
    { id: 10, de: 'Ich freue mich, dich wiederzusehen.', en: "I'm happy to see you again.", type: 'Sentence' },
    { id: 11, de: 'Ich habe heute viel zu tun.', en: 'I have a lot to do today.', type: 'Sentence' },
    { id: 12, de: 'Ich habe viel gelernt, seit ich hier bin.', en: 'I have learned a lot since I have been here.', type: 'Sentence' },
    { id: 13, de: 'Ich heiße Prashant.', en: 'My name is Prashant.', type: 'Phrase' },
    { id: 14, de: 'Ich interessiere mich für Musik.', en: 'I am interested in music.', type: 'Sentence' },
    { id: 15, de: 'Ich kaufe gerne frische Lebensmittel, weil sie gesund sind.', en: 'I like buying fresh groceries because they are healthy.', type: 'Sentence (Choices & Health)' },
    { id: 16, de: 'Ich koche oft zu Hause, anstatt auswärts zu essen.', en: 'I often cook at home instead of eating out.', type: 'Sentence (Habits & Preferences)' },
    { id: 17, de: 'Ich komme aus Indien.', en: 'I come from India.', type: 'Phrase' },
    { id: 18, de: 'Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.', en: 'I learn German because I want to work in Germany.', type: 'Sentence (Goals)' },
    { id: 19, de: 'Ich lerne Deutsch, weil ich später in Deutschland arbeiten möchte.', en: 'I am learning German because I want to work in Germany later.', type: 'Sentence (Causal clause: weil)' },
    { id: 20, de: 'Ich muss noch etwas erledigen.', en: 'I still have something to do.', type: 'Sentence' },
    { id: 21, de: 'Ich stehe jeden Tag früh auf.', en: 'I get up early every day.', type: 'Sentence (Daily routine)' },
    { id: 22, de: 'Ich war letztes Jahr in Berlin.', en: 'I was in Berlin last year.', type: 'Sentence' },
    { id: 23, de: 'Ich würde gern mehr üben.', en: 'I would like to practice more.', type: 'Sentence' },
    { id: 24, de: 'Ich würde gerne deine Meinung hören.', en: 'I would like to hear your opinion.', type: 'Sentence' },
    { id: 25, de: 'Können wir uns später treffen?', en: 'Can we meet later?', type: 'Sentence / Question' },
    { id: 26, de: 'Könnten wir das später besprechen?', en: 'Could we discuss this later?', type: 'Sentence / Question' },
    { id: 27, de: 'Könntest du mir bitte helfen?', en: 'Could you please help me?', type: 'Sentence / Question' },
    { id: 28, de: 'Meine Familie bedeutet mir sehr viel.', en: 'My family means a lot to me.', type: 'Sentence (Expressing importance)' },
    { id: 29, de: 'Meiner Meinung nach ist das unfair.', en: "In my opinion, that's unfair.", type: 'Sentence' },
    { id: 30, de: 'Meiner Meinung nach ist es wichtig, regelmäßig Deutsch zu üben.', en: 'In my opinion, it is important to practice German regularly.', type: 'Sentence (Infinitive clause: zu + Infinitiv)' },
    { id: 31, de: 'Mir geht es gut, danke.', en: 'I am good, thank you.', type: 'Phrase' },
    { id: 32, de: 'Nachdem ich gefrühstückt hatte, bin ich zur Arbeit gegangen.', en: 'After I had breakfast, I went to work.', type: 'Sentence (Temporal clause: nachdem)' },
    { id: 33, de: 'Nächstes Jahr möchte ich nach Österreich reisen.', en: 'Next year I want to travel to Austria.', type: 'Sentence (Future plans)' },
    { id: 34, de: 'Obwohl es geregnet hat, sind wir trotzdem spazieren gegangen.', en: 'Although it was raining, we still went for a walk.', type: 'Sentence' },
    { id: 35, de: 'Obwohl ich gestern müde war, habe ich meine Hausaufgaben gemacht.', en: 'Although I was tired yesterday, I did my homework.', type: 'Sentence (Concessive clause: obwohl)' },
    { id: 36, de: 'Teamarbeit hilft uns, unsere Ziele schneller zu erreichen.', en: 'Teamwork helps us achieve our goals faster.', type: 'Sentence (Teamwork)' },
    { id: 37, de: 'Vielen Dank für deine Hilfe, du warst eine große Unterstützung!', en: 'Thank you so much for your help, you were a great support!', type: 'Sentence / Phrase' },
    { id: 38, de: 'Was hast du am Wochenende vor?', en: 'What are you planning this weekend?', type: 'Sentence / Question' },
    { id: 39, de: 'Was hältst du von dieser Idee?', en: 'What do you think of this idea?', type: 'Sentence / Question' },
    { id: 40, de: 'Wenn ich genug Zeit habe, besuche ich meine Freunde am Wochenende.', en: 'If I have enough time, I visit my friends at the weekend.', type: 'Sentence (Conditional clause: wenn)' },
    { id: 41, de: 'Wie alt bist du?', en: 'How old are you? (informal)', type: 'Phrase / Question' },
    { id: 42, de: 'Wie geht es dir?', en: 'How are you? (informal)', type: 'Phrase / Question' },
    { id: 43, de: 'Wie heißt du?', en: 'What is your name? (informal)', type: 'Phrase / Question' },
    { id: 44, de: 'Wo ist die Toilette?', en: 'Where is the toilet / restroom?', type: 'Phrase / Question' },
    { id: 45, de: 'Woher kommst du?', en: 'Where are you from? (informal)', type: 'Phrase / Question' },
    { id: 46, de: 'bitte', en: 'please', type: 'Particle' },
    { id: 47, de: 'danke', en: 'thank you', type: 'Particle' },
    { id: 48, de: 'ja', en: 'yes', type: 'Particle' },
    { id: 49, de: 'nein', en: 'no', type: 'Particle' }
  ];

  const ROADMAP_WEEKS = [
    { week: 1, focus: 'Alphabet & pronunciation', routine: '20 min pronunciation + 10 min reading aloud', checkpoint: 'Recognize letters and key sound notes (V=F, W=V, Z=TS)' },
    { week: 2, focus: 'Greetings + pronouns/questions', routine: '15 min vocabulary + 15 min speaking', checkpoint: 'Introduce yourself and ask basic W-questions' },
    { week: 3, focus: 'Calendar & time', routine: '15 min recall + 15 min sentence practice', checkpoint: 'Use days (der), months (der), and time expressions fluently' },
    { week: 4, focus: 'Nouns & Gender (Der/Die/Das)', routine: '20 min noun cards + 10 min example sentences', checkpoint: 'Recall nouns with articles and common plural endings' },
    { week: 5, focus: 'Verbs & Conjugation', routine: '20 min verb recall + 10 min sentence building', checkpoint: 'Create simple sentences and split separable verbs (aufstehen)' },
    { week: 6, focus: 'Adjectives/adverbs', routine: '15 min recall + 15 min description practice', checkpoint: 'Describe people, objects, and situations with opposites' },
    { week: 7, focus: 'Conjunctions & Word Order', routine: '10 min pattern review + 20 min examples', checkpoint: 'Understand and build verb-kicking clauses (weil, wenn, obwohl)' },
    { week: 8, focus: 'Sentences & dialogues', routine: '20 min read aloud + 10 min translation practice', checkpoint: 'Speak supplied 49 sentences confidently without looking' }
  ];

  const TRACKER_TOPICS = [
    'Alphabet & Pronunciation',
    'Greetings & Basics',
    'Pronouns & Question Words',
    'Calendar & Time',
    'Nouns & Gender System',
    'Verbs & Conjugation',
    'Adjectives & Adverbs',
    'Conjunctions & Syntax',
    'Sentences & Dialogues'
  ];

  // =========================================================================
  // 2. SPEECH SYNTHESIS ENGINE (de-DE)
  // =========================================================================

  let speechRate = 1.0;
  let germanVoice = null;

  function initVoices() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    // Prioritize German voices: de-DE, de-AT, de-CH
    const femaleGerman = /katja|amala|petra|anna|hedda|seraphina|google deutsch|female/i;
    const maleGerman = /stefan|conrad|killian|male/i;
    germanVoice = voices.find(v => v.lang && v.lang.startsWith('de') && femaleGerman.test(v.name)) ||
                  voices.find(v => v.lang && v.lang.startsWith('de') && !maleGerman.test(v.name)) ||
                  voices.find(v => v.lang && v.lang.startsWith('de')) ||
                  null;
  }

  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = initVoices;
    initVoices();
  }

  window.speakText = function (text, btn) {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    // Cancel ongoing speech
    window.speechSynthesis.cancel();

    // Clean text of parenthetical notes if any
    const cleanText = text.replace(/\([^)]*\)/g, '').trim();

    const utter = new SpeechSynthesisUtterance(cleanText);
    utter.lang = 'de-DE';
    utter.rate = speechRate;
    if (germanVoice) utter.voice = germanVoice;

    const pill = document.getElementById('speechStatusPill');
    const pillText = document.getElementById('speakingText');
    if (pill && pillText) {
      pillText.textContent = cleanText.length > 35 ? cleanText.substring(0, 32) + '...' : cleanText;
      pill.classList.remove('hidden');
    }

    if (btn) btn.classList.add('is-speaking');

    utter.onend = function () {
      if (pill) pill.classList.add('hidden');
      if (btn) btn.classList.remove('is-speaking');
    };

    utter.onerror = function () {
      if (pill) pill.classList.add('hidden');
      if (btn) btn.classList.remove('is-speaking');
    };

    window.speechSynthesis.speak(utter);
  };

  window.stopSpeech = function () {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const pill = document.getElementById('speechStatusPill');
      if (pill) pill.classList.add('hidden');
      document.querySelectorAll('.is-speaking').forEach(el => el.classList.remove('is-speaking'));
    }
  };

  window.setSpeechRate = function (rate, btn) {
    speechRate = rate;
    document.querySelectorAll('.rate-btn').forEach(b => {
      b.classList.remove('active', 'bg-stone-900', 'text-white', 'shadow-2xs');
      b.classList.add('text-stone-700');
    });
    btn.classList.add('active', 'bg-stone-900', 'text-white', 'shadow-2xs');
    btn.classList.remove('text-stone-700');
  };

  window.playAllAlphabet = function () {
    let index = 0;
    function playNext() {
      if (index >= ALPHABET_DATA.length) return;
      const item = ALPHABET_DATA[index];
      window.speakText(item.letter);
      index++;
      setTimeout(playNext, 1100);
    }
    playNext();
  };

  // =========================================================================
  // 3. RENDER FUNCTIONS
  // =========================================================================

  function renderAlphabetGrid() {
    const grid = document.getElementById('alphabet-grid');
    if (!grid) return;
    grid.innerHTML = ALPHABET_DATA.map(item => `
      <div class="learn-card p-3 rounded-2xl bg-white/90 border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-2 cursor-pointer group" onclick="speakText('${item.letter}', this)">
        <div class="flex items-center justify-between">
          <span class="text-lg font-black text-stone-950 font-mono group-hover:text-amber-700 transition-colors">${item.letter}</span>
          <button class="p-1 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-600 hover:text-amber-900 text-xs transition-all" title="Listen to ${item.letter}">🔊</button>
        </div>
        <div>
          <div class="text-[11px] font-mono font-bold text-amber-900">${item.ipa.replace('Pronunciation: ', '')}</div>
          <div class="text-[11px] text-stone-700 font-semibold truncate mt-0.5" title="${item.example}">${item.example}</div>
        </div>
        <div class="text-[10px] text-stone-500 line-clamp-2 border-t border-stone-100 pt-1.5">${item.note}</div>
      </div>
    `).join('');
  }

  function renderBasicsGrid() {
    const grid = document.getElementById('basics-grid');
    if (!grid) return;
    grid.innerHTML = BASICS_DATA.map(item => `
      <div class="learn-card p-4 rounded-2xl bg-white/90 border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-3 cursor-pointer group" onclick="speakText('${item.de}', this)">
        <div class="flex items-start justify-between gap-2">
          <div>
            <span class="text-[10px] font-mono font-bold uppercase tracking-wider bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200">${item.cat}</span>
            <h4 class="text-base font-black text-stone-950 group-hover:text-emerald-700 transition-colors mt-1.5">${item.de}</h4>
          </div>
          <button class="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs transition-all shrink-0">🔊</button>
        </div>
        <div class="text-xs font-semibold text-stone-600">${item.en}</div>
        <div class="p-2.5 rounded-xl bg-stone-50/80 border border-stone-200/70 text-[11px] text-stone-700 space-y-1">
          <div class="font-mono text-stone-500 text-[10px]">Example Context:</div>
          <div class="font-medium italic text-stone-900">"${item.ex}"</div>
        </div>
      </div>
    `).join('');
  }

  function renderPronouns() {
    const pList = document.getElementById('pronouns-list');
    if (pList) {
      pList.innerHTML = PRONOUNS_DATA.map(item => `
        <div class="py-2.5 flex items-center justify-between gap-2 hover:bg-stone-50/80 px-2 rounded-lg transition-colors cursor-pointer" onclick="speakText('${item.de}', this)">
          <div>
            <div class="font-black text-stone-950 text-sm font-mono">${item.de}</div>
            <div class="text-stone-600 text-[11px]">${item.en}</div>
          </div>
          <div class="text-right flex items-center gap-2">
            <span class="text-[10px] font-mono text-stone-400">${item.type}</span>
            <button class="p-1 rounded bg-stone-100 hover:bg-blue-100 text-stone-600 text-[11px]">🔊</button>
          </div>
        </div>
      `).join('');
    }

    const qList = document.getElementById('questions-list');
    if (qList) {
      qList.innerHTML = QUESTIONS_DATA.map(item => `
        <div class="py-2.5 flex items-center justify-between gap-2 hover:bg-stone-50/80 px-2 rounded-lg transition-colors cursor-pointer" onclick="speakText('${item.de}', this)">
          <div>
            <div class="font-black text-stone-950 text-sm font-mono text-amber-900">${item.de}</div>
            <div class="text-stone-600 text-[11px]">${item.en}</div>
          </div>
          <div class="text-right flex items-center gap-2">
            <span class="text-[10px] text-stone-400 italic">${item.ex}</span>
            <button class="p-1 rounded bg-stone-100 hover:bg-amber-100 text-stone-600 text-[11px]">🔊</button>
          </div>
        </div>
      `).join('');
    }

    const nList = document.getElementById('negatives-list');
    if (nList) {
      nList.innerHTML = NEGATIVES_DATA.map(item => `
        <div class="py-2.5 flex items-center justify-between gap-2 hover:bg-stone-50/80 px-2 rounded-lg transition-colors cursor-pointer" onclick="speakText('${item.de}', this)">
          <div>
            <div class="font-black text-stone-950 text-sm font-mono text-red-900">${item.de}</div>
            <div class="text-stone-600 text-[11px]">${item.en}</div>
          </div>
          <div class="text-right flex items-center gap-2">
            <span class="text-[10px] text-stone-400">${item.note}</span>
            <button class="p-1 rounded bg-stone-100 hover:bg-red-100 text-stone-600 text-[11px]">🔊</button>
          </div>
        </div>
      `).join('');
    }
  }

  function renderCalendar() {
    const dList = document.getElementById('days-list');
    if (dList) {
      dList.innerHTML = CALENDAR_DAYS.map(item => `
        <div class="py-2.5 flex items-center justify-between gap-2 hover:bg-stone-50/80 px-2 rounded-lg transition-colors cursor-pointer" onclick="speakText('${item.de}', this)">
          <div>
            <div class="font-black text-blue-900 text-xs font-mono">${item.de}</div>
            <div class="text-[11px] text-stone-500 font-mono">${item.pl}</div>
          </div>
          <div class="text-right flex items-center gap-2">
            <span class="text-xs font-semibold text-stone-700">${item.en}</span>
            <button class="p-1 rounded bg-stone-100 hover:bg-blue-100 text-stone-600 text-[11px]">🔊</button>
          </div>
        </div>
      `).join('');
    }

    const mList = document.getElementById('months-list');
    if (mList) {
      mList.innerHTML = CALENDAR_MONTHS.map(item => `
        <div class="py-2 flex items-center justify-between gap-2 hover:bg-stone-50/80 px-2 rounded-lg transition-colors cursor-pointer" onclick="speakText('${item.de}', this)">
          <div>
            <div class="font-black text-emerald-900 text-xs font-mono">${item.de}</div>
            <div class="text-[10px] text-stone-500 italic">${item.ex}</div>
          </div>
          <div class="text-right flex items-center gap-2">
            <span class="text-xs font-semibold text-stone-700">${item.en}</span>
            <button class="p-1 rounded bg-stone-100 hover:bg-emerald-100 text-stone-600 text-[11px]">🔊</button>
          </div>
        </div>
      `).join('');
    }

    const tList = document.getElementById('time-adverbs-list');
    if (tList) {
      tList.innerHTML = TIME_ADVERBS.map(item => `
        <div class="py-2 flex items-center justify-between gap-2 hover:bg-stone-50/80 px-2 rounded-lg transition-colors cursor-pointer" onclick="speakText('${item.de}', this)">
          <div>
            <div class="font-black text-amber-900 text-xs font-mono">${item.de}</div>
            <div class="text-[10px] text-stone-500">${item.ex}</div>
          </div>
          <div class="text-right flex items-center gap-2">
            <span class="text-xs font-semibold text-stone-700">${item.en}</span>
            <button class="p-1 rounded bg-stone-100 hover:bg-amber-100 text-stone-600 text-[11px]">🔊</button>
          </div>
        </div>
      `).join('');
    }
  }

  let activeNounFilter = 'all';

  window.filterNouns = function (gender, btn) {
    activeNounFilter = gender;
    document.querySelectorAll('.noun-filter-btn').forEach(b => {
      b.classList.remove('active', 'bg-stone-900', 'text-white', 'shadow-2xs');
    });
    btn.classList.add('active', 'bg-stone-900', 'text-white', 'shadow-2xs');
    renderNounsGrid();
  };

  function renderNounsGrid() {
    const grid = document.getElementById('nouns-grid');
    if (!grid) return;

    const filtered = NOUNS_DATA.filter(item => {
      const matchesGender = activeNounFilter === 'all' || item.art === activeNounFilter;
      const matchesSearch = !activeSearchQuery ||
        item.de.toLowerCase().includes(activeSearchQuery) ||
        item.en.toLowerCase().includes(activeSearchQuery) ||
        item.pl.toLowerCase().includes(activeSearchQuery);
      return matchesGender && matchesSearch;
    });

    grid.innerHTML = filtered.map(item => {
      let badgeClass = 'badge-der';
      let borderLeft = 'border-l-blue-600';
      if (item.art === 'die') { badgeClass = 'badge-die'; borderLeft = 'border-l-red-600'; }
      if (item.art === 'das') { badgeClass = 'badge-das'; borderLeft = 'border-l-emerald-600'; }
      if (item.art === 'plural') { badgeClass = 'badge-plural'; borderLeft = 'border-l-purple-600'; }

      const spokenPhrase = item.art === 'plural' ? item.de : `${item.art} ${item.de}`;

      return `
        <div class="learn-card p-3.5 rounded-2xl bg-white/90 border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-2 border-l-4 ${borderLeft} cursor-pointer group" onclick="speakText('${spokenPhrase}', this)">
          <div class="flex items-start justify-between gap-1.5">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${badgeClass}">
              ${item.art}
            </span>
            <button class="p-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs">🔊</button>
          </div>
          <div>
            <h4 class="text-sm font-black text-stone-950 font-mono group-hover:text-stone-700 transition-colors">${item.de}</h4>
            <div class="text-[11px] font-bold text-stone-700 mt-0.5">${item.en}</div>
          </div>
          <div class="pt-1.5 border-t border-stone-100 text-[10px] space-y-0.5">
            <div class="font-mono text-stone-500">Plural: <span class="text-stone-800 font-semibold">${item.pl}</span></div>
            <div class="italic text-stone-600 truncate" title="${item.ex}">"${item.ex}"</div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderVerbsGrid() {
    const grid = document.getElementById('verbs-grid');
    if (!grid) return;
    grid.innerHTML = VERBS_DATA.map(item => `
      <div class="learn-card p-4 rounded-2xl bg-white/90 border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-2.5 border-l-4 border-l-emerald-600 cursor-pointer group" onclick="speakText('${item.de}', this)">
        <div class="flex items-start justify-between gap-2">
          <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">${item.type}</span>
          <button class="p-1 rounded-lg bg-stone-100 hover:bg-emerald-100 text-stone-600 text-xs">🔊</button>
        </div>
        <div>
          <h4 class="text-base font-black text-stone-950 font-mono group-hover:text-emerald-800 transition-colors">${item.de}</h4>
          <div class="text-xs font-bold text-stone-700">${item.en}</div>
        </div>
        <div class="p-2 rounded-xl bg-stone-50 border border-stone-200/70 text-[11px] text-stone-700">
          <div class="font-mono text-[9px] text-stone-500 uppercase">Context:</div>
          <div class="italic text-stone-900 font-medium">"${item.ex}"</div>
        </div>
      </div>
    `).join('');
  }

  function renderAdjectivesGrid() {
    const grid = document.getElementById('adjectives-grid');
    if (!grid) return;
    grid.innerHTML = ADJECTIVES_DATA.map(item => `
      <div class="learn-card p-3.5 rounded-2xl bg-white/90 border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-2 border-l-4 border-l-amber-500 cursor-pointer group" onclick="speakText('${item.de}', this)">
        <div class="flex items-start justify-between gap-2">
          <h4 class="text-sm font-black text-stone-950 font-mono group-hover:text-amber-800 transition-colors">${item.de}</h4>
          <button class="p-1 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-600 text-xs">🔊</button>
        </div>
        <div>
          <div class="text-xs font-bold text-stone-800">${item.en}</div>
          ${item.opp !== '-' ? `<div class="text-[10px] font-mono text-stone-500 mt-0.5">Opposite: <span class="text-amber-900 font-semibold">${item.opp}</span></div>` : ''}
        </div>
        <div class="text-[11px] italic text-stone-600 border-t border-stone-100 pt-1.5 truncate" title="${item.ex}">"${item.ex}"</div>
      </div>
    `).join('');
  }

  function renderConjunctionsGrid() {
    const grid = document.getElementById('conjunctions-grid');
    if (!grid) return;
    grid.innerHTML = CONJUNCTIONS_DATA.map(item => `
      <div class="learn-card p-5 rounded-2xl bg-white/90 border border-purple-200 shadow-xs space-y-3 border-l-4 border-l-purple-600">
        <div class="flex items-start justify-between gap-2">
          <div>
            <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 text-purple-900 border border-purple-200">${item.type}</span>
            <h4 class="text-xl font-black text-purple-950 font-mono mt-1.5 flex items-center gap-2">
              <span>${item.word}</span>
              <span class="text-xs font-normal text-stone-500">(${item.en})</span>
            </h4>
          </div>
          <button onclick="speakText('${item.exDe}', this)" class="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold font-mono transition-all flex items-center gap-1 cursor-pointer">
            <span>🔊</span> Listen Example
          </button>
        </div>
        <p class="text-xs text-stone-700 leading-relaxed font-medium">${item.rule}</p>
        <div class="p-3 rounded-xl bg-purple-50/60 border border-purple-200 text-xs space-y-1">
          <div class="font-mono text-[10px] uppercase font-bold text-purple-900">Beispiel (DE):</div>
          <div class="font-bold text-stone-950">${item.exDe}</div>
          <div class="text-stone-600 text-[11px] italic">${item.exEn}</div>
        </div>
      </div>
    `).join('');
  }

  let activeSearchQuery = '';

  window.handleVocabSearch = function (query) {
    activeSearchQuery = query.toLowerCase().trim();
    renderNounsGrid();
    renderDialogues();
    updateSearchBadge();
  };

  window.clearSearch = function () {
    const input = document.getElementById('vocabSearchInput');
    if (input) input.value = '';
    activeSearchQuery = '';
    renderNounsGrid();
    renderDialogues();
    updateSearchBadge();
  };

  function updateSearchBadge() {
    const badge = document.getElementById('searchCountBadge');
    if (!badge) return;
    if (!activeSearchQuery) {
      badge.textContent = 'Showing all 180+ entries';
    } else {
      const dialogueMatches = DIALOGUES_DATA.filter(d =>
        d.de.toLowerCase().includes(activeSearchQuery) ||
        d.en.toLowerCase().includes(activeSearchQuery) ||
        d.type.toLowerCase().includes(activeSearchQuery)
      ).length;
      const nounMatches = NOUNS_DATA.filter(n =>
        n.de.toLowerCase().includes(activeSearchQuery) ||
        n.en.toLowerCase().includes(activeSearchQuery) ||
        n.pl.toLowerCase().includes(activeSearchQuery)
      ).length;
      badge.textContent = `${dialogueMatches + nounMatches} matches (${dialogueMatches} sentences, ${nounMatches} nouns)`;
    }
  }

  function renderDialogues() {
    const list = document.getElementById('dialogues-list');
    if (!list) return;

    const filtered = DIALOGUES_DATA.filter(item => {
      if (!activeSearchQuery) return true;
      return item.de.toLowerCase().includes(activeSearchQuery) ||
             item.en.toLowerCase().includes(activeSearchQuery) ||
             item.type.toLowerCase().includes(activeSearchQuery);
    });

    const countEl = document.getElementById('dialoguesCount');
    if (countEl) countEl.textContent = `${filtered.length} / ${DIALOGUES_DATA.length} Sentences`;

    if (filtered.length === 0) {
      list.innerHTML = `
        <div class="p-8 text-center glass-droplet rounded-2xl border border-stone-200">
          <p class="text-sm text-stone-500 font-mono">No matching sentences found for "${activeSearchQuery}".</p>
          <button onclick="clearSearch()" class="mt-2 px-3 py-1 text-xs bg-stone-900 text-white rounded-lg">Reset Search</button>
        </div>
      `;
      return;
    }

    list.innerHTML = filtered.map(item => `
      <div class="dialogue-card p-4 rounded-2xl bg-white/90 border border-stone-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-emerald-300 transition-all group">
        <div class="space-y-1 max-w-3xl">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-stone-100 text-stone-600 border border-stone-200">#${item.id}</span>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200">${item.type}</span>
          </div>
          <div class="text-sm sm:text-base font-black text-stone-950 font-sans group-hover:text-emerald-800 transition-colors">${item.de}</div>
          <div class="text-xs text-stone-600 font-medium">${item.en}</div>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0 self-start sm:self-auto">
          <button onclick="speakText('${item.de.replace(/'/g, "\\'")}', this)" class="px-3 py-2 rounded-xl droplet-pill text-xs font-bold text-stone-800 hover:text-emerald-800 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs">
            <span>🔊</span> <span>Listen</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  function renderRoadmapAndTracker() {
    // 8-Week Blueprint Table
    const tbody = document.getElementById('weekly-roadmap-tbody');
    if (tbody) {
      tbody.innerHTML = ROADMAP_WEEKS.map(item => `
        <tr class="hover:bg-stone-50/80 transition-colors">
          <td class="p-3.5 font-mono font-bold text-stone-900">Week 0${item.week}</td>
          <td class="p-3.5 font-bold text-emerald-950">${item.focus}</td>
          <td class="p-3.5 text-stone-700 font-mono text-[11px]">${item.routine}</td>
          <td class="p-3.5 text-stone-800">${item.checkpoint}</td>
        </tr>
      `).join('');
    }

    // Spaced Repetition Tracker Table
    renderTrackerTable();
  }

  const TRACKER_STORAGE_KEY = 'german_a1_spaced_tracker_v1';

  function getTrackerState() {
    try {
      return JSON.parse(localStorage.getItem(TRACKER_STORAGE_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  function saveTrackerState(state) {
    try {
      localStorage.setItem(TRACKER_STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  window.toggleTrackerCheck = function (topicIndex, stageIndex) {
    const state = getTrackerState();
    const key = `${topicIndex}_${stageIndex}`;
    state[key] = !state[key];
    saveTrackerState(state);
    renderTrackerTable();
  };

  window.resetGermanProgress = function () {
    if (confirm('Are you sure you want to reset your saved German study checkpoints?')) {
      localStorage.removeItem(TRACKER_STORAGE_KEY);
      renderTrackerTable();
    }
  };

  function renderTrackerTable() {
    const tbody = document.getElementById('spaced-tracker-tbody');
    if (!tbody) return;

    const state = getTrackerState();
    let totalCheckboxes = TRACKER_TOPICS.length * 5;
    let checkedCount = 0;

    tbody.innerHTML = TRACKER_TOPICS.map((topic, tIdx) => {
      let cells = '';
      for (let sIdx = 0; sIdx < 5; sIdx++) {
        const key = `${tIdx}_${sIdx}`;
        const isChecked = !!state[key];
        if (isChecked) checkedCount++;
        cells += `
          <td class="py-2.5 px-3 text-center">
            <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleTrackerCheck(${tIdx}, ${sIdx})" class="w-4 h-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500 cursor-pointer">
          </td>
        `;
      }

      return `
        <tr class="hover:bg-stone-50/70 transition-colors">
          <td class="py-2.5 px-3 font-semibold text-stone-900">${topic}</td>
          ${cells}
        </tr>
      `;
    }).join('');

    const statsEl = document.getElementById('trackerStats');
    const barEl = document.getElementById('trackerProgressBar');
    if (statsEl) statsEl.textContent = `${checkedCount} / ${totalCheckboxes} Checkpoints (${Math.round((checkedCount / totalCheckboxes) * 100)}%)`;
    if (barEl) barEl.style.width = `${(checkedCount / totalCheckboxes) * 100}%`;
  }

  // =========================================================================
  // 4. INITIALIZATION
  // =========================================================================

  function initGermanHub() {
    renderAlphabetGrid();
    renderBasicsGrid();
    renderPronouns();
    renderCalendar();
    renderNounsGrid();
    renderVerbsGrid();
    renderAdjectivesGrid();
    renderConjunctionsGrid();
    renderDialogues();
    renderRoadmapAndTracker();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGermanHub);
  } else {
    initGermanHub();
  }

})();
