function formatNumber(number) {
    // If the number is positive or less than 1000, return it as is
    if (number >= 0 || Math.abs(number) < 1000) {
        return number.toString();
    }

    // Define suffixes for different orders of magnitude
    const suffixes = ["", "K", "M", "B", "T"];

    // Calculate the order of magnitude (e.g., 10^3, 10^6, 10^9, ...)
    const magnitude = Math.floor(Math.log10(Math.abs(number)) / 3);

    // Calculate the formatted number
    const formattedNumber = (number / Math.pow(10, magnitude * 3)).toFixed(1);

    // Append the appropriate suffix
    const suffix = suffixes[magnitude];

    return formattedNumber + suffix;
}

export default formatNumber;
