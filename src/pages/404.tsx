import Link from 'next/link';
import Metatags from '../common/components/Metatags';

export default function Custom404() {
    return (
        <>
            <Metatags title="404 Not Found"
                description="No page with that name amigo"
            />
            <main>
                <h1>404 - Page Not Found</h1>
                <Link href="/" passHref={true}>
                    <button className="btn-blue">To Dashboard!</button>
                </Link>
            </main>
        </>
    );
}