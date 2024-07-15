import { Alert, Layout } from 'antd'
import { Content, Footer } from 'antd/es/layout/layout'
import { Offline, Online } from 'react-detect-offline'
import AppMain from './components/layout/AppMain'
import './index.scss'

export default function App() {
  return (
    <Layout>
      <Layout>
        <Content>
          <Online>
            <AppMain />
          </Online>
          <Offline>
            <Alert
              message="No internet connection"
              description="It seems you might have some problems with your network. We are trying to reconnect."
              type="warning"
              showIcon
            />
          </Offline>
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  )
}
