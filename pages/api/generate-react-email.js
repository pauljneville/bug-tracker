// mjml-react
// source https://www.joshwcomeau.com/react/wonderful-emails-with-mjml-and-mdx/
//
// 

// pages/api/generate-email.js
import {
    render,
    Mjml,
    MjmlBody,
    MjmlSection,
    MjmlColumn,
    MjmlText,
} from 'mjml-react';

import LinkToPost from '../../components/email/LinkToPost'

export default async function generateEmail(req, res) {
    const { html, errors } = render(
        <Mjml>
            <MjmlBody width={700}>
                <MjmlSection backgroundColor="#EFEFEF">
                    <MjmlColumn>
                        <LinkToPost
                            socialImage="/images/vercel.svg"
                            // title="Some Blog Post"
                            href="/"
                        />
                        <MjmlText>
                            Hello, this is an example email blog of width set to 700px
                        </MjmlText>
                    </MjmlColumn>
                </MjmlSection>
            </MjmlBody>
        </Mjml>,
        { validationLevel: 'soft' }
    );
    // if (errors) {
    //     return res.status(500).json({
    //         errors,
    //     });
    // }
    return res.send(html)
}