export default function waitFor(ms) {
    return new Promise((resolve , reject) =>{
        setTimeout(() => {
            resolve()
        }, ms);
    })
}