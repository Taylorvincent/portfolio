import { SetStateAction, Dispatch, useRef, useEffect } from 'react'
import { AnimatingBall } from '../interfaces'
import BezierEasing from 'bezier-easing'

function animate(options: any): void {
	const start = performance.now()

	requestAnimationFrame(function animate(time) {
		// timeFraction от 0 до 1
		let timeFraction = (time - start) / options.duration
		if (timeFraction > 1) timeFraction = 1

		// текущее состояние анимации
		const progress = options.timing(timeFraction)

		options.draw(progress)

		if (timeFraction < 1) {
			requestAnimationFrame(animate)
		}
	})
}

const useAnimationFrame = (callback: any): void => {
	// Use useRef for mutable variables that we want to persist
	// without triggering a re-render on their change
	const requestRef = useRef<number | null>(null)
	const previousTimeRef = useRef<number | null>(null)

	useEffect(() => {
		const animate = (time: any): void => {
			if (previousTimeRef.current !== null) {
				const deltaTime = time - previousTimeRef.current
				callback(deltaTime)
			}
			previousTimeRef.current = time
			requestRef.current = requestAnimationFrame(animate)
		}
		requestRef.current = requestAnimationFrame(animate)
		return () => {
			requestRef.current !== null && cancelAnimationFrame(requestRef.current)
		}
	}, [callback]) // Make sure the effect runs only once
}

const ease = BezierEasing(0.22, 0.83, 0.73, 0.39)

const animateAnyBalls = (
	setBallsArr: Dispatch<SetStateAction<AnimatingBall[]>>,
	duration: number,
	delay: number
): void => {
	// loop refs instead of state and mutate elements
	setBallsArr((prevBalls) => {
		if (!prevBalls.length) {
			return []
		} else {
			const newBalls: AnimatingBall[] = []

			for (let i = 0; i < prevBalls.length; i++) {
				const ball = prevBalls[i]

				// if in delay moment, dont animate ball yet
				if (performance.now() < ball.startTime + delay) {
					newBalls.push(ball)
				}
				// If past hit delay, compute fly path
				else if (performance.now() < ball.startTime + duration + delay) {
					let ratio = (performance.now() - ball.startTime - delay) / duration
					const nudgeX = ball.controlPointNudge.x
					const nudgeY = ball.controlPointNudge.y
					const shadowRatios = [20, 1, 0, 10]
					const y_diff = ball.position.start.y - ball.position.end.y

					ratio = ease(ratio)
					newBalls.push({
						...ball,
						progress: ratio,
						position: {
							...ball.position,
							draw: {
								x: rationalCubicInterpolation(
									[
										ball.position.start.x,
										ball.position.start.x + nudgeX,
										ball.position.end.x + nudgeX * Math.sign(nudgeX),
										ball.position.end.x,
									],
									[1, 1, 1, 1],
									ratio
								),
								y: rationalCubicInterpolation(
									[
										ball.position.start.y,
										ball.position.end.y - y_diff * 1.4 + nudgeY,
										ball.position.end.y - y_diff * 1.4 + nudgeY,
										ball.position.end.y,
									],
									ball.isShadow ? shadowRatios : [1, 1, 1, 1],
									ratio
								),
							},
						},
					})
				}
			}
			return newBalls
		}
	})
}

// const linearInterpolation = (start: number, end: number, ratio: number) => {
// 	const distance = end - start
// 	return start + distance * ratio
// }

// // w: weight, t: ratio
// const quadraticInterpolation = (w: number[], t: number) => {
// 	const t2 = t * t
// 	const mt = 1 - t
// 	const mt2 = mt * mt
// 	return w[0] * mt2 + w[1] * 2 * mt * t + w[2] * t2
// }

// const cubicInterpolation = (w: number[], t: number) => {
// 	const t2 = t * t
// 	const t3 = t2 * t
// 	const mt = 1 - t
// 	const mt2 = mt * mt
// 	const mt3 = mt2 * mt
// 	return w[0] * mt3 + 3 * w[1] * mt2 * t + 3 * w[2] * mt * t2 + w[3] * t3
// }

const rationalCubicInterpolation = (w: number[], r: number[], t: number): number => {
	const t2 = t * t
	const t3 = t2 * t
	const mt = 1 - t
	const mt2 = mt * mt
	const mt3 = mt2 * mt
	const f = [r[0] * mt3, 3 * r[1] * mt2 * t, 3 * r[2] * mt * t2, r[3] * t3]
	const basis = f[0] + f[1] + f[2] + f[3]
	return (f[0] * w[0] + f[1] * w[1] + f[2] * w[2] + f[3] * w[3]) / basis
}

export { animate, useAnimationFrame, animateAnyBalls }
