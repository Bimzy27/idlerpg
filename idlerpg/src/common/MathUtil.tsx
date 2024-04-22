
class MathUtil
{
    public static getRandomNumber(min: number, max: number): number
    {
        // Ensure min <= max
        if (min > max) {
            throw new Error('Minimum value cannot be greater than maximum value');
        }

        // Generate random number between 0 (inclusive) and 1 (exclusive)
        const randomValue = Math.random();

        // Scale the random value to the desired range
        const range = max - min;
        const scaledValue = randomValue * range;

        // Add the minimum value to get the final random number within the range
        return min + scaledValue;
    }

    public static clamp(num: number, lower: number, upper: number): number
    {
        return Math.min(Math.max(num, lower), upper);
    }
}

export default MathUtil;