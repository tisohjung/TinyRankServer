$(document).ready(function() {

  $('.delete').click(function (e) {
    console.log($(this).parent()[0]);
    var jsonData = {"_id" : $(this).parent()[0].id };
    var row = $(this).parent()[0];
    if (confirm('R U sure?') === true) {
      $.ajax({
        type: 'POST',
        url: '/remove',
        data: jsonData,
        success: function(datas) {
          console.log('success', datas);
          // array of data
          console.log(JSON.stringify(datas));
          console.log($(this).parent()[0]);
          row.remove();
        },
        error: function() {
          alert('error loading orders');
        }
      });
    }
  });
});