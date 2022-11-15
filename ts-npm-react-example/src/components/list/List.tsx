import { FC, ReactNode, useMemo } from "react";
import preventDefault from "../../utils/preventDefault";
import './List.css';

export type ListItem = {
  key: string;
  value: ReactNode | string;
  onClick?: () => void;
};

type ListProps = {
  listItems: ListItem[];
  isHorizontal?: boolean;
};

const List: FC<ListProps> = (props) => {
  const { listItems, isHorizontal } = props;

  const memorisedListItems = useMemo(() => {
    return listItems;
  }, [listItems]);

  console.log(listItems);
  return (
    <ul className={`list${isHorizontal ? " horizontal" : ""}`}>
      {memorisedListItems.map((listItem) => (
        <li key={listItem.key}>
          {listItem.onClick ? (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              href="#"
              onClick={(event) => {
                if (listItem.onClick) {
                  preventDefault(event, listItem.onClick());
                }
              }}
            >
              {listItem.value}
            </a>
          ) : (
            listItem.value
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
