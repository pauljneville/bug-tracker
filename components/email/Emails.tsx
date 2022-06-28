import {
    render,
    Mjml,
    MjmlBody,
    MjmlSection,
    MjmlColumn,
    MjmlText,
} from 'mjml-react';
import Template from './Template';

function Email001() {
    return (
        <Template>
            <MjmlText>
                Good afternoon!
            </MjmlText>
            <MjmlText>
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
            </MjmlText>
            <MjmlText>
                Until next time!
            </MjmlText>
            <MjmlText>
                —Josh
            </MjmlText>
        </Template>
    )
}

export default Email001;