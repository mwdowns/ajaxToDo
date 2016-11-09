function updateList() {
  $.get('/tasks', function(results) {
    $("li").remove();
    // console.log(results);
    results.forEach(function(entry) {
      var html = "<li id='" + entry.id + "'><input class='checkbox' type='checkbox' /> " + entry.description + '</li>';
      $("#task-list").append(html);
      // console.log(entry.done);
      // console.log("#" + entry.id);
      $("#new-task").val("");
    });
  });
}
$(function() {
  updateList();
  $("#form").submit(function(event) {
    event.preventDefault();
    var newItem = $("#new-task").serialize();
    $.post('/add_task', newItem);
    updateList();
  });

  $("#task-list").on('click', '.checkbox', function() {
    var task_done = $(this).prop("checked");
    var task_id = $(this).parent().attr("id");
    var data = {id: task_id, done: task_done};
    $.post('/mark_task', data, function(result) {
      if (result.done === false) {
        $("#" + result.id).removeClass("done");
      }
      else if (result.done === true) {
        $("#" + result.id).addClass("done");
      }
    });
  });

  $("#remove_completed").click() {
    var something = 2;
  }

});
