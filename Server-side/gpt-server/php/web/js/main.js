const test_img = 'https://i.pinimg.com/564x/cb/b9/d2/cbb9d2fed961f53a77a5d1b3ec33f104.jpg';

let my_library_book_shelf_data = [

];
function parameters(url) {

    let paramString = [];
    if (url.indexOf("#") > -1) {

        paramString[0] = url;
        paramString[1] = url.substring(0, url.indexOf("#"));
        paramString[2] = url.substring(url.indexOf("#") + 1);
    } else {
        return { 'base': url, 'params': null };
    }

    if (isBase64(paramString[2])) {
        paramString[2] = JSON.parse(atob(paramString[2]));
    }else{
        console.log('paramString2 is not ba64'); 
    }
    return { "base": paramString[1], "params": paramString[2] };
}

function isBase64(str) {
    console.log("isBase64 checking:", str);
    if (str === '' || str.trim() === '') { return false; }
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        console.log("error checking ba64", err );
        return false;
    }
}
let userid = '';
let username = '';
$(async () => {
    console.log("main home page");
    let urlParameters = parameters(window.top.location.href);
    console.log('ori:', urlParameters);
    console.log(urlParameters.params['email'], urlParameters.params['uuid'])
    userid = urlParameters.params['uuid'];
    username = urlParameters.params['email'];
    console.log('reget booklist of userid:', userid)
    onBookList(`http://localhost:8080/api/bookshelf/?$filter=created_by [eq] '${urlParameters.params['uuid']}'`);
    
    //load_book_slider($('#second_slider'), my_library_book_shelf_data);
});

$('#search_bt').on('click', () => {
    //alert('search');
    let word = $('#search_book').val();
    let urlsch = `http://localhost:8080/api/bookshelf/?$filter=created_by [eq] '${userid}' [and] author [like] '%${word}%'`;
    onBookList(urlsch);
});

$('#public_bt').on('click', () => {
    //alert('search');
    let curword = $('#public_bt').text();
    console.log(curword);
    if(curword === 'Public Library'){
        $('#public_bt').html('<div id="public_bt" class="second_bt"><a href="#">My Library</a></div>');
       // console.log('<div id="public_bt" class="second_bt"><a href="#">My Library</a></div>');
       $('#public_dr').text('Public Library');
       onBookList('http://localhost:8080/api/bookshelf/?$filter=public [eq] 1');
    }else{
        $('#public_bt').html('<div id="public_bt" class="second_bt"><a href="#">Public Library</a></div>');
       // console.log('Public Library');
       $('#public_dr').text('My Library');
       onBookList(`http://localhost:8080/api/bookshelf/?$filter=created_by [eq] '${userid}'`);
    }
});



const load_book_slider = async (j_slider, data) => {
    const carousel_inner = $(`<div></div>`);

    for (let i=0; i<data.length; i++) {
        const book = data[i];
        const id = Math.floor(i / 4);

        if (i % 4 == 0) {
            carousel_inner.append(`
                <div id="${id}" class="carousel-item ${id==0?'active':''}">
                    <div class="container-fluid">
                        <div class="row"></div>
                    </div>
                </div>
            `);
        }

        $(`#${id}>.container-fluid>div.row`, carousel_inner).append(`
            <a class="col-lg-3 col-md-6" href="${book.url}">
                <div class="book_img"><img src="${book.image}"></div>
                <h3 class="types_text">${book.title}</h3>
                <p class="looking_text">${book.author}</p>
            </a>
        `);
    }

    $('.carousel-inner', j_slider).html(carousel_inner.html());
};
const onUploadBook = async (base64Str) => {
    console.log('try uploading book');
    const params = {
        filepath: null,
        lang: null,
        author: 'author',
        name: 'filename',
        destription: null,
        matadata: null,
        orig_uuid: null,
        created_at: null,
        created_by: userid,
        cate: 'testcate',
        base64Str: base64Str,
        public: 0,
        title: null,
      };
      try{
         await $.ajax({
            type: "POST",
            url: 'http://localhost:8080/book/bookshelf',
            dataType: "json",
            data: JSON.stringify(params),
            success: function (response) {
                console.log('api called');
                console.log('insert book res:', response)
                onBookList(`http://localhost:8080/api/bookshelf/?$filter=created_by [eq] '${userid}'`);
            
            },
            error: function (thrownError2) {
                console.log(thrownError2);
               
            }
        });
    }catch(err){
        console.error(err);
    }


};
const onBookList = async (url) => {

    
    console.log(url);
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
                my_library_book_shelf_data = [];
                response.forEach(row => {
                    let bookObj = {
                        bookid: row.uuid,
                        title: row.title,
                        author: row.author,
                        userid: userid,
                        username: username
                    };
                    let encoded = btoa(unescape(encodeURIComponent(JSON.stringify(bookObj))))
                    my_library_book_shelf_data.push(
                        {image: test_img, title: row.title, author: row.author, url:`/web/book_details.html#${encoded}`}
                        );
                    console.log('book array pushed');
                });
                console.log('book array:', my_library_book_shelf_data);
            }else{
                console.log('no record book');
                my_library_book_shelf_data = [];
            }
        },
        error: function (thrownError) {
          console.log(thrownError);
        }
      });
      load_book_slider($('#main_slider'), my_library_book_shelf_data);

};
$('#upload_bt > a').on('click', () => {
    $('#myFile').click();
});

$('#myFile').on('change', (e) => {
    const file = $('#myFile').val().split(/(\\|\/)/g).pop();

    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);

    //call onUploadBook is Promise //AI
    fileReader.onload =  async () => {
        
        console.log('try uploading book');
        const base64 = fileReader.result.split(',')[1];
        console.log(base64);
        const params = {
            filepath: null,
            lang: null,
            author: 'author',
            name: 'filename',
            destription: null,
            matadata: null,
            orig_uuid: null,
            created_at: null,
            created_by: userid,
            cate: 'testcate',
            base64Str: base64,
            public: 0,
            title: null,
          };
          try{
            $.ajax({
                type: "POST",
                url: 'http://localhost:8080/book/bookshelf',
                dataType: "json",
                data: JSON.stringify(params),
                success: function (response) {
                    console.log('api called');
                    console.log('insert book res:', response)
                    console.log('reget booklist of userid:', userid)
                    onBookList(`http://localhost:8080/api/bookshelf/?$filter=created_by [eq] '${userid}'`);
                
                },
                error: function (thrownError2) {
                    console.log(thrownError2);
                    console.log('error2');
                }
            });
        }catch(err){
            console.log('error3');
            console.error(err);
        }
    };

    fileReader.onerror = (error) => {
        console.error(error);
    };
});