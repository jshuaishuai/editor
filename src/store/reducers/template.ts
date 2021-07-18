export interface TemplateProps {
  id: number;
  title: string;
  coverImg: string;
  author: string;
  copiedCount: number;
}
export type TemplatePropsArr = TemplateProps[];
// state 初始值
export const initialState: TemplatePropsArr = [
  {
    id: 1,
    coverImg:
      'https://preview.qiantucdn.com/auto_machine/20210709/78f9bb84-fc5c-412a-8222-7d8af7562567.jpg!w1024_new_small',
    title: '测试模板开发，暂时无用',
    author: 'Jason',
    copiedCount: 1,
  },
];
// action-type
const GTE_TEMPLATE = 'GET_TEMPLATE'; // TODO: 获取模板数据
// action 类型别名
type GetTemplate = {
  type: typeof GTE_TEMPLATE;
  payload: TemplateProps[];
};

// action
export function getTemplate(): GetTemplate {
  return { type: GTE_TEMPLATE, payload: initialState };
}

type Action = GetTemplate;

// reducer
export default function (
  state: TemplatePropsArr = initialState,
  action: Action,
): TemplatePropsArr {
  switch (action.type) {
    case GTE_TEMPLATE: {
      return [...action.payload];
    }
    default:
      return state;
  }
}
