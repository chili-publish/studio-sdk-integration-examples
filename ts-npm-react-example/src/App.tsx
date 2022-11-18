import React, { useEffect, useState } from 'react';
import './App.css';

import EditorSDK, { FrameTypeEnum, ToolType } from '@chili-publish/editor-sdk';
import { ConnectorRegistrationSource } from '@chili-publish/editor-sdk/lib/types/ConnectorTypes';

import EditorContainer from './components/editorContainer/EditorContainer';
import type { LayoutListItemType } from '@chili-publish/editor-sdk/lib/types/LayoutTypes';
import LayoutList from './widgets/layoutList/LayoutList';
import ToolSelector from './widgets/toolSelector/ToolSelector';
import PlayAnimationButton from './widgets/animation/PlayAnimationButton';
import RandomMemeList from './widgets/randomMemeList/RandomMemeList';
import AuthenticatedActions from './widgets/authenticatedActions/AuthenticatedActions';

const EDITOR_ID = 'chili-editor-example';

const _A_T =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIzTzViUFFqV2pBWjNsd1pLd1FSaSJ9.eyJodHRwczovL2NoaWxpLXB1Ymxpc2guY29tL3JvbGVzIjpbImE0YzBhYzRiLWFlYmYtNDcxMC1iNDU0LWJmY2UxOTZlODQyZXxFQSJdLCJpc3MiOiJodHRwczovL2xvZ2luLmNoaWxpZ3JhZnguY29tLyIsInN1YiI6ImF1dGgwfDYzNzUwNzhjMGEwN2UwOGJjZjA1YWY5YiIsImF1ZCI6Imh0dHBzOi8vY2hpbGlncmFmeC5jb20iLCJpYXQiOjE2Njg3ODcyMTMsImV4cCI6MTY2ODg3MzYxMywiYXpwIjoiT3EwYTlKazJleG1iemc3WjZxaGNHdUJ1WFdHQ3VodmsiLCJndHkiOiJwYXNzd29yZCJ9.qV2tfUG1ybDBgzbrq-rgR1gKMh43RKab-m2TAyN-EDQu9-gA4soxVcZbfRgkwyuKk6qpsNw8dJnRDAtIuG7yFHS_7YsRoAX-1GXmbEkdKCzd2qjMzjSe0AHt1fXH95FNOBiRYR56lxq0PI2j2-p0MrsFVZu6ktiNdRAoSgRQ5BRDHx3z3hTjs2fqqzAM5iFzj5QYCl9y95S8c8DnMLLo1DZ6fLB0ZvbeLU6VVkv4G-FgzHseoad6BQ83IW04t2ypbIu-vdgCBxt6LYhlqQkNV_erG1uXobxnZNJKuOGeIaqq7b_4Wf2SLZlSkycMCXRDV2Hc0XXenbGeR-6zMOEhYA';

declare global {
    interface Window {
        SDK: EditorSDK;
    }
}

