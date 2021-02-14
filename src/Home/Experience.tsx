/* eslint-disable react/jsx-no-target-blank */
import { CSSProperties, useState } from 'react'
import exp from '../../data/experience'
import s from './Experience.module.css'

interface JobCss extends CSSProperties {
	'--activeJob': number
	'--buttonWidth': string
}

const btnWidth = 150

const btnStyle: CSSProperties = {
	width: btnWidth,
	minWidth: btnWidth,
	flexShrink: 0,
	flexGrow: 0,
	borderStyle: 'inset',
}

const Experience = (): JSX.Element => {
	const [activeJob, setActiveJob] = useState(0)

	const jobCss: JobCss = {
		'--activeJob': activeJob,
		'--buttonWidth': btnWidth + 'px',
		minWidth: btnWidth,
	}
	return (
		<section className="container mx-auto p-8">
			<h2 className="mb-8">Where I've worked</h2>
			<div className="text-xl mb-16">
				<p className="">
					I've gathered <b>3 years of experience</b> so far in these cool companies.
				</p>
				{/* <p className="">Download resume</p> */}
			</div>

			<div className="lg:flex lg:mx-8">
				<ul
					className="flex overflow-x-scroll relative mb-8 lg:flex-col lg:overflow-hidden"
					style={jobCss}
				>
					{exp.map((x, i) => {
						return (
							<button
								className={`${
									activeJob === i ? 'text-blue-500' : ''
								} inline-block p-4 py-3 whitespace-nowrap cursor-pointer 
								border-b-2 border-blue-200 text-center
								hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800
								focus:text-blue-500 focus:bg-blue-50 dark:focus:bg-gray-800
								transition-all
								lg:border-b-0 lg:border-l-2
								`}
								key={x.company.name}
								onClick={() => setActiveJob(i)}
								onKeyUp={(e) => (e.key === 'Enter' ? setActiveJob(i) : undefined)}
								style={btnStyle}
							>
								{x.company.name}
							</button>
						)
					})}
					<div className={`bg-blue-500 transition-all  ${s.highlight}`}></div>
				</ul>
				<div className="my-8 lg:mx-16 lg:my-2 w-full max-w-2xl">
					<h3 className="font-semibold">
						{exp[activeJob].role}{' '}
						<span className="text-blue-500">
							@{' '}
							<a
								target={exp[activeJob].company.url[0] === '/' ? '_self' : '_blank'}
								className="hover:underline"
								href={exp[activeJob].company.url}
							>
								{exp[activeJob].company.name}
							</a>
						</span>
					</h3>
					<div className="text-sm text-soft mb-4 lg:mb-8">
						<p>{exp[activeJob].company.desc}</p>
						<p>{exp[activeJob].duration}</p>
					</div>
					<ul className="mb-4">
						{exp[activeJob].content.map((c) => (
							<li key={c} className="ml-4">
								{c}
							</li>
						))}
					</ul>
					<p className="flex justify-end">{exp[activeJob].stack}</p>
				</div>
			</div>
		</section>
	)
}

export default Experience
