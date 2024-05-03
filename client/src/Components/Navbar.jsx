import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
  CButton,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons';
import Api from "../config/api"
import { notifySuccess } from '../utilities/toastify';

const AppHeader = () => {

  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const [logedin, setLogein] = useState(false)
  const [data, setData] = useState(false)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])


  useEffect(() => {
    Api.get("/user")
      .then((res) => {
        setData(res.data)
        setLogein(true)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])
  const handleColor = (mode) => {
    setColorMode(mode)
  }

  const navigate = useNavigate()
  function handleLogout() {
    console.log("Sssss");
    Api.post("/logout")
      .then(() => {
        notifySuccess("Good Bye ❤️")
        navigate("/login")
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef} >
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink  >
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink >Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink >Settings</CNavLink>
          </CNavItem>
          {logedin && <CNavItem style={{ cursor: "pointer" }}>
            <CNavLink onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</CNavLink>
          </CNavItem>}
        </CHeaderNav>
        <CHeaderNav className="ms-auto">


          {logedin ? <li className="nav-item py-1">
            <CNavItem>
              <CNavLink  >
                {data?.fname} {data?.lname}
              </CNavLink>
            </CNavItem>

          </li> :
            <li className="nav-item py-1">
              <CButton onClick={()=>navigate("/login")}>Login</CButton>
            </li>
          }
          <CNavItem>
            <CNavLink >
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink >
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>

        </CHeaderNav>

        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => handleColor('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => handleColor('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>

      </CContainer>
    </CHeader>
  )
}

export default AppHeader
