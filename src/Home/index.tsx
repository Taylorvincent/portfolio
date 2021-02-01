import projectsContent from '../../data/projects'
import ContactInformation from './Contact'
import Cover from './Cover'
import Link from 'next/link'
// import Experience from './Experience'

const HomeContainer = (): JSX.Element => {
	return (
		<div>
			<div className="flex justify-between">
				<h1 className="text-7xl p-4 pb-8">Taylor Vincent</h1>
				<div className="p-4 pt-6 hidden md:block">
					<ContactInformation></ContactInformation>
				</div>
			</div>

			<header className="container flex flex-wrap mx-auto p-8 pb-0 bg-black text-white">
				<img
					className="rounded-full mb-8 mr-8"
					style={{ width: 200, height: 200 }}
					alt="headshot of me!"
					src="/headshot-200.jpg"
				></img>
				<div className="text-xl max-w-4xl pb-8">
					<h2 className="text-4xl pb-8 lg:pt-4">Who's this guy?</h2>
					<p>
						A creative full-stack developer, with a focus on modern front-end development.{' '}
					</p>{' '}
					<p>
						Gamer, keyboard hoarder and can be seen playing{' '}
						<span role="img" aria-label="golf">
							🏌️‍♂️ ⛳
						</span>{' '}
						when the weather allows it.
					</p>
				</div>
			</header>

			{/* <Experience></Experience> */}

			<section className="container mx-auto">
				<div className="flex flex-wrap">
					{projectsContent.map((project, i) => {
						return (
							<div key={i} className={`${project.isWide ? 'md:w-full' : 'md:w-1/2'} w-full`}>
								{project.slug ? (
									<Link href={project.slug}>
										{/* Needs a div wrapper because cannot pass ref to function component */}
										<div>
											<Cover project={project} />
										</div>
									</Link>
								) : (
									<a href={project.url}>
										<Cover project={project} />
									</a>
								)}
							</div>
						)
					})}
				</div>
			</section>

			<div className="container mx-auto p-4 py-12">
				<ContactInformation />
			</div>
			{/* {this.renderContact(0 1)} */}
		</div>
	)
}

export default HomeContainer
