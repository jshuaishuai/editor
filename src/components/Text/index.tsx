import { FC } from 'react';
import Component from '../component';
import { pick } from 'lodash';
import {
  textDefaultProps,
  TextComponentProps,
  textStylePropNames,
} from '@/defaultProps';
type Params = Readonly<Partial<TextComponentProps>> & { tag?: string };
const Text: FC<Params> = (props) => {
  const { tag, text, actionType, url } = props;
  const styleProps = pick(props, textStylePropNames);

  const handleClick = () => {
    if (actionType === 'url' && url) {
      window.location.href = url;
    }
  };

  return (
    <Component
      tag={tag}
      text={text}
      style={styleProps}
      onClick={handleClick}
    ></Component>
  );
};

export default Text;
Text.defaultProps = {
  ...textDefaultProps,
};
