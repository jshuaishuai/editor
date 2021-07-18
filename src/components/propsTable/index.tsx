import { FC, useEffect, useState } from 'react';
import { TextComponentProps } from '@/defaultProps';
import { reduce } from 'lodash-es';
import { mapPropsToForms, PropsToForms } from '@/propsMap';
import { Input } from 'antd';

const mapToComponent = {
  input: Input,
} as any;

interface Params {
  attrs: Partial<TextComponentProps>;
}

const PropsTable: FC<Params> = (props) => {
  const { attrs } = props;
  const [finalAttrs, setFinalAttrs] = useState<PropsToForms>();

  useEffect(() => {
    const finalProps = reduce(
      attrs,
      (result, value, key) => {
        const newKey = key as keyof TextComponentProps;
        const item = mapPropsToForms[newKey];
        if (item) {
          item.value = value;
          result[newKey] = item;
        }
        return result;
      },
      {} as PropsToForms,
    );
    setFinalAttrs(finalProps);
  }, [attrs]);

  return (
    <div>
      {JSON.stringify(finalAttrs)}
      {finalAttrs &&
        Object.keys(finalAttrs).map((key) => {
          const newKey = key as keyof TextComponentProps;
          const value = finalAttrs[newKey];
          let ComponentName;
          if (value) {
            ComponentName = mapToComponent[value?.component];
            return <ComponentName value={value.value} />;
          }
        })}
    </div>
  );
};

export default PropsTable;
