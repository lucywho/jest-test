import React from "react"
import { render, fireEvent, waitForElement } from "@testing-library/react"

import LoginForm, { Props } from "../LoginForm"

//Helper function: define default props, then spread additional optional props passed into the function as overrides. The override props are typed as Partial<Props> since they are optional.

//If the Props interface changes, TypeScript will throw a compiler error and the test helper will need to be updated, ensuring our tests are kept updated.

function renderLoginForm(props: Partial<Props> = {}) {
    const defaultProps: Props = {
        onPasswordChange() {
            return
        },
        onRememberChange() {
            return
        },
        onUsernameChange() {
            return
        },
        onSubmit() {
            return
        },
        shouldRemember: true,
    }
    return render(<LoginForm {...defaultProps} {...props} />)
}

describe("<LoginForm />", () => {
    test("should display a blank login form, with remember me checked by default", async () => {
        const { findByTestId } = renderLoginForm()

        const loginForm = await findByTestId("login-form")

        expect(loginForm).toHaveFormValues({
            username: "",
            password: "",
            remember: true,
        })
    })

    test("should allow entering a username", async () => {
        const onUsernameChange = jest.fn() //creates a mock function
        const { findByTestId } = renderLoginForm({ onUsernameChange })
        const username = await findByTestId("username")

        fireEvent.change(username, { target: { value: "Jo Bloggs" } })
        //simulates an event change on the form inputs i.e. changes the contents of the data-testid="username" input field to the target value

        expect(onUsernameChange).toHaveBeenCalledWith("Jo Bloggs")
        //tests that onUsernameChange function was called with target value
    })

    test("should allow entering a password", async () => {
        const onPasswordChange = jest.fn()
        const { findByTestId } = renderLoginForm({ onPasswordChange })
        const username = await findByTestId("password")

        fireEvent.change(username, { target: { value: "123pass" } })

        expect(onPasswordChange).toHaveBeenCalledWith("123pass")
    })

    test("should allow toggling remember me", async () => {
        const onRememberChange = jest.fn()
        const { findByTestId } = renderLoginForm({
            onRememberChange,
            shouldRemember: false,
        }) //note: test sets shouldRemember to false instead of default true value

        const remember = await findByTestId("remember")

        fireEvent.click(remember)

        expect(onRememberChange).toHaveBeenCalledWith(true)

        fireEvent.click(remember)

        expect(onRememberChange).toHaveBeenCalledWith(false)
    })

    test("should submit the form with username, password, and remember", async () => {
        const onSubmit = jest.fn()
        const { findByTestId } = renderLoginForm({
            onSubmit,
            shouldRemember: false,
        })
        const username = await findByTestId("username")
        const password = await findByTestId("password")
        const remember = await findByTestId("remember")
        const submit = await findByTestId("submit")

        fireEvent.change(username, { target: { value: "test user" } })

        fireEvent.change(password, { target: { value: "new password" } })

        fireEvent.click(remember)

        fireEvent.click(submit)

        expect(onSubmit).toHaveBeenCalledWith("test user", "new password", true)
    })
})
