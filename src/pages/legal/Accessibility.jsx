import { motion } from 'framer-motion'
import { Eye, Ear, Hand, Brain, Monitor, Keyboard, Mouse, Smartphone } from 'lucide-react'

const Accessibility = () => {
  const accessibilityFeatures = [
    {
      category: 'Visual Accessibility',
      icon: Eye,
      description: 'Comprehensive support for users with visual impairments',
      features: [
        'High contrast mode with customizable color schemes',
        'Adjustable font sizes from 12px to 24px',
        'Screen reader compatibility (NVDA, JAWS, VoiceOver)',
        'Alternative text for all images and graphics',
        'Focus indicators and keyboard navigation',
        'Zoom functionality up to 400% without horizontal scrolling'
      ]
    },
    {
      category: 'Hearing Accessibility',
      icon: Ear,
      description: 'Audio alternatives and visual communication aids',
      features: [
        'Closed captions for all video content',
        'Visual alerts and notifications',
        'Text-based communication options',
        'Sign language interpretation for video calls',
        'Audio transcription services',
        'Adjustable audio controls and volume settings'
      ]
    },
    {
      category: 'Motor Accessibility',
      icon: Hand,
      description: 'Adaptive controls for users with motor impairments',
      features: [
        'Keyboard-only navigation support',
        'Voice control integration',
        'Adjustable click timing and hover delays',
        'Large clickable areas (minimum 44px)',
        'Drag and drop alternatives',
        'Switch control compatibility'
      ]
    },
    {
      category: 'Cognitive Accessibility',
      icon: Brain,
      description: 'Clear navigation and simplified interfaces',
      features: [
        'Simple, consistent navigation patterns',
        'Clear headings and content structure',
        'Progress indicators for multi-step processes',
        'Error prevention and clear error messages',
        'Timeout warnings and extensions',
        'Plain language and medical term explanations'
      ]
    }
  ]

  const deviceSupport = [
    {
      device: 'Desktop Computers',
      icon: Monitor,
      compatibility: [
        'Windows 10/11 with screen readers',
        'macOS with VoiceOver',
        'Linux with Orca screen reader',
        'High-DPI display support',
        'Multiple monitor configurations'
      ]
    },
    {
      device: 'Mobile Devices',
      icon: Smartphone,
      compatibility: [
        'iOS with VoiceOver and Switch Control',
        'Android with TalkBack and Select to Speak',
        'Voice control and dictation',
        'Gesture customization',
        'Responsive design for all screen sizes'
      ]
    },
    {
      device: 'Assistive Hardware',
      icon: Keyboard,
      compatibility: [
        'Alternative keyboards and keypads',
        'Eye-tracking devices',
        'Head-mounted pointing devices',
        'Sip-and-puff switches',
        'Joystick and trackball mice'
      ]
    }
  ]

  const wcagCompliance = [
    {
      level: 'Level A',
      description: 'Basic accessibility features',
      status: 'Fully Compliant',
      criteria: [
        'Non-text content has text alternatives',
        'Audio and video content has alternatives',
        'Content is presentable in different ways',
        'Content is easier to see and hear'
      ]
    },
    {
      level: 'Level AA',
      description: 'Standard accessibility compliance',
      status: 'Fully Compliant',
      criteria: [
        'Captions provided for live audio',
        'Text has sufficient color contrast (4.5:1)',
        'Text can be resized up to 200%',
        'All functionality available via keyboard'
      ]
    },
    {
      level: 'Level AAA',
      description: 'Enhanced accessibility features',
      status: 'Partially Compliant',
      criteria: [
        'Sign language interpretation available',
        'Enhanced color contrast (7:1 ratio)',
        'Context-sensitive help available',
        'Error prevention for critical functions'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Eye className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Accessibility Statement</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              We are committed to ensuring our teleradiology platform is accessible to all users, 
              regardless of their abilities or disabilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Commitment Statement */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Our Accessibility Commitment
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-4">
                AI Teleradiology is dedicated to providing equal access to medical imaging services 
                for all healthcare professionals and patients. We believe that accessibility is not 
                just a legal requirement, but a fundamental aspect of inclusive healthcare delivery.
              </p>
              <p className="mb-4">
                Our platform is designed and developed following the Web Content Accessibility 
                Guidelines (WCAG) 2.1 Level AA standards, ensuring that our services are usable 
                by people with diverse abilities and disabilities.
              </p>
              <p>
                We continuously work to improve accessibility features and welcome feedback from 
                our users to enhance their experience with our platform.
              </p>
            </div>
          </motion.div>

          {/* Accessibility Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Accessibility Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive accessibility support across all aspects of our platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {accessibilityFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{feature.category}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Device Support */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Device & Technology Support</h2>
            <p className="text-lg text-gray-600">
              Compatible with a wide range of devices and assistive technologies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deviceSupport.map((device, index) => {
              const Icon = device.icon
              return (
                <motion.div
                  key={device.device}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{device.device}</h3>
                  </div>
                  <ul className="space-y-2">
                    {device.compatibility.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-600">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* WCAG Compliance */}
      <section className="section-padding bg-blue-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">WCAG 2.1 Compliance</h2>
            <p className="text-lg text-gray-600">
              Our compliance status with Web Content Accessibility Guidelines.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wcagCompliance.map((level, index) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{level.level}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    level.status === 'Fully Compliant' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {level.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{level.description}</p>
                <ul className="space-y-2">
                  {level.criteria.map((criterion, criterionIndex) => (
                    <li key={criterionIndex} className="text-sm text-gray-600">
                      • {criterion}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback and Support */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Accessibility Feedback & Support
            </h3>
            <p className="text-gray-600 mb-6">
              We value your feedback and are committed to continuously improving accessibility. 
              If you encounter any accessibility barriers or have suggestions for improvement, 
              please contact our accessibility team.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Email:</strong> accessibility@aiteleradiology.com
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Phone:</strong> +1 (555) 123-ACCESS
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Response Time:</strong> Within 2 business days
                </p>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Alternative Formats</h4>
                <p className="text-sm text-gray-600 mb-1">
                  • Large print documentation
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  • Audio descriptions
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  • Braille materials (upon request)
                </p>
                <p className="text-sm text-gray-600">
                  • Sign language interpretation
                </p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Last Updated:</strong> January 2024 | 
                <strong>Next Review:</strong> July 2024
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Accessibility