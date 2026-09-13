import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Message } from 'primereact/message';

import { useAuth } from '../../context/AuthContext';
import './Login.css';

const initialForm = {
  email: '',
  password: '',
};

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: '',
    }));

    setSubmitError('');
  }

  function validateForm() {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = 'Informe seu e-mail.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Informe um e-mail válido.';
    }

    if (!form.password) {
      newErrors.password = 'Informe sua senha.';
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const result = login(form.email, form.password);

    if (!result.success) {
      setSubmitError(result.message);
      setIsSubmitting(false);
      return;
    }

    navigate('/perfil');
  }

  function initializeDemoUser() {
  const users = JSON.parse(localStorage.getItem('verso_users')) || []

  const demoUserExists = users.some(
    (storedUser) => storedUser.email === 'demo@verso.com',
  )

  if (demoUserExists) {
    return
  }

  const demoUser = {
    id: 'demo-user',
    name: 'Leitor Demo',
    email: 'demo@verso.com',
    password: '123456',
  }

  localStorage.setItem(
    'verso_users',
    JSON.stringify([...users, demoUser]),
  )
}

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-header">
          <span className="login-eyebrow">Bem-vindo de volta</span>

          <h1 id="login-title">Entre na sua conta</h1>

          <p>
            Acesse sua biblioteca, seus favoritos e suas reservas.
          </p>
        </div>

        {submitError && (
          <Message
            severity="error"
            text={submitError}
            className="login-message"
          />
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="email">E-mail</label>

            <InputText
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="seuemail@exemplo.com"
              className={errors.email ? 'p-invalid' : ''}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />

            {errors.email && (
              <small id="email-error" className="field-error">
                {errors.email}
              </small>
            )}
          </div>

          <div className="field">
            <label htmlFor="password">Senha</label>

            <Password
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              toggleMask
              feedback={false}
              className={errors.password ? 'p-invalid' : ''}
              inputClassName="login-password-input"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? 'password-error' : undefined
              }
            />

            {errors.password && (
              <small id="password-error" className="field-error">
                {errors.password}
              </small>
            )}
          </div>

          <Button
            type="submit"
            label="Entrar"
            icon="pi pi-sign-in"
            loading={isSubmitting}
            className="login-submit"
          />
        </form>

        <p className="login-register">
          Ainda não possui uma conta?{' '}
          <Link to="/cadastro">Criar conta</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;