export function checkCurrency(shortType){
    if(shortType === 0) return 'USD'
    else if(shortType === 1) return 'VND'
    else if(shortType === 2) return 'CNY'
}

export function checkLang(shortType){
    if(shortType === 0) return 'Tiếng Việt'
    else if(shortType === 1) return 'English'
}

export function checkDisplay(shortType){
    if(shortType === 0) return 'Dark mode'
    else if(shortType === 1) return 'Light mode'
}