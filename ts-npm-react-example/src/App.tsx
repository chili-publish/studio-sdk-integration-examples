import React, { useEffect, useState } from "react";
import "./App.css";

import EditorSDK, { FrameTypeEnum, ToolType } from "@chili-publish/editor-sdk";
import { ConnectorRegistrationSource } from "@chili-publish/editor-sdk/lib/types/ConnectorTypes";

import EditorContainer from "./components/editorContainer/EditorContainer";
import type { LayoutListItemType } from "@chili-publish/editor-sdk/lib/types/LayoutTypes";
import LayoutList from "./widgets/layoutList/LayoutList";
import ToolSelector from "./widgets/toolSelector/ToolSelector";
import PlayAnimationButton from "./widgets/animation/PlayAnimationButton";
import RandomMemeList from "./widgets/randomMemeList/RandomMemeList";

const EDITOR_ID = "chili-editor-example";

declare global {
  interface Window {
    SDK: EditorSDK;
  }
}

const App = () => {

  const [isConnectorLoaded, setIsConnectorLoaded] = useState(false)
  const [layouts, setLayouts] = useState<LayoutListItemType[]>([]);
  const [selectedTool, setSelectedTool] = useState<ToolType>(ToolType.SELECT);

  const registerConnector = async () => {
    // load empty document
    window.SDK.document.loadDocument('{}')


    // register the custom connector
    const doc = {
      id: "demo-connector",
      source: ConnectorRegistrationSource.url,
      url: "./assets/connectors/demo-connector.json",
    };

    await window.SDK.connector.registerConnector(doc);
    const connectorState = await window.SDK.connector.getState('demo-connector')
    if (connectorState.success) {
      setIsConnectorLoaded(true)
    }
    console.log(await window.SDK.mediaConnector.query('demo-connector', {}, {}))
  };

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

      registerConnector();
    }
  }, []);

  return (
    <div className="App">
      <h1 className="page-title">CHILI Meme Studio <img src="https://cdnepgrafxstudioprd.azureedge.net/shared/assets/chili-studio-logo.svg" alt="studio-logo"/></h1>
      <div className="container">
      <ToolSelector selectedTool={selectedTool} />
        {/* editor div here */}
        <EditorContainer editorId={EDITOR_ID} />
        {/* <!-- editor controls here --> */}
        <div className="editor-controls">
          <PlayAnimationButton />
          <section className="right-panel">
            <h2>Layouts</h2>
            <LayoutList layouts={layouts} />
          </section>
          <section className="right-panel">
            <h2>Memes</h2>
            <RandomMemeList canLoad={isConnectorLoaded} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default App;
