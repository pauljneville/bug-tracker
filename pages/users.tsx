import Link from 'next/link';
import Metatags from '../components/Metatags';

export default function Users() {
    return (
        <>
            <Metatags title="Users"
                description="The list of users"
            />
            <main>
                <h1>Users</h1>
            </main>
        </>
    );
}