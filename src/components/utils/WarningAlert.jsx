import { Button, Result } from 'antd'

export default function WarningAlert({ title, subTitle }) {
  return (
    <Result
      className="search__warning"
      status="warning"
      title={title}
      subTitle={subTitle}
      extra={[
        <Button type="primary" key="console">
          Go Home
        </Button>,
        <Button key="buy">Try Again</Button>,
      ]}
    />
  )
}
