import { useEffect, useRef, useState } from "react";
import { Member, Profile } from "@prisma/client";

type MemberWithProfile = Member & {
  profile: Profile;
};

export const useCurrentUser = (serverId: string) => {
  const [currentUser, setCurrentUser] = useState<MemberWithProfile | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!serverId) {
        return;
      }

      try {
        const response = await fetch(`/api/members/current?serverId=${serverId}`);
        if (response.ok) {
          const userData = await response.json();
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    fetchCurrentUser();
  }, [serverId]);

  return { 
    currentUser
  };
};