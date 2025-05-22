const experience = [
	{
		company: {
			name: 'Azumuta',
			desc: 'Bringing industry 4.0 to the manufacturing companies.',
			url: 'https://www.azumuta.com/en/',
		},
		durationText: 'Apr. 2021 - May 2025',
		durationMonths: 4 * 12 + 2,
		role: 'Application developer',
		stack: 'react (hooks), react-native, typescript, node, mongodb, Meteor',
		content: [
			'Maintaining and creating new features for a SaaS startup/scaleup using a full javascript/node stack including a (react) native app.',
			'Some example features: In app dashboarding, custom integrations with customer ERP systems, public facing REST API, unit/integration tests,...'
		],
	},
	{
		company: {
			name: '3D Aim Trainer',
			desc: 'Online training platform for gamers.',
			url: 'https://www.3daimtrainer.com',
		},
		durationText: 'Jan. 2020 - Jan. 2021',
		durationMonths: 12,
		role: 'Front-end developer',
		stack: 'next.js, react (hooks), typescript, styled-components, webpack, sentry, Laravel',
		content: [
			'Joined this start-up to transform their POC website to a mature platform with over 700,000 monthly users.',
			'Took the lead in technical decisions of the front-end department. Always with performance, UX and DX in mind.',
			'Implemented a component-based design system to keep UI consistency high.',
		],
	},
	{
		company: {
			name: 'Sigura',
			desc: 'CRM for brokers.',
			url: 'https://www.sigura.be',
		},
		role: 'Full-stack developer',
		durationText: 'Oct. 2018 - Jan. 2020',
		durationMonths: 15,
		stack: 'php, react, webpack, jquery, css',
		content: [
			'Helped maintain legacy jQuery/php codebase. Extended it with new features and updated parts to React when necessary.',
			'Provided customer support for users (database querying).',
		],
	},
	{
		company: {
			name: 'Visualizr',
			desc: 'Personal project - Browser music visualizer.',
			url: '/projects/visualizr',
		},
		role: 'Full-stack developer',
		durationText: 'Winter 2017 - 3 months',
		durationMonths: 0,
		stack: 'Three.js, react, redux, express (node.js), mongoose (mongodb)',
		content: [
			'Took a break to get creative and extend my thesis project, a browser-based music Visualizr. Tried to convert our POC into a working product.',
			'Rewrote the user portal section of the app in react/redux with an express/mongodb back end.',
			'Extended the music visualizer to be more composable, allowing new "visual show presets" to be easily created.',
			'Added various small features like shaders, 3d models or fine tuning audio analysis.',
		],
	},
	{
		company: {
			name: 'BBDO',
			desc: 'Advertising agency',
			url: 'https://www.bbdo.be',
		},
		role: 'Full-stack developer',
		durationText: 'Spring & summer 2017 - 6 months',
		durationMonths: 4,
		stack: 'Laravel, scss, gulp',
		content: [
			'Back-end focused internship + summer job in this Brussels based agency.',
			'Created Laravel websites for an intranet and various externals clients using a custom in-house CMS.',
			'When not working for clients, I helped to extend the custom CMS with new features.',
		],
	},
	{
		company: {
			name: 'The Fridge',
			desc: 'in this Brussels based post-production facility',
			url: 'https://www.thefridge.tv/',
		},
		role: 'Full-stack developer',
		durationText: 'Summer 2016 - 3 months',
		durationMonths: 3,
		stack: 'python, django, flask, css',
		content: [
			'Summer job',
			'Study a short online course on Python on the job. Then create a small CRUD Django app.',
			'After getting up to speed with Python, I developed the front-end of a new website for a client.',
		],
	},
]

export default experience
