This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Available Scripts

## Set up environment

`node v20.14.0, yarn v1.22.22`

Install `node_modules`:

```bash
nvm install && nvm use
```

### Running the development server.

Add file `.env` (Eg: from `.env.example`)

```bash
cp .env.example .env
```

macOS

```bash
    make bootstrap
```

```bash
    make dev
```

Install a new package:

```bash
bun add <package_name>
```

### Start develop new feature

- Create a `feature/name-of-feature` from `main`
- You can create MR to `main` to cross-check it. But **DO NOT MERGE TO MAIN**

### Git commit convention

- `chore`: A code change that external user won't see (eg: change to .gitignore file or .prettierrc file)
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation related changes
- `refactor`: A code that neither fix bug nor adds a feature. (eg: You can use this when there is semantic changes like renaming a variable/ function name)
- `pef`: A code that improves performance
- `style`: A code that is related to styling
- `UI`: A better styles

### Folder structure

```markup
├── public
│   ├── locales                         internationalized resource
│   ├── <Font Name>                     define font family
├── src
│   ├── HOC
│   ├── app                             app router
│   ├── @types                          declare module (.css, .scss,...)
│   ├── types                           declare type global
│   ├── assets                          local static resources (images, icon,...)
│   ├── components                      business common components
│   ├── context                         hooks context
│   ├── hooks                           custom hooks
│   ├── index.css                       global styles in application
│   ├── libs                            libs
│   ├── locales                         internationalized resource
│   ├── models                          global model
│   │   ├── Welcome                     folder define model
│   │   │   ├── index.types.ts          code of types model
│   │   ├── User
│   │   └── Admin
│   ├── features                        business page entry and common templates
│   │   ├── Welcome
│   │   │   ├── api                     folder define request call API
│   │   │   ├── components              components use internal page, but it is recommended not to exceed three level
│   │   │   └── server                  folder define route of API
│   │   │   └── utils                   tool, function, ... use internal page
│   │   ├── User
│   │   │   ├── api
│   │   │   ├── components
│   │   │   └── server
│   │   │   └── utils
│   │   └── Admin
│   ├── middleware                      define all middleware (sessionMiddleware,...)
│   ├── providers                       define all resources of Refine
│   └── utils                           tool, function, constant,...
├── Makefile                             script command
├── README.md
├── package.json
├── .gitlab-ci.yml
├── .env
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- **Tailwind** [Docs](https://tailwindcss.com/docs)
- **Shadcn** [Docs](https://ui.shadcn.com/docs)
- **React Router** [Docs](https://refine.dev/docs/core/providers/router-provider/)
- **React Query** [Docs](https://tanstack.com/query/v3/docs/framework/react/overview)
