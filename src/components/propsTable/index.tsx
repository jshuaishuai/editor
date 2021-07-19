import { FC, useEffect, useState } from 'react';
import { TextComponentProps } from '@/defaultProps';
import { reduce } from 'lodash-es';
import { mapPropsToForms } from '@/propsMap';
import { Input, InputNumber, Slider, Form, Radio, Select } from 'antd';
import Component from '@/components/myInput';
const mapToComponent = {
  input: Component,
  textarea: Component.TextArea,
  'input-number': InputNumber,
  slider: Slider,
  'radio-group': Radio.Group,
  'radio-button': Radio.Button,
  select: Select,
  'select-option': Select.Option,
} as any;

interface FormProps {
  component: string;
  subComponent?: string;
  value: string;
  extraProps?: { [key: string]: any };
  label?: string;
  options?: { label: string; value: any }[];
  valueProp: string;
  eventName: string;
  events: { [key: string]: (e: any) => void };
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface Params {
  attrs: Partial<TextComponentProps>;
  change: (key: string, event: string | number) => void;
}

type FormProp = { [key: string]: FormProps };
const PropsTable: FC<Params> = (props) => {
  const { attrs, change } = props;
  const [finalAttrs, setFinalAttrs] = useState<FormProp>();
  const [value, setValue] = useState('');
  // TODO 过滤出需要渲染的表单集合
  useEffect(() => {
    const finalProps = reduce(
      attrs,
      (result, value = '', key) => {
        const newKey = key as keyof TextComponentProps;
        const item = mapPropsToForms[newKey];
        if (item) {
          const {
            valueProp = 'value',
            eventName = 'change',
            initalTransform,
            afterTransform,
          } = item;
          const newItem: FormProps = {
            ...item,
            value: initalTransform ? initalTransform(value) : value,
            valueProp,
            eventName,
            events: {
              ['on' + capitalizeFirstLetter(eventName)]: (e: any) => {
                return change(
                  key,
                  (value = afterTransform ? afterTransform(e) : e),
                );
              },
            },
          };
          result[newKey] = newItem;
        }
        return result;
      },
      {} as FormProp,
    );

    setFinalAttrs(finalProps);
  }, [JSON.stringify(attrs)]);

  return (
    <div>
      <Form>
        {finalAttrs &&
          Object.keys(finalAttrs).map((key) => {
            const newKey = key as keyof TextComponentProps;
            const value = finalAttrs[newKey];
            const ComponentName = mapToComponent[value?.component];
            const SubComponent = value.subComponent
              ? mapToComponent[value.subComponent]
              : null;
            const props = {
              [value.valueProp]: value.value,
              ...value.extraProps,
              ...value.events,
            };
            return (
              <Form.Item label={value.label} key={key}>
                <ComponentName {...props}>
                  {value.options &&
                    value.options.map((option) => {
                      return (
                        <SubComponent key={option.value} value={option.value}>
                          {option.label}
                        </SubComponent>
                      );
                    })}
                </ComponentName>
              </Form.Item>
            );
          })}
      </Form>
    </div>
  );
};

export default PropsTable;
