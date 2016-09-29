import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Motion, spring } from 'react-motion'

const text = `It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way – in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.`

class LongContent extends Component {

  componentDidUpdate (prevProps) {
    if (this.props.scrollTop !== prevProps.scrollTop) {
      this.el.scrollTop = this.props.scrollTop
    }
  }

  render () {
    let contentArray = [];
    for (let i = 0; i < 1000; i++) {
      contentArray.push(text)
    }
    return (
      <div ref={(el) => (this.el = el)} className="Long-content">
        {contentArray.map((t, i) => (
          <div key={i} className="Text">{t}</div>
        ))}
      </div>
    )
  }
}

class App extends Component {

  constructor (props) {
    super(props)
    this.state = { scrollTop: 0 }
    this.longContent = null
  }

  render () {
    const { scrollTop } = this.state
    console.log('scrollTop is ', scrollTop)
    return (
      <div className="App">
        <div className="scroll-picker">
          <span className="picker-button">Scroll to: </span>
          <button className="picker-button" onClick={this.handleSetScroll.bind(null, 0)}>0</button>
          <button className="picker-button" onClick={this.handleSetScroll.bind(null, 5000)}>5000</button>
          <button className="picker-button" onClick={this.handleSetScroll.bind(null, 10000)}>10000</button>
          <button className="picker-button" onClick={this.handleSetScroll.bind(null, '25%')}>25%</button>
          <button className="picker-button" onClick={this.handleSetScroll.bind(null, '50%')}>50%</button>
          <button className="picker-button" onClick={this.handleSetScroll.bind(null, '75%')}>75%</button>
          <button className="picker-button" onClick={this.handleSetScroll.bind(null, '100%')}>100%</button>
        </div>
        <Motion style={{ scrollTop: spring(scrollTop, { stiffness: 400, damping: 28 }) }}>
          {(currentStyles) => <LongContent ref={(el) => (this.longContent = el)} scrollTop={currentStyles.scrollTop}/>}
        </Motion>
      </div>
    );
  }

  handleSetScroll = (value) => {
    if (typeof value === 'string') {
      value = (parseInt(value, 10)/100) * ReactDOM.findDOMNode(this.longContent).scrollHeight
    }

    this.setState({ scrollTop: value })
  }
}

export default App;
