/**
 * @jest-environment jsdom
 */

import React from "react"
import ReactDOM from "react-dom"
import { Appointment, AppointmentsDayView } from "../src/Appointment"
import ReactTestUtils from "react-dom/test-utils"

// A good test has three distinct sections:
// Arrange: Sets up test dependencies
// Act: Executes production code under test
// Assert: Checks expectations are met

// A great test is not just good but is also the following:
// Short
// Descriptive
// Independent of other tests
// Has no side-effects

// define test suite, a set of test with given name
// first arguement is the name of the unit being tested
// it could be components, functions or modules
describe("Appointment", () => {
  let customer, container

  beforeEach(() => {
    container = document.createElement("div")
  })

  const render = component => ReactDOM.render(component, container)

  it("renders the customer's first name", () => {
    customer = { firstName: "Ashley" }
    document.body.appendChild(container)
    render(<Appointment customer={customer} />)
    expect(container.textContent).toMatch("Ashley")
  })

  it("renders the customer's first name", () => {
    customer = { firstName: "Jordan" }
    document.body.appendChild(container)
    render(<Appointment customer={customer} />)
    expect(container.textContent).toMatch("Jordan")
  })
})

describe("AppointmentsDayView", () => {
  let container

  const today = new Date()
  const appointments = [
    { startsAt: today.setHours(12, 0), customer: { firstName: "Ashley" } },
    { startsAt: today.setHours(13, 0), customer: { firstName: "Jordan" } }
  ]

  beforeEach(() => {
    container = document.createElement("div")
  })

  const render = component => ReactDOM.render(component, container)

  it("renders a div with correct id", () => {
    render(<AppointmentsDayView appointments={[]} />)
    expect(container.querySelector("div#appointmentsDayView")).not.toBeNull()
  })

  it("renders multiple appointments in an ol elements", () => {
    render(<AppointmentsDayView appointments={appointments} />)
    expect(container.querySelector("ol")).not.toBeNull()
    expect(container.querySelector("ol").children).toHaveLength(2)
    expect(container.querySelectorAll("li")[0].textContent).toEqual("12:00")
    expect(container.querySelectorAll("li")[1].textContent).toEqual("13:00")
  })

  it("initially shows a message that there are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />)
    expect(container.textContent).toMatch("There are no appointments scheduled for today")
  })

  it("selects the first appointment by default", () => {
    render(<AppointmentsDayView appointments={appointments} />)
    expect(container.textContent).toMatch("Ashley")
  })

  it("has button element in each li", () => {
    render(<AppointmentsDayView appointments={appointments} />)
    expect(container.querySelectorAll("li >  button")).toHaveLength(2)
    expect(container.querySelectorAll("li > button")[0].type).toEqual("button")
  })

  it("renders another appopintment when clicked", () => {
    render(<AppointmentsDayView appointments={appointments} />)
    const button = container.querySelectorAll("button")[1]
    ReactTestUtils.Simulate.click(button)
    expect(container.textContest).toMatch("Jordan")
  })
})
