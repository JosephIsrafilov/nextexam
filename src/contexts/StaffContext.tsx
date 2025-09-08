"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Staff {
  id: number
  sn: number
  firstName: string
  lastName: string
  gender: string
  staffId: string
  phoneNumber: string
  role: string
  designation: string
  email: string
  officialEmail: string
  photo?: string
  status: 'Active' | 'Inactive' | 'On Leave'
}

interface StaffContextType {
  staff: Staff[]
  addStaff: (newStaff: Omit<Staff, 'id' | 'sn'>) => void
  updateStaff: (id: number, updatedStaff: Partial<Staff>) => void
  deleteStaff: (id: number) => void
}

const StaffContext = createContext<StaffContextType | undefined>(undefined)

// Initial staff data matching the design exactly
const initialStaff: Staff[] = [
  {
    id: 1,
    sn: 1,
    firstName: "Sandra",
    lastName: "Williams",
    gender: "Female",
    staffId: "0246AHR",
    phoneNumber: "08130000000",
    role: "Admin",
    designation: "Human Resources",
    email: "sandra.williams@company.com",
    officialEmail: "sandra.williams@company.com",
    status: "Active"
  },
  {
    id: 2,
    sn: 2,
    firstName: "Abubakar",
    lastName: "Ibrahim",
    gender: "Male",
    staffId: "0251ITO",
    phoneNumber: "07062000033",
    role: "I.T",
    designation: "Operations",
    email: "abubakar.ibrahim@company.com",
    officialEmail: "abubakar.ibrahim@company.com",
    status: "Active"
  },
  {
    id: 3,
    sn: 3,
    firstName: "Maria",
    lastName: "Garcia",
    gender: "Female",
    staffId: "0247FIN",
    phoneNumber: "08130000001",
    role: "Analyst",
    designation: "Finance",
    email: "maria.garcia@company.com",
    officialEmail: "maria.garcia@company.com",
    status: "Active"
  },
  {
    id: 4,
    sn: 4,
    firstName: "James",
    lastName: "Wilson",
    gender: "Male",
    staffId: "0248OPS",
    phoneNumber: "08130000002",
    role: "Supervisor",
    designation: "Operations",
    email: "james.wilson@company.com",
    officialEmail: "james.wilson@company.com",
    status: "Active"
  },
  {
    id: 5,
    sn: 5,
    firstName: "Lisa",
    lastName: "Chen",
    gender: "Female",
    staffId: "0249MKT",
    phoneNumber: "08130000003",
    role: "Specialist",
    designation: "Marketing",
    email: "lisa.chen@company.com",
    officialEmail: "lisa.chen@company.com",
    status: "Active"
  },
  {
    id: 6,
    sn: 6,
    firstName: "Robert",
    lastName: "Taylor",
    gender: "Male",
    staffId: "0250HR",
    phoneNumber: "08130000004",
    role: "Coordinator",
    designation: "Human Resources",
    email: "robert.taylor@company.com",
    officialEmail: "robert.taylor@company.com",
    status: "Active"
  },
  {
    id: 7,
    sn: 7,
    firstName: "Jennifer",
    lastName: "Lee",
    gender: "Female",
    staffId: "0252IT",
    phoneNumber: "08130000005",
    role: "Designer",
    designation: "IT",
    email: "jennifer.lee@company.com",
    officialEmail: "jennifer.lee@company.com",
    status: "Active"
  },
  {
    id: 8,
    sn: 8,
    firstName: "Michael",
    lastName: "Brown",
    gender: "Male",
    staffId: "0253FIN",
    phoneNumber: "08130000006",
    role: "Manager",
    designation: "Finance",
    email: "michael.brown@company.com",
    officialEmail: "michael.brown@company.com",
    status: "Active"
  },
  {
    id: 9,
    sn: 9,
    firstName: "Sarah",
    lastName: "Davis",
    gender: "Female",
    staffId: "0254OPS",
    phoneNumber: "08130000007",
    role: "Analyst",
    designation: "Operations",
    email: "sarah.davis@company.com",
    officialEmail: "sarah.davis@company.com",
    status: "Active"
  },
  {
    id: 10,
    sn: 10,
    firstName: "David",
    lastName: "Miller",
    gender: "Male",
    staffId: "0255MKT",
    phoneNumber: "08130000008",
    role: "Manager",
    designation: "Marketing",
    email: "david.miller@company.com",
    officialEmail: "david.miller@company.com",
    status: "Active"
  },
  {
    id: 11,
    sn: 11,
    firstName: "Emily",
    lastName: "Johnson",
    gender: "Female",
    staffId: "0256HR",
    phoneNumber: "08130000009",
    role: "Specialist",
    designation: "Human Resources",
    email: "emily.johnson@company.com",
    officialEmail: "emily.johnson@company.com",
    status: "Active"
  },
  {
    id: 12,
    sn: 12,
    firstName: "Christopher",
    lastName: "White",
    gender: "Male",
    staffId: "0257IT",
    phoneNumber: "08130000010",
    role: "Developer",
    designation: "IT",
    email: "christopher.white@company.com",
    officialEmail: "christopher.white@company.com",
    status: "Active"
  },
  {
    id: 13,
    sn: 13,
    firstName: "Amanda",
    lastName: "Martinez",
    gender: "Female",
    staffId: "0258FIN",
    phoneNumber: "08130000011",
    role: "Analyst",
    designation: "Finance",
    email: "amanda.martinez@company.com",
    officialEmail: "amanda.martinez@company.com",
    status: "Active"
  },
  {
    id: 14,
    sn: 14,
    firstName: "Kevin",
    lastName: "Anderson",
    gender: "Male",
    staffId: "0259OPS",
    phoneNumber: "08130000012",
    role: "Supervisor",
    designation: "Operations",
    email: "kevin.anderson@company.com",
    officialEmail: "kevin.anderson@company.com",
    status: "Active"
  },
  {
    id: 15,
    sn: 15,
    firstName: "Rachel",
    lastName: "Thompson",
    gender: "Female",
    staffId: "0260MKT",
    phoneNumber: "08130000013",
    role: "Coordinator",
    designation: "Marketing",
    email: "rachel.thompson@company.com",
    officialEmail: "rachel.thompson@company.com",
    status: "Active"
  },
  {
    id: 16,
    sn: 16,
    firstName: "Daniel",
    lastName: "Clark",
    gender: "Male",
    staffId: "0261HR",
    phoneNumber: "08130000014",
    role: "Manager",
    designation: "Human Resources",
    email: "daniel.clark@company.com",
    officialEmail: "daniel.clark@company.com",
    status: "Active"
  },
  {
    id: 17,
    sn: 17,
    firstName: "Michelle",
    lastName: "Rodriguez",
    gender: "Female",
    staffId: "0262IT",
    phoneNumber: "08130000015",
    role: "Designer",
    designation: "IT",
    email: "michelle.rodriguez@company.com",
    officialEmail: "michelle.rodriguez@company.com",
    status: "Active"
  },
  {
    id: 18,
    sn: 18,
    firstName: "Andrew",
    lastName: "Lewis",
    gender: "Male",
    staffId: "0263FIN",
    phoneNumber: "08130000016",
    role: "Specialist",
    designation: "Finance",
    email: "andrew.lewis@company.com",
    officialEmail: "andrew.lewis@company.com",
    status: "Active"
  },
  {
    id: 19,
    sn: 19,
    firstName: "Stephanie",
    lastName: "Walker",
    gender: "Female",
    staffId: "0264OPS",
    phoneNumber: "08130000017",
    role: "Analyst",
    designation: "Operations",
    email: "stephanie.walker@company.com",
    officialEmail: "stephanie.walker@company.com",
    status: "Active"
  },
  {
    id: 20,
    sn: 20,
    firstName: "Ryan",
    lastName: "Hall",
    gender: "Male",
    staffId: "0265MKT",
    phoneNumber: "08130000018",
    role: "Manager",
    designation: "Marketing",
    email: "ryan.hall@company.com",
    officialEmail: "ryan.hall@company.com",
    status: "Active"
  }
]

