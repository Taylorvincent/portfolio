import { Ref } from 'react'
import { SWING_HIT_DELAY } from '../constants'
import { BallEndDestination } from '../interfaces'
interface Props {
	containerRef: Ref<HTMLDivElement>
}

const AnimatingBalls = ({ containerRef }: Props): JSX.Element => {
	return <div className="animating-balls-container" ref={containerRef}></div>
}

export default AnimatingBalls

export const launchBall = (
	animatingBallsContainer: HTMLDivElement,
	destination: BallEndDestination
): void => {
	const ballWrapperDiv = document.createElement('div')
	const ballDiv = document.createElement('div')
	const xDiv = document.createElement('div')
	const yDiv = document.createElement('div')
	ballWrapperDiv.className = 'ball-wrapper'
	xDiv.className = 'ball-X'
	yDiv.className = 'ball-Y'
	ballDiv.className = 'ball'

	ballWrapperDiv.appendChild(xDiv)
	xDiv.appendChild(yDiv)
	yDiv.appendChild(ballDiv)

	ballWrapperDiv.ontransitionend = () => {
		if (destination === BallEndDestination.WATER) {
			ballWrapperDiv.remove()
		}
	}

	ballWrapperDiv.style.setProperty('--ball-x-bezier-start', ((Math.random() - 0.5) * 4).toFixed(2))
	ballWrapperDiv.style.setProperty('--ball-x-bezier-end', ((Math.random() - 0.5) * 4).toFixed(2))

	ballWrapperDiv.style.setProperty('--ball-y-bezier-start', ((Math.random() - 0.5) * 2).toFixed(2))
	ballWrapperDiv.style.setProperty('--ball-y-bezier-end', ((Math.random() - 0.5) * 2).toFixed(2))

	animatingBallsContainer.appendChild(ballWrapperDiv)

	setTimeout(() => {
		ballWrapperDiv.classList.add(destination)
	}, SWING_HIT_DELAY)
}
