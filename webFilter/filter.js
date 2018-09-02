//网页屏蔽词js
//传入'.class' 获取页面上所有有此class名的元素
var es = function (sel) {
    return document.querySelectorAll(sel);
}
//移除此元素
var removeItem = function (t) {
    var parent = t.parentNode;
    parent.remove(t);
}
var remove = function (keyWordList) {
    // 虎扑标题class:titlelink
    // 百度搜索结果class:t
    // 知乎首页标题class:Feed
    var relusts = es('.Feed');
    //遍历所有要筛选的元素
    for (var i = 0; i < relusts.length; i++) {
        var t = relusts[i];
        var content = t.textContent;
        //获取元素的文本内容并遍历
        for (var j = 0; j < keyWordList.length; j++) {
            var k = keyWordList[j]
            if (content.includes(k)) {
                removeItem(t)
            }
        }
    }
}

var _main = () => {
    var keyWordList = [
        '影视',
        '101'
    ]
    remove(keyWordList)
}

_main()