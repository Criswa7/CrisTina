import PropTypes from 'prop-types'
import InteractiveBackground from '../InteractiveBackground'

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <InteractiveBackground />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainLayout