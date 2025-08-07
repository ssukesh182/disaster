import { useEffect } from 'react';
import { router } from 'expo-router';

export default function IndexScreen() {
  useEffect(() => {
    // In a real app, you'd check if onboarding has been completed
    // For demo purposes, we'll always show onboarding
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}