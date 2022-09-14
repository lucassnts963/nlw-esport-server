# ESports (Server)

Servidor do projeto desenvolvido no NLW evento promovido pela Rocketseat.

## Tecnologias

- Node.js
- Express
- Prisma
- SQLite
- Cors

## Entidades

### Game

- id
- title
- bannerUrl

### Ad

- id
- gameId
- name
- yearsPlaying
- discord
- weekDays
- hourStart
- hourEnd
- useVoiceChannel
- createAt

## Casos de Uso

- Listagem de Games com listagem de anúncios
- Criação de novo anúncio
- Listagem de anúncio por game
- Buscar discord pelo Id do anúncio
