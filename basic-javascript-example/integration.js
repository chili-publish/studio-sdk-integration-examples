// Initialise SDK
const SDK = new window.ChiliEditorSDK.SDK({
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
const useSelectTool = () => {
  SDK.tool.setSelectTool();
};

const useHandTool = () => {
  SDK.tool.setHandTool();
};

const useZoomTool = () => {
  SDK.tool.setZoomTool();
};

const onToolChanged = (tool) => {
  if (tool) {
    const toolLabel = document.getElementById("toolLabel");
    toolLabel.textContent = "Selected tool: " + tool;
  }
};

// Play animtion
const playAnimation = async () => {
  SDK.animation.playAnimation();
};

// Functions on frame selection
const onFrameContentChange = (selectedFrameContent) => {
  if (selectedFrameContent) {
    const frameTitleInput = document.getElementById("frameTitle");
    frameTitleInput.setAttribute("value", selectedFrameContent.frameName);

    const frameTypeInput = document.getElementById("frameType");
    frameTypeInput.setAttribute("value", selectedFrameContent.frameType);
  }
};
const onFrameLayoutChange = (selectedFrameLayout) => {
  if (selectedFrameLayout) {
    const frameXInput = document.getElementById("frameX");
    frameXInput.setAttribute("value", selectedFrameLayout.x.value);

    const frameYInput = document.getElementById("frameY");
    frameYInput.setAttribute("value", selectedFrameLayout.y.value);

    const frameWidthInput = document.getElementById("frameWidth");
    frameWidthInput.setAttribute("value", selectedFrameLayout.width.value);

    const frameHeightInput = document.getElementById("frameHeight");
    frameHeightInput.setAttribute("value", selectedFrameLayout.height.value);
  }
};

// Select a layout
const onLayoutClick = (id) => {
  SDK.layout.selectLayout(id);
};
// Function on when a layout has been changed
const onLayoutsChanged = (layouts, selectedLayout) => {
  if (layouts && layouts.length) {
    const listContainer = document.getElementById("layoutList");
    // Empty list on rerender
    listContainer.innerHTML = "";

    // loop all layouts and render them + add dynamic onClick handler
    layouts.map((layout) => {
      const item = document.createElement("li");
      item.setAttribute("class", "layout-item");
      item.setAttribute("id", layout.layoutId);
      if (layout.layoutId === selectedLayout) {
        item.classList = `${item.classList} selected`;
      }
      item.setAttribute("onclick", `onLayoutClick(${layout.layoutId})`);
      const itemText = document.createTextNode(layout.layoutName);
      item.appendChild(itemText);
      listContainer.appendChild(item);
    });
  }
};
