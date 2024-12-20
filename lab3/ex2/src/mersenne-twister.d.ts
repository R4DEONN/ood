declare module '@dsibilly/mersenne-twister' {
	export default class MersenneTwister {
		constructor(seed?: number | number[]);
		random(): number; // Generates a random number in [0,1)
		randomInt(): number; // Generates a random 32-bit integer
		randomInt31(): number; // Generates a random 31-bit integer
		randomLong(): number; // Generates a random number with 53-bit resolution
		randomInclusive(): number; // Generates a random number between 0 and 1 inclusive
		randomExclusive(): number; // Generates a random number between 0 and 1 exclusive
	}
}