const App = () => {
    const [isConnectorLoaded, setIsConnectorLoaded] = useState(false);
    const [layouts, setLayouts] = useState<LayoutListItemType[]>([]);
    const [selectedTool, setSelectedTool] = useState<ToolType>(ToolType.SELECT);

    const loadDocument = async () => {
        window.SDK.document.loadDocument(
            '{"selectedLayoutId":"0","pages":[{"pageId":"0","pageNumber":0,"frames":[{"frameId":"2","frameName":"frameDown","frameType":"text","textContent":"{\\"textFlow\\":[{\\"type\\":\\"paragraph\\",\\"paragraphStyleId\\":\\"eb13ec3d-f335-47e5-919e-291f85aecce5\\"},{\\"type\\":\\"span\\"},{\\"type\\":\\"variable\\",\\"id\\":\\"dc5c65ef-5e63-47f9-bdaa-f4f2970c552d\\",\\"name\\":\\"textDown\\"}]}","paddingLeft":0,"paddingTop":0,"paddingRight":0,"paddingBottom":0,"numberOfColumns":1,"columnGap":5,"textDirection":"leftToRight","flowDirection":"horizontal","verticalAlign":"top","textStroke":false,"textStrokeWeight":1,"textStrokeColor":0,"hasClippingPath":false,"blendMode":"srcOver"},{"frameId":"4","frameName":"frameUpBB","frameType":"text","textContent":"{\\"textFlow\\":[{\\"type\\":\\"paragraph\\",\\"paragraphStyleId\\":\\"02c83d47-0e8e-4a6d-a90d-1400e610db60\\"},{\\"type\\":\\"span\\"},{\\"type\\":\\"variable\\",\\"id\\":\\"498207a6-a22f-4e4b-ad68-64924bbba600\\",\\"name\\":\\"textUp\\"}]}","paddingLeft":0,"paddingTop":0,"paddingRight":0,"paddingBottom":0,"numberOfColumns":1,"columnGap":5,"textDirection":"leftToRight","flowDirection":"horizontal","verticalAlign":"top","textStroke":false,"textStrokeWeight":1,"textStrokeColor":0,"hasClippingPath":false,"blendMode":"srcOver"},{"frameId":"3","frameName":"frameUpBT","frameType":"text","textContent":"{\\"textFlow\\":[{\\"type\\":\\"paragraph\\",\\"paragraphStyleId\\":\\"02c83d47-0e8e-4a6d-a90d-1400e610db60\\"},{\\"type\\":\\"span\\"},{\\"type\\":\\"variable\\",\\"id\\":\\"498207a6-a22f-4e4b-ad68-64924bbba600\\",\\"name\\":\\"textUp\\"}]}","paddingLeft":0,"paddingTop":0,"paddingRight":0,"paddingBottom":0,"numberOfColumns":1,"columnGap":5,"textDirection":"leftToRight","flowDirection":"horizontal","verticalAlign":"top","textStroke":false,"textStrokeWeight":1,"textStrokeColor":0,"hasClippingPath":false,"blendMode":"srcOver"},{"frameId":"5","frameName":"frameUpBL","frameType":"text","textContent":"{\\"textFlow\\":[{\\"type\\":\\"paragraph\\",\\"paragraphStyleId\\":\\"02c83d47-0e8e-4a6d-a90d-1400e610db60\\"},{\\"type\\":\\"span\\"},{\\"type\\":\\"variable\\",\\"id\\":\\"498207a6-a22f-4e4b-ad68-64924bbba600\\",\\"name\\":\\"textUp\\"}]}","paddingLeft":0,"paddingTop":0,"paddingRight":0,"paddingBottom":0,"numberOfColumns":1,"columnGap":5,"textDirection":"leftToRight","flowDirection":"horizontal","verticalAlign":"top","textStroke":false,"textStrokeWeight":1,"textStrokeColor":0,"hasClippingPath":false,"blendMode":"srcOver"},{"frameId":"6","frameName":"frameUpBR","frameType":"text","textContent":"{\\"textFlow\\":[{\\"type\\":\\"paragraph\\",\\"paragraphStyleId\\":\\"02c83d47-0e8e-4a6d-a90d-1400e610db60\\"},{\\"type\\":\\"span\\"},{\\"type\\":\\"variable\\",\\"id\\":\\"498207a6-a22f-4e4b-ad68-64924bbba600\\",\\"name\\":\\"textUp\\"}]}","paddingLeft":0,"paddingTop":0,"paddingRight":0,"paddingBottom":0,"numberOfColumns":1,"columnGap":5,"textDirection":"leftToRight","flowDirection":"horizontal","verticalAlign":"top","textStroke":false,"textStrokeWeight":1,"textStrokeColor":0,"hasClippingPath":false,"blendMode":"srcOver"},{"frameId":"1","frameName":"frameUp","frameType":"text","textContent":"{\\"textFlow\\":[{\\"type\\":\\"paragraph\\",\\"paragraphStyleId\\":\\"eb13ec3d-f335-47e5-919e-291f85aecce5\\"},{\\"type\\":\\"span\\"},{\\"type\\":\\"variable\\",\\"id\\":\\"498207a6-a22f-4e4b-ad68-64924bbba600\\",\\"name\\":\\"textUp\\"}]}","paddingLeft":0,"paddingTop":0,"paddingRight":0,"paddingBottom":0,"numberOfColumns":1,"columnGap":5,"textDirection":"leftToRight","flowDirection":"horizontal","verticalAlign":"top","textStroke":false,"textStrokeWeight":1,"textStrokeColor":0,"hasClippingPath":false,"blendMode":"srcOver"},{"frameId":"7","frameName":"frameDownBB","frameType":"text","textContent":"{\\"textFlow\\":[{\\"type\\":\\"paragraph\\",\\"paragraphStyleId\\":\\"02c83d47-0e8e-4a6d-a90d-1400e610db60\\"},{\\"type\\":\\"span\\"},{\\"type\\":\\"variable\\",\\"id\\":\\"dc5c65ef-5e63-47f9-bdaa-f4f2970c552d\\",\\"name\\":\\"textDown\\"}]}","paddingLeft":0,"paddingTop":0,"paddingRight":0,"paddingBottom":0,"numberOfColumns":1,"columnGap":5,"textDirection":"leftToRight","flowDirection":"horizontal","verticalAlign":"top","textStroke":false,"textStrokeWeight":1,"textStrokeColor":0,"hasClippingPath":false,"blendMode":"srcOver"},{"frameId":"8","frameName":"frameDownBT","frameType":"text","textContent":"{\\"textFlow\\":[{\\"type\\":\\"paragraph\\",\\"paragraphStyleId\\":\\"02c83d47-0e8e-4a6d-a90d-1400e610db60\\"},{\\"type\\":\\"span\\"},{\\"type\\":\\"variable\\",\\"id\\":\\"dc5c65ef-5e63-47f9-bdaa-f4f2970c552d\\",\\"name\\":\\"textDown\\"}]}","paddingLeft":0,"paddingTop":0,"paddingRight":0,"paddingBottom":0,"numberOfColumns":1,"columnGap":5,"textDirection":"leftToRight","flowDirection":"horizontal","verticalAlign":"top","textStroke":false,"textStrokeWeight":1,"textStrokeColor":0,"hasClippingPath":false,"blendMode":"srcOver"},{"frameId":"9","frameName":"frameDownBL","frameType":"text","textContent":"{\\"textFlow\\":[{\\"type\\":\\"paragraph\\",\\"paragraphStyleId\\":\\"02c83d47-0e8e-4a6d-a90d-1400e610db60\\"},{\\"type\\":\\"span\\"},{\\"type\\":\\"variable\\",\\"id\\":\\"dc5c65ef-5e63-47f9-bdaa-f4f2970c552d\\",\\"name\\":\\"textDown\\"}]}","paddingLeft":0,"paddingTop":0,"paddingRight":0,"paddingBottom":0,"numberOfColumns":1,"columnGap":5,"textDirection":"leftToRight","flowDirection":"horizontal","verticalAlign":"top","textStroke":false,"textStrokeWeight":1,"textStrokeColor":0,"hasClippingPath":false,"blendMode":"srcOver"},{"frameId":"10","frameName":"frameDownBR","frameType":"text","textContent":"{\\"textFlow\\":[{\\"type\\":\\"paragraph\\",\\"paragraphStyleId\\":\\"02c83d47-0e8e-4a6d-a90d-1400e610db60\\"},{\\"type\\":\\"span\\"},{\\"type\\":\\"variable\\",\\"id\\":\\"dc5c65ef-5e63-47f9-bdaa-f4f2970c552d\\",\\"name\\":\\"textDown\\"}]}","paddingLeft":0,"paddingTop":0,"paddingRight":0,"paddingBottom":0,"numberOfColumns":1,"columnGap":5,"textDirection":"leftToRight","flowDirection":"horizontal","verticalAlign":"top","textStroke":false,"textStrokeWeight":1,"textStrokeColor":0,"hasClippingPath":false,"blendMode":"srcOver"}]}],"layouts":[{"layoutId":"0","layoutName":"Default","frameProperties":[{"frameId":"1","x":17.2578125,"y":13.49609375,"width":262.1953125,"height":49.23828125,"rotationDegrees":0,"rotationOriginY":0,"scaleX":1,"scaleY":1,"included":true,"fitMode":"fill","framePropertiesType":"top"},{"frameId":"2","x":17.4765625,"y":170.953125,"width":265.30859375,"height":54.8515625,"rotationDegrees":0,"rotationOriginY":0,"scaleX":1,"scaleY":1,"included":true,"fitMode":"fill","framePropertiesType":"top"},{"frameId":"3","x":27.03125,"y":85.03125,"width":245,"height":50.265625,"rotationDegrees":0,"rotationOriginY":0,"scaleX":1,"scaleY":1,"included":true,"fitMode":"fill","framePropertiesType":"top"},{"frameId":"4","x":46.23828125,"y":127.98046875,"width":209.40625,"height":48.234375,"rotationDegrees":0,"rotationOriginY":0,"scaleX":1,"scaleY":1,"included":true,"fitMode":"fill","framePropertiesType":"top"},{"frameId":"5","x":24.28125,"y":96.4296875,"width":194.37890625,"height":44.48046875,"rotationDegrees":0,"rotationOriginY":0,"scaleX":1,"scaleY":1,"included":true,"fitMode":"fill","framePropertiesType":"top"},{"frameId":"6","x":31.0625,"y":63.45703125,"width":208.90625,"height":162.078125,"rotationDegrees":0,"rotationOriginY":0,"scaleX":1,"scaleY":1,"included":true,"fitMode":"fill","framePropertiesType":"top"},{"frameId":"7","x":26.06640625,"y":105.29296875,"width":222.15625,"height":54.796875,"rotationDegrees":0,"rotationOriginY":0,"scaleX":1,"scaleY":1,"included":true,"fitMode":"fill","framePropertiesType":"top"},{"frameId":"8","x":25.46875,"y":61.8984375,"width":230.26171875,"height":67.34375,"rotationDegrees":0,"rotationOriginY":0,"scaleX":1,"scaleY":1,"included":true,"fitMode":"fill","framePropertiesType":"top"},{"frameId":"9","x":22.86328125,"y":160.87109375,"width":238.62109375,"height":65.1484375,"rotationDegrees":0,"rotationOriginY":0,"scaleX":1,"scaleY":1,"included":true,"fitMode":"fill","framePropertiesType":"top"},{"frameId":"10","x":51.3671875,"y":185.1015625,"width":246.95703125,"height":52.890625,"rotationDegrees":0,"rotationOriginY":0,"scaleX":1,"scaleY":1,"included":true,"fitMode":"fill","framePropertiesType":"top"}],"width":300,"height":250,"childLayouts":[],"layoutType":"top","frameAnimations":[{"frameId":"1","from":0,"to":5000,"basicAnimations":{}},{"frameId":"2","from":0,"to":5000,"basicAnimations":{}},{"frameId":"3","from":0,"to":5000,"basicAnimations":{}},{"frameId":"4","from":0,"to":5000,"basicAnimations":{}},{"frameId":"5","from":0,"to":5000,"basicAnimations":{}},{"frameId":"6","from":0,"to":5000,"basicAnimations":{}},{"frameId":"7","from":0,"to":5000,"basicAnimations":{}},{"frameId":"8","from":0,"to":5000,"basicAnimations":{}},{"frameId":"9","from":0,"to":5000,"basicAnimations":{}},{"frameId":"10","from":0,"to":5000,"basicAnimations":{}}],"timelineLengthMs":5000,"animated":true}],"styleKit":{"colors":[],"characterStyles":[],"paragraphStyles":[{"id":"eb13ec3d-f335-47e5-919e-291f85aecce5","name":"Main text","fontSize":42,"typographicCase":"normal","kerningOn":false,"subSuperScript":"normal","trackingLeft":"0 mm","trackingRight":"0 mm","paragraphStartIndent":"0 mm","paragraphEndIndent":"0 mm","paragraphSpaceBefore":"0 mm","paragraphSpaceAfter":"0 mm","textIndent":"0 mm","alignToBaseLine":false,"baselineShiftValue":"0 mm","lineHeight":120,"textAlign":"center","textAlignLast":"left","textOverprint":false,"color":{"color":{"colorType":"rgb","r":255,"g":255,"b":255},"isApplied":true,"usageType":"local"},"underline":false,"lineThrough":false},{"id":"02c83d47-0e8e-4a6d-a90d-1400e610db60","name":"Border text","fontSize":42,"typographicCase":"normal","kerningOn":false,"subSuperScript":"normal","trackingLeft":"0 mm","trackingRight":"0 mm","paragraphStartIndent":"0 mm","paragraphEndIndent":"0 mm","paragraphSpaceBefore":"0 mm","paragraphSpaceAfter":"0 mm","textIndent":"0 mm","alignToBaseLine":false,"baselineShiftValue":"0 mm","lineHeight":120,"textAlign":"center","textAlignLast":"left","textOverprint":false,"color":{"color":{"colorType":"rgb","r":0,"g":0,"b":0},"isApplied":true,"opacity":100,"usageType":"local"},"underline":false,"lineThrough":false}],"fonts":[]},"variables":[{"id":"498207a6-a22f-4e4b-ad68-64924bbba600","type":"shorttext","parentId":"","name":"textUp","label":"Variable 1","isHidden":false,"isReadonly":false,"isRequired":false,"value":"","defaultValue":""},{"id":"dc5c65ef-5e63-47f9-bdaa-f4f2970c552d","type":"shorttext","parentId":"","name":"textDown","label":"Variable 1","isHidden":false,"isReadonly":false,"isRequired":false,"value":"","defaultValue":""}],"connectors":[{"id":"grafx-media","source":"local","url":"grafx-media.json","options":{},"mappings":[]},{"id":"grafx-font","source":"local","url":"grafx-font.json","options":{},"mappings":[]}]}',
        );
    }

    const registerConnector = async () => {
        // Be very clear and specific: what is a connector
        // register the custom connector
        const doc = {
            id: 'meme-st',
            source: ConnectorRegistrationSource.url,
            url: 'https://stgrafxstudioprdpublic.blob.core.windows.net/shared/demo-connectors/meme-st.json',
        };

        await window.SDK.connector.registerConnector(doc);
        const connectorState = await window.SDK.connector.getState('meme-st');
        if (connectorState.success) {
            setIsConnectorLoaded(true);
        }
    };

    // Runs on first render
    useEffect(() => {
        // Fixes hot reload multiple instances issue
        if (!window.SDK) {
            const SDK = new EditorSDK({
                // hook into a layoutchange
                onLayoutsChanged: (changedLayouts) => setLayouts(changedLayouts),
                onSelectedToolChanged: (changedTool) => setSelectedTool(changedTool),
                // TODO: check
                // Default: xxx.xxx
                editorId: EDITOR_ID,
            });

            // Connect to ths SDK
            // Binding the SDK object to the window, we have an easy way to access it throughout the application
            // Since th editor-engine holds the state, it's not necessary from the start to have a complex state management system
            window.SDK = SDK;

            // Load in the editor without any document
            window.SDK.loadEditor();

            loadDocument();
            registerConnector();
        }
    }, []);

    return (
        <div className="App">
            <h1 className="page-title">
                CHILI Meme Studio{' '}
                <img
                    src="https://cdnepgrafxstudioprd.azureedge.net/shared/assets/chili-studio-logo.svg"
                    alt="studio-logo"
                />
            </h1>
            <div className="container">
                <ToolSelector selectedTool={selectedTool} />
                {/* editor div here */}
                <EditorContainer editorId={EDITOR_ID} />
                {/* <!-- editor controls here --> */}
                <div className="editor-controls">
                    <AuthenticatedActions accessToken={_A_T} />
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
