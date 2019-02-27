import React, {PureComponent} from 'react'
import Spinner from '@helpscout/hsds-react/components/Spinner'
import {connect} from 'react-redux'
import {reset} from '../actions'

class Header extends PureComponent {
  render() {
    const {Title, Subtitle, meta, loading, reset} = this.props
    return (
      <div>
        <Title>Internal State</Title>
        <Subtitle>
          {meta.name} -{' '}
          {loading ? (
            <Spinner />
          ) : (
            <a href="javascript:void(0);" onClick={reset}>
              Refresh
            </a>
          )}
        </Subtitle>
      </div>
    )
  }
}

const mapStateToProps = ({meta, loading}) => ({meta, loading})
const mapDispatchToProps = {reset}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
