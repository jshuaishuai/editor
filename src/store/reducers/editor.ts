import { v4 as uuidv4 } from 'uuid';

import { TextComponentProps, ImageComponentProps } from '@/defaultProps';

export interface EditorProps {
  // 供中间编辑器渲染的数组
  components: ComponentData[];
  // 当前编辑的是哪个元素，uuid
  currentElement: string;
  // 当然最后保存的时候还有有一些项目信息，这里并没有写出，等做到的时候再补充
}

export interface ComponentData {
  // 这个元素的 属性，属性请详见下面
  props: Partial<TextComponentProps>;
  // id，uuid v4 生成
  id: string;
  // 业务组件库名称 l-text，l-image 等等
  name: 'text';
}
export const testComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: 'text',
    props: {
      tag: 'div',
      text: 'hello',
      fontSize: '20px',
      color: '#000000',
      lineHeight: '1',
      textAlign: 'left',
      fontFamily: '',
      position: 'relative',
    },
  },
  {
    id: uuidv4(),
    name: 'text',
    props: {
      tag: 'div',
      text: 'hello2',
      fontSize: '10px',
      fontWeight: 'bold',
      lineHeight: '2',
      textAlign: 'left',
      fontFamily: '',
      color: 'red',
      position: 'relative',
    },
  },
  {
    id: uuidv4(),
    name: 'text',
    props: {
      tag: 'div',
      text: 'hello3',
      fontSize: '15px',
      actionType: 'url',
      url: 'https://www.baidu.com',
      textAlign: 'left',
      cursor: 'pointer',
      fontFamily: '',
      position: 'relative',
    },
  },
];

const initialState = {
  components: testComponents,
  currentElement: '',
};
// action types
const ADD_ITEM = 'ADD_ITEM';
const MINUS_ITEM = 'MINUS_ITEM';
const SET_ACTIVE = 'SET_ACTIVE';
const SET_ITEM = 'SET_ITEM';
// const GET_CURRENT_ELEMENT = 'GET_CURRENT_ELEMENT';
type AddItem = {
  type: typeof ADD_ITEM;
  payload: ComponentData;
};

type MinusItem = {
  type: typeof MINUS_ITEM;
  payload: string;
};
type SetItem = {
  type: typeof SET_ITEM;
  payload: { key: string; value: number | string };
};
type SetActive = {
  type: typeof SET_ACTIVE;
  payload: string;
};

// action

export function addItem(param: ComponentData): AddItem {
  return { type: ADD_ITEM, payload: param };
}

export function minusItem(param: string): MinusItem {
  return { type: MINUS_ITEM, payload: param };
}

export function setItem(param: {
  key: string;
  value: number | string;
}): SetItem {
  return { type: SET_ITEM, payload: param };
}

export function setActive(param: string): SetActive {
  return { type: SET_ACTIVE, payload: param };
}

export const actionObject = {
  addItem,
  minusItem,
  setActive,
  setItem,
};
type Action = AddItem | MinusItem | SetActive | SetItem;

// reducer
export default function (
  state: EditorProps = initialState,
  action: Action,
): EditorProps {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, components: [...state.components, action.payload] };
    case MINUS_ITEM: {
      let components = state.components.filter(
        (item) => item.id !== action.payload,
      );
      return { ...state, components };
    }
    case SET_ITEM: {
      const { key, value } = action.payload;
      // 先找到
      let components = state.components.map((item) => {
        if (item.id === state.currentElement) {
          let newKey = key as keyof Partial<TextComponentProps>;
          item.props[newKey] = String(value);
        }
        return item;
      });
      return { ...state, components };
    }
    case SET_ACTIVE: {
      return { ...state, currentElement: action.payload };
    }
    default:
      return state;
  }
}
