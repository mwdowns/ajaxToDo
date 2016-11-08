function updateList() {
  $.get('/tasks', function(results) {
    results.forEach(function(entry) {
      var html = "<li>" + entry.description + "</li";
      $("#task-list").append(html);
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

});
