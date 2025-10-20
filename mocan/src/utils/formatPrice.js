export function formatVND(value) {
    const num = Number(value || 0);
    if (Number.isNaN(num)) return '0 VNĐ';
    return new Intl.NumberFormat('vi-VN').format(num) + ' VNĐ';
}

export default formatVND;
