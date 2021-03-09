
import { Message } from 'element-ui';
// import { upLoad } from "../api/apiUrl";

function toast(mesg = "提示消息", type = 'error') {
    if (Message) {
        Message.closeAll();
    }
    Message({
        // offset:200,
        showClose: true,
        message: mesg,
        type: type
    });
}
// 验证是否填写
function isempty(val, text) {
    if (!val) {
        toast(text, 'error')
        throw new Error(text);
    }
    return true
}
// 验证手机号码
function isPhone(val) {
    const myreg = /^1[3456789]\d{9}$/;
    if (!(myreg.test(val))) {
        toast("手机号有误，请重填！");
        throw new Error("手机号有误，请重填！");
    }
    return true;
}

// 验证身份证号码
function isIdcard(val) {
    const myreg = /(^\d{15}$)|(^\d{14}(\d|X|x)$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!(myreg.test(val))) {
        toast("身份证号有误，请重填！");
        throw new Error("身份证号有误，请重填！");
    }
    return true;
}
// 注册密码验证
function regPassword(str) {
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
    if (!reg.test(str)) {
        toast("密码8~20位，且必须包含数字、大小写英文字母");
        throw new Error('密码不合法');
    }
    return true;
}

// 判断两个时间前后
function compareDate(d1, d2) {
    return new Date(d1) < new Date(d2);
}

// 获取一个月的最初时间和最末时间
function getMonthTime(time, type) {
    // let time = "2020-10-01";
    let firstDate = new Date(time);
    let startDate =
        firstDate.getFullYear() +
        "-" +
        (firstDate.getMonth() + 1 < 10 ? "0" : "") +
        (firstDate.getMonth() + 1) +
        "-" +
        "01";
    let date = new Date(time);
    let currentMonth = date.getMonth();
    let nextMonth = ++currentMonth;
    let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
    let oneDay = 1000 * 60 * 60 * 24;
    let lastDate = new Date(nextMonthFirstDay - oneDay);
    let endDate =
        lastDate.getFullYear() +
        "-" +
        (lastDate.getMonth() + 1 < 10 ? "0" : "") +
        (lastDate.getMonth() + 1) +
        "-" +
        (lastDate.getDate() < 10 ? "0" : "") +
        lastDate.getDate();
    let time_s = new Date(new Date(startDate).setHours(0, 0, 0));
    let time_e = new Date(new Date(endDate).setHours(23, 59, 59));

    if (type == 1) {
        return dateHandle(time_s, 4)
    } else if (type == 2) {
        return dateHandle(time_e, 4)
    } else if (type == 3) {
        let _arr = [];
        _arr.push(dateHandle(time_s, 4))
        _arr.push(dateHandle(time_e, 4))
        return _arr
    }
}

// 获取星期几
function getWeekDate(t) {
    let time;
    if (t) {
        if (typeof (t) == 'number') {
            time = new Date(t * 1000)
        } else {
            time = new Date(t)
        }
    } else {
        time = new Date()
    }

    let day = time.getDay();
    let weeks = new Array(
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
    );

    return weeks[day]
}

// 时间戳转为日期格式
function dateHandle(timestamp, type) {
    // timestamp = 1595407906;
    let time = timestamp;
    if (typeof (timestamp) == 'number') {
        time = new Date(timestamp * 1000)
    }
    let year = time.getFullYear()
    let month = time.getMonth() + 1
    let date = time.getDate()
    let hours = time.getHours()
    let minute = time.getMinutes()
    let second = time.getSeconds()
    if (type == 5) {
        if (month < 10) { month = '0' + month }
        return year + '年' + month + '月' + date + '日  ' + hours + ':' + minute + ':' + second
    } else if (type == 6) {
        if (month < 10) { month = '0' + month }
        return year + '年' + month + '月' + date + '日  '
    }

    if (date < 10) { date = '0' + date }
    if (hours < 10) { hours = '0' + hours }
    if (minute < 10) { minute = '0' + minute }
    if (second < 10) { second = '0' + second }

    if (type == 1) {
        if (month < 10) { month = '0' + month }
        return year + '-' + month + '-' + date + ' ' + hours + ':' + minute
    } else if (type == 2) {
        return month + '月' + date + '日'
    } else if (type == 3) {
        if (month < 10) { month = '0' + month }
        return year + '-' + month + '-' + date
    } else if (type == 4) {
        if (month < 10) { month = '0' + month }
        return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
    }
}

