import Link from 'next/link';
import Metatags from '../../../../common/components/Metatags';

export default function TicketDetails() {
    return (
        <>
            <Metatags title="Ticket Name"
                description="The ticket details"
            />
            <main>
                <h1>Ticket Details</h1>
            </main>
        </>
    );
}