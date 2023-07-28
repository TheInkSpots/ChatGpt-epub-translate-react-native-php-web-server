// $('#register_bt').on('click', () => {
//     alert('search');
// });
function _uuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
  

$('#register_bt').click( function(){
    // alert('search');
    let email = $("#email").val();
    let pw = $("#password").val();
    let pw_cf = $("#password_confirm").val();
    // alert(str);
    
    if( email === '' || pw === '' || pw_cf === '' )
    {
        alert('please enter a valid email and password');
    }
    else if(pw === pw_cf)
    {
        let uuid = _uuid();
        let url = `http://localhost:8080/api/user/?$filter=username [eq] '${email}'`
        console.log(url);
        let param = {
            uuid :  uuid,
            username :  email,
            password : pw_cf,
            email :  email,
            phone :  "123123"
        };
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: function (response) {
                console.log('test: ', response.length)
                if(response.length != 0){
                    alert('email is userd');
                }else{
                    console.log('try inserting');
                    $.ajax({
                        type: "POST",
                        url: 'http://localhost:8080/api/user',
                        dataType: "json",
                        data: JSON.stringify(param),
                        success: function (response) {
                            console.log('insert user res:', response)
                            let encoded = btoa(JSON.stringify(param))
                            window.location.href=`/web/main.html#${encoded}`;
                        },
                        error: function (thrownError2) {
                            console.log(thrownError2);
                        }
                      });
                }
            },
            error: function (thrownError) {
              console.log(thrownError);
            }
          });
    }
    else{
        alert('comfirm password incorrect');
    }
    
});
$('button selector').click(function(){
    window.location.href='the_link_to_go_to.html';
 })
 $("#myBtn").click(function(){
    var str = $("#myInput").val();
    alert(str);
});