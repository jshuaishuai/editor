import { FC } from 'react';
import Text from '../Text';
import { v4 as uuidv4 } from 'uuid';
import { TextComponentProps } from '@/defaultProps';
import { ComponentData } from '@/store/reducers/editor';
interface Params {
  list: Array<any>;
  onItemClick: (componentData: ComponentData) => void;
}

const ComponentList: FC<Params> = (props) => {
  const { list, onItemClick } = props;
  const wrapperItemClick = (props: Partial<TextComponentProps>) => {
    const componentData: ComponentData = {
      name: 'text',
      id: uuidv4(),
      props,
    };
    onItemClick(componentData);
  };
  return (
    <div className="create-component-list">
      {list.map((item, index) => (
        <div
          key={index}
          className="component-item"
          onClick={() => wrapperItemClick(item)}
        >
          <Text {...item} />
        </div>
      ))}
    </div>
  );
};

export default ComponentList;
