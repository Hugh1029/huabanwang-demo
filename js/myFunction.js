function scroll() {
    if (window.pageYOffset !== null) {
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        };
    }else if(document.compatMode === "CSS1Compat") {
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        };
    }
    return {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
    }
}

function $(id) {
    return typeof  id === 'string' ? document.getElementById(id) : null;
}

function show(el) {
    return el.style.display = 'block';
}

function hide(el) {
    return el.style.display = 'none';
}


/**
 * 获取屏幕的宽度和高度
 * @returns {*}
 */
function client() {
    if (window.innerWidth) {    //ie9+ 最新的浏览器
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }else if(document.compatMode === "CSS1Compat") {    //W3C
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
    //怪异模式
    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }
}


/**
 * 匀速动画
 * @param obj[object] 元素
 * @param target[number] 目标值
 * @param speed 步长
 */
function constant(obj, target,speed) {
    //1.清除定时器
    clearInterval(obj.timer);
    //2.判断方向
    //如果目标大于现在位置，正方向，speed正值
    //否则负值
    speed = obj.offsetLeft < target ? speed : -speed;

    //2.设置定时器
    obj.timer = setInterval(function () {
        obj.style.left = obj.offsetLeft + speed + 'px';

        if (Math.abs(target - obj.offsetLeft) < Math.abs(speed)) {
            clearInterval(obj.timer);
            //偏差值
            obj.style.left = target + 'px';
        }
    }, 20);
};


/**
 * 获取css样式
 * @param (object)obj
 * @param (string)attr
 */
function getCSSAttrValue(obj, attr) {
    if(obj.currentStyle) {  //IE、Opera
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}

/**
 * 缓动动画
 * @param obj
 * @param json
 * @param fn
 */
function buffer(obj, json, fn) {
    clearInterval(obj.timer);

    var begin = 0, target = 0, speed = 0;
    obj.timer = setInterval(function () {
        //1.3 旗帜
        var flag = true;
        for(var key in json) {
            //获取初始值

            if("opacity" === key) {  //透蜜度
                begin = Math.round(parseFloat(getCSSAttrValue(obj, key) * 100 || 1));
                target = parseInt(json[key] * 100);
            }else if("scrollTop" === key) {
                begin = Math.ceil(obj.scrollTop);
                target = parseInt(json[key] );
            }else if("zIndex" === key) {
                obj.style[key] = json[key];
            }else {    //其他情况
                begin = parseInt(getCSSAttrValue(obj, key) || 0);
                target = parseInt(json[key] );
            }

            //.求步长
            speed = (target - begin) * 0.2;

            //判断是否向上取整
            speed = (target > begin) ? Math.ceil(speed) : Math.floor(speed);

            if ("opacity" == key) {
                obj.style.opacity = (begin + speed) / 100;
                obj.style.filter = "alpha(opacity:"+(begin + speed)+")";
            } else if("scrollTop" == key) {
                obj.scrollTop = begin + speed;
            } else {
                obj.style[key] = begin + speed + 'px';
            }


            //判断
            if (begin != target) {
                flag = false;
            }
        }

        //清除定时器
        if (flag) {
            clearInterval(obj.timer);
            //判断回调函数
            if (fn) {
                fn();
            }
        }

    }, 20);
}