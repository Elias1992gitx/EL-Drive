import { motion } from 'framer-motion'

interface FeatureProps {
  icon: string
  title: string
  description: string
}

export default function Feature({ icon, title, description }: FeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="text-left p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-sm
                 border border-gray-200 hover:border-gray-300 transition-all duration-300 
                 shadow-lg hover:shadow-xl shadow-gray-200/50 hover:shadow-gray-300/50"
    >
      <motion.span
        className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 inline-block"
        whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.span>
      <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-4 text-gray-900">
        {title}
      </h3>
      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
} 