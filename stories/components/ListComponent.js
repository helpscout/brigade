import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import Button from '@helpscout/hsds-react/components/Button'
import Card from '@helpscout/hsds-react/components/Card'
import Page from '@helpscout/hsds-react/components/Page'
import connect from '../../src/components/connect'

class ListComponent extends PureComponent {
  static propTypes = {
    addItem: PropTypes.func,
    items: PropTypes.array,
    list: PropTypes.shape({
      name: PropTypes.string,
      version: PropTypes.number,
    }),
    updateVersion: PropTypes.func,
  }

  static defaultProps = {
    addItem: () => {},
    items: [],
    list: {},
    updateVersion: () => {},
  }

  render() {
    const {
      addItem,
      items,
      list: {name, version},
      updateVersion,
    } = this.props

    return (
      <Page>
        <Page.Card>
          <Page.Header title={name} subtitle={`Version: ${version}`} />
          <Page.Content>
            <Card seamless>
              {items.map(({id, name}) => (
                <Card.Block key={id}>{name}</Card.Block>
              ))}
            </Card>
          </Page.Content>
          <Page.Actions
            primary={
              <Button onClick={addItem} primary>
                Add item
              </Button>
            }
            secondary={
              <Button onClick={updateVersion}>Increment version</Button>
            }
          />
        </Page.Card>
      </Page>
    )
  }
}

export default ListComponent

const mapStateToProps = ({ items, list }) => ({
  items,
  list
})
const actions = store => store.getExternalActions()
export const ConnectedListComponent = connect(mapStateToProps, actions)(ListComponent)
