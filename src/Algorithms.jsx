import { Link } from "react-router-dom";

export const Algorithms = () => {
    return (
        <section className="algos">
            <a href="/algorithms/caeser">
                <div className="card">
                    <p>Caeser Cipher</p>
                </div>
            </a>
            <a href="/algorithms/vignere">
                <div className="card">
                    <p>Vignere Cipher</p>
                </div>
            </a>
            <a href="/algorithms/playfair">
                <div className="card">
                    <p>Playfair Cipher</p>
                </div>
            </a>
            <a href="/algorithms/atbash">
                <div className="card">
                    <p>Atbash Cipher</p>
                </div>
            </a>

            {/* <Link as={Link} to="atbash">Atbash Cipher</Link> */}
        </section>
        );
}