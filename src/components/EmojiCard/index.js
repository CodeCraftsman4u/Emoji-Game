import './index.css'

const EmojiCard = props => {
  const {emoji, onClickeEmoji} = props
  const {emojiName, emojiUrl, id} = emoji

  const onClickEmojiCard = () => {
    onClickeEmoji(id)
  }

  return (
    <li className="emoji-item">
      <button type="button" className="emoji-button" onClick={onClickEmojiCard}>
        <img key={id} src={emojiUrl} alt={emojiName} className="emoji-image" />
      </button>
    </li>
  )
}

export default EmojiCard
