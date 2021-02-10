import projectsContent from '../../data/projects'
import ContactInformation from './Contact'
import Cover from './Cover'
import Link from 'next/link'
import Experience from './Experience'
import Header from './Header'

const HomeContainer = (): JSX.Element => {
	return (
		<div>
			<div className="flex justify-between">
				<h1 className="p-4 pb-8 lg:pb-16">Taylor Vincent</h1>
				<div className="p-4 pt-6 hidden md:block">
					<ContactInformation></ContactInformation>
				</div>
			</div>

			<Header></Header>

			<Experience></Experience>

			<section className="container mx-auto">
				<div className="flex flex-wrap">
					{projectsContent.map((project, i) => {
						return (
							<div key={i} className={`${project.isWide ? 'md:w-full' : 'md:w-1/2'} w-full`}>
								{project.slug ? (
									<Link href={project.slug}>
										<a>
											<Cover project={project} />
										</a>
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
