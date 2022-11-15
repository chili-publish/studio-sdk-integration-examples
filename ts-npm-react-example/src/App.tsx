import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/button/Button";
import EditorSDK, { ToolType } from "@chili-publish/editor-sdk";
import EditorContainer from "./components/editorContainer/EditorContainer";
import type { LayoutListItemType } from "@chili-publish/editor-sdk/lib/types/LayoutTypes";
import LayoutList from "./widgets/layoutList/LayoutList";
import ToolSelector from "./widgets/toolSelector/ToolSelector";
import PlayAnimationButton from "./widgets/animation/PlayAnimationButton";

const EDITOR_ID = "chili-editor-example";

declare global {
  interface Window {
    SDK: EditorSDK;
  }
}

const App = () => {
  const [layouts, setLayouts] = useState<LayoutListItemType[]>([]);
  const [selectedTool, setSelectedTool] = useState<ToolType>(ToolType.SELECT);

  console.log(selectedTool);

  // Runs on first render
  useEffect(() => {
    // Fixes hot reload multiple instances issue
    if (!window.SDK) {
      const SDK = new EditorSDK({
        // hook into a layoutchange
        onLayoutsChanged: (changedLayouts) => setLayouts(changedLayouts),
        onSelectedToolChanged: (changedTool) => setSelectedTool(changedTool),
        editorId: EDITOR_ID,
      });
  
      // Connect to ths SDK
      // Binding the SDK object to the window, we have an easy way to access it throughout the application
      // Since th editor-engine holds the state, it's not necessary from the start to have a complex state management system
      window.SDK = SDK;
  
      // Load in the editor without any document
      window.SDK.loadEditor();
    }
    
  }, []);

  return (
    <div className="App">
      <h1 className="page-title">Basic Integrator Demo | CHILI publish</h1>
      <div className="container">
        {/* editor div here */}
        <EditorContainer editorId={EDITOR_ID} />
        {/* <!-- editor controls here --> */}
        <div className="editor-controls">
          <ToolSelector selectedTool={selectedTool} />
          <PlayAnimationButton />
          <div className="panels-container">
            <section className="left-panel">
              <article className="frame-content">
                <h2>Frame content</h2>
                <div className="frame-row">
                  <label htmlFor="frame-title">Frame name:</label>
                  <input id="frameTitle" name="frame-title" value="" disabled />
                </div>
                <div className="frame-row">
                  <label
                    htmlFor="
                    frame-type"
                  >
                    Frame preview:
                  </label>
                  <input id="frameType" name="frame-type" value="" disabled />
                </div>
              </article>
              <article className="frame-layout">
                <h2>Frame layout</h2>
                <div className="frame-row">
                  <div>
                    <label htmlFor="frame-x">x:</label>
                    <input
                      id="frameX"
                      name="frame-x"
                      value=""
                      type="number"
                      disabled
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="
                      frame-y"
                    >
                      y:
                    </label>
                    <input
                      id="frameY"
                      name="frame-y"
                      value=""
                      type="number"
                      disabled
                    />
                  </div>
                </div>
                <div className="frame-row">
                  <div>
                    <label
                      htmlFor="
                      frame-width"
                    >
                      Width:
                    </label>
                    <input
                      id="frameWidth"
                      name="frame-width"
                      value=""
                      type="number"
                      disabled
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="
                      frame-height"
                    >
                      Height:
                    </label>
                    <input
                      id="frameHeight"
                      name="frame-height"
                      value=""
                      type="number"
                      disabled
                    />
                  </div>
                </div>
              </article>
            </section>
            <section className="right-panel">
              <article className="layout-list">
                <h2>Layouts</h2>
                <LayoutList layouts={layouts} />
              </article>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
