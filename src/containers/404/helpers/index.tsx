import { SoundEffect, PickSwearWord } from '../interfaces'

import { arrSwearWords_orig } from '../content'
import { SWEAR_DELAY } from '..'

export const soundEffect = ({ volume, ref }: SoundEffect): void => {
	if (ref.current) {
		const cloneAudio = ref.current.cloneNode(true)
		cloneAudio.volume = volume
		cloneAudio.play()
	}
}

export const pickSwearWord = ({
	arrSwearWords_In,
	setArrSwearWords_In,
	setWords,
	scene_scale,
	scene_width,
}: PickSwearWord): void => {
	const random = Math.floor(Math.random() * arrSwearWords_In.length)
	const word = arrSwearWords_In[random]
	const words_in = arrSwearWords_In.slice(0)
	words_in.splice(random, 1)
	if (arrSwearWords_In.length < 5) {
		setArrSwearWords_In(arrSwearWords_orig.slice())
	} else {
		setArrSwearWords_In(words_in)
	}

	const rannd_left = (Math.random() * 300 - 150) * scene_scale + scene_width / 2
	const rand_top = (Math.random() * 300 - 150) * scene_scale

	setTimeout(() => {
		setWords((oldWords) => [
			...oldWords,
			{
				text: word,
				margin: {
					left: rannd_left,
					top: rand_top,
				},
			},
		])
		setTimeout(() => {
			setWords((oldWords) => oldWords.slice(1))
		}, 2200)
	}, SWEAR_DELAY)
}