// 时间判断X天前
function getDayNum(dateStr, type) {
    // type == 1 往后计算剩余X天X小时X分钟
    let publishTime = dateStr,
        d_seconds,
        d_minutes,
        d_hours,
        d_days,
        timeNow = parseInt(new Date().getTime() / 1000),
        d,
        date = new Date(publishTime * 1000),
        Y = date.getFullYear(),
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
    //小于10的在前面补0
    if (M < 10) { M = '0' + M; }
    if (D < 10) { D = '0' + D; }
    if (H < 10) { H = '0' + H; }
    if (m < 10) { m = '0' + m; }
    if (s < 10) { s = '0' + s; }

    if (type && type == 1) {
        d = publishTime - timeNow;
    } else {
        d = timeNow - publishTime;
    }
    d_days = parseInt(d / 86400);
    d_hours = parseInt(d / 3600);
    d_minutes = parseInt(d / 60);
    d_seconds = parseInt(d);

    if (type && type == 1) {
        if (d_minutes >= 1) {
            return `${d_minutes}min`
        } else {
            return '已结束'
        }
        // if (d_days >= 1) {
        //     return `${d_days}天${d_hours}小时${d_minutes}分钟`
        // } else if (d_hours >= 1) {
        //     return `${d_hours}小时${d_minutes}分钟`
        // } else if (d_hours < 1 && d_minutes >= 1) {
        //     return `${d_minutes}分钟`
        // } else {
        //     return '已结束'
        // }
    } else {
        if (d_days >= 3) {
            return Y + '-' + M + '-' + D + ' ' + H + ':' + m + ':' + s;
        } else if (d_days > 0 && d_days < 3) {
            return d_days + '天前';
        } else if (d_days <= 0 && d_hours > 0) {
            return d_hours + '小时前';
        } else if (d_hours <= 0 && d_minutes > 0) {
            return d_minutes + '分钟前';
        } else if (d_seconds < 60) {
            return '刚刚';
        }
    }

}
// 当前时间（年月日时分秒）和X个月后的时间（年月日时分秒）
function anyMonthAfterTime(num, daynum = 0) {
    // num 表示X个月, daynum表示X天，一个周后就传7
    // 当前时间
    let time = new Date();
    let year = time.getFullYear(),
        month = time.getMonth(),
        date = time.getDate(),
        hours = time.getHours(),
        minute = time.getMinutes(),
        second = time.getSeconds();

    let tomorrow = new Date(
        time.setMonth(month + num, date + daynum, hours, minute, second)
    ); //设置X个月后的日期
    let year2 = tomorrow.getFullYear(),
        month2 = tomorrow.getMonth(),
        date2 = tomorrow.getDate(),
        hours2 = tomorrow.getHours(),
        minute2 = tomorrow.getMinutes(),
        second2 = tomorrow.getSeconds();

    // 当前时间处理
    if (month + 1 < 10) {
        month = "0" + (month + 1);
    } else {
        month = month + 1;
    }
    if (date < 10) {
        date = "0" + date;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }

    // X个月后的日期处理
    if (month2 + 1 < 10) {
        month2 = "0" + (month2 + 1);
    } else {
        month2 = month2 + 1;
    }
    if (date2 < 10) {
        date2 = "0" + date2;
    }
    if (hours2 < 10) {
        hours2 = "0" + hours2;
    }
    if (minute2 < 10) {
        minute2 = "0" + minute2;
    }
    if (second2 < 10) {
        second2 = "0" + second2;
    }
    return {
        starttime: `${year}-${month}-${date} ${hours}:${minute}:${second}`,
        endtime: `${year2}-${month2}-${date2} ${hours2}:${minute2}:${second2}`
    }
}

// 文件上传
function upFile(fileData, upType) {
    return new Promise((resolve, rejret) => {
        // 类型判断
        let fileType = fileData.name
            .substring(fileData.name.lastIndexOf(".") + 1)
            .toLowerCase();
        if (!upType.includes(fileType)) {
            toast("文件类型不支持，请重新上传！");
            return;
        }
        //文件大小判断,不超过2M
        let size = fileData.size > 2 * 1024 * 1024;
        if (size) {
            toast("上传文件不超过2M，请重新上传！");
            return;
        }
        /*
        upLoad({ isLoading: false, filename: fileData.name }).then((res) => {
            const {
                dir,
                accessid,
                policy,
                signature,
                filename,
                callback,
                host,
            } = res;

            let requestData = new FormData();
            requestData.append("OSSAccessKeyId", accessid); // Bucket 拥有者的Access Key Id
            requestData.append("Policy", policy); // policy规定了请求的表单域的合法性
            requestData.append("Signature", signature); // 根据Access Key Secret和policy计算的签名信息，OSS验证该签名信息从而验证该Post请求的合法性
            // ---以上都是阿里的认证策略
            requestData.append("key", dir + filename); // 文件名字，可设置路径
            requestData.append("success_action_status", "200"); // 让服务端返回200,不然，默认会返回204
            requestData.append("file", fileData); // 需要上传的文件 file
            requestData.append("name", filename);
            requestData.append("callback", callback); // 回调，非必选，可以在policy中自定义
            fetch(host, {
                method: "POST",
                mode: "cors",
                body: requestData,
            }).then(
                (resl) => {
                    if (resl.status === 200) {
                        let fileObj = {};
                        fileObj.status = "success";
                        fileObj.percentage = "100";
                        fileObj.url = host + "/" + dir + filename;
                        fileObj.url_s = dir + filename;
                        resolve({
                            url: fileObj.url,
                            url_s: fileObj.url_s,
                            name: fileData.name,
                            type: fileType,
                        })
                        // this.$emit("getfilelist", this.fileList);
                    } else {
                        toast("上传错误，请重新上传！");
                        reject("上传错误")
                    }
                },
                (err) => {
                    console.log(err, "上传错误");
                    reject("上传错误")
                }
            );
        });
        */
    })
}




export {
    toast,
    isempty,
    isPhone,
    isIdcard,
    regPassword,
    dateHandle,
    compareDate,
    getDayNum,
    anyMonthAfterTime,
    upFile,
    getWeekDate,
    getMonthTime

}

