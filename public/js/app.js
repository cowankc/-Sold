
$(document).ready(function(){
    $('.modal').modal();
    $('.sidenav-right').sidenav( {edge: 'right'});
    $('select').formSelect();

    var owl = $('.owl-carousel');
    owl.owlCarousel({
        items:4,
        loop:true,
        margin:10,
        autoplay:true,
        autoplayTimeout:2000,
        autoplayHoverPause:true,
        responsiveClass:true,
        responsive:{
            0:{
                items:3,
            },
            600:{
                items:3,
            },
            1000:{
                items:5,
            }
        }
    });
    $('.play').on('click',function(){
        owl.trigger('play.owl.autoplay',[2000])
    })
    $('.stop').on('click',function(){
        owl.trigger('stop.owl.autoplay')
    })


    // $(document).on('click', '.reg-user-btn', function(){
    //     $.ajax({
    //         url : '/api/user',
    //         type : 'POST',
    //         data : {userName: $('#userName').val(), email: $('#email').val(), password:$('#password').val()},
    //         dataType : 'JSON',
    //         success : function(response){
    //             console.log(response.data);
    //             // Store to LocalStorage
    //             // localStorage.setItem(response.data.id, response.sdata.token);
    //             // let token = localStorage.getItem(userId);
    //             // var verify = jwt.verify(token, userId);
    //             // var decoded = jwt.decode(token);
    //         }
    //     });
    // })

    $(document).on('click', '.login-btn', function(e){
        e.preventDefault();
        $.ajax({
            url : '/api/user/' + $('#email').val() + '/' + $('#password').val(),
            type: "POST"
        }).then(function(response){
            console.log(response);
            if (response.success) {
                // Store to LocalStorage
                localStorage.clear();
                localStorage.setItem("token", response.data.token);
                let token = localStorage.getItem("token");
                console.log(token);
                //checks to see if user is chef in db, if they are they go to chef page, if not they go to swipe page
                if(response.chef){
                    window.location.href = "/chef/meals/" + $('#email').val();
                }else{
                    window.location.href = "/swipe";
                }
            }
            else{
                console.log('username and password do not match')
                $('#email').addClass('invalid')
                $('#password').addClass('invalid')
                $('#validation').html('The email and password combination does not exist.')
            }
        })
    });

    //admin
    $(document).on('click', '#delete-meal-confirm', function(){
        let id = $(this).data('id');
        console.log(id)
        $(document).on('click', '.delete-meal-btn', function(){
            $.ajax({
                url: '/api/meal/' + id,
                type: 'DELETE',
                success: function(result) {
                    // Do something with the result
                    location.reload();
                    }
                });
            })
        })


    $(document).on('click', '.edit-meal-btn', function(e){
        e.preventDefault();
        let id = $(this).data('id');
        console.log('id')
        console.log(id)

        //Get from LocalStorage
        let token = localStorage.getItem("token");
        
        $.ajax({
            url : '/api/verify/' + token,
            type: "POST"
        }).then(function(response){
            console.log(response);

            if (response.success) {
                // Get user id
                userId = response.data.userId;

                if (userId !== undefined) {
                    getMealDetails(id);
                }
                else {
                    window.location.href = "/login";
                }
            }
            else{
                window.location.href = "/login";
            }
        });
    })

    
    function getMealDetails(id) {
        $.ajax({
            url: "/api/meal/" + id,
            type: "GET",
            success: function (response) {
             let data =   response.data;
             console.log(data)
    
             $('#edit_mealName').val(data.mealName)
             $('#edit_price').val(data.price)
             $('#edit_ingredients').val(data.ingredients)
             $('#edit_category').val(data.category);
             $('#edit_address').val(data.address);
             $('#edit_photo').val(data.photo);
             $('#update-meal-btn').attr('data-id', id)
                
             M.updateTextFields();
             $('select').formSelect();

            }

          });

    }

    $(document).on('click', '.update-meal-btn', function(e){
        e.preventDefault();
            let id = $(this).data('id');

           // Send the PUT request.
        $.ajax("/api/meal/" + id, {
            type: "PUT",
            data: $("#meal_update_form").serialize()
            }).then(
            function() {

            // Reload the page to get the updated list
            location.reload();
            }
        );
    })

});