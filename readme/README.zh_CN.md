这是一个用 [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)启动的 [Next.js](https://nextjs.org) 项目。

- en [English](../README.md)

## 快速启动

#### 首先，创建.env文件
进入clerk, neon, uploadingthing, livekit 的官网

在.env文件里添加相关环境变量
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
#### 然后，运行这几个命令
```
npm install
npx prisma generate
npx prisma db push
```

#### 之后，运行项目

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

通过浏览器打开 [http://localhost:3000](http://localhost:3000)来查看结果。
