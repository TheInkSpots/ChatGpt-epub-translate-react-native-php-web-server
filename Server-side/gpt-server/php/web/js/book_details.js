

$.getScript("js/api.js", function() {
    //alert("Script loaded but not necessarily executed.");
    console.log(hello());
 });

var userid = '';
var username = '';
var bookid = '';
var comments = [
   
];

var languages = [
    { name: "English", url: "www.google.com" },
    { name: "English", url: "www.google.com" },
];

const book_img = 'https://i.pinimg.com/564x/cb/b9/d2/cbb9d2fed961f53a77a5d1b3ec33f104.jpg';
const usericon = 'https://cdn-icons-png.flaticon.com/512/219/219969.png';

$(async () => {
    langsShort.forEach((x) => {
        $("#langDrop").append('<option value="' + x + '">' + x + '</option>');
    });
    console.log("book detail page");
    let urlParameters = await new Promise( (resolve, reject)=> {
          $.getScript("js/api.js", function () {
            resolve(parameters(window.top.location.href));
         });
    });
    console.log('ori:', urlParameters);
     userid = urlParameters.params['userid'];
     username = urlParameters.params['username'];
     bookid = urlParameters.params['bookid'];

    console.log(urlParameters.params['bookid'], urlParameters.params['author'], urlParameters.params['title'])
    let url = `/api/bookshelf/?$filter=orig_uuid [eq] '${urlParameters.params['bookid']}'`;
    await $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (response) {
            console.log('test: ', response.length)
            if(response.length > 0){
                console.log('good get booklist :', response.length);
                //let encoded = btoa(JSON.stringify(response[0]))
                //window.location.href=`/web/main.html#${encoded}`;
                languages = [];
                response.forEach(row => {
                    let bookObj = {
                        bookid: row.uuid,
                        title: row.title,
                        author: row.author,
                    };
                    let encoded = btoa(unescape(encodeURIComponent(JSON.stringify(bookObj))))
                    languages.push(
                        {name: row.lang, url: `/web/reader/index.html#${encoded}`}
                        );
                    console.log('book array pushed');
                });
                console.log('book array:', languages);
            }else{
                console.log('no record book');
                languages = [];
            }
        },
        error: function (thrownError) {
          console.log(thrownError);
        }
      });
      onBooklist(bookid);
    onComment(bookid,username,userid);

    const book_name = "test";
    $('.book_taital').html(urlParameters.params['title']);
    $('#book_img').attr('src', book_img);
    const inner = $(`<div></div>`);
    let bookObj2 = {
        bookid: urlParameters.params['bookid']
    };
    let encoded2 = btoa(JSON.stringify(bookObj2))
    inner.append(`
            <div id="" class="main_bt col-6 col-md-6"  display:inline-block; margin:auto">
                <a href="/web/reader/index.html#${encoded2}">Original</a>
            </div>
        `);
    $('#lang_listOri').html(inner.html());

    load_languages(languages);
    load_comments(comments);

    

});
const onComment = async (bookid, username, userid) => {
    let urlComment = `/api/comment/?$filter=bookid [eq] '${bookid}'`;

    await $.ajax({
      type: "GET",
      url: urlComment,
      dataType: "json",
      success: function (response) {
          console.log('test: ', response.length)
          if(response.length > 0){
              console.log('good get commentlist :', response.length);
              //let encoded = btoa(JSON.stringify(response[0]))
              //window.location.href=`/web/main.html#${encoded}`;
              comments = [];
              response.forEach(row => {
                  //let encoded = btoa(JSON.stringify(bookObj))
                  comments.push(
                      { icon: usericon , username:row.username, content: row.comment, timestamp: row.created_at },
                      );
                  console.log('book array pushed');
              });
              console.log('comments array:', comments);
              load_comments(comments);
          }else{
              console.log('no record book');
              comments = [];
          }
      },
      error: function (thrownError) {
        console.log(thrownError);
      }
    });
};

const load_languages = async (data) => {
    const inner = $(`<div></div>`);

    for (let i=0; i<data.length; i++) {
        const lang = data[i];
        inner.append(`
            <div id="" class="main_bt col-6 col-md-6" display:inline-block; margin:auto">
                <a href="${lang.url}">${lang.name}</a>
            </div>
        `);
    }

    $('#lang_list').html(inner.html());
};

