// Pages/Biblioteca.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";

import "./Biblioteca.css";

// ==========================================================
// CONTRATO DE INTEGRAÇÃO
// A pessoa responsável pela API deve substituir os três
// arrays abaixo por dados reais, vindos de fetch/estado global
// (Context, Redux, etc). Cada item de livro deve ter o mesmo
// formato usado na tela Explorar, por exemplo:
//
// {
//   id: 1342,
//   title: "Pride and Prejudice",
//   authors: [{ name: "Austen, Jane" }],
//   subjects: ["Courtship -- Fiction"],
//   formats: { "image/jpeg": "https://..." },
//   download_count: 198164
// }
//
// Sugestão de implementação futura:
// const [favoritos, setFavoritos] = useState([]);
// useEffect(() => { buscarFavoritosDoUsuario().then(setFavoritos) }, []);
// ==========================================================

export default function Biblioteca() {

    const navigate = useNavigate();

    const [abaAtiva, setAbaAtiva] = useState("favoritos");

    // TODO: substituir por dados reais vindos da API
    const favoritos = [];
    const queroLer = [];
    const jaLi = [];

    const abas = [
        { id: "favoritos", label: "Favoritos", icon: "pi pi-heart-fill", cor: "rosa" },
        { id: "queroLer", label: "Quero ler", icon: "pi pi-bookmark-fill", cor: "azul" },
        { id: "jaLi", label: "Já li", icon: "pi pi-check", cor: "cinza" }
    ];

    const conteudoVazio = {
        favoritos: {
            titulo: "Seu próximo favorito ainda está esperando por você.",
            texto: "Explore o catálogo e favorite os livros que capturarem seu coração."
        },
        queroLer: {
            titulo: "Sua lista de leituras está vazia.",
            texto: "Adicione livros que você quer ler para não perder nenhuma boa história."
        },
        jaLi: {
            titulo: "Sua jornada literária começa agora.",
            texto: "Marque os livros que você já leu para registrar sua história como leitor."
        }
    };

    // Mapeia cada aba para sua respectiva lista de livros
    const listasPorAba = {
        favoritos,
        queroLer,
        jaLi
    };

    const livrosDaAbaAtiva = listasPorAba[abaAtiva];

    function formatarAutor(autores) {
        if (!autores || autores.length === 0) return "Autor desconhecido";
        const [sobrenome, nome] = autores[0].name.split(", ");
        return nome ? `${nome} ${sobrenome}` : autores[0].name;
    }

    return (
        <main className="biblioteca">

            <div className="biblioteca-header">

                <div className="biblioteca-label">
                    <p>MINHA CONTA</p>
                </div>

                <h1>Minha Biblioteca</h1>

                <p className="biblioteca-subtitulo">
                    Sua estante pessoal digital — todos os livros que fazem parte da sua jornada.
                </p>

                <div className="biblioteca-tabs">
                    {abas.map((aba) => (
                        <button
                            key={aba.id}
                            className={
                                abaAtiva === aba.id
                                    ? "tab-item ativa"
                                    : "tab-item"
                            }
                            onClick={() => setAbaAtiva(aba.id)}
                        >
                            <i className={`${aba.icon} icone-${aba.cor}`}></i>
                            {aba.label}
                        </button>
                    ))}
                </div>

            </div>

            <div className="biblioteca-conteudo">

                {livrosDaAbaAtiva.length === 0 ? (

                    <div className="estado-vazio">
                        <div className="estado-vazio-icone">
                            <i className="pi pi-book"></i>
                        </div>

                        <h2>{conteudoVazio[abaAtiva].titulo}</h2>
                        <p>{conteudoVazio[abaAtiva].texto}</p>

                        <Button
                            label="Explorar livros"
                            className="btn-explorar"
                            onClick={() => navigate("/explorar")}
                        />
                    </div>

                ) : (

                    <div className="livros-grid">
                        {livrosDaAbaAtiva.map((livro) => (
                            <div key={livro.id} className="livro-card">

                                <div className="livro-capa">
                                    <img
                                        src={livro.formats["image/jpeg"]}
                                        alt={livro.title}
                                    />
                                    <span className="badge-digital">DIGITAL</span>

                                    {/* TODO: onClick deve chamar a função de
                                        remover/alternar o livro nesta lista */}
                                    <button className="btn-favorito ativo">
                                        <i className="pi pi-heart-fill"></i>
                                    </button>
                                </div>

                                <div className="livro-info">
                                    <h3>{livro.title}</h3>
                                    <p className="livro-autor">
                                        {formatarAutor(livro.authors)}
                                    </p>

                                    <div className="livro-tags">
                                        {livro.subjects?.slice(0, 2).map((subject) => (
                                            <span key={subject} className="tag">
                                                {subject.split(" -- ")[0]}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                )}

            </div>

        </main>
    );
}