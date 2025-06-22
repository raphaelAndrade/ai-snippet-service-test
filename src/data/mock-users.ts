export interface MockUser {
    email: string;
    role: 'admin' | 'user';
    code: string;
  }
  
  export const mockUsers: MockUser[] = [
    { email: 'admin@example.com', role: 'admin', code: '123456' },
    { email: 'user@example.com', role: 'user', code: '654321' },
  ];
  