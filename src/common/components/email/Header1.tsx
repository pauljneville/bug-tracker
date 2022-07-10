
import {
    render,
    Mjml,
    MjmlBody,
    MjmlSection,
    MjmlColumn,
    MjmlText,
} from 'mjml-react';

function Header1({ children }) {
    return (
        <MjmlText
            fontSize="24px"
            lineHeight={1.5}
        >
            {children}
        </MjmlText>
    );
}

export default Header1;