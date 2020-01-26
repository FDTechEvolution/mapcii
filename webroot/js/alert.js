function success(msg){
    var body = '<div class="alert alert-success alert-dismissible fade show" role="alert">';
    body += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
    body += '<span aria-hidden="true">×</span>';
    body += '</button>';
    body += '<h4 class="h5"><i class="fa fa-check-circle-o"></i>Well done!</h4>';
    body += msg;
    body += '</div>';
    $('#div_alert').empty();
    $('#div_alert').append(body);
    $('#div_main_alert').show();
}

function error(msg){
    var body = '<div class="alert alert-danger alert-dismissible fade show" role="alert">';
    body += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
    body += '<span aria-hidden="true">×</span>';
    body += '</button>';
    body += '<h4 class="h5"><i class="fa fa-minus-circle"></i>Oh snap!</h4>';
    body += msg;
    body += '</div>';
    $('#div_alert').empty();
    $('#div_alert').append(body);
    $('#div_main_alert').show();
}

function warning(msg){
    var body = '<div class="alert alert-warning alert-dismissible fade show" role="alert">';
    body += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
    body += '<span aria-hidden="true">×</span>';
    body += '</button>';
    body += '<h4 class="h5"><i class="fa fa-exclamation-triangle"></i>Warning!</h4>';
    body += msg;
    body += '</div>';
    $('#div_alert').empty();
    $('#div_alert').append(body);
    $('#div_main_alert').show();
}