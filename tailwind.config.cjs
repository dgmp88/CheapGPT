/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#2563eb',
					secondary: '#db9053',
					accent: '#ffc4df',
					neutral: '#1A191F',
					'base-100': '#402D48',
					info: '#69ABCE',
					success: '#23E792',
					warning: '#BD630A',
					error: '#FC2C56'
				}
			}
		]
	}
};
