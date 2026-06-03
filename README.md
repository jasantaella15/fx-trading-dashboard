# fx-trading-dashboard

Monorepo started from example: https://github.com/vercel/turborepo/tree/main/examples/with-vue-nuxt


## Installation

Use pnpm package manage to install and run scripts

```bash
pnpm i
```

## Scripts

```bash
// Run vuejs dev server
pnpm dev

// Run vitest test
pnpm test

// Run e2e test ( dev server will start automatically)
pnpm test e2e
```

## Architecture
```bash
    ├── apps/
    │   ├── e2e-tests/ ( playwrite tests)
    │   ├── web/ ( vue app )
    ├── packages/
    │   ├── ui/ ( shadcn and vue components)
    │   ├── data-access/ ( tanstack queries and massive api service)
```

## Libraries used

- Monorepo task manager [Turborepo](https://turborepo.dev/).
- Tankstank for data fetching [Tanstack Query](https://tanstack.com/query/latest/docs/framework/vue/overview).
- Playwrite for e2e tests [Playwrite](https://playwright.dev/).
- Vitest ( v3 ) for unit tests [Vitest](https://v3.vitest.dev/).
- Tailwind for styling [Tailwind](https://tailwindcss.com/).
- Shadcn component library [Shadcn](https://www.shadcn-vue.com/).
- Massive Rest API client  [Massive client-js](https://github.com/massive-com/client-js/).
- Internationalization   [Vue I18n](https://vue-i18n.intlify.dev/).