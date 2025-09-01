import React, { useState } from 'react'
import { X } from 'lucide-react'
import api from '../utils/api'

const ConsultationPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    companyName: '',
    state: '',
    country: '',
    typeOfFacility: '',
    estimatedReadsAnnually: '10',
    typesOfReads: {
      plainFilm: false,
      ctScan: false,
      mri: false,
      ultrasound: false,
      mammography: false,
      nuclearMedicine: false,
      musculoskeletalUltrasound: false,
      petScan: false,
      echocardiogram: false,
      other: false
    },
    requestCallBack: '',
    consentGiven: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    if (name === 'consentGiven') {
      setFormData(prev => ({
        ...prev,
        consentGiven: checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        typesOfReads: {
          ...prev.typesOfReads,
          [name]: checked
        }
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      // Prepare data for sales lead API
      const selectedServices = Object.entries(formData.typesOfReads)
        .filter(([_, selected]) => selected)
        .map(([service, _]) => service.replace(/([A-Z])/g, ' $1').toLowerCase().trim())

      const salesLeadData = {
        companyName: formData.companyName,
        contactName: formData.name,
        email: formData.email,
        phone: formData.contactNo,
        location: `${formData.state}, ${formData.country}`,
        source: 'Consultation Form',
        status: 'new',
        priority: 'medium',
        servicesOfInterest: selectedServices,
        notes: `Facility Type: ${formData.typeOfFacility}\nEstimated Reads Annually: ${formData.estimatedReadsAnnually}\nRequested Call Back: ${formData.requestCallBack}`,
        consentGiven: formData.consentGiven,
        consentDate: new Date().toISOString(),
        marketingConsent: formData.consentGiven
      }

      const response = await api.post('/sales-leads', salesLeadData)

      if (response.status === 200 || response.status === 201) {
        setSubmitMessage('Thank you! Your consultation request has been submitted successfully.')
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            contactNo: '',
            companyName: '',
            state: '',
            country: '',
            typeOfFacility: '',
            estimatedReadsAnnually: '10',
            typesOfReads: {
              plainFilm: false,
              ctScan: false,
              mri: false,
              ultrasound: false,
              mammography: false,
              nuclearMedicine: false,
              musculoskeletalUltrasound: false,
              petScan: false,
              echocardiogram: false,
              other: false
            },
            requestCallBack: '',
            consentGiven: false
          })
          onClose()
        }, 2000)
      } else {
        setSubmitMessage('Error submitting form. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting consultation form:', error)
      setSubmitMessage('Error submitting form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 text-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-gray-700">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-cyan-400">
              Request a Teleradiology Or A Radiology Reading Quote
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Required fields notice */}
          <p className="text-orange-600 text-sm mb-6">
            Fields marked with an <span className="text-red-400">*</span> are required
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
            </div>

            {/* Row 2: Contact No and Company Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Contact No <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Company Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
            </div>

            {/* Row 3: State and Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  State <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Country <span className="text-red-400">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="">- Select Country -</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="India">India</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Row 4: Type of Facility and Estimated Reads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Type of Facility <span className="text-red-400">*</span>
                </label>
                <select
                  name="typeOfFacility"
                  value={formData.typeOfFacility}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="">--Select--</option>
                  <option value="Hospital">Hospital</option>
                  <option value="Imaging Center">Imaging Center</option>
                  <option value="Clinic">Clinic</option>
                  <option value="Urgent Care">Urgent Care</option>
                  <option value="Emergency Department">Emergency Department</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Estimated Number of Reads Annually <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="estimatedReadsAnnually"
                  value={formData.estimatedReadsAnnually}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
            </div>

            {/* Types of Reads/Modalities */}
            <div>
              <label className="block text-white text-sm font-medium mb-3">
                Types of Reads / Modalities? Please check all that apply. <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { key: 'plainFilm', label: 'Plain Film' },
                  { key: 'ctScan', label: 'CT Scan' },
                  { key: 'mri', label: 'MRI' },
                  { key: 'ultrasound', label: 'Ultrasound' },
                  { key: 'mammography', label: 'Mammography' },
                  { key: 'nuclearMedicine', label: 'Nuclear Medicine' },
                  { key: 'musculoskeletalUltrasound', label: 'Musculoskeletal Ultrasound' },
                  { key: 'petScan', label: 'PET Scan' },
                  { key: 'echocardiogram', label: 'Echocardiogram' },
                  { key: 'other', label: 'Other' }
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center space-x-2 text-white">
                    <input
                      type="checkbox"
                      name={key}
                      checked={formData.typesOfReads[key]}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-cyan-400 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Request a call back */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Request a call back: <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                name="requestCallBack"
                value={formData.requestCallBack}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* Consent checkbox */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                name="consentGiven"
                checked={formData.consentGiven}
                onChange={handleCheckboxChange}
                required
                className="w-4 h-4 text-cyan-400 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400 mt-1"
              />
              <label className="text-white text-sm">
                By submitting this web form, I grant permission for Teleradiology Solutions to contact me via email or phone.
                It will override my registry in NCPR.
              </label>
            </div>

            {/* Submit Message */}
            {submitMessage && (
              <div className={`p-3 rounded ${submitMessage.includes('Error') ? 'bg-red-600' : 'bg-green-600'} text-white`}>
                {submitMessage}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-cyan-400 text-blue-900 px-8 py-3 rounded font-semibold hover:bg-cyan-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConsultationPopup