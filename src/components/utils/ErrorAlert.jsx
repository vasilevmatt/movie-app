import { Alert } from 'antd'

export default function ErrorAlert() {
  return (
    <Alert
      className="search__error"
      message="Karma is my Error"
      description="Something went wrong. Try later (or not?)"
      type="error"
      showIcon
      style={{ marginLeft: 'auto', marginRight: 'auto' }}
    />
  )
}
