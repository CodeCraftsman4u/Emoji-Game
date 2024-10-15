import {Component} from 'react'

import NavBar from '../NavBar/index'

import EmojiCard from '../EmojiCard/index'

import WinOrLoseCard from '../WinOrLoseCard/index'

import './index.css'

class EmojiGame extends Component {
  state = {clickedEmoji: [], topScore: 0, isGameEnd: false}

  onClickeEmoji = id => {
    const {emojisList} = this.props
    const {clickedEmoji} = this.state
    const isPresent = clickedEmoji.includes(id)
    if (isPresent) {
      this.finishGameAndSetTopScore(clickedEmoji.length)
    } else {
      if (emojisList.length - 1 === clickedEmoji.length) {
        this.finishGameAndSetTopScore(emojisList.length)
      }
      this.setState(prevState => ({
        clickedEmoji: [...prevState.clickedEmoji, id],
      }))
    }
  }

  finishGameAndSetTopScore = currentScore => {
    const {topScore} = this.state
    let newScore = topScore
    if (currentScore > topScore) {
      newScore = currentScore
    }
    this.setState({topScore: newScore, isGameEnd: true})
  }

  shuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  renderEmojiList = () => {
    const shuffledEmojisList = this.shuffledEmojisList()

    return (
      <ul className="emoji-list">
        {shuffledEmojisList.map(emojiItem => (
          <EmojiCard
            key={emojiItem.id}
            emoji={emojiItem}
            onClickeEmoji={this.onClickeEmoji}
          />
        ))}
      </ul>
    )
  }

  restartGame = () => {
    this.setState({clickedEmoji: [], isGameEnd: false})
  }

  renderWinOrLose = () => {
    const {emojisList} = this.props
    const {clickedEmoji} = this.state
    const isWon = emojisList.length === clickedEmoji.length
    return (
      <WinOrLoseCard
        isWon={isWon}
        onClickPlayAgain={this.restartGame}
        score={clickedEmoji.length}
      />
    )
  }

  render() {
    const {topScore, isGameEnd, clickedEmoji} = this.state
    const currentScore = clickedEmoji.length

    return (
      <div className="Emoji-game-app">
        <NavBar
          currentScore={currentScore}
          topScore={topScore}
          isGameEnd={isGameEnd}
        />
        <div className="emoji-game-body-container">
          {isGameEnd ? this.renderWinOrLose() : this.renderEmojiList()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
