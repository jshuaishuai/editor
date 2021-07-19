import { TextComponentProps } from '@/defaultProps';
export interface PropToForm {
  component: string;
  subComponent?: string;
  extraProps?: { [key: string]: any };
  label?: string;
  options?: { label: string; value: any }[];
  valueProp?: string;
  eventName?: string;
  initalTransform?: (v: any) => any;
  afterTransform?: (v: any) => any;
}

export type PropsToForms = {
  [P in keyof TextComponentProps]?: PropToForm;
};

const fontFamilyArr = [
  { label: '宋体', value: '"SimSun","STSong"' },
  { label: '黑体', value: '"SimHei","STHeiti"' },
  { label: '楷体', value: '"KaiTi","STKaiti"' },
  { label: '仿宋', value: '"FangSong","STFangsong"' },
];

export const mapPropsToForms: PropsToForms = {
  text: {
    label: '文本',
    component: 'textarea',
    eventName: 'change',
    extraProps: { rows: 3 },
    afterTransform: (e: any) => e.target.value,
  },
  fontSize: {
    label: '字号',
    component: 'input-number',
    initalTransform: (v: string) => parseFloat(v),
    afterTransform: (e: any) => `${e}px`,
  },
  lineHeight: {
    label: '行高',
    component: 'slider',
    extraProps: { min: 0, max: 3, step: 0.1 },
    initalTransform: (v: string) => parseFloat(v),
    afterTransform: (e: number) => e.toString(),
  },
  textAlign: {
    component: 'radio-group',
    subComponent: 'radio-button',
    label: '对齐',
    options: [
      { value: 'left', label: '左' },
      { value: 'center', label: '中' },
      { value: 'right', label: '右' },
    ],
    afterTransform: (e: any) => e.target.value,
  },
  fontFamily: {
    component: 'select',
    subComponent: 'select-option',
    label: '字体',
    options: [{ value: '', label: '默认' }, ...fontFamilyArr],
  },
};
