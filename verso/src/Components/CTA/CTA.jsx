import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';

import './CTA.css';
import "../../styles/LivroCard.css";

export default function CTA() {

    const [livrosDestaque, setLivrosDestaque] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    function formatarAutor(autores) {
        if (!autores || autores.length === 0) return "Autor desconhecido";
        const [sobrenome, nome] = autores[0].name.split(", ");
        return nome ? `${nome} ${sobrenome}` : autores[0].name;
    }

    useEffect(() => {
        const controller = new AbortController();

        async function buscarDestaques() {
            setCarregando(true);
            setErro(null);

            try {
                // A Gutendex já ordena por popularidade (download_count) por padrão
                const resposta = await fetch(
                    "https://gutendex.com/books/",
                    { signal: controller.signal }
                );

                if (!resposta.ok) throw new Error("Falha na requisição");

                const dados = await resposta.json();

                // Pega só os 6 primeiros para a seção de destaque
                setLivrosDestaque(dados.results.slice(0, 6));

            } catch (e) {
                if (e.name !== "AbortError") {
                    setErro("Não foi possível carregar os destaques.");
                }
            } finally {
                setCarregando(false);
            }
        }

        buscarDestaques();

        return () => controller.abort();
    }, []);

    return (
        <>
            {/* SEÇÃO EM DESTAQUE */}
            <section className="destaque-section">

                <div className="destaque-header">

                    <div className="destaque-titulo-wrapper">
                        <div className="destaque-label">
                            <span></span>
                            <p>EM DESTAQUE</p>
                        </div>

                        <h2>Descubra sua próxima história</h2>
                    </div>

                    <a href="/explorar" className="ver-todos">
                        Ver todos <i className="pi pi-chevron-right"></i>
                    </a>

                </div>

                {carregando && (
                    <p className="destaque-status">Carregando destaques...</p>
                )}

                {erro && (
                    <p className="destaque-status destaque-erro">{erro}</p>
                )}

                {!carregando && !erro && (
                    <div className="destaque-grid">
                        {livrosDestaque.map((livro) => (
                            <div key={livro.id} className="livro-card">

                                <div className="livro-capa">

                                    {livro.formats["image/jpeg"] ? (
                                        <img
                                            src={livro.formats["image/jpeg"]}
                                            alt={livro.title}
                                        />
                                    ) : (
                                        <div className="capa-placeholder">
                                            {livro.title.charAt(0)}
                                        </div>
                                    )}

                                    <span className="badge-digital">DIGITAL</span>

                                    {/* TODO: onClick deve chamar a função de favoritar */}
                                    <button className="btn-favorito">
                                        <i className="pi pi-heart"></i>
                                    </button>

                                    {/* Overlay exibido no hover */}
                                    <div className="livro-overlay">

                                        {/* TODO: navegar para a página de detalhes do livro */}
                                        <Button
                                            label="Ver detalhes"
                                            icon="pi pi-search"
                                            className="btn-ver-detalhes"
                                        />

                                        <div className="overlay-acoes">
                                            {/* TODO: onClick deve adicionar/remover de "Quero ler" */}
                                            <button className="btn-acao">
                                                <i className="pi pi-bookmark"></i>
                                            </button>

                                            {/* TODO: onClick deve marcar/desmarcar como "Já li" */}
                                            <button className="btn-acao">
                                                <i className="pi pi-check"></i>
                                            </button>
                                        </div>

                                    </div>

                                </div>

                                <div className="livro-info">
                                    <h3>{livro.title}</h3>
                                    <p className="livro-autor">
                                        {formatarAutor(livro.authors)}
                                    </p>

                                    <div className="livro-tags">
                                        {livro.subjects.slice(0, 2).map((subject) => (
                                            <span key={subject} className="tag">
                                                {subject.split(" -- ")[0]}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="livro-downloads">
                                        <i className="pi pi-download"></i>{" "}
                                        {livro.download_count.toLocaleString("pt-BR")} downloads
                                    </p>
                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </section>

            {/* SEÇÃO CTA */}
            <section className="cta-section">

                <div className="cta-content">

                    <div className="cta-text">

                        <div className="cta-line"></div>

                        <h2>
                            Onde histórias encontram leitores.
                        </h2>

                        <p>
                            Organize sua biblioteca pessoal, faça reservas de
                            exemplares físicos e tenha acesso digital imediato
                            às obras disponíveis.
                        </p>

                    </div>

                    <Button
                        label="Começar agora"
                        className="cta-button"
                    />

                </div>

            </section>
        </>
    );
}