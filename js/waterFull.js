/**
 * 实现瀑布流布局
 */
function waterFull(parent, child) {
    //1.父盒子居中
    //1.1获取所有的盒子
    var allBox = $(parent).getElementsByClassName(child);
    //获取子盒子宽度
    var boxWidth = allBox[0].offsetWidth;
    //1.3 获取屏幕的宽度
    var screenW = (document.documentElement.clientWidth > $(parent).offsetWidth) ? $(parent).offsetWidth : document.documentElement.clientWidth;
    //1.4 求出列数
    var cols = parseInt(screenW / boxWidth);
    //1.5 父盒子居中
    /*$(parent).style.width = cols * boxWidth + 'px';
    $(parent).style.margin = '0 auto';*/

    var xyMargin = 16;

    //2. 子盒子定位
    //2.1 定义高度数组
    var heightArr = [], boxHeight = 0, minBoxHeight = 0, minBoxIndex = 0;
    //2.2 遍历子盒子
    for(var i = 0; i < allBox.length; i++) {
        //2.2.1 求出每一个盒子的高度
        boxHeight = allBox[i].offsetHeight + xyMargin;
        //2.2.2 去除第一行盒子的高度放入高度数组
        if (i < cols) {
            heightArr.push(boxHeight);
            allBox[i].style.position = 'absolute';
            allBox[i].style.left = i * (boxWidth + xyMargin) + 'px';
            allBox[i].style.top =  xyMargin + 'px';
        } else {
            //1.取出最矮的盒子高度
            minBoxHeight = _.min(heightArr);
            //2.求出最矮盒子对应的索引
            minBoxIndex = getMinBoxIndex(heightArr, minBoxHeight);
            //3.子盒子定位
            allBox[i].style.position = 'absolute';
            allBox[i].style.left = minBoxIndex * (boxWidth + xyMargin) + 'px';
            allBox[i].style.top = minBoxHeight + xyMargin + 'px';

            //更新数组中高度
            heightArr[minBoxIndex] += boxHeight;
        }
    }

    //5.更新父盒子的高度
    //子盒子的
    var parentHeight = allBox[allBox.length - 1].offsetTop + allBox[allBox.length - 1].offsetHeight;
    $(parent).style.height = parentHeight + "px";

}

function getMinBoxIndex(arr, val) {
    for(var i = 0; i<arr.length;i++) {
        if (arr[i] === val) {
            return i;
        }
    }
}

function $(id) {
    return typeof  id === 'string' ? document.getElementById(id) : null;
}

//是否具备加载图片条件
function checkWillLoadImg() {
    //1.获取最后一个盒子
    var allBox = document.getElementsByClassName('box');
    var lastBox = allBox[allBox.length - 1];

    //2.求出最后一个盒子自身高度的一半 + offsetTop
    var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;

    //求出屏幕高度
    var screenW = document.body.clientHeight || document.documentElement.clientHeight;
    //求出页面偏离浏览器高度
    var scrollTop = scroll().top;

    return lastBoxDis <= screenW + scrollTop;


}

