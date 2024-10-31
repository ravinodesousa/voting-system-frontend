import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { fetchParties, signup, upload } from '../../../axios'

const Register = () => {
  const GENDERS = ['MALE', 'FEMALE']
  const USERTYPES = ['VOTER', 'CANDIDATE']

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [mobNo, setMobNo] = useState('')
  const [photo, setPhoto] = useState('')
  const [uploadedPhoto, setUploadedPhoto] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [userType, setUserType] = useState('')
  const [partyId, setPartyId] = useState('')
  const [parties, setParties] = useState([])

  useEffect(() => {
    fetchParties().then((res) => {
      console.log('parties', res?.data)
      setParties(res?.data ?? [])
    })
  }, [])

  useEffect(() => {
    console.log('photo', photo)
    if (photo) {
      console.log('photo12345', photo)
      let fileExt = String(photo?.name ?? '').split('.')
      console.log('fileExt[fileExt.length]', fileExt[fileExt.length - 1])
      fileExt = String(fileExt[fileExt.length - 1] ?? '')
      if (
        fileExt.toLowerCase() == 'png' ||
        fileExt.toLowerCase() == 'jpeg' ||
        fileExt.toLowerCase() == 'jpg'
      ) {
        // upload file
        let formData = new FormData()
        console.log('photo_new123', photo, photo.name)
        formData.append('file', photo, photo.name)
        upload(formData).then((res) => {
          console.log('Respm', res.data)
          // path

          if (res?.data?.success) {
            alert('File uploaded successfully')
            setUploadedPhoto(res?.data?.path)
          } else {
            alert('Failed to upload file. Please try again')
            setUploadedPhoto('')
          }
          // window.location.reload()
        })
      } else {
        alert('Only PNG, JPEG and JPG allowed')
        setUploadedPhoto('')
      }
    }
  }, [photo])

  const registerHandler = () => {
    // todo: all validations
    signup({
      firstName,
      lastName,
      email,
      mobNo,
      uploadedPhoto,
      gender,
      age,
      password,
      cpassword,
      userType,
      partyId,
    })
      .then((res) => {
        console.log('res signup', res)
        if (res?.status == 200) {
          alert(
            'User successfully registered. You will be notified via email once your account is approved.',
          )
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
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="First Name"
                      autoComplete="firstname"
                      value={firstName}
                      onChange={(event) => {
                        console.log('event', event?.target?.value)
                        setFirstName(event?.target?.value)
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Last Name"
                      autoComplete="lastname"
                      value={lastName}
                      onChange={(event) => {
                        console.log('event', event?.target?.value)
                        setLastName(event?.target?.value)
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => {
                        console.log('event', event?.target?.value)
                        setEmail(event?.target?.value)
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Mobile No"
                      autoComplete="mobno"
                      value={mobNo}
                      onChange={(event) => {
                        console.log('event', event?.target?.value)
                        setMobNo(event?.target?.value)
                      }}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(event) => {
                        console.log('event', event?.target?.value)
                        setPassword(event?.target?.value)
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={cpassword}
                      onChange={(event) => {
                        console.log('event', event?.target?.value)
                        setCpassword(event?.target?.value)
                      }}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText as="label" htmlFor="photofile">
                      Photo
                    </CInputGroupText>
                    <CFormInput
                      type="file"
                      id="file"
                      name="file"
                      onChange={(event) => {
                        console.log('event', event)
                        event.preventDefault()
                        setPhoto(event.target.files[0])
                      }}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText as="label" htmlFor="inputGroupSelect01">
                      Gender
                    </CInputGroupText>
                    <CFormSelect
                      id="inputGroupSelect01"
                      onChange={(event) => {
                        console.log('event', event?.target?.value)
                        setGender(event?.target?.value)
                      }}
                    >
                      <option>Choose...</option>
                      {GENDERS.map((item) => {
                        return item == gender ? (
                          <option value={item} selected>
                            {item}
                          </option>
                        ) : (
                          <option value={item}>{item}</option>
                        )
                      })}
                    </CFormSelect>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Age"
                      autoComplete="age"
                      value={age}
                      type="number"
                      onChange={(event) => {
                        console.log('event', event?.target?.value)
                        setAge(event?.target?.value)
                      }}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText as="label" htmlFor="inputGroupSelect01">
                      User Type
                    </CInputGroupText>
                    <CFormSelect
                      id="inputGroupSelect01"
                      onChange={(event) => {
                        console.log('event', event?.target?.value)
                        setUserType(event?.target?.value)
                      }}
                    >
                      <option>Choose...</option>
                      {USERTYPES.map((item) => {
                        return item == userType ? (
                          <option value={item} selected>
                            {item}
                          </option>
                        ) : (
                          <option value={item}>{item}</option>
                        )
                      })}
                    </CFormSelect>
                  </CInputGroup>

                  {userType == 'CANDIDATE' && (
                    <CInputGroup className="mb-3">
                      <CInputGroupText as="label" htmlFor="inputGroupSelect01">
                        Party
                      </CInputGroupText>
                      <CFormSelect
                        id="inputGroupSelect01"
                        onChange={(event) => {
                          console.log('event', event?.target?.value)
                          setPartyId(event?.target?.value)
                        }}
                      >
                        <option>Choose...</option>

                        {parties.map((party) => {
                          if (party?.status == 'ACTIVE')
                            return partyId == party?.id ? (
                              <option value={party?.id} selected>
                                {party?.name}
                              </option>
                            ) : (
                              <option value={party?.id}>{party?.name}</option>
                            )
                        })}
                      </CFormSelect>
                    </CInputGroup>
                  )}

                  <div className="d-grid">
                    <CButton
                      color="success"
                      onClick={() => {
                        registerHandler()
                      }}
                    >
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
