export const Articles = () => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@stupidsherlock')
    .then(res=>res.json())
    .then(data=>{
        const res = data.items
        console.log(res);
        const posts = res.filter(item=>(item.categories.length>=0 && item.categories.includes("cryptography")))
        function toText(node){
            let tag = document.createElement('div')
            tag.innerHTML = node
            node = tag.innerText
            return node
        }
        function shortenText(text, startingPoint, maxLength){
            return text.length>maxLength?
            text.slice(startingPoint, maxLength):
            text
        }
        let output = '';
        posts.forEach((item)=> {
            let description = item.description;
            let thumbnailLinkRegex = /<img.*?src=["'](.*?)["']/;
            let match = description.match(thumbnailLinkRegex);
            let thumbnailLink = match ? match[1] : null;
            output += `
                <div class="item" onClick="window.location.href = '${item.link}'">
                    <div class="thumb">
                        <img src="${thumbnailLink}" class="blog-topImg"></img>
                    </div>
                    <div class="text">
                        <h2 class="blog-title">${shortenText(item.title,0,30)+'...'}</h2>
                        <p class="blog-intro">${'...' + shortenText(toText(item.content),60, 300)+ '...'}</p>
                    </div>
                </div>
            `
        })
        document.querySelector('.blog').innerHTML = output
    })
    return (<div className="blog"></div>);
}