import { currentUser, auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export const initialProfile = async () => {
  // Get user authentication details
  const { userId, redirectToSignIn } = await auth();
  console.log('User ID:', userId);

  const user = await currentUser();

  // If user not found after 3 attempts, redirect to sign-in
  if (!user) {
        return redirectToSignIn();
  }

  // Check if the profile exists in the database
  const profile = await db.profile.findUnique({
    where: { userId: user.id },
  });

  if (profile) {
    console.log('Profile found:', profile);
    return profile; // Return existing profile if found
  }

  // If profile doesn't exist, create a new one
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0]?.emailAddress || '',
    },
  });

  console.log('New profile created:', newProfile);
  return newProfile; // Return newly created profile

  
};
