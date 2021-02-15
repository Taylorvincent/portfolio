/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react'
const speakersprite = '/404/images/speakersprite.png'

interface Props {
	volume: number
	setVolume: (value: number) => void
	balls_lost: number
	userMediaApproved: boolean
}

const BottomInfo = ({ volume, setVolume, balls_lost, userMediaApproved }: Props): JSX.Element => {
	const [speakerBgPos, setSpeakerBgPos] = useState('66.66%')

	// Speaker bg pos handler
	useEffect(() => {
		let value = '0'
		if (volume > 0.66) {
			value = '100%'
		} else if (volume > 0.33) {
			value = '66.66%'
		} else if (volume > 0) {
			value = '33.33%'
		}
		setSpeakerBgPos(value)
	}, [volume])

	return (
		<div className="bottom-info">
			<div
				className="audio-controls"
				style={{
					animationName: userMediaApproved ? 'blinking-cursor' : 'unset',
				}}
			>
				<input
					type="range"
					min={0}
					max={1}
					step={0.02}
					value={volume}
					onChange={(e) => setVolume(parseFloat(e.target.value))}
				/>
				<div
					className="speaker-sprite"
					onClick={() => {
						if (volume == 0) setVolume(1)
						else setVolume(0)
					}}
					style={{
						backgroundImage: `url(${speakersprite})`,
						backgroundPosition: `0 ${speakerBgPos}`,
					}}
				></div>
			</div>
			<div>{balls_lost > 0 && <p> Golf balls lost: {balls_lost}</p>}</div>
		</div>
	)
}

export default BottomInfo
