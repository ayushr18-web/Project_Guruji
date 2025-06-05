"use client";
import { useState } from "react";
import { useLogin } from "../../../hooks/useLogin";

const LoginForm = () => {
  const loginMutation = useLogin();
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login form submitted:', { email, password });  
    loginMutation.mutate({
      email: 'test@example.com',
      password: 'password123',
    });
  };

  console.log('Login mutation state:', loginMutation.isPending);

  return (
       <div></div>
  );
};


export default LoginForm