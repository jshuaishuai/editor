import './index.less';
import { Button, Row, Col, Card } from 'antd';
import { useSelector } from 'react-redux';
import { CombinedState } from '@/store/reducers';
import { Link } from 'umi';
export default function IndexPage() {
  const template = useSelector((state: CombinedState) => state.template);
  console.log(template);

  const handleName = () => {};
  const handleAsyncName = () => {};
  return (
    <div className="template-list-component">
      <Row gutter={16}>
        {template.map((item) => (
          <Col span="6" key={item.id} className="poster-item">
            <Link to={`/template/${item.id}`}>
              <Card
                hoverable
                style={{ width: 300 }}
                cover={
                  item.coverImg ? (
                    <img src={item.coverImg} />
                  ) : (
                    <img src="https://preview.qiantucdn.com/auto_machine/20210709/78f9bb84-fc5c-412a-8222-7d8af7562567.jpg!w1024_new_small" />
                  )
                }
              >
                <div className="hover-item">
                  <Button size="large" type="primary">
                    使用该模版创建
                  </Button>
                </div>
                <Card.Meta
                  title={item.title}
                  description={
                    <div className="description-detail">
                      <span>作者：{item.author}</span>
                      <span className="user-number">{item.copiedCount}</span>
                    </div>
                  }
                ></Card.Meta>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}
