import { FC, useEffect, useState } from 'react';
import { TextComponentProps } from '@/defaultProps';

interface Params {
  props: TextComponentProps;
}

const PropsTable: FC<Params> = (props) => {
  const [finalProps, setFinalProps] = useState();

  useEffect(() => {}, []);

  return <div></div>;
};

export default PropsTable;
