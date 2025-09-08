"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter, useParams } from "next/navigation"
import { Camera, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useStaff } from "@/contexts/StaffContext"

const editStaffSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  gender: z.string().min(1, "Gender is required"),
  staffId: z.string().min(1, "Staff ID is required"),
  designation: z.string().min(1, "Designation is required"),
  officialEmail: z.string().email("Please enter a valid official email address"),
  photo: z.any().optional(),
})

const assignRoleSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  role: z.string().min(1, "Role is required"),
})

type EditStaffForm = z.infer<typeof editStaffSchema>
type AssignRoleForm = z.infer<typeof assignRoleSchema>

export default function EditStaffPage() {
  const { staff, updateStaff } = useStaff()
  const params = useParams()
  const router = useRouter()
  const staffId = params.id as string
  
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [currentStaff, setCurrentStaff] = useState<any>(null)

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    setValue: setProfileValue,
  } = useForm<EditStaffForm>({
    resolver: zodResolver(editStaffSchema),
  })

  const {
    register: registerRole,
    handleSubmit: handleSubmitRole,
    formState: { errors: roleErrors },
    setValue: setRoleValue,
  } = useForm<AssignRoleForm>({
    resolver: zodResolver(assignRoleSchema),
  })

  useEffect(() => {
    const staffMember = staff.find(s => s.staffId === staffId)
    if (staffMember) {
      setCurrentStaff(staffMember)
      setProfileValue("firstName", staffMember.firstName)
      setProfileValue("lastName", staffMember.lastName)
      setProfileValue("email", staffMember.email)
      setProfileValue("phone", staffMember.phoneNumber)
      setProfileValue("gender", staffMember.gender)
      setProfileValue("staffId", staffMember.staffId)
      setProfileValue("designation", staffMember.designation)
      setProfileValue("officialEmail", staffMember.officialEmail)
      setRoleValue("userId", staffMember.staffId)
      setRoleValue("role", staffMember.role)
      if (staffMember.photo) {
        setPhotoPreview(staffMember.photo)
      }
    }
  }, [staff, staffId, setProfileValue, setRoleValue])

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPG, JPEG, or PNG)')
        return
      }
      
      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB')
        return
      }
      
      setSelectedPhoto(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmitProfile = async (data: EditStaffForm) => {
    if (!currentStaff) return
    
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update the staff member
    updateStaff(currentStaff.id, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phone,
      gender: data.gender,
      staffId: data.staffId,
      designation: data.designation,
      officialEmail: data.officialEmail,
      photo: photoPreview || currentStaff.photo,
    })
    
    setIsLoading(false)
    alert("Profile updated successfully!")
  }

  const onSubmitRole = async (data: AssignRoleForm) => {
    if (!currentStaff) return
    
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update the staff member's role
    updateStaff(currentStaff.id, {
      role: data.role,
    })
    
    setIsLoading(false)
    alert("Role updated successfully!")
  }

  if (!currentStaff) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Staff Member Not Found</h1>
          <p className="text-gray-600 mt-2">The staff member you're looking for doesn't exist.</p>
          <Link
            href="/staff"
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Staff List
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Link
        href="/staff"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Link>

      {/* Edit Staff Profile Section */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Staff Profile</h1>
        
        <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Photo Upload */}
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Staff photo preview"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="text-center">
                        <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 font-medium">Update Photo</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handlePhotoChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>Allowed format: JPG, JPEG, and PNG</p>
                  <p>Max file size: 2MB</p>
                </div>
              </div>
            </div>

            {/* Right Column - Form Fields */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-2">
                    First name
                  </label>
                  <input
                    {...registerProfile("firstName")}
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                    placeholder="Enter first name"
                  />
                  {profileErrors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.firstName.message}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-2">
                    Last name
                  </label>
                  <input
                    {...registerProfile("lastName")}
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                    placeholder="Enter last name"
                  />
                  {profileErrors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.lastName.message}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                    Email address
                  </label>
                  <input
                    {...registerProfile("email")}
                    type="email"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                    placeholder="Enter email address"
                  />
                  {profileErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.email.message}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                    Phone number
                  </label>
                  <input
                    {...registerProfile("phone")}
                    type="tel"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                    placeholder="Enter phone number"
                  />
                  {profileErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.phone.message}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-900 mb-2">
                    Gender
                  </label>
                  <select
                    {...registerProfile("gender")}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {profileErrors.gender && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.gender.message}</p>
                  )}
                </div>

                {/* Phone Number (Duplicate as shown in design) */}
                <div>
                  <label htmlFor="phone2" className="block text-sm font-medium text-gray-900 mb-2">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Staff ID */}
                <div>
                  <label htmlFor="staffId" className="block text-sm font-medium text-gray-900 mb-2">
                    Staff ID
                  </label>
                  <input
                    {...registerProfile("staffId")}
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                    placeholder="Staff ID"
                  />
                  {profileErrors.staffId && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.staffId.message}</p>
                  )}
                </div>

                {/* Designation */}
                <div>
                  <label htmlFor="designation" className="block text-sm font-medium text-gray-900 mb-2">
                    Designation
                  </label>
                  <select
                    {...registerProfile("designation")}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  >
                    <option value="">Select designation</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Administration">Administration</option>
                  </select>
                  {profileErrors.designation && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.designation.message}</p>
                  )}
                </div>

                {/* Official Email */}
                <div>
                  <label htmlFor="officialEmail" className="block text-sm font-medium text-gray-900 mb-2">
                    Official email
                  </label>
                  <input
                    {...registerProfile("officialEmail")}
                    type="email"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                    placeholder="Official Email"
                  />
                  {profileErrors.officialEmail && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.officialEmail.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-8 rounded-lg font-medium hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? "Updating..." : "Edit Profile"}
            </button>
          </div>
        </form>
      </div>

      {/* Assign Role Section */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Assign Role</h1>
        
        <form onSubmit={handleSubmitRole(onSubmitRole)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User ID */}
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-900 mb-2">
                User ID
              </label>
              <input
                {...registerRole("userId")}
                type="text"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                placeholder="User ID"
                readOnly
              />
              {roleErrors.userId && (
                <p className="mt-1 text-sm text-red-600">{roleErrors.userId.message}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-900 mb-2">
                Role
              </label>
              <select
                {...registerRole("role")}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
              >
                <option value="">Select role</option>
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Analyst">Analyst</option>
                <option value="Support">Support</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Specialist">Specialist</option>
                <option value="Coordinator">Coordinator</option>
                <option value="Admin">Admin</option>
                <option value="I.T">I.T</option>
              </select>
              {roleErrors.role && (
                <p className="mt-1 text-sm text-red-600">{roleErrors.role.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-8 rounded-lg font-medium hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center py-6">
        <p className="text-sm text-gray-500">Copyright &copy; 2025 Relia Energy. All Rights Reserved</p>
      </div>
    </div>
  )
}
