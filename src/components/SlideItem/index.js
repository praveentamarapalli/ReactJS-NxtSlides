import './index.css'

const SlideItem = props => {
  const {slideDetails, activeSlideId, changeActiveSlide, serialNumber} = props
  const {id, heading, description} = slideDetails

  const slidClassName = activeSlideId === id ? 'active slide' : 'slide'

  const handleClick = () => {
    changeActiveSlide(id)
  }

  return (
    <li
      testid={`slideTab${serialNumber}`}
      className={slidClassName}
      onClick={handleClick}
    >
      <p>{serialNumber}</p>
      <div className="slide-data">
        <h1 className="slide-heading">{heading}</h1>
        <p className="slide-description">{description}</p>
      </div>
    </li>
  )
}

export default SlideItem
