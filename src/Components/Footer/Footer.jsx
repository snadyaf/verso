import { Divider } from 'primereact/divider';

import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">

            <div className="footer-content">

                {/* Logo e descrição */}
                <div className="footer-brand">

                    <div className="footer-logo">
                        <span>V</span>
                        <strong>VERSO</strong>
                    </div>

                    <p>
                        Seu próximo mundo começa em uma página.
                        <br />
                        Descubra, organize e explore a literatura em um
                        <br />
                        só lugar.
                    </p>

                    <div className="footer-line"></div>

                </div>


                {/* Plataforma */}
                <div className="footer-column">

                    <h3>PLATAFORMA</h3>

                    <a href="#">Início</a>
                    <a href="#">Explorar</a>
                    <a href="#">Minha Biblioteca</a>
                    <a href="#">Minhas Reservas</a>

                </div>


                {/* Conta */}
                <div className="footer-column">

                    <h3>CONTA</h3>

                    <a href="#">Meu Perfil</a>
                    <a href="#">Entrar</a>
                    <a href="#">Criar conta</a>

                </div>


                {/* Gêneros */}
                <div className="footer-column">

                    <h3>GÊNEROS</h3>

                    <a href="#">Romance</a>
                    <a href="#">Ficção</a>
                    <a href="#">Clássicos</a>
                    <a href="#">Mistério</a>
                    <a href="#">Poesia</a>

                </div>

            </div>


            <Divider className="footer-divider" />


            {/* Rodapé inferior */}
            <div className="footer-bottom">

                <p>
                    © 2026 VERSO — Plataforma literária.
                    Todos os direitos reservados.
                </p>

                <span>
                    "Onde histórias encontram leitores."
                </span>

            </div>

        </footer>
    );
}