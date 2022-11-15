import { ToolType } from "@chili-publish/editor-sdk/lib/src";
import { FC } from "react";
import Button from "../../components/button/Button";

type ToolSelectorProps = {
  selectedTool: ToolType;
};

const ToolSelector: FC<ToolSelectorProps> = (props) => {
  const { selectedTool } = props;

  const onClick = (tool: ToolType) => {
    switch (tool) {
      case ToolType.SELECT:
        window.SDK.tool.setSelectTool();
        break;
      case ToolType.HAND:
        window.SDK.tool.setHandTool();
        break;
      case ToolType.ZOOM:

        window.SDK.tool.setZoomTool();
        break;
      case ToolType.TEXT_FRAME:
        window.SDK.tool.setTextFrameTool();
        break;
      case ToolType.IMAGE_FRAME:
        window.SDK.tool.setImageFrameTool();
        break;
      default:
        window.SDK.tool.setSelectTool();
        break;
    }
  };

  return (
    <section className="tools-controller">
      <Button
        onClick={() => onClick(ToolType.SELECT)}
        isHighlighted={selectedTool === ToolType.SELECT}
      >
        Use selecttool
      </Button>
      <Button
        onClick={() => onClick(ToolType.ZOOM)}
        isHighlighted={selectedTool === ToolType.ZOOM}
      >
        Use zoomtool
      </Button>
      <Button
        onClick={() => onClick(ToolType.HAND)}
        isHighlighted={selectedTool === ToolType.HAND}
      >
        Use handtool
      </Button>
      <Button
        onClick={() => onClick(ToolType.TEXT_FRAME)}
        isHighlighted={selectedTool === ToolType.TEXT_FRAME}
      >
        Use textframetool
      </Button>
      <Button
        onClick={() => onClick(ToolType.IMAGE_FRAME)}
        isHighlighted={selectedTool === ToolType.IMAGE_FRAME}
      >
        Use imageframetool
      </Button>
    </section>
  );
};

export default ToolSelector;
