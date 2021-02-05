export default function checkDisplays(text, display){
    if(text && typeof text === 'object'){
        const listText = Object.entries(text)
        var text_dark;
        var text_light
        listText.forEach(([key, value])=>{
            if(!key.includes('type')){
                if(key.includes('dark')){
                    text_dark = value
                }
                if(key.includes('light')){
                    text_light = value
                }
            }
        })
        // const {text_light, text_dark} = text
        if(display === 1) return text_light
        if(display === 0) return text_dark
    }
}