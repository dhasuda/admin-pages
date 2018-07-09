import React, { Component } from 'react'
import PropTypes from 'prop-types'

interface IconProps {
  id: string,
  collorFill: string
}

const icons = (id, collorFill): IconsProps => {
  switch (id) {
    case 'all':
      return (
        <svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g transform="translate(1.000000, 10.000000)">
                  <g>
                      <rect className={`stroke-${collorFill}`} strokeWidth="1.4" stroke-linecap="round" strokeLinejoin="round" x="0.5" y="0.5" width="11" height="15" rx="1"></rect>
                      <circle className={`fill-${collorFill}`} fillRule="nonzero" cx="6" cy="12" r="1"></circle>
                  </g>
                  <g id="tv-2" transform="translate(18.000000, 0.000000)" className={`stroke-${collorFill}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4">
                      <path d="M4.5,15.5 L11.5,15.5" ></path>
                      <rect x="0.5" y="0.5" width="15" height="12"></rect>
                  </g>
              </g>
          </g>
        </svg>
      )
      break
    case 'mobile':
      return (
        <svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g transform="translate(12.000000, 10.000000)">
                  <rect className={`stroke-${collorFill}`} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" x="0.5" y="0.5" width="11" height="15" rx="1"></rect>
                  <circle className={`fill-${collorFill}`} fillRule="nonzero" cx="6" cy="12" r="1"></circle>
              </g>
          </g>
        </svg>
      )
      break
    case 'desktop':
      return (
        <svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
              <g transform="translate(10.000000, 9.000000)" className={`stroke-${collorFill}`} strokeWidth="1.4">
                  <path d="M4.5,15.5 L11.5,15.5"></path>
                  <rect x="0.5" y="0.5" width="15" height="12"></rect>
              </g>
          </g>
        </svg>
      )
      break
  }
}

class LayoutComponent extends Component {
  public static PropTypes = {
    id: PropTypes.oneOf(['all', 'desktop', 'mobile']),
    selected: PropTypes.bool,
    onClick: PropTypes.func
  }

  state = {
    hover: false
  }

  public handleMouseEnter = () => {
    this.setState({ hover: true })
  }

  public handleMouseLeave = () => {
    this.setState({ hover: false })
  }

  public render() {
    const { id, selected, onClick } = this.props
    const { hover } = this.state

    return (
      <div id={id}
        className={`pointer flex justify-center pv3 w-20 bw1 bt ${selected? 'b--blue' : 'b--transparent'}`}
        onClick={onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        {icons(id, (selected || hover) ? 'blue' : 'mid-gray')}
      </div>
    )
  }
}

class LayoutSwitcher extends Component {
  public static propTypes = {
    activeLayout: PropTypes.string,
    onSwitch: PropTypes.func,
  }

  state = {
    selectedDevice: 'desktop',
  }

  public handleClick = ({ currentTarget: { id } }) => {
    this.setState({ selectedDevice: id })
  }

  public render() {
    const { selectedDevice } = this.state
    return (
      <div className="flex justify-around w-100 bt b--light-silver">
        <LayoutComponent id="all" selected={selectedDevice === 'all'} onClick={this.handleClick}/>
        <LayoutComponent id="mobile" selected={selectedDevice === 'mobile'} onClick={this.handleClick}/>
        <LayoutComponent id="desktop" selected={selectedDevice === 'desktop'} onClick={this.handleClick}/>
      </div>
    )
  }
}

export default LayoutSwitcher