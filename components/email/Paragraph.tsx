
import {
    render,
    Mjml,
    MjmlBody,
    MjmlSection,
    MjmlColumn,
    MjmlText,
} from 'mjml-react';

function Paragraph({ children }) {
    return (
        <MjmlText
            fontSize="18px"
            lineHeight={1.5}
        >
            {children}
        </MjmlText>
    );
}

export default Paragraph;