import Head from 'next/head';

export default function Metatags({
    title = 'Bug Tracker',
    description = 'Track tasks and issues in a software development project.',
    image = 'https://bug-tracker-one.vercel.app/v0/page-project-with-tickets.png',
}) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}