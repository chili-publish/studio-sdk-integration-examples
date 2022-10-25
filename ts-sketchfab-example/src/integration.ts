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
    playAnimation: () => void;
    useSelectTool: () => void;
    useHandTool: () => void;
    useZoomTool: () => void;
    onLayoutClick: (id: number) => void;
  }
}

// Initialise SDK
const SDK = new ChiliEditorSDK({
  onStateChanged: (state) => {
    onLayoutsChanged(state.layouts, state.selectedLayoutId);
  },
  onSelectedFrameLayoutChanged: (selectedFrameLayout) => {
    onFrameLayoutChange(selectedFrameLayout);
  },
  onSelectedFrameContentChanged: (selectedFrameContent) => {
    onFrameContentChange(selectedFrameContent);
  },
  onSelectedToolChanged: (tool) => {
    onToolChanged(tool);
  },
  editorId: "chili-editor-example",
});

// Initialise editor
SDK.loadEditor();

// Tool selection and change
window.useSelectTool = () => {
  SDK.tool.setSelectTool();
};

window.useHandTool = () => {
  SDK.tool.setHandTool();
};

window.useZoomTool = () => {
  SDK.tool.setZoomTool();
};

const onToolChanged = (tool: ToolType) => {
  if (tool) {
    const toolLabel = document.getElementById("toolLabel");
    toolLabel.textContent = "Selected tool: " + tool;
  }
};

// Play animtion
window.playAnimation = async () => {
  var sf = await ensureSketchfabIsSet(5000);
  sf.getTextureList(function (err: any, textures: any) {
    if (!err) {
      window.console.log(textures);
    }
  });

  sf.updateTexture('https://dummyimage.com/600x400/abc/fff', "11f2dc4d5b68423bb482c252e445f515", function (err: any, textureUid: any) {
    if (!err) {
      window.console.log('Replaced texture with UID', textureUid);
    }
  });
};

// Functions on frame selection
const onFrameContentChange = (selectedFrameContent: FrameType) => {
  if (selectedFrameContent) {
    const frameTitleInput = document.getElementById("frameTitle");
    frameTitleInput.setAttribute("value", selectedFrameContent.frameName);

    const frameTypeInput = document.getElementById("frameType");
    frameTypeInput.setAttribute("value", selectedFrameContent.frameType);
  }
};
const onFrameLayoutChange = (selectedFrameLayout: FrameLayoutType) => {
  if (selectedFrameLayout) {
    const frameXInput = document.getElementById("frameX");
    frameXInput.setAttribute("value", selectedFrameLayout.x.value.toString());

    const frameYInput = document.getElementById("frameY");
    frameYInput.setAttribute("value", selectedFrameLayout.y.value.toString());

    const frameWidthInput = document.getElementById("frameWidth");
    frameWidthInput.setAttribute(
      "value",
      selectedFrameLayout.width.value.toString()
    );

    const frameHeightInput = document.getElementById("frameHeight");
    frameHeightInput.setAttribute(
      "value",
      selectedFrameLayout.height.value.toString()
    );
  }
};

// Select a layout
window.onLayoutClick = (id: number) => {
  SDK.layout.selectLayout(id);
};
// Function on when a layout has been changed
const onLayoutsChanged = (
  layouts: LayoutWithFrameProperties[],
  selectedLayout: number
) => {
  if (layouts && layouts.length) {
    const listContainer = document.getElementById("layoutList");
    // Empty list on rerender
    listContainer.innerHTML = "";

    // loop all layouts and render them + add dynamic onClick handler
    layouts.map((layout) => {
      const item = document.createElement("li");
      item.setAttribute("class", "layout-item");
      item.setAttribute("id", layout.layoutId.toString());
      if (layout.layoutId === selectedLayout) {
        item.className = `${item.classList} selected`;
      }
      item.setAttribute("onclick", `onLayoutClick(${layout.layoutId})`);
      const itemText = document.createTextNode(layout.layoutName);
      item.appendChild(itemText);
      listContainer.appendChild(item);
    });
  }
};

var sketchFabApi: any = null;

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
