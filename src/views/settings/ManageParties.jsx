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
import { addParty, editParty, editPartyStatus, fetchParties } from '../../axios'
import { cilCheck, cilPencil, cilPlus, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const ManageParties = () => {
  const [parties, setParties] = useState([])

  const [visible, setVisible] = useState(false)
  const [opType, setOpType] = useState(null)

  const [selectedParty, setSelectedParty] = useState(null)
  const [partyName, setPartyName] = useState('')

  useEffect(() => {
    init()
  }, [])

  function init() {
    fetchParties().then((res) => {
      console.log('parties', res?.data)
      setParties(res?.data ?? [])
    })
  }

  function addEditHandler() {
    if (opType == 'EDIT') {
      editParty({ id: selectedParty, name: partyName }).then((res) => {
        console.log('edit', res?.data)
        setVisible(false)
        init()
      })
    } else {
      addParty({ name: partyName }).then((res) => {
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
            <strong>Party List</strong>
            <CButton
              color={'primary'}
              active={true}
              onClick={() => {
                setOpType('ADD')
                setSelectedParty(null)
                setPartyName('')

                setVisible(true)
              }}
            >
              <CIcon icon={cilPlus} className="me-2" />
              ADD PARTY
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable bordered>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>

                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {parties.map((party) => {
                  return (
                    <CTableRow>
                      <CTableHeaderCell scope="row">{party?.id}</CTableHeaderCell>
                      <CTableDataCell>{party?.name}</CTableDataCell>
                      <CTableDataCell>{party?.status}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color={'primary'}
                          active={true}
                          onClick={() => {
                            setOpType('EDIT')
                            setSelectedParty(party?.id)
                            setPartyName(party?.name)

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
          <CModalTitle>{opType} Party</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3">
              <CInputGroupText>Party Name</CInputGroupText>
              <CFormInput
                placeholder="Party Name"
                autoComplete="partyname"
                value={partyName}
                onChange={(event) => {
                  console.log('event', event?.target?.value)
                  setPartyName(event?.target?.value)
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

export default ManageParties
