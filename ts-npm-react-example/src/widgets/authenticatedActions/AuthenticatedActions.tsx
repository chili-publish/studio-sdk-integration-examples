import { FC } from 'react';
import Button from '../../components/button/Button';

const BASE_URL = 'https://GraFx-Training-ST22.chili-publish.online/grafx/api/v1/';
const ENVIRONMENT = 'GraFx-Training-ST22';
const TEMPLATE_ID = '79566843-64d4-47d4-bee3-ded98745421d';

type AuthenticatedActionsProps = {
    accessToken: string;
};

const AuthenticatedActions: FC<AuthenticatedActionsProps> = (props) => {
    const { accessToken } = props;
    const save = async () => {
        const document = await (await window.SDK.document.getCurrentDocumentState()).parsedData;

        if (document) {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
                body: JSON.stringify(document),
            };
            const url = `${BASE_URL}environment/${ENVIRONMENT.toLocaleLowerCase()}/templates/${TEMPLATE_ID}`;
    
            await fetch(url, requestOptions)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        
    };
    return (
        <section>
            <Button onClick={() => save()}>Export to GIF</Button>
            <Button onClick={() => save()}>Export to PNG</Button>
            <Button onClick={() => save()}>Save template</Button>
        </section>
    );
};

export default AuthenticatedActions;
