export const sortByNumericString = (items: string[]) => {
    return items.sort((a, b) => {
        if (a.replace(/\d/g, '') === b.replace(/\d/g, '')) {
            return Number(a.replace(/\D/g, '')) - Number(b.replace(/\D/g, ''));
        }
        else {
            return (a < b) ? -1 : 1;
        }
    })
}