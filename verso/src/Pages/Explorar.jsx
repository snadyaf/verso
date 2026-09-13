import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import "./Explorar.css";
import "../styles/LivroCard.css";

export default function Explorar() {

    const [busca, setBusca] = useState("");
    const [generoSelecionado, setGeneroSelecionado] = useState("");
    const [livros, setLivros] = useState([]);
    const [totalResultados, setTotalResultados] = useState(0);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);

    const generos = [
        "ROMANCE",
        "FICÇÃO",
        "CLÁSSICOS",
        "LITERATURA BRASILEIRA",
        "MISTÉRIO",
        "FICÇÃO CIENTÍFICA",
        "POESIA",
        "FILOSOFIA",
        "HISTÓRICO",
        "CONTO",
        "DISTOPIA",
        "REALISMO MÁGICO"
    ];

    // Mapeia os rótulos em português para termos que a Gutendex reconhece
    const generoParaTopico = {
        "ROMANCE": "romance",
        "FICÇÃO": "fiction",
        "CLÁSSICOS": "classic",
        "LITERATURA BRASILEIRA": "brazil",
        "MISTÉRIO": "mystery",
        "FICÇÃO CIENTÍFICA": "science fiction",
        "POESIA": "poetry",
        "FILOSOFIA": "philosophy",
        "HISTÓRICO": "history",
        "CONTO": "short stories",
        "DISTOPIA": "dystopia",
        "REALISMO MÁGICO": "magic realism"
    };

    function selecionarGenero(genero) {
        setGeneroSelecionado(generoSelecionado === genero ? "" : genero);
    }

    function limparFiltros() {
        setBusca("");
        setGeneroSelecionado("");
    }

    function formatarAutor(autores) {
        if (!autores || autores.length === 0) return "Autor desconhecido";
        const [sobrenome, nome] = autores[0].name.split(", ");
        return nome ? `${nome} ${sobrenome}` : autores[0].name;
    }

    // Busca os livros na Gutendex sempre que a busca ou o gênero mudam
    useEffect(() => {
        const controller = new AbortController();

        async function buscarLivros() {
            setCarregando(true);
            setErro(null);

            try {
                const params = new URLSearchParams();
                if (busca) params.append("search", busca);
                if (generoSelecionado) {
                    params.append("topic", generoParaTopico[generoSelecionado]);
                }

                const resposta = await fetch(
                    `https://gutendex.com/books/?${params.toString()}`,
                    { signal: controller.signal }
                );

                if (!resposta.ok) throw new Error("Falha na requisição");

                const dados = await resposta.json();
                setLivros(dados.results);
                setTotalResultados(dados.count);

            } catch (e) {
                if (e.name !== "AbortError") {
                    setErro("Não foi possível carregar os livros. Tente novamente.");
                }
            } finally {
                setCarregando(false);
            }
        }

        // debounce: espera 500ms depois que o usuário para de digitar
        const timeoutId = setTimeout(buscarLivros, 500);

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [busca, generoSelecionado]);

    return (
        <main className="explorar">

            <div className="explorar-header">
                <div className="explorar-label">
                    <span></span>
                    <p>CATÁLOGO</p>
                </div>
                <h1>Explorar</h1>
            </div>

            {/* FILTROS */}
            <div className="filtros">
                <div className="busca-container">
                    <i className="pi pi-search"></i>
                    <InputText
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        placeholder="Buscar livros, autores..."
                    />
                </div>

                {(busca || generoSelecionado) && (
                    <Button
                        label="Limpar"
                        icon="pi pi-times"
                        className="btn-limpar"
                        onClick={limparFiltros}
                    />
                )}
            </div>

            {/* GÊNEROS */}
            <div className="generos">
                {generos.map((genero) => (
                    <Button
                        key={genero}
                        label={genero}
                        className={
                            generoSelecionado === genero
                                ? "genero selecionado"
                                : "genero"
                        }
                        onClick={() => selecionarGenero(genero)}
                    />
                ))}
            </div>

            {/* RESULTADOS */}
            <div className="resultados-header">
                <p>{totalResultados} resultados</p>
            </div>

            {carregando && <p className="explorar-status">Carregando livros...</p>}
            {erro && <p className="explorar-status explorar-erro">{erro}</p>}

            {!carregando && !erro && (
                <div className="livros-grid">
                    {livros.map((livro) => (
                        <div key={livro.id} className="livro-card">

                            <div className="livro-capa">
                                <img
                                    src={livro.formats["image/jpeg"]}
                                    alt={livro.title}
                                />
                                <span className="badge-digital">DIGITAL</span>
                                <button className="btn-favorito">
                                    <i className="pi pi-heart"></i>
                                </button>
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

        </main>
    );
}