import { FC } from 'react';
import './index.less';
interface Params {
  active: boolean;
  setActive: (id: string) => void;
  id: string;
}

const EditWrapper: FC<Params> = (props) => {
  const { children, id, active, setActive } = props;
  console.log(active);

  return (
    <div
      className={active ? 'edit-wrapper active' : 'edit-wrapper'}
      onClick={() => setActive(id)}
    >
      {children}
    </div>
  );
};

export default EditWrapper;
