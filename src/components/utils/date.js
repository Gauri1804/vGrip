

// export const formatDate = (dataString) => {
//     const data = new Date(dataString);
//     if (!isNaN(data.getTime())) {
//         return "Invalid Date";
//     }


//     return data.toLocaleString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//     })
// }


export const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date"; // Handle null or undefined input

    const date = new Date(dateString);

    if (isNaN(date.getTime())) { // Corrected the condition
        return "Invalid Date";
    }

    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};
