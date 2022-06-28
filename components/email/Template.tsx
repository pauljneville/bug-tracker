// mjml-react template for simple email

import {
    render,
    Mjml,
    MjmlBody,
    MjmlSection,
    MjmlColumn,
    MjmlText,
    Hero,
} from 'mjml-react';

function Template({ children }) {
    return (
        <Mjml>
            <MjmlBody width={500}>
                {/* Custom decorative component */}
                {/* <Hero /> */}
                {/* Content for the email goes here */}
                <MjmlSection backgroundColor="#EFEFEF">
                    <MjmlColumn>
                        {children}
                    </MjmlColumn>
                </MjmlSection>
                {/* Footer stuff, like the unsubscribe link */}
                <MjmlSection>
                    <MjmlColumn>
                        <MjmlText>
                            <a href="{{unsubscribe_url}}">
                                Unsubscribe
                            </a>
                        </MjmlText>
                    </MjmlColumn>
                </MjmlSection>
            </MjmlBody>
        </Mjml>
    )
}

export default Template;