/**
 * @jest-environment jsdom
 */

import React from "react"
import ReactDOM from "react-dom"
import Appointment from "../src/Appointment"

// define test suite, a set of test with given name
// first arguement is the name of the unit being tested
// it could be components, functions or modules
describe("Appointment", () => {
  let customer, container

  it("renders the customer's first name", () => {
    customer = { firstName: "Ashley" }
    container = document.createElement("div")
    document.body.appendChild(container)
    ReactDOM.render(<Appointment customer={customer} />, container)
    expect(container.textContent).toMatch("Ashley")
  })

  it("renders the customer's first name", () => {
    customer = { firstName: "Jordan" }
    container = document.createElement("div")
    document.body.appendChild(container)
    ReactDOM.render(<Appointment customer={customer} />, container)
    expect(container.textContent).toMatch("Jordan")
  })
})
