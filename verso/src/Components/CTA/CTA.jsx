import { Button } from 'primereact/button';
import { Link } from "react-router";

import './CTA.css';

export default function CTA() {
    return (
      <>
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