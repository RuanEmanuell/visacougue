export default function getCurrentTime() {
    const now = new Date();

    const utcOffset = -3; 
    
    const nowUtc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
    const nowBrt = new Date(nowUtc.getTime() + (utcOffset * 3600000));
    
    const year = nowBrt.getFullYear();
    const month = String(nowBrt.getMonth() + 1).padStart(2, '0'); 
    const day = String(nowBrt.getDate()).padStart(2, '0'); 
    const hours = String(nowBrt.getHours()).padStart(2, '0'); 
    const minutes = String(nowBrt.getMinutes()).padStart(2, '0'); 
    const seconds = String(nowBrt.getSeconds()).padStart(2, '0'); 
    
    const currentDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    
    return currentDateTime;
}