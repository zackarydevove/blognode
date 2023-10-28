module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	moduleNameMapper: {
	  '\\.(css|less|scss|sss|styl)$': 'jest-css-modules',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
  