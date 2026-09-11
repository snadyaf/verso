
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';

import './Hero.css';

export default function Hero() {

    return (
        <section className="hero">

            {/* LADO ESQUERDO */}
            <div className="hero-content">

                <div className="hero-label">
                    <span></span>
                    <p>PLATAFORMA LITERÁRIA</p>
                </div>

                <h1>
                    Seu próximo mundo
                    <br />
                    <span>começa em uma página.</span>
                </h1>

                <p className="hero-description">
                    Descubra histórias, encontre novos autores e
                    transforme alguns minutos do seu dia em uma nova
                    viagem.
                </p>

                {/* PESQUISA */}
                <div className="hero-search">

                    <InputText
                        placeholder="Buscar livros, autores..."
                    />

                    <Button label="Buscar" />

                </div>

                {/* BOTÕES */}
                <div className="hero-buttons">

                    <Button
                        label="Explorar livros"
                        className="btn-explorar"
                    />

                    <Button
                        label="Minha biblioteca"
                        className="btn-biblioteca"
                    />

                </div>

                {/* INFORMAÇÕES */}
                <div className="hero-info">

                    <div>
                        <strong>12+</strong>
                        <small>Obras</small>
                    </div>

                    <div>
                        <strong>PDF & EPUB</strong>
                        <small>Formatos digitais</small>
                    </div>

                    <div>
                        <strong>Reserva</strong>
                        <small>Física disponível</small>
                    </div>

                </div>

            </div>


            {/* LADO DIREITO */}
            <div className="hero-visual">

                <Tag
                    value={
                        <>
                            <strong>Digital</strong>
                            <br />
                            PDF + EPUB
                        </>
                    }
                    className="digital-tag"
                />

                <img
                    src="/livros.png"
                    alt="Livros"
                    className="hero-books"
                />

                <Tag
                    value="★ 4.9"
                    className="rating-tag"
                />

                <span className="rating-book">
                    Grande Sertão
                </span>

            </div>

        </section>
    );
}