import { motion } from 'framer-motion'
import { Cookie, Settings, Shield, Eye, BarChart, Globe } from 'lucide-react'

const CookiePolicy = () => {
  const cookieTypes = [
    {
      type: 'Essential Cookies',
      icon: Shield,
      purpose: 'Required for basic website functionality',
      description: 'These cookies are necessary for the website to function and cannot be switched off in our systems.',
      examples: [
        'Authentication and login status',
        'Security tokens and CSRF protection',
        'Session management',
        'Load balancing and server routing',
        'Cookie consent preferences'
      ],
      canDisable: false,
      retention: 'Session or up to 1 year'
    },
    {
      type: 'Functional Cookies',
      icon: Settings,
      purpose: 'Enhanced functionality and personalization',
      description: 'These cookies enable enhanced functionality and personalization, such as remembering your preferences.',
      examples: [
        'Language and region preferences',
        'User interface customizations',
        'Accessibility settings',
        'Theme preferences (dark/light mode)',
        'Recently viewed items'
      ],
      canDisable: true,
      retention: 'Up to 2 years'
    },
    {
      type: 'Analytics Cookies',
      icon: BarChart,
      purpose: 'Website performance and usage analytics',
      description: 'These cookies help us understand how visitors interact with our website by collecting anonymous information.',
      examples: [
        'Page views and user journeys',
        'Time spent on pages',
        'Click tracking and heatmaps',
        'Error reporting and diagnostics',
        'Performance monitoring'
      ],
      canDisable: true,
      retention: 'Up to 2 years'
    },
    {
      type: 'Marketing Cookies',
      icon: Globe,
      purpose: 'Targeted advertising and marketing',
      description: 'These cookies track your browsing habits to show you relevant advertisements and measure campaign effectiveness.',
      examples: [
        'Advertising campaign tracking',
        'Social media integration',
        'Cross-site tracking prevention',
        'Conversion tracking',
        'Remarketing and retargeting'
      ],
      canDisable: true,
      retention: 'Up to 1 year'
    }
  ]

  const thirdPartyServices = [
    {
      service: 'Google Analytics',
      purpose: 'Website analytics and performance monitoring',
      dataCollected: 'Anonymous usage statistics, page views, user interactions',
      retention: '26 months',
      optOut: 'https://tools.google.com/dlpage/gaoptout'
    },
    {
      service: 'Microsoft Clarity',
      purpose: 'User behavior analytics and session recordings',
      dataCollected: 'Anonymous user sessions, clicks, scrolling behavior',
      retention: '1 year',
      optOut: 'Browser settings or cookie preferences'
    },
    {
      service: 'Hotjar',
      purpose: 'User experience optimization and feedback',
      dataCollected: 'Anonymous heatmaps, session recordings, survey responses',
      retention: '1 year',
      optOut: 'https://www.hotjar.com/legal/compliance/opt-out'
    },
    {
      service: 'LinkedIn Insight',
      purpose: 'Professional network analytics and advertising',
      dataCollected: 'Professional demographics, campaign performance',
      retention: '2 years',
      optOut: 'LinkedIn privacy settings'
    }
  ]

  const cookieManagement = [
    {
      browser: 'Google Chrome',
      instructions: [
        'Click the three dots menu in the top right',
        'Select "Settings" > "Privacy and security"',
        'Click "Cookies and other site data"',
        'Choose your preferred cookie settings'
      ]
    },
    {
      browser: 'Mozilla Firefox',
      instructions: [
        'Click the menu button and select "Settings"',
        'Select "Privacy & Security" panel',
        'In the "Cookies and Site Data" section',
        'Choose your cookie preferences'
      ]
    },
    {
      browser: 'Safari',
      instructions: [
        'Choose Safari > Preferences',
        'Click the "Privacy" tab',
        'Select your cookie and tracking preferences',
        'Close the preferences window'
      ]
    },
    {
      browser: 'Microsoft Edge',
      instructions: [
        'Click the three dots menu',
        'Select "Settings" > "Cookies and site permissions"',
        'Click "Cookies and site data"',
        'Choose your cookie settings'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Cookie className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Learn how we use cookies and similar technologies to improve your experience on our platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What Are Cookies?</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-4">
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences, 
                keeping you logged in, and helping us understand how you use our services.
              </p>
              <p className="mb-4">
                We use cookies and similar technologies (such as web beacons, pixels, and local storage) 
                to enhance functionality, improve performance, and provide personalized content.
              </p>
              <p>
                This Cookie Policy explains what cookies we use, why we use them, and how you can 
                manage your cookie preferences.
              </p>
            </div>
          </motion.div>

          {/* Cookie Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Types of Cookies We Use
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We categorize cookies based on their purpose and functionality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {cookieTypes.map((cookie, index) => {
              const Icon = cookie.icon
              return (
                <motion.div
                  key={cookie.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{cookie.type}</h3>
                      <p className="text-sm text-gray-500">{cookie.purpose}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{cookie.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
                    <ul className="space-y-1">
                      {cookie.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="text-sm text-gray-600">
                          • {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-sm font-medium text-gray-900">Can be disabled: </span>
                      <span className={`text-sm ${
                        cookie.canDisable ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {cookie.canDisable ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-900">Retention: </span>
                      <span className="text-sm text-gray-600">{cookie.retention}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Third Party Services */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
            <p className="text-lg text-gray-600">
              We work with trusted third-party services that may also set cookies on your device.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {thirdPartyServices.map((service, index) => (
              <motion.div
                key={service.service}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.service}</h3>
                <p className="text-gray-600 mb-3">{service.purpose}</p>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Data Collected: </span>
                    <span className="text-gray-600">{service.dataCollected}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Retention: </span>
                    <span className="text-gray-600">{service.retention}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Opt-out: </span>
                    <span className="text-blue-600">{service.optOut}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cookie Management */}
      <section className="section-padding bg-blue-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
            <p className="text-lg text-gray-600">
              You have control over which cookies you accept. Here's how to manage them.
            </p>
          </motion.div>

          {/* Cookie Consent Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Cookie Consent Manager</h3>
            <p className="text-gray-600 mb-6">
              Use our cookie consent manager to customize your preferences. You can access this 
              at any time by clicking the "Cookie Settings" link in our website footer.
            </p>
            <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors">
              Manage Cookie Preferences
            </button>
          </motion.div>

          {/* Browser Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cookieManagement.map((browser, index) => (
              <motion.div
                key={browser.browser}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">{browser.browser}</h3>
                <ol className="space-y-2">
                  {browser.instructions.map((instruction, instructionIndex) => (
                    <li key={instructionIndex} className="text-sm text-gray-600">
                      {instructionIndex + 1}. {instruction}
                    </li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Important Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Impact of Disabling Cookies</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Some website features may not work properly</li>
                  <li>• You may need to re-enter information repeatedly</li>
                  <li>• Personalization features will be limited</li>
                  <li>• Analytics and performance monitoring may be affected</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Updates to This Policy</h4>
                <p className="text-sm text-gray-600 mb-3">
                  We may update this Cookie Policy from time to time to reflect changes in 
                  technology, legislation, or our business practices.
                </p>
                <p className="text-sm text-gray-600">
                  We will notify you of any significant changes by posting the updated policy 
                  on our website and updating the "Last Modified" date.
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Contact Us</h4>
              <p className="text-sm text-gray-600 mb-2">
                If you have questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="text-sm text-gray-600">
                <p><strong>Email:</strong> privacy@aiteleradiology.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-COOKIE</p>
                <p><strong>Address:</strong> 123 Healthcare Blvd, Medical District, NY 10001</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                <strong>Last Updated:</strong> January 15, 2024 | 
                <strong>Effective Date:</strong> January 15, 2024
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CookiePolicy