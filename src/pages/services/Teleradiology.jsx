import { motion } from 'framer-motion'
import { Stethoscope, Clock, Shield, Users, Globe, CheckCircle, ArrowRight, Monitor, Brain, Award } from 'lucide-react'

const Teleradiology = () => {
  const features = [
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Round-the-clock radiology coverage with board-certified radiologists available anytime.'
    },
    {
      icon: Brain,
      title: 'AI-Enhanced Analysis',
      description: 'Advanced AI algorithms assist in detecting abnormalities and improving diagnostic accuracy.'
    },
    {
      icon: Shield,
      title: 'HIPAA Compliant',
      description: 'Secure, encrypted transmission and storage of all medical imaging data and reports.'
    },
    {
      icon: Users,
      title: 'Expert Radiologists',
      description: 'Board-certified radiologists with subspecialty expertise across all imaging modalities.'
    },
    {
      icon: Monitor,
      title: 'PACS Integration',
      description: 'Seamless integration with existing Picture Archiving and Communication Systems.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Comprehensive QA programs ensuring the highest standards of radiological interpretation.'
    }
  ]

  const benefits = [
    'Reduce radiologist staffing costs',
    'Improve turnaround times',
    'Access to subspecialty expertise',
    'Enhanced patient care quality',
    'Scalable coverage solutions',
    'Emergency radiology support'
  ]

  const modalities = [
    'CT Scans', 'MRI', 'X-Ray', 'Ultrasound', 'Mammography', 
    'Nuclear Medicine', 'PET/CT', 'Fluoroscopy', 'Angiography'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-medical-600 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Stethoscope className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Teleradiology Services</h1>
            <p className="text-xl text-primary-100 leading-relaxed">
              Professional remote radiology interpretations by board-certified radiologists. 
              Delivering accurate, timely results with 24/7 coverage and AI-enhanced analysis.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Teleradiology Services?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology meets expert medical knowledge to deliver superior radiology services.
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
                  <div className="bg-primary-100 rounded-lg p-3 w-fit mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Benefits</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our teleradiology services provide healthcare facilities with access to expert radiological 
                interpretations, reducing costs while improving patient care quality.
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
              className="bg-gradient-to-br from-primary-50 to-medical-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Supported Modalities</h3>
              <div className="grid grid-cols-2 gap-4">
                {modalities.map((modality, index) => (
                  <motion.div
                    key={modality}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg p-3 text-center shadow-sm"
                  >
                    <span className="text-sm font-medium text-gray-900">{modality}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Enhance Your Radiology Services?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Contact us today to learn how our teleradiology services can improve 
              your patient care and operational efficiency.
            </p>
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center space-x-2">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Teleradiology