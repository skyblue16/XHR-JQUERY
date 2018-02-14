//con JQUERY ---
const $form = $('#search-form');
const $searchField = $('#search-keyword');
const $responseContainer = $('#response-container');
let $searchForText;

$form.submit(function (e) {
    e.preventDefault();
    $responseContainer.html('');
    $searchForText = $searchField.val();
    getNews()
});

function getNews() {
/*const articleRequest = new XMLHttpRequest();
articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForText}&api-key=6581e6b8ee894aa09a9434def8eed9ca`);
articleRequest.onload = addNews;
articleRequest.onerror = handleError;
articleRequest.send();*/
$.ajax({
    url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${$searchForText}&api-key=6581e6b8ee894aa09a9434def8eed9ca`
}).done(addNews)
    .fail(handleError);
}

function addNews(news)/*parametro news : y muestra igual que poner json.parse*/ {
    const articles = news.response.docs;//veo lo que esta adentro de mi parametro
    articles.forEach(article => {
        const title = article.headline.main;
        const snippet = article.snippet;
        const url = article.web_url;
        let $h4 = $('<h4 />').addClass('titulo');
        let $li = $('<li />').addClass('articleClass').text(snippet);
        let $a = $('<a />').text(title);
        $a.attr('href', url).attr('target', '_blank');

        $h4.append($a);
        $responseContainer.append($h4);
        $responseContainer.append($li);
    });
}

function handleError() {
    console.log('se ha presentado un error');
}