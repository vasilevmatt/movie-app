import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const LoadingIndicator = () => (
  <Spin className="search__loading" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
)
export default LoadingIndicator
