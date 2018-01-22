$(document).ready(function() {

    var apptContainer = $(".appt-container");
  
    $(document).on("click", "button.delete", handleApptDelete);
    $(document).on("click", "button.edit", handleApptEdit);
    
    var appts;
  
   
    var url = window.location.search;
    var userId;
    if (url.indexOf("?user_id=") !== -1) {
      userId = url.split("=")[1];
      getAppts(userId);
    }
    
    else {
      getAppts();
    }
  
  
    
    function getAppts(user) {
      userId = user || "";
      if (userId) {
        userId = "/?user_id=" + userId;
      }
      $.get("/api/appts" + userId, function(data) {
        console.log("Appts", data);
        appts = data;
        if (!appts || !appts.length) {
          displayEmpty(user);
        }
        else {
          initializeApptRows();
        }
      });
    }
  
    
    function deleteAppt(id, user) {
      $.ajax({
        method: "DELETE",
        url: "/api/appts/" + id
      })
      .then(function() {
        getAppts(user);
      });
    }
  
    
    function initializeApptRows() {
      apptContainer.empty();
      var apptsToAdd = [];
      for (var i = 0; i < appts.length; i++) {
        apptsToAdd.push(createNewApptRow(appts[i]));
      }
      apptContainer.append(apptsToAdd);
    }
  
    
    function createNewApptRow(appt) {
      var formattedApptDate = new Date(appt.createdAt);
      formattedApptDate = moment(formattedApptDate).format("MMMM Do YYYY, h:mm:ss a");
      var newApptPanel = $("<div>");
      newApptPanel.addClass("panel panel-default");
      var newApptPanelHeading = $("<div>");
      newApptPanelHeading.addClass("panel-heading");
      var deleteApptBtn = $("<button>");
      deleteApptBtn.text("x");
      deleteApptBtn.addClass("delete btn btn-danger");
      var editApptBtn = $("<button>");
      editApptBtn.text("EDIT");
      editApptBtn.addClass("edit btn btn-info");
      var newApptName = $("<h2>");
      var newApptDate = $("<small>");
      var newApptUser = $("<h5>");
      var newApptPanelBody = $("<div>");
      newApptPanelBody.addClass("panel-body");
      var newApptTime = $("<p>");
      var newApptType = $("<p>");
      newApptName.text(appt.User.name + " ");
      newApptTime.text("Scheduled for: " + appt.appttime);
      newApptType.text("Appt type: " + appt.appttype);
      newApptDate.text(formattedApptDate);
      newApptName.append(newApptDate);
      newApptPanelHeading.append(deleteApptBtn);
      newApptPanelHeading.append(editApptBtn);
      newApptPanelHeading.append(newApptName);
      newApptPanelHeading.append(newApptUser);
      newApptPanelBody.append(newApptTime, newApptType);
      newApptPanel.append(newApptPanelHeading);
      newApptPanel.append(newApptPanelBody);
      newApptPanel.data("appt", appt);
      return newApptPanel;
    }
  
    
    function handleApptDelete() {
      var currentAppt = $(this)
        .parent()
        .parent()
        .data("appt");
      deleteAppt(currentAppt.id, currentAppt.UserId);
      window.location.href = "/appts?user_id=" + currentUser.id;

    }
  
    
    function handleApptEdit() {
      var currentAppt = $(this)
        .parent()
        .parent()
        .data("appt");
      window.location.href = "/addAppt?appt_id=" + currentAppt.id;
    }
  
    
    function displayEmpty(id) {
      var query = window.location.search;
      var partial = "";
      if (id) {
        partial = " for patient ";
      }
      apptContainer.empty();
      var messageh2 = $("<h2>");
      messageh2.css({ "text-align": "center", "margin-top": "50px" });
      messageh2.html("No apppointments yet" + partial + ", navigate <a href='/addAppt" + query +
      "'>here</a> in order to get started.");
      apptContainer.append(messageh2);
    }
  
  });
  