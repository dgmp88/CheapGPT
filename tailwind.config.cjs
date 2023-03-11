/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			{
				mytheme: {
					// "#d9ed92, #b5e48c, #99d98c, #76c893, #52b69a,
					//  #34a0a4, #168aad, #1a759f, #1e6091, #184e77",
					primary: '#76c893',
					'primary-content': 'white',
					'neutral-content': 'white',
					'base-content': '#eceaea',
					secondary: '#168aad',
					accent: '#ffc4df',
					neutral: '#1A191F',
					'base-100': '#184e77',

					info: '#69ABCE',
					success: '#23E792',
					warning: '#BD630A',
					error: '#FC2C56'
				}
			}
		]
	}
};
