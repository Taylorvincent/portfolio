import projectsContent from '../../data/projects'

import Cover from './Cover'
import Link from 'next/link'

const Projects = () => {
	return (
        <section className="container mx-auto">
            <h2 className="p-8">Personal & school projects</h2>
            <div className="flex flex-wrap">
				{projectsContent.map((project, i) => {
					return (
                        <div key={i} className={`${project.isWide ? 'md:w-full' : 'md:w-1/2'} w-full`}>
                            {project.slug ? (
								<Link href={project.slug}>

                                    <Cover project={project} />

                                </Link>
							) : (
								<a href={project.url}>
									<Cover project={project} />
								</a>
							)}
                        </div>
                    );
				})}
			</div>
        </section>
    );
}

export default Projects
