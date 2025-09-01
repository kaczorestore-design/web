import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Workflow, 
  Zap, 
  BarChart3, 
  Settings, 
  ArrowRight,
  Bot,
  Clock,
  Target
} from 'lucide-react'

const IntelligentWorkflow = () => {
  const features = [
    {
      title: 'AI-Powered Triage',
      description: 'Intelligent case prioritization based on urgency and complexity',
      icon: Bot
    },
    {
      title: 'Automated Routing',
      description: 'Smart case distribution to appropriate subspecialty radiologists',
      icon: Workflow
    },
    {
      title: 'Real-time Analytics',
      description: 'Live dashboard with workflow metrics and performance insights',
      icon: BarChart3
    },
    {
      title: 'Custom Protocols',
      description: 'Configurable workflows tailored to your facility\'s needs',
      icon: Settings
    }
  ]

  const workflowSteps = [
    {
      step: '1',
      title: 'Image Acquisition',
      description: 'Studies automatically received and processed in our secure system',
      time: 'Instant'
    },
    {
      step: '2',
      title: 'AI Triage',
      description: 'Machine learning algorithms analyze and prioritize cases',
      time: '&lt; 2 minutes'
    },
    {
      step: '3',
      title: 'Smart Routing',
      description: 'Cases automatically routed to appropriate subspecialty radiologists',
      time: '&lt; 1 minute'
    },
    {
      step: '4',
      title: 'Expert Interpretation',
      description: 'Board-certified radiologists provide accurate, timely reports',
      time: 'Per SLA'
    },
    {
      step: '5',
      title: 'Quality Assurance',
      description: 'Automated quality checks and peer review when needed',
      time: '&lt; 5 minutes'
    },
    {
      step: '6',
      title: 'Report Delivery',
      description: 'Final reports delivered through your preferred communication method',
      time: 'Instant'
    }
  ]

  const aiCapabilities = [
    {
      capability: 'Critical Finding Detection',
      description: 'AI algorithms flag potential critical findings for immediate attention',
      accuracy: '99.2%'
    },
    {
      capability: 'Case Complexity Assessment',
      description: 'Intelligent assessment of case difficulty for optimal radiologist assignment',
      accuracy: '96.8%'
    },
    {
      capability: 'Turnaround Time Prediction',
      description: 'Predictive analytics for accurate delivery time estimates',
      accuracy: '94.5%'
    },
    {
      capability: 'Quality Score Prediction',
      description: 'AI-powered quality assessment and improvement recommendations',
      accuracy: '97.3%'
    }
  ]

  const benefits = [
    'Reduced turnaround times by up to 40%',
    'Improved diagnostic accuracy through AI assistance',
    'Enhanced workflow efficiency and productivity',
    'Better resource utilization and cost optimization',
    'Real-time visibility into workflow performance',
    'Seamless integration with existing systems'
  ]

  const metrics = [
    {
      metric: '40%',
      label: 'Faster Turnaround',
      description: 'Average improvement in report delivery time'
    },
    {
      metric: '99.2%',
      label: 'AI Accuracy',
      description: 'Critical finding detection accuracy'
    },
    {
      metric: '24/7',
      label: 'Automated Processing',
      description: 'Continuous intelligent workflow operation'
    },
    {
      metric: '95%',
      label: 'Efficiency Gain',
      description: 'Workflow optimization improvement'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container-custom section-padding relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  <Bot className="w-4 h-4" />
                  <span>AI-Powered Workflow</span>
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Intelligent Workflow
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"> Optimization </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Transform your radiology workflow with AI-powered automation, intelligent case routing, 
                  and real-time analytics for maximum efficiency and accuracy.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 btn-primary text-lg px-8 py-4 rounded-xl"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 btn-secondary text-lg px-8 py-4 rounded-xl"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>View Demo</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="/images/intelligent-workflow.svg"
                alt="Intelligent workflow"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">40% Faster</div>
                    <div className="text-sm text-gray-600">Turnaround Time</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Workflow Performance Metrics
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Measurable improvements in efficiency, accuracy, and turnaround times
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl font-bold text-purple-600 mb-2">{metric.metric}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{metric.label}</h3>
                <p className="text-gray-600 text-sm">{metric.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Steps Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Intelligent Workflow Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered workflow optimizes every step from image acquisition to report delivery
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-lg">{step.step}</span>
                  </div>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    {step.time}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                
                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-purple-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AI-Powered Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced artificial intelligence enhances every aspect of your radiology workflow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiCapabilities.map((capability, index) => (
              <motion.div
                key={capability.capability}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex-1">{capability.capability}</h3>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium ml-4">
                    {capability.accuracy}
                  </span>
                </div>
                <p className="text-gray-600">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Workflow Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive workflow optimization tools designed for modern radiology practices
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-xl bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
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
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Workflow Benefits
                </h2>
                <p className="text-xl text-gray-600">
                  Experience measurable improvements in efficiency, accuracy, and overall workflow performance.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-600 font-semibold text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 btn-primary px-8 py-4 rounded-xl"
                >
                  <span>Optimize Your Workflow</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/intelligent-workflow.svg"
                alt="Workflow benefits"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-purple-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transform Your Workflow Today
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Experience the power of AI-driven workflow optimization and see immediate improvements in efficiency and accuracy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Request Demo</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default IntelligentWorkflow