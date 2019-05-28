
 $('.newsletter__form').on( 'keypress', '.js-email',  function(e) {
    if(e.which == 13) {
        event.preventDefault();
        validate();
    }
});

$('.newsletter__form').on('click', '.js-validate', function() {
    validate();
 });
 

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validate() {
    var $invalidResult = $('.js-result');
    var $validResult = $('.js-newsletter__form--subthanks');
    var email = $(".js-email").val();

    $invalidResult.text("");
    $('.js-result').removeClass('js-email--invalid');
  
    if (validateEmail(email)) {
      $validResult.addClass('js-email--valid');
      $('.newsletter__form').addClass('newsletter__form--hide');
      postingEmail();
     
    } else {
      $invalidResult.text('Please enter a valid email address.');
      $invalidResult.addClass('js-email--invalid');
      
    }

};

function postingEmail() {
    let newEmail = {
        'address': $(".js-email").val()
    }

    $.ajax({
        type: 'POST',
        data: newEmail,
        url: '/api/emails',
        dataType: 'JSON'
    });
}
  
