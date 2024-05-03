import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
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
import { Button } from '@mui/material';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import Api, { handleApiError } from '../config/api';
import { notifyError, notifySuccess } from '../utilities/toastify';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()

  function handleSubmit(values) {
    if (values.password !== values.repassword) return notifyError("Password doesn't Match !!")
    Api.post("/register", values)
      .then((res) => {
        notifySuccess("Account Created  ❤️");
          navigate("/login")
      })
      .catch((error) => {
        handleApiError(error)
      });
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      fname: "",
      lname: "",
      password: "",
      repassword: ""
    },
    onSubmit: handleSubmit,
  })

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol xs={12}>
            <CCard className="mx-4 w-100">
              <CCardBody className="p-4">
                <CForm onSubmit={formik.handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput onChange={formik.handleChange} value={formik.values.fname} placeholder="First name" name='fname' autoComplete="fname" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput onChange={formik.handleChange} value={formik.values.lname} placeholder="Last name" name='lname' autoComplete="lname" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput onChange={formik.handleChange} value={formik.values.email} placeholder="Email" name='email' autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput onChange={formik.handleChange} value={formik.values.password}
                      type="password"
                      placeholder="Password"
                      name='password'
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput onChange={formik.handleChange} value={formik.values.repassword}
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      name='repassword'
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type='submit'>Create Account</CButton>
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
