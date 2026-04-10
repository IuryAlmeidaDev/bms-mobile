# Mobile App IoT

App mobile em `React Native + Expo + TypeScript` para consumir a API local de automacao predial.

## Stack usada

- Expo
- React Native
- React Navigation
- Axios
- TanStack React Query
- React Hook Form
- Zod
- Expo Secure Store

## Estrutura

```txt
mobile-app/
  src/
    components/ui
    constants
    context
    hooks
    navigation
    screens
    services/api
    services/storage
    types
    utils
  __tests__/
```

## Base URL

O app usa `EXPO_PUBLIC_API_URL` quando ela estiver definida. Caso contrario:

- Android emulator: `http://10.0.2.2:8080`
- iOS simulator: `http://localhost:8080`

Para dispositivo fisico, copie `.env.example` para `.env` e troque o IP:

```env
EXPO_PUBLIC_API_URL=http://192.168.x.x:8080
```

## Como rodar

1. Instale as dependencias:

```bash
npm install
```

2. Garanta que o backend esteja rodando em `http://localhost:8080`.

3. Ajuste a URL da API se necessario.

4. Rode o app:

```bash
npm run start
```

5. Abra no emulador Android, iOS Simulator ou Expo Go.

## Testes e validacao

```bash
npm run typecheck
npm run test
```

## Fluxos implementados

- Login com CPF mascarado e validacao Zod
- Persistencia de JWT com Secure Store
- Interceptor Axios com injecao automatica do bearer token
- Logout automatico em `401`
- Dashboard com blocos ativos e salas cadastradas
- Lista de blocos
- Detalhe do bloco com salas e acoes para ligar/desligar luzes do bloco
- Consulta e acionamento de luz por ID

## Observacao importante

O Swagger exposto pelo backend nao trouxe um endpoint de listagem completa de luzes. Por isso, o app implementa:

- controle em lote por bloco
- consulta individual por ID para ligar/desligar uma luz especifica
