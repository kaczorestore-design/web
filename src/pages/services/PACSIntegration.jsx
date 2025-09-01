import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Monitor, Database, Workflow, Cloud, Shield, Zap, CheckCircle, ArrowRight, Network, Settings } from 'lucide-react'
import ConsultationPopup from '../../components/ConsultationPopup'

const PACSIntegration = () => {
  const [isConsultationPopupOpen, setIsConsultationPopupOpen] = useState(false)

  const openConsultationPopup = () => {
    setIsConsultationPopupOpen(true)
  }

  const closeConsultationPopup = () => {
    setIsConsultationPopupOpen(false)
  }
  const features = [
    {
      icon: Database,
      title: 'Cloud-Based Storage',
      description: 'Secure, scalable cloud storage for all your medical imaging data with unlimited capacity.'
    },
    {
      icon: Network,
      title: 'Seamless Connectivity',
      description: 'Direct integration with existing PACS systems without disrupting current workflows.'
    },
    {
      icon: Workflow,
      title: 'Automated Workflows',
      description: 'Streamlined processes for image routing, reporting, and distribution across departments.'
    },
    {
      icon: Zap,
      title: 'Real-Time Sync',
      description: 'Instant synchronization of images and reports across all connected systems and locations.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and HIPAA-compliant security measures for all data transmission.'
    },
    {
      icon: Settings,
      title: 'Custom Configuration',
      description: 'Flexible configuration options to match your specific workflow requirements and preferences.'
    }
  ]

  const integrationSteps = [
    {
      step: '01',
      title: 'Assessment',
      description: 'Comprehensive evaluation of your current PACS infrastructure and workflow requirements.'
    },
    {
      step: '02',
      title: 'Planning',
      description: 'Custom integration plan designed to minimize downtime and maximize efficiency.'
    },
    {
      step: '03',
      title: 'Implementation',
      description: 'Expert installation and configuration with minimal disruption to daily operations.'
    },
    {
      step: '04',
      title: 'Testing',
      description: 'Thorough testing and validation to ensure seamless operation and data integrity.'
    },
    {
      step: '05',
      title: 'Training',
      description: 'Comprehensive staff training and ongoing support for optimal system utilization.'
    },
    {
      step: '06',
      title: 'Go-Live',
      description: 'Full deployment with 24/7 monitoring and immediate technical support availability.'
    }
  ]

  const benefits = [
    'Reduce IT infrastructure costs by 40%',
    'Improve image access speed by 60%',
    'Eliminate storage capacity limitations',
    'Enable remote access from anywhere',
    'Automatic backup and disaster recovery',
    'Seamless multi-site connectivity'
  ]

  const supportedFormats = [
    'DICOM', 'HL7', 'FHIR', 'IHE', 'XDS', 'WADO', 'DICOMweb', 'JPEG 2000'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Monitor className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">PACS Integration</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Seamless Picture Archiving and Communication System integration that connects 
              your imaging infrastructure with our advanced teleradiology platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Integration Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our PACS integration solution provides enterprise-grade connectivity and workflow optimization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Integration Process */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Integration Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven six-step integration process ensures smooth deployment with minimal disruption.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {integrationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 h-full">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {index < integrationSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-blue-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Standards */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Integration Benefits</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our PACS integration solution delivers measurable improvements in efficiency, 
                cost reduction, and workflow optimization.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Supported Standards</h3>
              <p className="text-gray-600 mb-6">
                Full compliance with industry standards and protocols for seamless interoperability.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {supportedFormats.map((format, index) => (
                  <motion.div
                    key={format}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-blue-50 rounded-lg p-3 text-center"
                  >
                    <span className="text-sm font-semibold text-blue-900">{format}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-green-800">99.9% Uptime Guarantee</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Integrate Your PACS?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Contact our integration specialists to discuss your requirements and 
              get a customized implementation plan.
            </p>
            <button 
              onClick={openConsultationPopup}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center space-x-2"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
      
      {/* Consultation Popup */}
      <ConsultationPopup 
        isOpen={isConsultationPopupOpen} 
        onClose={closeConsultationPopup} 
      />
    </div>
  )
}

export default PACSIntegration