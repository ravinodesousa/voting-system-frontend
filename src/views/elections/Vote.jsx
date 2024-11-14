import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import {
  addParty,
  createElection,
  editElection,
  editParty,
  editPartyStatus,
  electionList,
  electionListWithVotedFlag,
  fetchActiveCandidates,
  fetchCandidates,
  fetchParties,
  voteHandler,
} from '../../axios'
import { cilCheck, cilPencil, cilPlus, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { convertToLocal } from '../../utils'

const Vote = () => {
  const [elections, setElections] = useState([])

  const [visible, setVisible] = useState(false)
  const [opType, setOpType] = useState(null)

  const [selectedElectionID, setSelectedElectionID] = useState(null)
  const [selectedCandidateID, setSelectedCandidateID] = useState(null)

  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    init()
  }, [])

  function init() {
    electionListWithVotedFlag().then((res) => {
      console.log('elections with votes: ', res?.data)
      setElections(res?.data ?? [])
    })

    fetchActiveCandidates().then((res) => {
      console.log('candidates: ', res?.data)
      setCandidates(res?.data ?? [])
    })
  }

  function castVote() {
    voteHandler({
      electionId: selectedElectionID,
      candidateId: selectedCandidateID,
    })
      .then((res) => {
        console.log('add', res?.data)
        setVisible(false)
        init()
      })
      .catch((err) => {
        console.log('res error', err?.response?.data)
        if (err?.response?.data?.message) {
          alert(err?.response?.data?.message)
        }
      })
  }

  function statusChangeHandler(id, newStatus) {
    editPartyStatus({ id, status: newStatus }).then((res) => {
      console.log('status', res?.data)
      init()
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Election List</strong>
          </CCardHeader>
          <CCardBody>
            <CTable bordered>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>

                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {elections.map((election) => {
                  return (
                    <CTableRow>
                      <CTableHeaderCell scope="row">{election?.id}</CTableHeaderCell>
                      <CTableDataCell>{election?.name}</CTableDataCell>
                      <CTableDataCell>{convertToLocal(election?.startDate)}</CTableDataCell>
                      <CTableDataCell>{convertToLocal(election?.endDate)}</CTableDataCell>

                      <CTableDataCell>{election?.status}</CTableDataCell>
                      <CTableDataCell>
                        {election?.status == 'ACTIVE' &&
                          election?.hasCastedVote == 0 &&
                          election?.votingAvailable == 1 && (
                            <CButton
                              color={'success'}
                              onClick={() => {
                                setSelectedElectionID(election?.id)
                                setVisible(true)
                              }}
                            >
                              <CIcon icon={cilCheck} className="me-2" />
                              VOTE
                            </CButton>
                          )}
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{opType} Election</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3">
              <CInputGroupText as="label" htmlFor="inputGroupSelect01">
                Candidate
              </CInputGroupText>
              <CFormSelect
                id="inputGroupSelect01"
                onChange={(e) => {
                  setSelectedCandidateID(e.target.value)
                }}
              >
                <option>Choose...</option>

                {candidates.map((candidate) => {
                  return (
                    // <option value={candidate?.id}>
                    //   {`${candidate?.firstName} ${candidate?.lastName} (${candidate?.partyId})`}
                    // </option>
                    <option value={candidate?.id}>
                      {`${candidate?.firstName} ${candidate?.lastName}`}
                    </option>
                  )
                })}
              </CFormSelect>
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              castVote()
            }}
          >
            Cast Vote
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default Vote
