import { Tabs } from 'antd'
import { useContext } from 'react'
import AppContext from '../../context/app-context'

export default function AppHeader() {
  const { setActiveTab, error } = useContext(AppContext)

  const callbackTabClicked = (key) => {
    setActiveTab(key)
    error(false)
    if (key === 2) {
      console.log('tab 1 clicked...')
    }
  }

  return (
    <Tabs
      defaultActiveKey={1}
      centered
      animated
      onTabClick={callbackTabClicked}
      items={[
        { key: 1, label: 'Search' },
        { key: 2, label: 'Rated' },
      ]}
    />
  )
}
