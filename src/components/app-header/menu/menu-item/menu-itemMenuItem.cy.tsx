import React from 'react'
import MenuItem from './menu-item'

describe('<MenuItem />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MenuItem />)
  })
})