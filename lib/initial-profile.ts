import { currentUser, auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export const initialProfile = async () => {

  const { userId, redirectToSignIn} = await auth();

  if (!userId) {
    return redirectToSignIn(); // 确保用户未认证时重定向
  }

  let user = await currentUser();

  let attempts = 0;
  while (!user && attempts < 3) {
    attempts++;
    console.log(`Attempt ${attempts}: User not found, retrying...`);
    await new Promise((resolve) => setTimeout(resolve, 5000)); // 延迟 5 秒 再尝试
    user = await currentUser(); // 重试获取用户信息
  }
  if(!user){
    return redirectToSignIn();
  }
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id
    }
  });
  console.log(profile);

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    }
  });

  return newProfile;
};
