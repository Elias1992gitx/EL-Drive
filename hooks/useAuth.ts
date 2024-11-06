import { useUser } from "@clerk/nextjs";

export function useAuth() {
  const { user, isLoaded, isSignedIn } = useUser();
  
  return {
    userRole: user?.publicMetadata?.role || 'user',
    isLoaded,
    isSignedIn,
    user
  }
} 