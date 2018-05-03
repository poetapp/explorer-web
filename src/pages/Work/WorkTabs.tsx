import * as React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import 'extensions/Array'

import { ContentTab } from './Tabs/ContentTab'
import { TechnicalTab } from './Tabs/TechnicalTab'

interface WorkTabProps {
  readonly id: string
}

export const WorkTabs = (props: WorkTabProps) => (
  <Tabs selectedIndex={0} className="work-tabs">
    <TabList className="tab-list-one" activeTabClassName="selected">
      <Tab>Content</Tab>
      <Tab>Technical</Tab>
    </TabList>
    <TabPanel>
      <ContentTab workId={props.id} />
    </TabPanel>
    <TabPanel>
      <TechnicalTab workId={props.id} />
    </TabPanel>
  </Tabs>
)
