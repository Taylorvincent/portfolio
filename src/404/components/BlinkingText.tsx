interface Props {
	sentences: string[]
}

const BlinkingText = ({ sentences }: Props): JSX.Element => {
	return (
		<div>
			{sentences.map((sentence, i) => (
				<p key={sentence} className="mb-4">
					{sentence} {i === sentences.length && <i className="blinking-cursor">_</i>}
				</p>
			))}
		</div>
	)
}
export default BlinkingText
