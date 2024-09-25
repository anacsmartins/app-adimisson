function formatDate(date: Date | string): string {
    let value: Date;

    if(typeof(date) == 'string'){
        value = new Date(date)
    }else {
        value = date;
    }

    const day = String(value.getDate()).padStart(2, '0');
    const month = String(value.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const year = value.getFullYear();

    return `${day}/${month}/${year}`;
}

export default formatDate