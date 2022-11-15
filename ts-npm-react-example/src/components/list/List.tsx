import { FC, ReactNode } from "react";
import preventDefault from "../../utils/preventDefault";

export type ListItem = {
  key: string;
  value: ReactNode | string;
  onClick?: () => void;
};

type ListProps = {
  listItems: ListItem[];
};

const List: FC<ListProps> = (props) => {
  const { listItems } = props;
  return (
    <ul>
      {listItems.map((listItem) => (
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
