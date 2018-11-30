import React, {PureComponent} from 'react'
import Page from '@helpscout/hsds-react/components/Page'

class BasicComponent extends PureComponent {
  render() {
    return (
      <Page>
        <Page.Card>
          <Page.Header title="Basic" subtitle="Built with components object" />
        </Page.Card>
      </Page>
    )
  }
}

export default BasicComponent
