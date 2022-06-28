import fs from 'fs';
import { render } from 'mjml-react';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Template from '@components/email/Template'
import Paragraph from '@components/email/Paragraph'

// process MDX using next-mdx-remote
// source https://www.joshwcomeau.com/react/wonderful-emails-with-mjml-and-mdx/

const COMPONENTS = {
    p: Paragraph
}

export default async function generateEmail(req, res) {

    const fileContent = fs.readFileSync('/email.mdx');
    // Prepare the MDX file to be rendered
    const mdx = await serialize(fileContent);
    // Compile into HTML
    const { html, errors } = render(
        <Template>
            <MDXRemote
                {...mdx}
                components={COMPONENTS}
            />
        </Template>,
        { validationLevel: 'soft' }
    );
    if (errors) {
        return res.status(500).json({
            errors,
        });
    }
    return res.send(html);
}