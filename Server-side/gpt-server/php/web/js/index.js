$(()=>{

});



$(".signup_bt").on('click', () => {
    
});

$('.login_bt').click( function(){
    // alert('search');
    let email = $("#uname").val();
    let pw = $("#password").val();

    if( email === '' || pw === '' )
    {
        alert('please enter a valid email and password');
    }
    else
    {
        //let uuid = _uuid(); 
        let url = `http://localhost:8080/api/user/?$filter=username [eq] '${email}' [and] password [eq] '${pw}'`;
        console.log(url);
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: function (response) {
                console.log('test: ', response.length)
                if(response.length != 0){
                    console.log('good login :', response[0]);
                    let encoded = btoa(JSON.stringify(response[0]))
                    window.location.href=`/web/main.html#${encoded}`;
                }else{
                    console.log('email or password incorrect');
            
                }
            },
            error: function (thrownError) {
              console.log(thrownError);
            }
          });
    }

    
});