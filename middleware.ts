import { clerkMiddleware} from '@clerk/nextjs/server';

//const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']); // 公开路由

export default clerkMiddleware(
  // async (auth, request) => {
  // // 如果访问的是需要保护的路由，才要求认证
  // if (!isPublicRoute(request)) {
  //   await auth.protect();  // 如果用户没有认证，保护路由
  //   console.log(auth)
  // }}
);

// export default clerkMiddleware({})
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)', // 始终保护 API 路由
  ],
};
