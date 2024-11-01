import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
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
import { CChart } from '@coreui/react-chartjs'

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

  //   {
  //     "id": 2,
  //     "name": "bhbhh",
  //     "startDate": "2024-10-14T23:22:00.000Z",
  //     "endDate": "2024-10-19T00:22:00.000Z",
  //     "status": "CLOSED",
  //     "createdAt": "2024-10-28T00:22:45.000Z",
  //     "updatedAt": "2024-10-31T15:46:00.000Z",
  //     "": {
  //         "id": 1,
  //         "electionId": 2,
  //         "candidateId": 2,
  //         "totalVotes": 1,
  //         "createdAt": "2024-10-31T15:46:00.000Z",
  //         "updatedAt": "2024-10-31T15:46:00.000Z",
  //         "candidate": {
  //             "id": 2,
  //             "name": "bhbhh",
  //             "startDate": "2024-10-14T23:22:00.000Z",
  //             "endDate": "2024-10-19T00:22:00.000Z",
  //             "status": "CLOSED",
  //             "createdAt": "2024-10-28T00:22:45.000Z",
  //             "updatedAt": "2024-10-31T15:46:00.000Z"
  //         }
  //     },
  //     "votes": [
  //         {
  //             "candidateId": 2,
  //             "totalVotes": 1,
  //             "userId": 2,
  //             "firstName": "Ravino",
  //             "lastName": "De Souza",
  //             "email": "Ravinodesouza@gmail.com",
  //             "mob_no": "7857684933",
  //             "photo": "uploads/1730375423270-706917124_Manual_handling_certificate.jpg",
  //             "gender": "MALE",
  //             "age": 34,
  //             "user_type": "CANDIDATE",
  //             "partyId": 4,
  //             "status": "ACCEPTED"
  //         }
  //     ]
  // }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Election Result List</strong>
          </CCardHeader>
          <CCardBody>
            {electionResults.map((result) => {
              return (
                <CCard className="my-4">
                  <CCardBody>
                    <CTable bordered>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                          <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Won By</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Total Votes</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow>
                          <CTableHeaderCell scope="row">{result?.id}</CTableHeaderCell>
                          <CTableDataCell> {result?.name}</CTableDataCell>
                          <CTableDataCell>{result?.startDate}</CTableDataCell>
                          <CTableDataCell>{result?.endDate}</CTableDataCell>

                          <CTableDataCell>{result?.status}</CTableDataCell>

                          <CTableDataCell>{result?.results?.candidate?.name ?? ''}</CTableDataCell>
                          <CTableDataCell>{result?.results?.totalVotes ?? ''}</CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>

                    {result?.votes?.length > 0 && (
                      <CChart
                        type="bar"
                        data={{
                          labels: result?.votes?.map((candidate) => {
                            return `${candidate?.firstName} ${candidate?.lastName}`
                          }),
                          datasets: [
                            {
                              label: 'Total Votes',
                              backgroundColor: '#f87979',
                              data: result?.votes?.map((candidate) => {
                                return candidate?.totalVotes
                              }),
                            },
                          ],
                        }}
                        labels="candidates"
                      />
                    )}
                  </CCardBody>
                </CCard>
              )
            })}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ElectionResults
