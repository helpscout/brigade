import React from 'react'
import connect from '../connect'
import {isConnectedComponent} from '../utils'

describe('isConnectedComponent', () => {
  test('should return false for invalid args', () => {
    expect(isConnectedComponent()).toBe(false)
    expect(isConnectedComponent('div')).toBe(false)
    expect(isConnectedComponent(<div />)).toBe(false)
  })

  test('should return true for valid connected component', () => {
    const Murderface = () => <div />
    const ConnectedMurderFace = connect()(Murderface)

    expect(isConnectedComponent(ConnectedMurderFace)).toBe(true)
    expect(isConnectedComponent(<ConnectedMurderFace />)).toBe(true)
  })
})
