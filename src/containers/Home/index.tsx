import ContactInformation from './Contact'

import Experience from './Experience'
import Header from './Header'
import Projects from './Projects'

const HomeContainer = (): JSX.Element => {
	return (
		<div>
			<div className="flex justify-between">
				<h1 className="p-4 pb-8 lg:pb-16">Vincent Taylor</h1>
				<div className="p-4 pt-6 hidden md:block">
					<ContactInformation></ContactInformation>
				</div>
			</div>

			<Header></Header>

			<Experience></Experience>

			<Projects></Projects>

			<div className="container mx-auto p-4 py-12">
				<ContactInformation />
			</div>
			{/* {this.renderContact(0 1)} */}
		</div>
	)
}

export default HomeContainer
