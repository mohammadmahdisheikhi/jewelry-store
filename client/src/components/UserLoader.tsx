import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  phonenumber: string;
  IDnumber: string;
}

export interface UserLoaderProps {
  children: (user: User | null) => JSX.Element;
}

export default function UserLoader({ children }: UserLoaderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = Cookies.get('access_token');
        if (!accessToken) {
          router.push('/login');
          return;
        }

        const response = await axios.get('http://localhost:8000/auth/user', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(response.data.user);
      } catch (error) {
        console.error('Error loading user:', error);
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        router.push('/login');
      }
    };

    fetchUser();
  }, [router]);

  return children(user);
}
