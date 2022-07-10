import Link from 'next/link';
import Metatags from '../common/components/Metatags';

export default function AdminPage() {
    return (
        <>
            <Metatags title="Admin Page"
                description="Admin Only Page"
            />
            <main>
                <h1>Admin Page</h1>
                <Link href="/" passHref={true}>
                    <button className="btn-blue">To Dashboard!</button>
                </Link>
            </main>
        </>
    );
}