import List, { ListItem } from "../../components/list/List";
import type { LayoutListItemType } from "@chili-publish/editor-sdk/lib/types/LayoutTypes";
import { FC, useMemo } from "react";

type LayoutListProps = {
  layouts: LayoutListItemType[];
};

const LayoutList: FC<LayoutListProps> = (props) => {
  const { layouts } = props;

  const parsedLayouts: ListItem[] = useMemo(() => {
    return layouts.map((layout) => {
      return {
        key: layout.layoutId,
        value: layout.layoutName,
        onClick: async () => {
            console.log('hit')
            await window.SDK.layout.selectLayout(layout.layoutId)
        } ,
      };
    });
  }, [layouts]);

  return <List listItems={parsedLayouts} />;
};

export default LayoutList;
