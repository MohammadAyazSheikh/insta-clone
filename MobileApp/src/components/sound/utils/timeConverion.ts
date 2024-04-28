export function convertMillisToTime(milliseconds:number) {
    var seconds = Math.floor(milliseconds / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    
    minutes = minutes % 60;
    seconds = seconds % 60;

    return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
}
