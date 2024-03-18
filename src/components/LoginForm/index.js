// Write your JS code here
import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isShowingError: false, errorMsg: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccessForm = () => {
    const {history} = this.props
    history.replace('/')
  }

  onLoginFailForm = errorMessage => {
    this.setState({isShowingError: true, errorMsg: errorMessage})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    console.log(response)

    if (response.ok === true) {
      this.onSubmitSuccessForm()
    } else {
      this.onLoginFailForm(data.error_msg)
    }
  }

  render() {
    const {username, password, isShowingError, errorMsg} = this.state

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
          className="website-image"
        />

        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website logo"
          className="website-logo"
        />

        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <label className="label" htmlFor="username">
            USERNAME
          </label>
          <br />
          <input
            className="input"
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={this.onChangeUserName}
          />

          <label className="label" htmlFor="password">
            PASSWORD
          </label>
          <br />
          <input
            className="input"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={this.onChangePassword}
          />

          <button className="button" type="submit">
            Login
          </button>
          {isShowingError && <p className="paragraph">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
