import ChiliEditorSDK from "@chili-publish/editor-sdk";
// @ts-ignore
import Sketchfab from '@sketchfab/viewer-api';

declare global {
  interface Window {
    sketchFabToggleAR: () => void;
    sketchFabSetTexture: () => void;
    sketchFabFollowEditor: () => void;
  }
}

const onEditorStateChanged = async function () {
  if (trackEditor){
    await window.sketchFabSetTexture();
  }
}

window.sketchFabToggleAR = async () => {
  var api = await sketchFabApi;
  api.startAR(function (err: any) {
    if (!err) {
      window.console.log('Starting AR');
    }
  })
};

window.sketchFabFollowEditor = async () => {
  trackEditor = !trackEditor;
}

window.sketchFabSetTexture = async () => {
  const sf = await sketchFabApi;
  const result = await SDK.layout.getSelectedLayoutSnapshot();
  const url = await blobToDataURL(new Blob([result], { type: "image/png" }));

  sf.updateTexture(url, "11f2dc4d5b68423bb482c252e445f515", function (err: any, textureUid: any) {
    if (!err) {
      window.console.log('Replaced texture with UID', textureUid);
    }
  });
};

function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = _e => resolve(reader.result as string);
    reader.onerror = _e => reject(reader.error);
    reader.onabort = _e => reject(new Error("Read aborted"));
    reader.readAsDataURL(blob);
  });
}

// This is the promise code, so this is the useful bit
function ensureSketchfabIsSet(timeout: number): Promise<any> {
  var iframe = document.getElementById('api-frame');
  // sketchfab resource id (bag of chips)
  var uid = '7116fcdfbc3b4ad0bd578d6728915f84';

  // By default, the latest version of the viewer API will be used.
  var client = new Sketchfab(iframe);

  // Alternatively, you can request a specific version.
  // var client = new Sketchfab( '1.12.1', iframe );
  client.init(uid, {
    success: function onSuccess(api: any) {
      api.start();
      api.addEventListener('viewerready', function () {

        // API is ready to use
        sketchFabApi = api;
      });
    },
    error: function onError() {
      console.log('Viewer error');
    }
  });

  var start = Date.now();
  return new Promise(waitForSketchfab); // set the promise object within the ensureFooIsSet object

  // waitForFoo makes the decision whether the condition is met
  // or not met or the timeout has been exceeded which means
  // this promise will be rejected
  function waitForSketchfab(resolve: any, reject: any) {
    if (sketchFabApi)
      resolve(sketchFabApi);
    else if (timeout && (Date.now() - start) >= timeout)
      reject(new Error("timeout"));
    else
      setTimeout(waitForSketchfab.bind(this, resolve, reject), 30);
  }
}

var trackEditor = false;
var sketchFabApi: Promise<any> = ensureSketchfabIsSet(5000);

// Initialise SDK
const SDK = new ChiliEditorSDK({
  editorId: "chili-editor-example",
  onStateChanged: onEditorStateChanged,
});

// Initialise editor
SDK.loadEditor();