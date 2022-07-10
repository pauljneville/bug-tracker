import Link from 'next/link';
import Metatags from '../../common/components/Metatags';

export default function UserDetails() {
    return (
        <>
            <Metatags title="User Name"
                description="The user details"
            />
            <main>
                <h1>User Details</h1>
            </main>
        </>
    );
}