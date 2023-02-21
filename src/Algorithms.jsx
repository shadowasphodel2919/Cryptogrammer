import { Link } from "react-router-dom";

export const Algorithms = () => {
    return (<div>
        <section>
            <Link as={Link} to="caeser">Caeser Cipher</Link>
            <Link as={Link} to="vignere">Vignere Cipher</Link>
            <Link as={Link} to="playfair">Playfair Cipher</Link>
        </section>
    </div>);
}