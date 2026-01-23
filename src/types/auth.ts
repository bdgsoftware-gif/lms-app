export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  roles: string[];
  created_at?: string;
}
