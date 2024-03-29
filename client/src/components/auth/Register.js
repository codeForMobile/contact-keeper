import React, { useState, useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import AlertContext from '../../context/alert/alertContext'
import { useAuth, clearErrors, register } from '../../context/auth/AuthState'

const Register = (props) => {
  const alertContext = useContext(AlertContext)
  const [authState, authDispatch] = useAuth()
  const { error, isAuthenticated} = authState

  const { setAlert } = alertContext

  useEffect(() => {
    if(error === 'User already exists') {
      setAlert(error, 'danger')
      clearErrors(authDispatch)
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history, setAlert, authDispatch])

  const [user, setUser] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  })

  const { name,email, password, password2 } = user

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value})
  
  const onSubmit = e => {
    e.preventDefault()
    
    if(name === '' || email === '' || password === '' ) {
      setAlert(' Please enter all credentials...', 'danger')
    } else if (password !== password2) {
      setAlert(' Passwords do not match...', 'danger')
    } else {
      register(authDispatch, {
        name,
        email,
        password
      })
    }
  }
  if (isAuthenticated) return <Navigate to='/'/>

  return (
    <div className='form-container'>
      <h1>
        Account <span className="text-primary">Register</span> </h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name='name' value={name} onChange={onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name='email' value={email} onChange={onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
            type="password"
            name='password'
            value={password}
            onChange={onChange}
            minLength={6}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
            type="password"
            name='password2'
            value={password2}
            onChange={onChange}
            minLength={6}
            />
          </div>
          <input type="submit" value="Register" className='btn btn-primary btn-block' />
        </form>
    </div>
  )
}

export default Register