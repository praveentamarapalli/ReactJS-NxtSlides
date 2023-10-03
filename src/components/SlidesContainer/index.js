import {Component} from 'react'
import {v4} from 'uuid'

import Header from '../Header'
import SlideItem from '../SlideItem'
import './index.css'

const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

class SlidesContainer extends Component {
  state = {
    slidesList: initialSlidesList,
    editHeading: false,
    editDescription: false,
    activeSlide: initialSlidesList[0],
  }

  onClickHeading = () => {
    this.setState(prevState => ({
      editHeading: !prevState.editHeading,
    }))
  }

  onClickDescription = () => {
    this.setState(prevState => ({
      editDescription: !prevState.editDescription,
    }))
  }

  onChangeHeading = event => {
    const {activeSlide} = this.state
    this.setState(prevState => ({
      activeSlide: {...prevState.activeSlide, heading: event.target.value},
      slidesList: [
        ...prevState.slidesList.map(eachSlide => {
          if (eachSlide.id === activeSlide.id) {
            return {...eachSlide, heading: event.target.value}
          }
          return eachSlide
        }),
      ],
    }))
  }

  blurActiveHeading = event => {
    const {activeSlide} = this.state
    if (event.target.value === '') {
      this.setState({activeSlide})
    }
    this.setState(prevState => ({
      editHeading: !prevState.editHeading,
    }))
  }

  onChangeDescription = event => {
    const {activeSlide} = this.state
    this.setState(prevState => ({
      activeSlide: {...prevState.activeSlide, description: event.target.value},
      slidesList: [
        ...prevState.slidesList.map(eachSlide => {
          if (eachSlide.id === activeSlide.id) {
            return {...eachSlide, description: event.target.value}
          }
          return eachSlide
        }),
      ],
    }))
  }

  blurActiveDescription = event => {
    const {activeSlide} = this.state
    if (event.target.value === '') {
      this.setState({activeSlide})
    }
    this.setState(prevState => ({
      editDescription: !prevState.editDescription,
    }))
  }

  changeActiveSlide = id => {
    const {slidesList} = this.state
    const updateActiveSlide = slidesList.filter(
      eachSlide => eachSlide.id === id,
    )
    this.setState({
      activeSlide: updateActiveSlide[0],
    })
  }

  addNewSlide = () => {
    const {slidesList, activeSlide} = this.state
    const newSlide = {
      id: v4(),
      heading: 'Heading',
      description: 'Description',
    }

    const index = slidesList.findIndex(eachSlide => {
      if (eachSlide.id === activeSlide.id) {
        return true
      }
      return false
    })

    const newSlidesList = [
      ...slidesList.slice(0, index + 1),
      newSlide,
      ...slidesList.slice(index + 1),
    ]

    this.setState({
      slidesList: newSlidesList,
      activeSlide: newSlide,
    })
  }

  render() {
    const {slidesList, editHeading, editDescription, activeSlide} = this.state
    const {heading, description} = activeSlide
    return (
      <div>
        <Header />
        <div className="slides-container">
          <button
            type="button"
            className="add-button"
            onClick={this.addNewSlide}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
              alt="new plus icon"
              className="plus"
            />
            New
          </button>
          <div className="slide-card-container">
            <ol className="slides-list">
              {slidesList.map((eachSlide, index) => (
                <SlideItem
                  serialNumber={index + 1}
                  slideDetails={eachSlide}
                  key={eachSlide.id}
                  activeSlideId={activeSlide.id}
                  changeActiveSlide={this.changeActiveSlide}
                />
              ))}
            </ol>
            <div className="slide-img-container">
              {editHeading ? (
                <input
                  type="text"
                  className="active-input heading"
                  value={heading}
                  onChange={this.onChangeHeading}
                  onBlur={this.blurActiveHeading}
                />
              ) : (
                <h1 className="heading" onClick={this.onClickHeading}>
                  {heading}
                </h1>
              )}
              {editDescription ? (
                <input
                  type="text"
                  className="active-input description"
                  value={description}
                  onChange={this.onChangeDescription}
                  onBlur={this.blurActiveDescription}
                />
              ) : (
                <p className="description" onClick={this.onClickDescription}>
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SlidesContainer
