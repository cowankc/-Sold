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



    //admin
    $(document).on('click', '.delete-meal-btn', function(){
        let id = $(this).data('id');
        console.log(id)
        var confirmText = "Are you sure you want to delete this meal?";
        if(confirm(confirmText)) {
            $.ajax({
                url: '/api/meal/' + id,
                type: 'DELETE',
                success: function(result) {
                    // Do something with the result
                    location.reload();
                }
            });
        }
    })

    $(document).on('click', '.edit-meal-btn', function(){
        let id = $(this).data('id');
        console.log(id)
       getMealDetails(id);
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