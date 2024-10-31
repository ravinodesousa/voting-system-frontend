import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
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
  fetchParties,
} from '../../axios'
import { cilCheck, cilPencil, cilPlus, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const ManageElections = () => {
  const [elections, setElections] = useState([])

  const [visible, setVisible] = useState(false)
  const [opType, setOpType] = useState(null)

  const [selectedElectionID, setSelectedElectionID] = useState(null)
  const [electionName, setElectionName] = useState('')
  const [electionStartDate, setElectionStartDate] = useState('')
  const [electionEndDate, setElectionEndDate] = useState('')

  useEffect(() => {
    init()
  }, [])

  function init() {
    electionList().then((res) => {
      console.log('elections', res?.data)
      setElections(res?.data ?? [])
    })
  }

  function addEditHandler() {
    if (opType == 'EDIT') {
      editElection({
        id: selectedElectionID,
        name: electionName,
        startDate: electionStartDate,
        endDate: electionEndDate,
      }).then((res) => {
        console.log('edit', res?.data)
        setVisible(false)
        init()
      })
    } else {
      createElection({
        name: electionName,
        startDate: electionStartDate,
        endDate: electionEndDate,
      }).then((res) => {
        console.log('add', res?.data)
        setVisible(false)
        init()
      })
    }
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
            <CButton
              color={'primary'}
              active={true}
              onClick={() => {
                setOpType('CREATE')
                setSelectedElectionID(null)
                setElectionName('')

                setVisible(true)
              }}
            >
              <CIcon icon={cilPlus} className="me-2" />
              CREATE ELECTION
            </CButton>
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
                {elections.map((party) => {
                  return (
                    <CTableRow>
                      <CTableHeaderCell scope="row">{party?.id}</CTableHeaderCell>
                      <CTableDataCell>{party?.name}</CTableDataCell>
                      <CTableDataCell>{party?.startDate}</CTableDataCell>
                      <CTableDataCell>{party?.endDate}</CTableDataCell>

                      <CTableDataCell>{party?.status}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color={'primary'}
                          active={true}
                          onClick={() => {
                            setOpType('EDIT')
                            setSelectedElectionID(party?.id)
                            setElectionName(party?.name)

                            setVisible(true)
                          }}
                        >
                          <CIcon icon={cilPencil} className="me-2" />
                          EDIT
                        </CButton>

                        {party?.status == 'INACTIVE' && (
                          <CButton
                            color={'success'}
                            onClick={() => {
                              statusChangeHandler(party?.id, 'ACTIVE')
                            }}
                          >
                            <CIcon icon={cilCheck} className="me-2" />
                            ACTIVE
                          </CButton>
                        )}

                        {party?.status == 'ACTIVE' && (
                          <CButton
                            color={'danger'}
                            onClick={() => {
                              statusChangeHandler(party?.id, 'INACTIVE')
                            }}
                          >
                            <CIcon icon={cilTrash} className="me-2" />
                            INACTIVE
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
              <CInputGroupText>Election Name</CInputGroupText>
              <CFormInput
                placeholder="Election Name"
                autoComplete="partyname"
                value={electionName}
                onChange={(event) => {
                  console.log('event', event?.target?.value)
                  setElectionName(event?.target?.value)
                }}
              />
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText>Election Start Date</CInputGroupText>
              <CFormInput
                placeholder="Election Start Date"
                autoComplete="electionstartdate"
                value={electionStartDate}
                type="datetime-local"
                onChange={(event) => {
                  console.log('event', event?.target?.value)
                  setElectionStartDate(event?.target?.value)
                }}
              />
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText>Election End Date</CInputGroupText>
              <CFormInput
                placeholder="Election End Date"
                autoComplete="electionenddate"
                type="datetime-local"
                value={electionEndDate}
                onChange={(event) => {
                  console.log('event', event?.target?.value)
                  setElectionEndDate(event?.target?.value)
                }}
              />
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
              addEditHandler()
            }}
          >
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default ManageElections
