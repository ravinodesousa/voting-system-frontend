import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { login } from '../../../axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('jwtToken') !== null) {
      if (localStorage.getItem('userType') == 'ADMIN') {
        return navigate('/election-results')
      } else {
        return navigate('/vote')
      }
    }
  }, [navigate])

  const loginHandler = () => {
    // todo: email and password validation
    login({ email, password })
      .then((res) => {
        console.log('res login', res)
        if (res?.data?.success) {
          const { id, firstName, lastName, email, photo } = res?.data?.data?.user

          const userType = res?.data?.data?.userType // VOTER / ADMIN / CANDIDATE

          const jwtToken = res?.data?.data?.jwtToken

          localStorage.setItem('id', id)
          localStorage.setItem('name', `${firstName} ${lastName}`)
          localStorage.setItem('email', email)
          localStorage.setItem('photo', photo)
          localStorage.setItem('userType', userType)
          localStorage.setItem('jwtToken', jwtToken)

          alert(res?.data?.message)

          location.reload()
        }
      })
      .catch((err) => {
        console.log('res error', err?.response?.data)
        if (err?.response?.data?.message) {
          alert(err?.response?.data?.message)
        }
      })
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={() => {
                            loginHandler()
                          }}
                        >
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p></p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
