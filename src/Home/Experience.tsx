import experience from '../../data/experience'

const Experience = (): JSX.Element => {
	return (
		<section className="container mx-auto p-8 md:p16 bg-black text-white">
			<h2>Experience </h2>
			{experience.map((x) => {
				return (
					<div key={x.job} className="mb-8">
						<h3>{x.job}</h3>
						<p>{x.subjob}</p>
						<p>{x.role}</p>
						<p>{x.duration}</p>
						<p>{x.content}</p>
						<p>{x.stack}</p>
					</div>
				)
			})}
		</section>
	)
}

export default Experience
