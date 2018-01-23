$(document).ready(function() {
    
  var nameInput = $("#user-name");
  var userList = $("tbody");
  var userContainer = $(".user-container");
  var searchInput = $("#search-term");



  $(document).on("submit", "#user-form", handleUserFormSubmit);
  $(document).on("click", ".delete-user", handleDeleteButtonPress);
  $(document).on("submit", "#search-form", handleSearchButton);

  
  getUsers();

  
  function handleUserFormSubmit(event) {
    event.preventDefault();
   
    if (!nameInput.val().trim()) {
      return;
    }
    
    upsertUser({
      name: nameInput
        .val()
        .trim()
    });
  }

  
  function upsertUser(userData) {
    $.post("/api/users", userData)
      .then(getUsers);
  }

 
  function createUserRow(userData) {
    var newTr = $("<tr>");
    newTr.data("user", userData);
    newTr.append("<td>" + userData.name + "</td>");
    newTr.append("<td> " + userData.Meds.length + "</td>");
    newTr.append("<td><a href='/meds?user_id=" + userData.id + "'><button class='btn btn-success'>Go to Meds</button></a></td>");
     newTr.append("<td><a href='/apptpage?user_id=" + userData.id + "'><button class='btn btn-success'>Go to Patient Appointments</button></a></td>");
    newTr.append("<td><a href='/addMed?user_id=" + userData.id + "'><button class='btn btn-success'>Add a Medication</button></a></td>");
    newTr.append("<td><a href='addAppt?user_id=" + userData.id + "'><button class='btn btn-success'>Add an Appointment</button></a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-user'><button class='btn btn-danger'>X</button></a></td>");

    return newTr;
  }

 
  function getUsers() {
    $.get("/api/users", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createUserRow(data[i]));
      }
      renderUserList(rowsToAdd);
      nameInput.val("");
    });
  }

  function searchUsers() {
      var searchTerm = $("#search-term").val();
    $.get("/api/users/" + searchTerm, function(data) {
        var rowsToAdd = [];
        if(data.length) {
        for (var i = 0; i < data.length; i++) {
          rowsToAdd.push(createUserRow(data[i]));
        }
        renderUserList(rowsToAdd);
        nameInput.val("");
    } else {
        renderSearchEmpty();
    }
      });
    };

  
  function renderUserList(rows) {
    userList.children().not(".last").remove();
    userContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      userList.append(rows);
    }
    else {
      renderEmpty();
    }
  }

  
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("Please add a patient.");
    userContainer.append(alertDiv);
  }

  function renderSearchEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("Patient not found.");
    userContainer.append(alertDiv);
  }

  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("user");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/users/" + id
    })
    .then(getUsers)
    location.reload(true);
  }

  function handleSearchButton() {
    event.preventDefault();
   
    if (!searchInput.val().trim()) {
      return;
    }
    
    searchUsers({
      name: searchInput
        .val()
        .trim()
    });
  } 
  
});
