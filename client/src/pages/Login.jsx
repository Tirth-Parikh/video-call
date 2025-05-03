import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-sm mx-auto mt-20">
      <h2 className="text-2xl font-bold">Login to Meetify</h2>
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}
