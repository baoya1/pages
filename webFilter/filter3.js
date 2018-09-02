//arrow function
//有一个参数时的箭头函数 =参数名=>
const remove = keyWords => {
    const titles = document.querySelectorAll('.titlelink')
    for(let title of titles){
        for (let keyWord of keyWords) {
            if (title.textContent.includes(keyWord)) {
                title.parentNode.remove(title)
                break
            }
        }
    }
    //titles.map(title => {})
}
//有多个参数或无参 =()=>
const main = () => {
    const keyWords = [
        '联',
        '天气'
    ]
    remove(keyWords)
}
main()
//同一页面复用时,输入remove(['swx']),否则Identifier 'remove' has already been declared