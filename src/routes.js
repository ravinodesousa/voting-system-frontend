import React from 'react'
import Vote from './views/elections/Vote'
import Login from './views/pages/login/Login'
import Register from './views/pages/register/Register'

// new routes
const ManageParties = React.lazy(() => import('./views/settings/ManageParties'))
const ElectionResults = React.lazy(() => import('./views/elections/ElectionResults'))
const ManageElections = React.lazy(() => import('./views/elections/ManageElections'))
const Candidates = React.lazy(() => import('./views/users/Candidates'))
const Voters = React.lazy(() => import('./views/users/Voters'))

const routes = [
  { path: '/elections', name: 'ManageElections', element: ManageElections },
  { path: '/vote', name: 'Vote', element: Vote },
  { path: '/election-results', name: 'ElectionResults', element: ElectionResults },
  { path: '/manage-parties', name: 'ManageParties', element: ManageParties },
  { path: '/voters', name: 'Voters', element: Voters },
  { path: '/candidates', name: 'Candidates', element: Candidates },
]

export default routes
