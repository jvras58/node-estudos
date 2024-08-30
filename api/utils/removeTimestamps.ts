export function removeTimestamps(text: string) {
    return text.replace(/\d{2}:\d{2}\s+/g, '').trim();
}

