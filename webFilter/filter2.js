//精简版网页过滤器
//@match  *://www.baidu.com/*
var remove = function () {
    var keyWord = [
        '复联',
        '101'
    ]
    // 虎扑标题class:titlelink
    // 百度搜索结果class:t
    // 知乎首页标题class:Feed
    var relusts = document.querySelectorAll('.titlelink');
    for (var i = 0; i < relusts.length; i++) {
        var t = relusts[i];
        var text = t.textContent;
        for (var j = 0; j < keyWord.length; j++) {
            if (text.includes(keyWord[j])){
                t.parentNode.remove(t)
            }
        }
    }
}
remove()   
