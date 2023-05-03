import { FC } from 'react';
import Button from '../../components/button/Button';
import startPollingOnEndpoint from '../../utils/startPollingOnEndpoint';

const BASE_URL = 'https://GraFx-Training-ST22.chili-publish.online/grafx/api/v1/';
const ENVIRONMENT = 'GraFx-Training-ST22';
const TEMPLATE_ID = '79566843-64d4-47d4-bee3-ded98745421d';

type AuthenticatedActionsProps = {
    accessToken: string;
};

type GenerateAnimationResponse = {
    data: {
        taskId: string;
    };
    links: {
        taskInfo: string;
    };
};


type ApiError = {
    type: string;
    title: string;
    status: string;
    detail: string;
    exceptionDetails?: string;
};
const AuthenticatedActions: FC<AuthenticatedActionsProps> = (props) => {
    const { accessToken } = props;

    const save = async () => {
        const document = await (await window.SDK.document.getCurrentDocumentState()).data;

        if (document) {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
                body: document,
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

    const download = (url: string, extension: string) => {
        if (url) {
            // TODO use signed URLs to download result as before. We cannot use the anchor element
            // trick directly because the download request currently requires the auth header
            const fetchAsync: () => Promise<void> = async () => {
                const config = { headers: { Authorization: `Bearer ${accessToken}` } };
                const response = await fetch(url, config);

                if (response.status !== 200) return;

                const objectUrl = window.URL.createObjectURL(await response.blob());
                const a = Object.assign(document.createElement('a'), {
                    href: objectUrl,
                    style: 'display: none',
                    download: `export.${extension}`,
                });
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(objectUrl);
            };

            fetchAsync();
        }
    }

    const exportDoc = async (exportType: 'gif'|'png' ) => {
        const document = await (await window.SDK.document.getCurrentDocumentState()).data;

        if (document) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: document,
            };
            const appendix = exportType === 'gif' ? 'animation?outputType=gif' : 'image?outputType=png'
            const url = `${BASE_URL}environment/${ENVIRONMENT.toLocaleLowerCase()}/output/${appendix}`;

            const httpResponse = await fetch(url, requestOptions)
            

            const response: GenerateAnimationResponse | ApiError = (await httpResponse.json()) as
            | GenerateAnimationResponse
            | ApiError;

        if ('status' in response) {
            const err = response as ApiError;
            console.error({
                status: Number.parseInt(err.status),
                error: err.detail,
                success: false,
                parsedData: null,
            });
        }

        const data = response as GenerateAnimationResponse;
        const pollingResult = await startPollingOnEndpoint(data.links.taskInfo, accessToken);

        if (pollingResult === null) {
            return console.error({ status: 500, error: 'Error during polling', success: false, parsedData: null });
        }

        download(pollingResult.links.download, exportType) 
        }
    };
    return (
        <section>
            <Button onClick={() => exportDoc('gif')}>Export to GIF</Button>
            <Button onClick={() => exportDoc('png')}>Export to PNG</Button>
            <Button onClick={() => save()}>Save template</Button>
        </section>
    );
};

export default AuthenticatedActions;
