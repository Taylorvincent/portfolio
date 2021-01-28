import projectsContent from '../../data/projects'
import ContactInformation from './Contact'
import Cover from './Cover'
import Link from 'next/link'

const HomeContainer = (): JSX.Element => {
	return (
		<div>
			<h1 className="text-7xl p-4 pb-8">Taylor Vincent</h1>

			<header className="container mx-auto p-16 bg-black text-white">
				<div>
					<h2 className="text-4xl pb-8">About</h2>
					<img
						className="rounded-full mx-auto mb-8"
						alt="headshot of me!"
						src="/headshot-200.jpg"
					></img>
				</div>
				<div className="text-xl">
					<p>Ambitious creative web developer. </p>
					<p>
						I'm the guy that wants to tackle the big problems and refuses to write spaghetti code.
					</p>
					<br />
					<p>Check out the stuff I've made below</p>
				</div>
			</header>

			<section className="container mx-auto projects">
				<div className="columns is-gapless">
					{projectsContent.map((project, i) => {
						return (
							<div key={i} className={`column is-${project.isWide ? '12' : '6'}`}>
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
