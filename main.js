$(document).ready(function(){

  var api_url_base = 'http://157.230.17.132:3008/todos/';

  var source = $('#template_scheda').html();
  var template_function = Handlebars.compile(source);

  call_ajax_GET()

  $('#to_do_button').click(function(){
    // scrittura si attiva al click sul pulsante
    var richiesta = $('#request').val();
    $('#request').val('');
    // parte chiamata per ajax in scrittura POST
    call_ajax_POST(richiesta);
  });

  $(document).on('click','.fa-trash-alt', function(){
    var todo_id_delete =  $(this).text();
    // var todo_id_delete =  $(this).attr('data-id');
    console.log(todo_id_delete);
    call_ajax_DELETE(todo_id_delete);
  });

  $(document).on('click','.fa-pencil-alt', function(){
    var edited_text =  prompt('scrivi qui una nuova cosa da fare');
    var todo_id_edit =  $(this).siblings('.fa-trash-alt').text();

    call_ajax_PUT( todo_id_edit , edited_text );

  });

  function call_ajax_PUT( input , new_text ){
    $.ajax({
      'url': api_url_base + input,
      'method':'PUT',
      'data':{
        'text': new_text
      },
      'success': function(data){
        call_ajax_GET();
      },
      'error':function(){
        alert('PUT : si è verificato un errore');
      }
    });
  }

  function call_ajax_DELETE(input){
    $.ajax({
      'url': api_url_base + input,
      'method':'DELETE',
      // 'data':{
      //   'id': input
      // },
      'success': function(data){
        call_ajax_GET();
      },
      'error':function(){
        alert('DELETE : si è verificato un errore');
      }
    });
  }

  function call_ajax_POST(input){
    $.ajax({
      'url': api_url_base,
      'method':'POST',
      'data':{
        'text': input
      },
      'success': function(data){
        call_ajax_GET();
      },
      'error':function(){
        alert('POST : si è verificato un errore');
      }
    });
  }

  // funzione per stampare la lista tramite handlebars
  function call_ajax_GET(){
    $('.container').html('');
    $.ajax({
      'url': api_url_base,
      'method':'GET',
      // 'data':{
      //   'text': richiesta (NON SIAMO IN SCRITTURA QUI)
      // },
      'success': function(data){
        // funzione per stampare i film tramite handlebars
        for (var i = 0; i < data.length; i++) {
        // console.log(data[i].id);
          var scheda = data[i];
          // inizializzo le variabili di handlebars
          var handlebars_variable = {
            'todo' : scheda.text,
            'number' : scheda.id
          }
          var html = template_function(handlebars_variable);
          $('.container').append(html);
        }
      },
      'error':function(){
        alert('GET : si è verificato un errore');
      }
    });
  }
});