export function StaffProvider({ children }: { children: ReactNode }) {
  const [staff, setStaff] = useState<Staff[]>(initialStaff)

  const generateStaffId = () => {
    const maxId = Math.max(...staff.map(s => parseInt(s.staffId.replace('EMP', ''))))
    return `EMP${String(maxId + 1).padStart(3, '0')}`
  }

  const addStaff = (newStaffData: Omit<Staff, 'id' | 'sn'>) => {
    const newStaff: Staff = {
      ...newStaffData,
      id: Math.max(...staff.map(s => s.id)) + 1,
      sn: staff.length + 1,
      staffId: newStaffData.staffId || generateStaffId(),
      status: 'Active'
    }
    setStaff(prevStaff => [...prevStaff, newStaff])
  }

  const updateStaff = (id: number, updatedStaff: Partial<Staff>) => {
    setStaff(prevStaff =>
      prevStaff.map(staff =>
        staff.id === id ? { ...staff, ...updatedStaff } : staff
      )
    )
  }

  const deleteStaff = (id: number) => {
    setStaff(prevStaff => prevStaff.filter(staff => staff.id !== id))
  }

  return (
    <StaffContext.Provider value={{ staff, addStaff, updateStaff, deleteStaff }}>
      {children}
    </StaffContext.Provider>
  )
}

export function useStaff() {
  const context = useContext(StaffContext)
  if (context === undefined) {
    throw new Error('useStaff must be used within a StaffProvider')
  }
  return context
}
