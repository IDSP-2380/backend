export function wordCountLimitIsValid(wordCount: number, linkContent?: string): boolean {
    if(typeof wordCount != "number") return false;
    if(wordCount > 250) return false;
    if(linkContent) { 
        if(linkContent.length > wordCount) return false; 
    }
    return true;
}

export function numberOfLinksIsValid(linkCount: number): boolean {
    if(typeof linkCount != "number") return false;
    if(linkCount < 1 || linkCount > 20) return false;
    return true;
}