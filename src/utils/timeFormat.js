/* 
getDateTime 获取当前日期时间
getDate 获取当前日期
getTime 获取当前时间
*/

class timeUtils {
    getDateTime() {
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        let d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let f =
            date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let s =
            date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return y + "年" + m + "月" + d + "日 " + h + ":" + f + ":" + s;
    }
    getCurrentTime() {
        let date = new Date();

        let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let f =
            date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let s =
            date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return h + ":" + f + ":" + s;
    }
    getHourTime() {
        let date = new Date();
        let f =
            date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let s =
            date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return f + ":" + s;
    }
    getCurrentDate() {
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        let d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return y + "年" + m + "月" + d + "日 ";
    }
}

export default timeUtils;