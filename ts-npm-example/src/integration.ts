import ChiliEditorSDK, { Frame } from "@chili-publish/editor-sdk";
import type {
  FrameLayoutType,
  FrameType,
  LayoutWithFrameProperties,
  ToolType,
} from "@chili-publish/editor-sdk";

declare global {
  interface Window {
    playAnimation: () => void;
    useSelectTool: () => void;
    useHandTool: () => void;
    useZoomTool: () => void;
    onLayoutClick: (id: string) => void;
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
  SDK.animation.playAnimation();
};

// Functions on frame selection
const onFrameContentChange = (selectedFrameContent: Frame) => {
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
window.onLayoutClick = (id: string) => {
  SDK.layout.selectLayout(id);
};
// Function on when a layout has been changed
const onLayoutsChanged = (
  layouts: LayoutWithFrameProperties[],
  selectedLayout: string
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
