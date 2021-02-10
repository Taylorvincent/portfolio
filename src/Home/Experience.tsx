import { CSSProperties, useState } from 'react'
import exp from '../../data/experience'

interface JobCss extends CSSProperties {
	'--activeJob': number
	'--highlightSize': string
}

const btnWidth = 150

const btnStyle: CSSProperties = {
	flexBasis: btnWidth,
	flexShrink: 0,
	flexGrow: 0,
	borderTopColor: 'transparent',
	borderLeftColor: 'transparent',
	borderRightColor: 'transparent',
	borderStyle: 'inset',
}

const highlightStyle: CSSProperties = {
	width: '100%',
	maxWidth: btnWidth,
	height: 2,
	position: 'absolute',
	transform: 'translateX( calc(var(--activeJob) * var(--highlightSize)))',
}

const Experience = (): JSX.Element => {
	const [activeJob, setActiveJob] = useState(0)

	const jobCss: JobCss = {
		'--activeJob': activeJob,
		'--highlightSize': btnWidth + 'px',
	}
	return (
		<section className="container mx-auto p-8">
			<h2 className="mb-8">Experience? got it. </h2>
			<p className="">
				I've gathered <b>3 years of experience</b> so far, working in these cool companies.
			</p>
			<p className="mb-8">If you prefer read this in A4 format. Check out my resume here.</p>
			<div className="mb-8">
				<ul className="flex overflow-x-scroll relative" style={jobCss}>
					{exp.map((x, i) => {
						return (
							<button
								className={`${
									activeJob === i ? 'text-blue-500 bg-white dark:bg-gray-800' : ''
								} inline-block p-4 whitespace-nowrap cursor-pointer 
								bg-gray-50 dark:bg-transparent
								border-b-2 border-blue-200 text-center
								hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800
								focus:text-blue-500 focus:bg-gray-50 dark:focus:bg-gray-800
								transition-all
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
					<div
						className="bg-blue-500 transition-all absolute bottom-0"
						style={highlightStyle}
					></div>
				</ul>
			</div>
			<div className="">
				<h3>
					{exp[activeJob].role}{' '}
					<span className="text-blue-500">
						@{' '}
						<a className="hover:underline" href={exp[activeJob].company.url}>
							{exp[activeJob].company.name}
						</a>
					</span>
				</h3>
				<div className="text-sm text-soft mb-4">
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
		</section>
	)
}

export default Experience
