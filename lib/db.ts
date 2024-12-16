import { PrismaClient } from '@prisma/client'
//当修改了db.ts时，需要执行"npx prisma generate"和"npx prisma db push"命令
// 创建 PrismaClient 的单例函数
const prismaClientSingleton = () => {
  return new PrismaClient()
}

// 扩展 globalThis 类型以包含 prismaGlobal 属性
declare const globalThis: {
  prisma: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// 如果 globalThis 上没有现成的 prismaGlobal，则实例化一个新的 PrismaClient 实例
export const db = globalThis.prisma ||prismaClientSingleton()


// 在开发环境中，确保将实例保存在 globalThis 上，避免多次创建 PrismaClient 实例
if (process.env.NODE_ENV !== 'production') globalThis.prisma = db

