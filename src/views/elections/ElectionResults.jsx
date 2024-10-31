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
  fetchElectionResult,
  fetchParties,
} from '../../axios'
import { cilCheck, cilPencil, cilPlus, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const ElectionResults = () => {
  const [electionResults, setElectionResults] = useState([])

  useEffect(() => {
    init()
  }, [])

  function init() {
    fetchElectionResult().then((res) => {
      console.log('electionResults', res?.data)
      setElectionResults(res?.data ?? [])
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Election Result List</strong>
          </CCardHeader>
          <CCardBody>electionResults</CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ElectionResults
