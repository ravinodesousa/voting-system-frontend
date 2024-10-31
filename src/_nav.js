import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

let _nav = []

let userType = localStorage.getItem('userType')
if (userType == 'ADMIN') {
  _nav = [
    {
      component: CNavTitle,
      name: 'Elections',
    },
    {
      component: CNavItem,
      name: 'Manage Elections',
      to: '/elections',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },

    {
      component: CNavItem,
      name: 'Election Results',
      to: '/election-results',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: 'Setting',
    },
    {
      component: CNavItem,
      name: 'Manage Parties',
      to: '/manage-parties',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: 'Users',
    },
    {
      component: CNavItem,
      name: 'Voters',
      to: '/voters',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Candidates',
      to: '/candidates',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
  ]
} else {
  _nav = [
    {
      component: CNavTitle,
      name: 'Elections',
    },

    {
      component: CNavItem,
      name: 'Vote',
      to: '/vote',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Election Results',
      to: '/election-results',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
  ]
}

export default _nav
