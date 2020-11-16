export function getPages(pageNumber: string | number = 1, limit = 5) {
    const page = Number(pageNumber) - 1 || 0;
    limit = isNaN(limit) ? 10 : limit;
    const skip = page * limit;

    return {
        skip,
        limit,
        page
    }
}