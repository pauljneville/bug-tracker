import Link from 'next/link';
import Metatags from '../components/Metatags';

export default function Custom404() {
    return (
        <>
            <Metatags title="404 Not Found"
                description="No page with that name amigo"
            />
            <main>
                <h1>404 - lo siento... página no encontrada</h1>
                <Link href="/" passHref={true}>
                    <button className="btn-blue">To Dashboard!</button>
                </Link>
            </main>
        </>
    );
}