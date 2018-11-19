import React from 'react'
import Backbone from 'backbone'
import {mount} from 'enzyme'
import Provider from '../../Provider'
import createStore from '../../createStore'
import connect from '../index'

describe('connect', () => {
  test('should connect component to store', () => {
    const store = createStore({
      member: new Backbone.Model({
        firstName: 'Skwisgaar',
        lastName: 'Skwigelf',
      }),
    })

    const Dethklok = ({fullName}) => <div className="dethklok">{fullName}</div>

    const mapStateToProps = state => {
      const {member} = state
      return {
        fullName: `${member.firstName} ${member.lastName}!`,
      }
    }

    const ConnectedDethklok = connect(mapStateToProps)(Dethklok)

    const wrapper = mount(
      <Provider store={store}>
        <div className="SomeBrutalVenue">
          <ConnectedDethklok />
        </div>
      </Provider>,
    )

    const el = wrapper.find('div.dethklok')

    expect(el.text()).toBe('Skwisgaar Skwigelf!')
  })

  test('should update store via actions', () => {
    const store = createStore({
      member: new Backbone.Model({
        firstName: 'Skwisgaar',
        lastName: 'Skwigelf',
      }),
      bpm: 200,
    })

    const Dethklok = ({fullName, playFaster}) => (
      <div className="dethklok">
        {fullName}
        <button onClick={playFaster}>Shred</button>
      </div>
    )

    const mapStateToProps = state => {
      const {member} = state
      return {
        fullName: `${member.firstName} ${member.lastName}!`,
      }
    }

    const playFaster = state => {
      return {
        ...state,
        bpm: state.bpm * 2,
      }
    }

    const ConnectedDethklok = connect(
      mapStateToProps,
      {playFaster},
    )(Dethklok)

    const wrapper = mount(
      <Provider store={store}>
        <div className="SomeBrutalVenue">
          <ConnectedDethklok />
        </div>
      </Provider>,
    )

    const el = wrapper.find('div.dethklok')
    expect(el.text()).toContain('Skwisgaar Skwigelf!')

    const metronome = wrapper.find('button')

    expect(store.getState().bpm).toBe(200)

    metronome.simulate('click')
    expect(store.getState().bpm).toBe(400)

    metronome.simulate('click')
    expect(store.getState().bpm).toBe(800)
  })

  test('should update store collection via actions', () => {
    const members = new Backbone.Collection([
      {
        firstName: 'Skwisgaar',
        lastName: 'Skwigelf',
        id: 'skiwsgaar',
      },
    ])

    const store = createStore({
      members,
    })

    const Dethklok = ({members, addMember}) => (
      <div className="dethklok">
        <div className="members">
          {members.map(member => (
            <div key={member.id} className="member">
              {member.firstName}
            </div>
          ))}
        </div>
        <button onClick={addMember}>Add Member</button>
      </div>
    )

    const mapStateToProps = state => {
      const {members} = state
      return {
        members,
      }
    }

    const addMember = () => {
      // Let's do it with the Backbone collection rather than React store
      // Cause. Why not!
      members.add({
        firstName: 'Toki',
        lastName: 'Wartooth',
        id: 'toki',
      })
    }

    const ConnectedDethklok = connect(
      mapStateToProps,
      {addMember},
    )(Dethklok)

    const wrapper = mount(
      <Provider store={store}>
        <div className="SomeBrutalVenue">
          <ConnectedDethklok />
        </div>
      </Provider>,
    )

    const el = wrapper.find('div.members')
    expect(el.text()).toContain('Skwisgaar')
    expect(wrapper.find('div.member').length).toBe(1)

    const add = wrapper.find('button')

    add.simulate('click')

    expect(el.text()).toContain('Skwisgaar')
    expect(el.text()).toContain('Toki')

    expect(wrapper.find('div.member').length).toBe(2)
  })
})
