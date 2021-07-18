import { useRef } from 'react';
import './index.less';
import { Row, Col, Avatar, Button } from 'antd';
import { useSelector } from 'react-redux';
import { CombinedState } from '@/store/reducers';
import { Link } from 'umi';
export default function IndexPage() {
  const template = useSelector((state: CombinedState) => state.template)[0];
  const container = useRef<HTMLDivElement | null>(null);
  return (
    <div className="work-detail-container">
      <Row justify="center" align="middle" className="work-detail-row">
        <Col span={8} className="cover-img">
          <img src={template.coverImg} alt="" />
        </Col>
        <Col span={8} className="cover-right">
          <h2>{template.title}</h2>
          <div className="author">
            <Avatar>V</Avatar>
            该模版由 <b>{template.author}</b> 创作
          </div>

          <div className="bar-code-area">
            <span>扫一扫，手机预览</span>
            <div ref={container}></div>
          </div>
          <div className="use-button">
            <Link to="/editor">
              <Button type="primary" size="large">
                使用模版
              </Button>
            </Link>
            <Button size="large">下载图片海报</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
