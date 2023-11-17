import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs, } from '@chakra-ui/react'
import BoxLayout from '~/components/BoxLayout';

const ScreensUserLazy = React.lazy(() =>
  import("../UserView")
    .then(({ UserView }) => ({ default: UserView })),
);

const ScreensTicketLazy = React.lazy(() =>
  import("../TicketView")
    .then(({ TicketView }) => ({ default: TicketView })),
);

const ScreensOrganLazy = React.lazy(() =>
  import("../OrganiView")
    .then(({ OrganiView }) => ({ default: OrganiView })),
);

const HomeView = () => {

  return (
    <BoxLayout>

      <Tabs
        w="full"
        isLazy={true}
      >
        <TabList>
          <Tab>Users</Tab>
          <Tab>Tickets</Tab>
          <Tab>Organizations</Tab>
        </TabList>

        <TabPanels>

          <TabPanel>
            <ScreensUserLazy />
          </TabPanel>

          <TabPanel>
            <ScreensTicketLazy />
          </TabPanel>

          <TabPanel>
            <ScreensOrganLazy />
          </TabPanel>

        </TabPanels>
      </Tabs>

    </BoxLayout>
  )

}

export default HomeView;

