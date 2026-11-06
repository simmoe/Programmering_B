# Kagekapløb

MQTT-spil: fællesskærm + QR til telefoner. De N hurtigste får kage.

## Start

```bash
node server.js
```

Åbn fællesskærmen på projektoren med den LAN-adresse, serveren printer. Telefonerne scanner QR-koden.

## Tilpas

Redigér `players.js`:

- `PLAYERS` — fornavne i klassen
- `CAKE_SLOTS` — antal kagestykker
- `ROUND_MS` — hvor længe man banke
- `TOPIC` — unik MQTT-kanal pr. hold, fx `kmg/2t/kagekaploeb`

## Spil

1. Alle vælger navn og trykker **Jeg er med**
2. På fællesskærmen: **Start runde**
3. 3–2–1 — **NU**
4. Bank på **KAGE**
5. Toppen får kagestykkerne

Broker: `wss://mqtt.nextservices.dk`
