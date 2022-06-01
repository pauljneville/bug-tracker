import Link from 'next/link';
import Metatags from '../../components/Metatags';

export default function ProjectDetails() {
    return (
        <>
            <Metatags title="Project Name"
                description="The project details"
            />
            <main>
                <h1>Project Details</h1>
            </main>
        </>
    );
}