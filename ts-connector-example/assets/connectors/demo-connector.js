class DemoConnector {
    constructor(runtime) {
        this.runtime = runtime;
    }
    async query(options, context) {
        var data = [
            { id: 'demo-1', type: 0, name: 'Demo 1', relativePath: '/root', metaData: {} },
            { id: 'demo-2', type: 0, name: 'Demo 2', relativePath: '/root', metaData: {} },
            { id: 'demo-3', type: 0, name: 'Demo 3', relativePath: '/root', metaData: {} },
        ];
        if (context['extraItem']) {
            data = [...data, { id: 'demo-4', type: 0, name: 'Demo 4 (extra)', relativePath: '/root', metaData: {} }];
        }
        if (options.filter) {
            this.runtime.logError(options.filter[0]);
            data = data.filter(item => { item.name.toLowerCase().includes(options.filter[0].toLowerCase()); });
        }
        return Promise.resolve({ pageSize: data.length, data: data, links: { nextPageToken: '' } });
    }
    async download(id, previewType, context) {
        return (await this.runtime.fetch(`https://dummyimage.com/600x400/000/fff&text=${id}`, {})).arrayBuffer;
    }
    upload(name, blob) {
        throw new Error('Method not implemented.');
    }
    remove(id) {
        throw new Error('Method not implemented.');
    }
    copy(id, newName) {
        throw new Error('Method not implemented.');
    }
    getQueryOptions() {
        return ['extraItem'];
    }
    getDownloadOptions() {
        return [];
    }
    getCapabilities() {
        return {
            copy: false,
            filtering: true,
            query: true,
            remove: false,
            upload: false
        };
    }
}