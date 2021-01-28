import { Project } from '../../data/projects'

interface Props {
	project: Project
}

// box-shadow: rgba(0, 0, 0, 0.4) 0 0 0 1000px inset;

const Cover = ({ project }: Props): JSX.Element => {
	return (
		<div
			className="flex flex-col justify-end items-end mt-8 md:mt-0 bg-cover bg-center transition-all group cursor-pointer underline md:no-underline"
			style={{ backgroundImage: `url(${project.img})`, height: '400px' }}
		>
			<h2 className="font-bold text-3xl m-4 inline-block p-4 px-6 bg-white group-hover:underline">
				{project.title}
			</h2>
			<div>
				<ul className="flex flex-wrap justify-end">
					{project.tags.map((tag, i) => {
						return (
							<li className="p-2 px-4 mr-4 mb-4 bg-white font-bold" key={i}>
								{tag}
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default Cover
