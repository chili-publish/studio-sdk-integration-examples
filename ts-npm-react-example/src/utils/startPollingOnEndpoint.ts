export type GenerateAnimationTaskPollingResponse = {
    data: {
        taskId: string;
    };
    links: {
        download: string;
    };
};

/**
 * This method will call an external api endpoint, untill the api endpoint returns a status code 200
 * @param endpoint api endpoint to start polling on
 * @returns true when the endpoint call has successfully been resolved
 */
 const startPollingOnEndpoint = async (
    endpoint: string,
    token: string,
): Promise<GenerateAnimationTaskPollingResponse | null> => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: null,
        };
        if (token) {
            config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
        }
        const httpResponse = await fetch(endpoint, config);

        if (httpResponse?.status === 202) {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            return await startPollingOnEndpoint(endpoint, token);
        }
        if (httpResponse?.status === 200) {
            return (await httpResponse.json()) as GenerateAnimationTaskPollingResponse;
        }
        return null;
    } catch (err) {
        return null;
    }
};

export default startPollingOnEndpoint