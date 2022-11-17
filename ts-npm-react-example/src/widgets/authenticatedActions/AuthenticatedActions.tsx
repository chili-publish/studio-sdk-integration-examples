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

    const exportGif = async () => {
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
            const url = `${BASE_URL}environment/${ENVIRONMENT.toLocaleLowerCase()}/output/animation?outputType=gif`;

            const httpResponse = await fetch(url, requestOptions)
            

            const response: GenerateAnimationResponse | ApiError = (await httpResponse.json()) as
            | GenerateAnimationResponse
            | ApiError;

        if ('status' in response) {
            const err = response as ApiError;
            return {
                status: Number.parseInt(err.status),
                error: err.detail,
                success: false,
                parsedData: null,
            };
        }

        const data = response as GenerateAnimationResponse;
        const pollingResult = await startPollingOnEndpoint(data.links.taskInfo, accessToken);

        if (pollingResult === null) {
            return { status: 500, error: 'Error during polling', success: false, parsedData: null };
        }

        return {
            status: 200,
            error: null,
            success: true,
            parsedData: pollingResult.links.download,
            data: pollingResult.links.download,
        };
        }
    };
    return (
        <section>
            <Button onClick={() => exportGif()}>Export to GIF</Button>
            <Button onClick={() => exportGif()}>Export to PNG</Button>
            <Button onClick={() => save()}>Save template</Button>
        </section>
    );
};

export default AuthenticatedActions;
