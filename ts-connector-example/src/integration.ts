import ChiliEditorSDK, { FrameTypeEnum, MetaData } from "@chili-publish/editor-sdk";
import { ConnectorRegistrationSource} from "@chili-publish/editor-sdk/lib/types/ConnectorTypes";

declare global {
  interface Window {
    onMediaItemClick: (item: string, frameId: string) => Promise<void>;
  }
}

const queryInput: HTMLInputElement = document.getElementById('connectorQuery')! as HTMLInputElement;
const extraInput: HTMLInputElement = document.getElementById('connectorQueryExtra')! as HTMLInputElement;

// Initialise SDK
const SDK = new ChiliEditorSDK({
  editorId: "chili-editor-example",
});

// Initialise editor
SDK.loadEditor();

// configure connector
configureConnector();

async function configureConnector() {
  // load empty document
  await SDK.document.loadDocument('{}');

  // register the custom connector
  const doc = { id: 'demo-connector',  source: ConnectorRegistrationSource.url, url: './assets/connectors/demo-connector.json' };

  await SDK.connector.registerConnector(doc);

  // add a new frame at location
  const frame = await SDK.frame.addFrame(FrameTypeEnum.image, 0, 0, 240, 160);
  const newFrameId = frame.parsedData.toString();

  // set frame image content to use demo connector
  await SDK.frame.setImageFromConnector(newFrameId, 'demo-connector', '240 x 160');

  // attach to input
  const downloadInput: HTMLInputElement = document.getElementById('frameText')! as HTMLInputElement;
  downloadInput.addEventListener('input', function (e) {
    // update the frame content
    SDK.frame.setImageFromConnector(newFrameId, 'demo-connector', downloadInput.value);
  });

  const onQueryChange = () => {
    // update the frame content
    let queryContext = new ConnectorMetaData();

    if (extraInput.checked) {
      // this is a demo of adding additional context to the connector. These extra options can be passed
      // manually like this, or be directly tied to the variables. To connect a connector query option 
      // to a variable, we need to define a mapping like { 'query.[option]', 'var.[variableId]' }
      queryContext.extraItem = '1';
    }

    // call the query method of the connector, using the variable input
    SDK.mediaConnector.query('demo-connector', { filter: [queryInput.value] }, queryContext).then((result) => {
      // allow result inspection
      console.log(result);

      if (result.success) {
        const listContainer = document.getElementById("queryResultList");
        // Empty list on rerender
        listContainer.innerHTML = "";

        // loop all media results and render them + add dynamic onClick handler
        result.parsedData.data.map((mediaItem) => {
          const item = document.createElement("li");
          item.setAttribute("class", "media-item");
          item.setAttribute("id", mediaItem.id.toString());
          item.setAttribute("onclick", `onMediaItemClick('${mediaItem.name}', ${newFrameId})`);
          const itemText = document.createTextNode(`${mediaItem.id} -  ${mediaItem.name}`);
          item.appendChild(itemText);
          listContainer.appendChild(item);
        });
      }
    });
  };

  // attach to input
  queryInput.addEventListener('input', onQueryChange);
  extraInput.addEventListener('change', onQueryChange);
}

window.onMediaItemClick = async (item: string, frameId: string) => {
  await SDK.frame.setImageFromConnector(frameId, 'demo-connector', item);
}

class ConnectorMetaData implements MetaData {
  [key: string]: string;
}