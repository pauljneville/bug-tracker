
import {
    render,
    Mjml,
    MjmlBody,
    MjmlDivider,
    MjmlImage,
    MjmlText,
} from 'mjml-react';

function LinkToPost({ socialImage, title, href }) {
    return (
        <>
            <MjmlImage href={href} src={socialImage} />
            <MjmlText fontSize="21px">
                <a href={href}>{title}</a>
            </MjmlText>
            <MjmlDivider />
        </>
    );
}

export default LinkToPost;