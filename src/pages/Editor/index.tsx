import Text from '@/components/Text';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './index.less';
import { CombinedState } from '@/store/reducers';
import ComponentList from '@/components/componentList';
import { defaultTextTemplates } from '../../defaultTemplates';
import { ComponentData, actionObject } from '@/store/reducers/editor';
import { useDispatch } from 'react-redux';
import EditWrapper from '@/components/editWrapper';
import PropsTable from '@/components/propsTable';

import { map } from 'lodash-es';
export default function IndexPage() {
  const dispatch = useDispatch();
  const { components, currentElement } = useSelector(
    (state: CombinedState) => state.editor,
  );
  const [element, setElement] = useState<ComponentData | undefined>();
  const addItem = (component: ComponentData) => {
    // 添加到redux 里面
    dispatch(actionObject.addItem(component));
  };
  const setActive = (id: string) => {
    dispatch(actionObject.setActive(id));
  };
  useEffect(() => {
    let el = components.find((component) => component.id === currentElement);
    setElement(el);
  }, [currentElement, components]);

  const handleChange = (key: string, event: string | number) => {
    dispatch(actionObject.setItem({ key, value: event }));
  };
  return (
    <div className="editor-container">
      <div className="container-left">
        <div className="sidebar-container">
          <p>组件列表</p>
          <ComponentList list={defaultTextTemplates} onItemClick={addItem} />
        </div>
      </div>
      <div className="container-content">
        <p className="preview-title">画布区域</p>
        <div className="preview-container">
          {components.map((component) => (
            <EditWrapper
              setActive={setActive}
              active={component.id === currentElement}
              id={component.id}
              key={component.id}
            >
              <Text {...component.props} />
            </EditWrapper>
          ))}
        </div>
      </div>
      <div className="container-right">
        <div>组件属性</div>
        {element && <PropsTable attrs={element.props} change={handleChange} />}
        <pre>
          {element &&
            map(element.props, (val, key) => (
              <div key={key}>{key + ':' + val}</div>
            ))}
        </pre>
      </div>
    </div>
  );
}
