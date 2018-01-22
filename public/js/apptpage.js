$(document).ready(function() {
    /* global moment */
  
    // blogContainer holds all of our posts
    var apptContainer = $(".appt-container");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handleApptDelete);
    $(document).on("click", "button.edit", handleApptEdit);
    // Variable to hold our posts
    var appts;
  
    // The code below handles the case where we want to get blog posts for a specific author
    // Looks for a query param in the url for author_id
    var url = window.location.search;
    var userId;
    if (url.indexOf("?user_id=") !== -1) {
      userId = url.split("=")[1];
      getAppts(userId);
    }
    // If there's no authorId we just get all posts as usual
    else {
      getAppts();
    }
  
  
    // This function grabs posts from the database and updates the view
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
  
    // This function does an API call to delete posts
    function deleteAppt(id) {
      $.ajax({
        method: "DELETE",
        url: "/api/appts/" + id
      })
      .then(function() {
        getAppts();
      });
    }
  
    // InitializeRows handles appending all of our constructed post HTML inside blogContainer
    function initializeApptRows() {
      apptContainer.empty();
      var apptsToAdd = [];
      for (var i = 0; i < appts.length; i++) {
        apptsToAdd.push(createNewApptRow(appts[i]));
      }
      apptContainer.append(apptsToAdd);
    }
  
    // This function constructs a post's HTML
    function createNewApptRow(appts) {
      var formattedApptDate = new Date(appts.createdAt);
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
      newApptUser.text("Added by: " + appts.User.name);
      newApptUser.css({
        float: "right",
        color: "blue",
        "margin-top":
        "-10px"
      });
      var newApptPanelBody = $("<div>");
      newApptPanelBody.addClass("panel-body");
      var newApptTime = $("<p>");
      var newApptType = $("<p>");
      // newName.text(med.name + " ");
      // newMedUsage.text("Used for: " + med.usage);
      // newMedDosage.text("Dosage: " + med.dosage);
      // newMedDailyFreq.text("Taken: " + med.dailyfreq + " times a day.");
      newApptDate.text(formattedApptDate);
      newApptName.append(newApptDate);
      newApptPanelHeading.append(deleteApptBtn);
      newApptPanelHeading.append(editApptBtn);
      newApptPanelHeading.append(newApptName);
      newApptPanelHeading.append(newApptUser);
      newApptPanelBody.append(newApptTime, newApptType);
      newApptPanel.append(newApptPanelHeading);
      newApptPanel.append(newApptPanelBody);
      newApptPanel.data("appts", appts);
      return newApptPanel;
    }
  
    // This function figures out which post we want to delete and then calls deletePost
    function handleApptDelete() {
      var currentAppt = $(this)
        .parent()
        .parent()
        .data("appts");
      deleteAppt(currentAppt.id);
      window.location.href = "/appts?user_id=" + currentAppt.id;

    }
  
    // This function figures out which post we want to edit and takes it to the appropriate url
    function handleApptEdit() {
      var currentAppt = $(this)
        .parent()
        .parent()
        .data("appts");
      window.location.href = "/addAppt?appt_id=" + currentAppt.id;
    }
  
    // This function displays a messgae when there are no posts
    function displayEmpty(id) {
      var query = window.location.search;
      var partial = "";
      if (id) {
        partial = " for User #" + id;
      }
      apptContainer.empty();
      var messageh2 = $("<h2>");
      messageh2.css({ "text-align": "center", "margin-top": "50px" });
      messageh2.html("No apppointments yet" + partial + ", navigate <a href='/addAppt" + query +
      "'>here</a> in order to get started.");
      apptContainer.append(messageh2);
    }
  
  });
  