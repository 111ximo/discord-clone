This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

- zn_CN [简体中文](readme/README.zh_CN.md)

## Getting Started

#### First, create .env
go into the clerk, neon and uploadingthing, livekit

add relative keys in your .env file
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publicshare_key
CLERK_SECRET_KEY=your_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_REDIRECT_URL=/

DATABASE_URL=your_database_url

UPLOADTHING_SECRET=your_select_key
UPLOADTHING_APP_ID=your_id
UPLOADTHING_TOKEN=your_token

LIVEKIT_API_KEY=your_key
LIVEKIT_API_SECRET=your_secret_key
NEXT_PUBLIC_LIVEKIT_URL=your_websocket_url
```
#### Second,run the two command
```
npm install
npx prisma generate
npx prisma db push
```

#### Third,run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
