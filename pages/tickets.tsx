import Link from 'next/link';
import Metatags from '../components/Metatags';

export default function Tickets() {
    return (
        <>
            <Metatags title="Tickets"
                description="The tickets assigned to you"
            />
            <main>
                <h1>Tickets</h1>
            </main>
        </>
    );
}