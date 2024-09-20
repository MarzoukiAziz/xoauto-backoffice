export const formattedDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-UK', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date));
};