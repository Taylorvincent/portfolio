import { Project } from '../../data/projects'

interface Props {
	project: Project
}

const Cover = ({ project }: Props): JSX.Element => {
	return (
		<div
			className={`
				group flex flex-col justify-end items-end 
				mt-8 md:mt-0 
				bg-cover bg-center 
				transition-all 
				cursor-pointer underline md:no-underline
			`}
			style={{ backgroundImage: `url(${project.img})`, height: '400px' }}
		>
			<h3
				className={`
					inline-block 
					font-bold text-3xl 
					m-4 p-4 px-6
					bg-white group-hover:underline
				`}
			>
				{project.title}
			</h3>
			<div>
				<ul className={'flex flex-wrap justify-end'}>
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
