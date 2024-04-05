"use server";

/**
 * Chuyển đổi chuỗi ngày tháng thành timestamp.
 *
 * @param {string} dateString Chuỗi ngày tháng trong định dạng "YYYY-MM-DD".
 * @returns {number} Timestamp (giây) tương ứng.
 */
export const strtotime = (dateString) => {
    // Tách ngày, tháng, năm từ chuỗi
    const [year, month, day] = dateString.split("-").map(Number);

    // Tạo đối tượng Date từ ngày, tháng, năm
    const dateObject = new Date(year, month - 1, day); // Lưu ý: Tháng bắt đầu từ 0

    // Chuyển đổi thành timestamp (milliseconds)
    const timestamp = dateObject.getTime() / 1000;

    return timestamp;
};

export const formatDate = (format = "d/m/Y", timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = format
        .replace("d", day < 10 ? `0${day}` : day)
        .replace("m", month < 10 ? `0${month}` : month)
        .replace("Y", year)
        .replace("h", hours < 10 ? `0${hours}` : hours)
        .replace("i", minutes < 10 ? `0${minutes}` : minutes)
        .replace("s", seconds < 10 ? `0${seconds}` : seconds);

    return formattedDate;
};
