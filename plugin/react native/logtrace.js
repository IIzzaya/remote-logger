// 未完成
// 用法: import LogTrace from './logtrace';
import fetch from 'fetch';

class LogTrace {
    constructor(serverApiUrl, port = "123456") {
        // 注册
        var self = this;
        function trace() {
            return function () {
                var opts = {
                    method: "POST",
                    data: {
                        time: self.getDateTime(),
                        port: port,
                        data: JSON.stringify(arguments)
                    }
                }
                fetch(serverApiUrl, opts)
                    .then((response) => {
                        return response.text();
                    })
                    .then((responseText) => {
                        alert(responseText);
                    })
                    .catch((error) => {
                        alert(error)
                    })
            };
        }

        // 绑定
        this.bindFn(console, 'log', trace);
        this.bindFn(console, 'warn', trace);
        this.bindFn(console, 'error', trace);
        this.bindFn(console, 'info', trace);
        this.bindFn(console, 'clear', trace);
    }

    bindFn(obj, funcName, newFunc) {
        if (obj[funcName] && obj[funcName].proxy) {
            return;
        }
        obj[funcName] = function () {
            newFunc(funcName).apply(this, arguments);
        };
        obj[funcName].proxy = true;
    }

    getDateTime() {
        var dt = new Date();
        dt.setHours(dt.getHours() + 8);
        return dt.toISOString().replace(/[tz]/gi, " ").replace(/\s?$/, "")
    }
}

new LogTrace("http://localhost:3000/api/log");
export { LogTrace };