import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Message } from 'primereact/message';

import { getUsers, saveUsers } from '../../utils/storage';

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name || !email || !form.password) {
      setError('Preencha todos os campos.');
      return;
    }

    const users = getUsers();

    const userAlreadyExists = users.some(
      (user) => user.email.toLowerCase() === email,
    );

    if (userAlreadyExists) {
      setError('Já existe uma conta cadastrada com este e-mail.');
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password: form.password,
    };

    saveUsers([...users, newUser]);

    navigate('/login');
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-header">
          <span className="login-eyebrow">Comece sua jornada</span>

          <h1>Criar conta</h1>

          <p>Crie seu espaço para organizar suas próximas leituras.</p>
        </div>

        {error && (
          <Message
            severity="error"
            text={error}
            className="login-message"
          />
        )}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Nome</label>

            <InputText
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Seu nome"
            />
          </div>

          <div className="field">
            <label htmlFor="email">E-mail</label>

            <InputText
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="seuemail@exemplo.com"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Senha</label>

            <Password
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Crie uma senha"
              toggleMask
              feedback={false}
            />
          </div>

          <Button
            type="submit"
            label="Criar conta"
            className="login-submit"
          />
        </form>

        <p className="login-register">
          Já possui uma conta?{' '}
          <Link to="/login">Entrar</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;