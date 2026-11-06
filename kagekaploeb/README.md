# Kagekapløb

MQTT-spil til 2T. Fællesskærm + QR til telefoner. Seks stykker kage. Hele klassen undtagen Gilbert, John og Bertram.

## Start

```bash
node kagekaploeb/server.js
```

Åbn **fællesskærmen** på projektoren med den LAN-adresse, serveren printer. Telefonerne scanner QR-koden.

## Spil

1. Alle vælger navn på telefonen og trykker **Jeg er med**
2. På fællesskærmen: **Start runde**
3. Nedtælling 3–2–1 — så **NU**
4. Bank på **KAGE** i 8 sekunder
5. De seks med flest taps får et stykke

Broker: `wss://mqtt.nextservices.dk` · topic: `kmg/t/kagekaploeb`
