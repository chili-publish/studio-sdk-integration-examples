import html2canvas from 'html2canvas';
import ChiliEditorSDK from "@chili-publish/editor-sdk";
import type {
  FrameLayoutType,
  FrameType,
  LayoutWithFrameProperties,
  ToolType,
} from "@chili-publish/editor-sdk";

// @ts-ignore
import Sketchfab from '@sketchfab/viewer-api';

declare global {
  interface Window {
    sketchFabLoad: () => void;
    sketchFabToggleAR: () => void;
    sketchFabSetTexture: () => void;
    sketchFabSetTextureVideo: () => void;
  }
}

// Initialise SDK
const SDK = new ChiliEditorSDK({
  editorId: "chili-editor-example",
  editorLink: "https://storageeditor2.blob.core.windows.net/editor/EDT-635/web"
});

// Initialise editor
SDK.loadEditor();


window.sketchFabToggleAR = async () => {

  var api = await sketchFabApi;
  api.startAR(function (err:any) {
    if (!err) {
      window.console.log('Starting AR');
    }
  })
};

window.sketchFabSetTexture = async () => {
  
  var sf = await sketchFabApi;  
  
  const privateApi = await SDK.editorAPI;
  //@ts-ignore
  const result = (await privateApi.getPageSnapshot()) as Uint8Array;

  console.log(result);

  const url = await blobToDataURL(new Blob([result], { type: "image/png" }));

  console.log(url);

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

const sketchFabSetTextureVideo = (tool: ToolType) => {
  if (tool) {
    const toolLabel = document.getElementById("toolLabel");
    toolLabel.textContent = "Selected tool: " + tool;
  }
};

// Play animtion
window.sketchFabLoad = async () => {
  var sf = await sketchFabApi;
  sf.getTextureList(function (err: any, textures: any) {
    if (!err) {
      window.console.log(textures);
    }
  });
};

var sketchFabApi: any = ensureSketchfabIsSet(5000);

// This is the promise code, so this is the useful bit
function ensureSketchfabIsSet(timeout: number): Promise<any> {
  var iframe = document.getElementById('api-frame');
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
        // Insert your code here
        console.log('Viewer is ready');
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
