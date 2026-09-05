import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import '.Auth.css'

const navigate = useNavigate()
const toast = useRef(null)

const [nome, setNome] = useState('')
const [email, setEmail] = useState('')
const [senha, setSenha] = useState('')
const [confirmarSenha, setConfirmarSenha] = useState('')
const [loading, setLoading] = useState(false)

const emailValido = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const obterUsuarios = () => {
    const usuarios = localStorage.getItem('usuarios')

    if (!usuarios) {
        return []
    }

    try {
        const parsed = JSON.parse(usuarios)
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

const mostrarErro = (mensagem) => {
    toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: mensagem,
        life: 4000
    })
}

const mostrarSucesso = () => {
    toast.current?.show({
        severity: 'success',
        summary: 'Cadastro realizado',
        detail: 'Sua conta foi criada com sucesso!',
        life: 4000
    })
}

const handleCadastro = (event) => {
    event.preventDefault()

    if (!nome.trim()) {
        mostrarErro('Informe seu nome.')
        return
    }

    if (!email.trim()) {
        mostrarErro('Informe seu e-mail.')
        return
    }

    if (!emailValido(email.trim())) {
        mostrarErro('Informe um e-mail válido.')
        return
    }

    if (!senha) {
        mostrarErro('Informe uma senha.')
        return
    }

    if (senha.length < 6) {
        mostrarErro('A senha deve possuir pelo menos 6 caracteres.')
        return
    }

    if (!confirmarSenha) {
        mostrarErro('Confirme sua senha.')
        return
    }

    if (senha !== confirmarSenha) {
        mostrarErro('As senhas não coincidem.')
        return
    }

    const usuarios = obterUsuarios()
    const emailNormalizado = email.trim().toLowerCase()

    const emailExiste = usuarios.some(
        (usuario) => usuario.email.toLowerCase() === emailNormalizado
    )

    if (emailExiste) {
        mostrarErro('Este e-mail já está cadastrado.')
        return
    }

    setLoading(true)

    const novoUsuario = {
        id: crypto.randomUUID(),
        nome: nome.trim(),
        email: emailNormalizado,
        senha,
        criadoEm: new Date().toISOString()
    }

    const novosUsuarios = [...usuarios, novoUsuario]

    localStorage.setItem('usuarios', JSON.stringify(novosUsuarios))

    setNome('')
    setEmail('')
    setSenha('')
    setConfirmarSenha('')
    setLoading(false)

    mostrarSucesso()

    setTimeout(() => {
        navigate('/')
    }, 1500)
}

function Auth() {

return (
    <>
        <Toast ref={toast} />

        <form onSubmit={handleCadastro}>
            <InputText
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                placeholder="Nome"
                disabled={loading}
            />

            <InputText
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="E-mail"
                type="email"
                disabled={loading}
            />

            <Password
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                placeholder="Senha"
                toggleMask
                feedback={false}
                disabled={loading}
            />

            <Password
                value={confirmarSenha}
                onChange={(event) => setConfirmarSenha(event.target.value)}
                placeholder="Confirmar senha"
                toggleMask
                feedback={false}
                disabled={loading}
            />

            <Button
                type="submit"
                label={loading ? 'Cadastrando...' : 'Criar conta'}
                loading={loading}
                disabled={loading}
            />
        </form>
    </>

) 
}

export default Auth