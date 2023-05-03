//Can be parsed by using https://www.freeformatter.com/json-escape.html#before-output f.e.
class DemoConnector {
  constructor(runtime) {
    this.runtime = runtime;
  }
  async query(options, context) {
    const data = await this.runtime.fetch(
      "https://api.imgflip.com/get_memes",
      {}
    );

    const newArray = [];

    JSON.parse(data.text).data.memes.forEach((meme) =>
      newArray.push({
        id: meme.url,
        name: meme.name,
        relativePath: "/Root",
        type: 0,
        metaData: {
          "width": String(meme.width),
          "height": String(meme.height)
        }
      })
    );

    return Promise.resolve({
      pageSize: newArray.length,
      data: newArray,
      links: { nextPageToken: "" },
    });
  }
  async download(id, previewType, context) {
    return (
      await this.runtime.fetch(
        id,
        {}
      )
    ).arrayBuffer;
  }
  upload(name, blob) {
    throw new Error("Method not implemented.");
  }
  remove(id) {
    throw new Error("Method not implemented.");
  }
  copy(id, newName) {
    throw new Error("Method not implemented.");
  }
  getQueryOptions() {
    return ["extraItem"];
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
      upload: false,
    };
  }
}
