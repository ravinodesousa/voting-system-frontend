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
  BASEURL,
  addParty,
  editParty,
  editPartyStatus,
  editUserStatus,
  fetchCandidates,
  fetchParties,
} from '../../axios'
import { cilCheck, cilPencil, cilPlus, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const Candidates = () => {
  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    init()
  }, [])

  function init() {
    fetchCandidates().then((res) => {
      console.log('candidates', res?.data)
      setCandidates(res?.data ?? [])
    })
  }

  function statusChangeHandler(id, newStatus) {
    editUserStatus({ id, status: newStatus }).then((res) => {
      console.log('status', res?.data)
      init()
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Candidate List</strong>
          </CCardHeader>
          <CCardBody>
            <CTable bordered>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Mobile No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Age</CTableHeaderCell>

                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {candidates.map((candidate) => {
                  return (
                    <CTableRow>
                      <CTableHeaderCell scope="row">{candidate?.id}</CTableHeaderCell>
                      <CTableDataCell>{`${candidate?.firstName} ${candidate?.lastName}`}</CTableDataCell>
                      <CTableDataCell>{candidate?.email}</CTableDataCell>
                      <CTableDataCell>{candidate?.mob_no}</CTableDataCell>
                      <CTableDataCell>
                        <img
                          width={'100px'}
                          height={'100px'}
                          src={`${BASEURL}/${candidate?.photo}`}
                        />
                      </CTableDataCell>
                      <CTableDataCell>{candidate?.gender}</CTableDataCell>
                      <CTableDataCell>{candidate?.age}</CTableDataCell>

                      <CTableDataCell>{candidate?.status}</CTableDataCell>
                      <CTableDataCell>
                        {candidate?.status == 'PENDING' && (
                          <CButton
                            color={'success'}
                            onClick={() => {
                              statusChangeHandler(candidate?.id, 'ACCEPTED')
                            }}
                          >
                            <CIcon icon={cilCheck} className="me-2" />
                            ACCEPT
                          </CButton>
                        )}

                        {candidate?.status == 'PENDING' && (
                          <CButton
                            color={'danger'}
                            onClick={() => {
                              statusChangeHandler(candidate?.id, 'REJECTED')
                            }}
                          >
                            <CIcon icon={cilTrash} className="me-2" />
                            REJECT
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
    </CRow>
  )
}

export default Candidates
