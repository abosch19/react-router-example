import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute, IndexRedirect } from 'react-router'
import logo from './logo.svg';
import './App.css';


const requireAuth = (nextState, replace) => {
  console.log(localStorage.token)
  if (!localStorage.token)
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
}

class Home extends Component {
  render () {
    return (
      <h1>Home</h1>
    )
  }
}

class Users extends Component {
  render () {
    return (
      <div>
        <h1>Users</h1>
        <Link to='/users/alexbosch'>Alex Bosch</Link>
        {this.props.children}
      </div>
    )
  }
}

class NavLink extends Component {
  render () {
    return (
      <Link {...this.props} style={{margin: '5px'}} activeStyle={{color: 'red'}}/>
    )
  }
}

class Routes extends Component {
  render () {
    return (
      <div className="App">
        <div className="App-header">
          <Link to='/'><img src={logo} className="App-logo" alt="logo" /></Link>
          <h2>Welcome to React</h2>
        </div>
        <div>
          <NavLink to='/home'>Home</NavLink>
          <NavLink to='/users'>Users</NavLink>
          <NavLink to='/dafaq'>Dafaq</NavLink>
          {localStorage.token ?
            (
              [<NavLink to='/me'>Me</NavLink>, <NavLink to='/logout'>Logout</NavLink>]
            )
            :
            <NavLink to='/login'>Login</NavLink>
          }
          {this.props.children}
        </div>
      </div>
    )
  }
}

class User extends Component {
  render () {
    return (
      <div>
        <h1>Hey {this.props.params.name}</h1>
      </div>
    )
  }
}

class UserNotFound extends Component {

  render () {
    return (
      <div>
        <h1>User not found</h1>
        <img src='https://cdn.worldvectorlogo.com/logos/react.svg' style={{width: '30px', height: '30px'}} role='presentation' className='App-logo'/>
      </div>
    )
  }
}

class Me extends Component {
  render () {
    return (
      <div>
        <h2>Alex Bosch</h2>
        <h3>Sant Cugat del Vallés</h3>
        <h4>22</h4>
      </div>
    )
  }
}

class PageNotFound extends Component {
  render () {
    return (
      <h1>Error 404. Page Not Found</h1>
    )
  }
}

class Login extends Component {

  constructor (props) {
    super(props)

    this.state = {
      error: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
      event.preventDefault()

      const email = this.refs.email.value
      const pass = this.refs.pass.value


      if(email !== 'abosch19@gmail.com' || pass !== '1234')
        return this.setState({ error: true})

      const { location } = this.props

      localStorage.setItem('token', '213213')

      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/')
      }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <br></br>
        <label><input ref='email' type='text' placeholder='Email' defaultValue='abosch19@gmail.com'/></label>
        <lable><input ref='pass' type='password' placeholder='Password'/></lable>
        <button type='submit'>Log In</button>
        {this.state.error && (
          <div>
            <br/>
            <b>Bad Information</b>
          </div>
        )}
      </form>
    )
  }
}

const logout = (nextState, replace) => {
  delete localStorage.token
  replace({
    pathname: '/'
  })
}

class App extends Component {
  render() {
    return (
        <Router history={browserHistory}>
          <Route path='/' component={Routes}>
            <IndexRedirect to='/home'/>
            <Route path='/home' component={Home}/>
            <Route path='/users' component={Users}>
              <IndexRoute component={UserNotFound}/>
              <Route path=':name' component={User}/>
            </Route>
            <Route path='/me' component={Me} onEnter={requireAuth}/>
            <Route path='/login' component={Login}/>
            <Route path='/logout' onEnter={logout}/>
            <Route path='*' component={PageNotFound}/>
          </Route>
        </Router>
    );
  }
}

export default App;