const load_comments = async (data) => {
    const inner = $(`<div></div>`);

    for (let i=0; i<data.length; i++) {
        const comment = data[i];
        inner.append(`
            <div id="${i}" class="row" style="margin-bottom: 60px">
                <div class="col-lg-1 col-sm-2">
                    <img src="${comment.icon}" width="100" height="200" />
                </div>
                <div class="col-lg-11 col-sm-10">
                    <div class="comment_box">
                        <div style="color:#888888; margin-top:10px">${comment.username}</div>
                        <p class="comment_text">${comment.content}</p>
                        <div style="color:#888888; margin-top:10px">${comment.timestamp}</div>
                    </div>
                </div>
            </div>
        `);
    }

    $('#comment_list').html(inner.html());
};


$('#comment').click( function(){ 
    console.log('rtesr');
});

$('#translate_bt').on('click', async () => {
    let lang = $("#langDrop").val();
    console.log('rtesr', lang);
    let params = {
        tarLang: lang,
        createdBy: userid
      };
      console.log('tresalate book ', params);
    const oriBnt = $("#translate_bt").html();
    $("#translate_bt").prop("disabled", false);
    
    // add spinner to button
    $("#translate_bt").html(
        '<div class="spinner-border text-secondary" role="status"><span class="visually-hidden">Loading...</span></div>'
    );

    await $.ajax({
        type: "PUT",
        url: `http://localhost:8080/book/bookshelf(${bookid})`,
        dataType: "json",
        data: JSON.stringify(params),
        success: function (response) {
            console.log('tarns ver good res:', response)
            onBooklist(bookid);
            $("#translate_bt").html(oriBnt);
        },
        error: function (thrownError2) {
            console.log(thrownError2);
        }
      });
});
$('#submit_bt').on('click', async () => {

    let commentStr = $("#comment").val();
    let uuid = await new Promise((resolve, reject)=> {
        $.getScript("js/api.js", function () {
            resolve(_uuid());
         });
    });

    let date = new Date();
    let time = date.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
      hour12: true,
    });
    let params = {
      uuid: uuid,
      username: username,
      boodid: bookid,
      comment: commentStr,
      created_at: time,
    };

    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/api/comment',
        dataType: "json",
        data: JSON.stringify(params),
        success: function (response) {
            console.log('insert coment res:', response)
            onComment(bookid);
        },
        error: function (thrownError2) {
            console.log(thrownError2);
        }
      });
      $("#comment").empty();
});

const langs = [
    'Afrikaans',
    'Arabic',
    'Bashkir',
    'Basque',
    'Dutch',
    'English',
    'French',
    'German',
    'Greek',
    'Hebrew',
    'Hindi',
    'Indonesian',
    'Italian',
    'Japanese',
    'Korean',
    'Malay',
    'Mongolian',
    'Portuguese',
    'Simplified Chinese',
    'Spanish',
    'Thai',
    'Traditional Chinese',
    'Turkish',
    'Ukrainian',
    'Urdu',
    'Vietnamese',
  ];

  const langsShort = [
    'English',
    'French',
    'German',
    'Italian',
    'Japanese',
    'Korean',
    'Simplified Chinese',
    'Spanish',
    'Traditional Chinese',
  ];
  const onBooklist = async (bookid) => {
  let url = `/api/bookshelf/?$filter=orig_uuid [eq] '${bookid}'`;
    await $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (response) {
            console.log('test: ', response.length)
            if(response.length > 0){
                console.log('good get booklist :', response.length);
                //let encoded = btoa(JSON.stringify(response[0]))
                //window.location.href=`/web/main.html#${encoded}`;
                languages = [];
                response.forEach(row => {
                    let bookObj = {
                        bookid: row.uuid,
                        title: row.title,
                        author: row.author,
                    };
                    let encoded = btoa(unescape(encodeURIComponent(JSON.stringify(bookObj))))
                    languages.push(
                        {name: row.lang, url: `/web/reader/index.html#${encoded}`}
                        );
                    console.log('book array pushed');
                    load_languages(languages);
                });
                console.log('book array:', languages);
            }else{
                console.log('no record book');
                languages = [];
            }
        },
        error: function (thrownError) {
          console.log(thrownError);
        }
      });
};