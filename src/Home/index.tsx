import projectsContent from '../../data/projects'
import ContactInformation from './Contact'
import Cover from './Cover'
import Link from 'next/link'

const HomeContainer = (): JSX.Element => {
	return (
		<div>
			<h1 className="text-7xl p-4 pb-8">Taylor Vincent</h1>

			<header className="container mx-auto p-8 md:p16 bg-black text-white">
				<img
					className="rounded-full mb-8 ml-4 md:ml-0"
					alt="headshot of me!"
					src="/headshot-200.jpg"
				></img>
				<div className="text-xl pl-8">
					<h2 className="text-4xl pb-8">Who's this guy?</h2>
					<p>
						A creative full-stack developer, with a focus on modern front-end development.{' '}
					</p>{' '}
					<p>
						Gamer, keyboard hoarder and a little{' '}
						<span role="img" aria-label="golf">
							🏌️‍♂️ ⛳
						</span>{' '}
						when the weather allows it.
					</p>
					<br />
					<p>Check out the stuff I've made below</p>
				</div>
			</header>

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

			<ContactInformation />
			{/* {this.renderContact(0 1)} */}
		</div>
	)
}

export default HomeContainer
