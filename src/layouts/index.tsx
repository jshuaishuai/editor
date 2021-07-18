import { ReactNode } from 'react';
import { Layout } from 'antd';
import { Provider } from 'react-redux';
import store from '@/store';
const { Header, Footer, Content } = Layout;
import styles from './index.less';

const Layouts = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <Layout className={styles.layout}>
        <Header>Editor</Header>
        <Content>{children}</Content>
        <Footer></Footer>
      </Layout>
    </Provider>
  );
};

export default Layouts;
