"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Camera, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { useStaff } from "@/contexts/StaffContext"

const createStaffSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  gender: z.string().min(1, "Gender is required"),
  role: z.string().min(1, "Role is required"),
  designation: z.string().min(1, "Designation is required"),
  staffId: z.string().min(1, "Staff ID is required"),
  officialEmail: z.string().email("Please enter a valid official email address"),
  photo: z.any().optional(),
})

type CreateStaffForm = z.infer<typeof createStaffSchema>

export default function CreateStaffPage() {
  const { addStaff } = useStaff()
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStaffForm>({
    resolver: zodResolver(createStaffSchema),
  })

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

  const onSubmit = async (data: CreateStaffForm) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Add the new staff to the context
    addStaff({
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      staffId: data.staffId,
      phoneNumber: data.phone,
      role: data.role,
      designation: data.designation,
      email: data.email,
      officialEmail: data.officialEmail,
      photo: photoPreview || undefined,
      status: 'Active'
    })
    
    console.log("Staff data:", { ...data, photo: selectedPhoto })
    setIsLoading(false)
    setShowSuccessModal(true)
  }

  const handleContinue = () => {
    setShowSuccessModal(false)
    router.push("/staff")
  }

  if (showSuccessModal) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="relative">
          {/* Modal Image */}
          <img
            src="/modalsuccess.png"
            alt="Success Modal"
            className="max-w-sm w-full h-auto"
          />
          
          {/* Continue Button Overlay */}
          <button
            onClick={handleContinue}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-8 rounded-lg font-medium hover:from-blue-600 hover:to-blue-800 transition-all duration-200 shadow-lg"
          >
            Continue
          </button>
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

      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Add a New Staff</h1>
          
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
                        <p className="text-gray-600 font-medium">Upload photo</p>
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
                    {...register("firstName")}
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-2">
                    Last name
                  </label>
                  <input
                    {...register("lastName")}
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                    Email address
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                    Phone number
                  </label>
                  <input
                    {...register("phone")}
                    type="tel"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                    placeholder="Enter phone number"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-900 mb-2">
                    Gender
                  </label>
                  <select
                    {...register("gender")}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
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

                {/* Role */}
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-900 mb-2">
                    Role
                  </label>
                  <select
                    {...register("role")}
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
                  </select>
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                  )}
                </div>

                {/* Designation */}
                <div>
                  <label htmlFor="designation" className="block text-sm font-medium text-gray-900 mb-2">
                    Designation
                  </label>
                  <select
                    {...register("designation")}
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
                  {errors.designation && (
                    <p className="mt-1 text-sm text-red-600">{errors.designation.message}</p>
                  )}
                </div>

                {/* Staff ID */}
                <div>
                  <label htmlFor="staffId" className="block text-sm font-medium text-gray-900 mb-2">
                    Staff ID
                  </label>
                  <input
                    {...register("staffId")}
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                    placeholder="Staff ID"
                  />
                  {errors.staffId && (
                    <p className="mt-1 text-sm text-red-600">{errors.staffId.message}</p>
                  )}
                </div>

                {/* Official Email */}
                <div>
                  <label htmlFor="officialEmail" className="block text-sm font-medium text-gray-900 mb-2">
                    Official email
                  </label>
                  <input
                    {...register("officialEmail")}
                    type="email"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                    placeholder="Official Email"
                  />
                  {errors.officialEmail && (
                    <p className="mt-1 text-sm text-red-600">{errors.officialEmail.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Add Staff Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-8 rounded-lg font-medium hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? "Adding Staff..." : "Add Staff"}
            </button>
          </div>
        </div>
      </form>

      {/* Footer */}
      <div className="text-center py-6">
        <p className="text-sm text-gray-500">Copyright &copy; 2025 Relia Energy. All Rights Reserved</p>
      </div>
    </div>
  )
}
