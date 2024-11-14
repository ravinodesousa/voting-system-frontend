import axios from 'axios'

const BASEURL = import.meta.env.VITE_BASE_URL

let config = {
  headers: {
    authorization: `BEARER ${localStorage.getItem('jwtToken')}`,
  },
}

const login = (data) => {
  return axios.post(`${BASEURL}/auth/login`, data)
}

const signup = (data) => {
  return axios.post(`${BASEURL}/auth/signup`, data)
}

const upload = (data) => {
  return axios.post(`${BASEURL}/auth/upload`, data)
}

const editUserStatus = (data) => {
  return axios.post(`${BASEURL}/auth/status/edit`, data, config)
}

const fetchVoters = () => {
  return axios(`${BASEURL}/user/voters`, config)
}

const fetchCandidates = () => {
  return axios(`${BASEURL}/user/candidates`, config)
}

const fetchActiveCandidates = () => {
  return axios(`${BASEURL}/user/candidates/active`, config)
}

const createElection = (data) => {
  return axios.post(`${BASEURL}/election/create`, data, config)
}

const editElection = (data) => {
  return axios.post(`${BASEURL}/election/edit`, data, config)
}

const electionList = () => {
  return axios(`${BASEURL}/election/list`, config)
}

const electionListWithVotedFlag = () => {
  return axios(`${BASEURL}/election/voted/list`, config)
}

const fetchParties = () => {
  return axios(`${BASEURL}/election/party/list`, config)
}

const addParty = (data) => {
  return axios.post(`${BASEURL}/election/party/add`, data, config)
}

const editParty = (data) => {
  return axios.post(`${BASEURL}/election/party/edit`, data, config)
}

const editPartyStatus = (data) => {
  return axios.post(`${BASEURL}/election/party/status/edit`, data, config)
}

const voteHandler = (data) => {
  return axios.post(`${BASEURL}/election/vote`, data, config)
}

const fetchElectionResult = () => {
  return axios(`${BASEURL}/election/result`, config)
}

export {
  login,
  signup,
  upload,
  fetchVoters,
  fetchCandidates,
  fetchActiveCandidates,
  createElection,
  editElection,
  electionList,
  electionListWithVotedFlag,
  fetchParties,
  addParty,
  editParty,
  editPartyStatus,
  voteHandler,
  fetchElectionResult,
  editUserStatus,
  BASEURL,
}
