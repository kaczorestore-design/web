import { motion } from 'framer-motion'
import { Brain, Zap, Target, TrendingUp, Shield, Clock, CheckCircle, ArrowRight, BarChart3, Eye } from 'lucide-react'

const AIReporting = () => {
  const features = [
    {
      icon: Brain,
      title: 'Machine Learning Detection',
      description: 'Advanced AI algorithms trained on millions of medical images to detect subtle abnormalities.'
    },
    {
      icon: Target,
      title: 'Pattern Recognition',
      description: 'Sophisticated pattern analysis to identify complex pathological conditions with high accuracy.'
    },
    {
      icon: Zap,
      title: 'Rapid Analysis',
      description: 'AI-powered preliminary analysis provides instant insights to prioritize urgent cases.'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Learning',
      description: 'Our AI models continuously improve through machine learning and expert validation.'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'AI-assisted quality checks ensure consistent, high-standard radiological interpretations.'
    },
    {
      icon: Eye,
      title: 'Enhanced Visualization',
      description: 'Advanced image processing and 3D reconstruction for better diagnostic clarity.'
    }
  ]

  const capabilities = [
    {
      title: 'Chest X-Ray Analysis',
      description: 'Detection of pneumonia, pneumothorax, fractures, and other thoracic abnormalities.',
      accuracy: '95%'
    },
    {
      title: 'CT Brain Analysis',
      description: 'Identification of hemorrhage, stroke, tumors, and traumatic brain injuries.',
      accuracy: '92%'
    },
    {
      title: 'Mammography Screening',
      description: 'Early detection of breast cancer and suspicious lesions with high sensitivity.',
      accuracy: '94%'
    },
    {
      title: 'Bone Fracture Detection',
      description: 'Automated detection of fractures in extremities and spine imaging.',
      accuracy: '96%'
    }
  ]

  const benefits = [
    'Reduce diagnostic errors by up to 30%',
    'Improve report turnaround time by 50%',
    'Enhance detection of subtle findings',
    'Standardize reporting quality',
    'Support radiologist decision-making',
    'Enable 24/7 preliminary screening'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Brain className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">AI-Enhanced Reporting</h1>
            <p className="text-xl text-purple-100 leading-relaxed">
              Harness the power of artificial intelligence to enhance diagnostic accuracy, 
              reduce interpretation time, and improve patient outcomes with our advanced AI reporting system.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced AI Capabilities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-enhanced reporting system combines cutting-edge technology with expert medical knowledge.
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
                  <div className="bg-purple-100 rounded-lg p-3 w-fit mb-4">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Detection Capabilities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI models are trained on extensive datasets and validated by expert radiologists.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{capability.title}</h3>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {capability.accuracy}
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Clinical Benefits</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                AI-enhanced reporting doesn't replace radiologists—it empowers them with advanced tools 
                to deliver more accurate, consistent, and timely diagnoses.
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
              <div className="text-center mb-6">
                <BarChart3 className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">Performance Metrics</h3>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Accuracy</span>
                  <span className="text-2xl font-bold text-purple-600">94.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Time Reduction</span>
                  <span className="text-2xl font-bold text-green-600">50%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Error Reduction</span>
                  <span className="text-2xl font-bold text-blue-600">30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Cases Processed</span>
                  <span className="text-2xl font-bold text-orange-600">1M+</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Experience the Future of Radiology
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Discover how AI-enhanced reporting can transform your diagnostic capabilities 
              and improve patient outcomes.
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center space-x-2">
              <span>Learn More</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AIReporting