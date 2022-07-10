// mjml used to generate compatible email html. Mailjet markup language
//
// source https://www.joshwcomeau.com/react/wonderful-emails-with-mjml-and-mdx/
//
// 

// pages/api/generate-email.js
import compileMjml from 'mjml'
export default async function generateEmail(req, res) {
  const html = compileMjml(`
    <mjml>
      <mj-body width="500">
        <mj-section background-color="#EFEFEF">
          <mj-column>
            <mj-text font-size="20px">
              Hello World!
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `)
  return res.send(html)
}