import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import "./Explorar.css";

export default function Explorar() {

    const [busca, setBusca] = useState("");
    const [generoSelecionado, setGeneroSelecionado] = useState("");

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

    function selecionarGenero(genero) {
        setGeneroSelecionado(genero);
    }

    function limparFiltros() {
        setBusca("");
        setGeneroSelecionado("");
    }

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

        </main>
    );
}