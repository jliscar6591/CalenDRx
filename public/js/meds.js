$(document).ready(function() {
    /* global moment */
  
    // blogContainer holds all of our posts
    var medContainer = $(".med-container");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handleMedDelete);
    $(document).on("click", "button.edit", handleMedEdit);
    // Variable to hold our posts
    var meds;
  
    // The code below handles the case where we want to get blog posts for a specific author
    // Looks for a query param in the url for author_id
    var url = window.location.search;
    var userId;
    if (url.indexOf("?user_id=") !== -1) {
      userId = url.split("=")[1];
      getMeds(userId);
    }
    // If there's no authorId we just get all posts as usual
    else {
      getMeds();
    }
  
  
    // This function grabs posts from the database and updates the view
    function getMeds(user) {
      userId = user || "";
      if (userId) {
        userId = "/?user_id=" + userId;
      }
      $.get("/api/meds" + userId, function(data) {
        console.log("Meds", data);
        meds = data;
        if (!meds || !meds.length) {
          displayEmpty(user);
        }
        else {
          initializeRows();
        }
      });
    }
  
    // This function does an API call to delete posts
    function deleteMed(id, user) {
      $.ajax({
        method: "DELETE",
        url: "/api/meds/" + id
      })
      .then(function() {
        getMeds(user);
      });
    }
  
    // InitializeRows handles appending all of our constructed post HTML inside blogContainer
    function initializeRows() {
      medContainer.empty();
      var medsToAdd = [];
      for (var i = 0; i < meds.length; i++) {
        medsToAdd.push(createNewRow(meds[i]));
      }
      medContainer.append(medsToAdd);
    }
  
    // This function constructs a post's HTML
    function createNewRow(med) {
      var formattedDate = new Date(med.createdAt);
      formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
      var newMedPanel = $("<div>");
      newMedPanel.addClass("panel panel-default");
      var newMedPanelHeading = $("<div>");
      newMedPanelHeading.addClass("panel-heading");
      var deleteBtn = $("<button>");
      deleteBtn.text("x");
      deleteBtn.addClass("delete btn btn-danger");
      var editBtn = $("<button>");
      editBtn.text("EDIT");
      editBtn.addClass("edit btn btn-info");
      var newMedName = $("<h2>");
      var newMedDate = $("<small>");
      var newMedUser = $("<h5>");
      newMedUser.text("Added by: " + med.User.name);
      newMedUser.css({
        float: "right",
        color: "blue",
        "margin-top":
        "-10px"
      });
      var newMedPanelBody = $("<div>");
      newMedPanelBody.addClass("panel-body");
      var newMedUsage = $("<p>");
      var newMedDosage = $("<p>");
      var newMedDailyFreq = $("<p>");
      newMedName.text(med.name + " ");
      newMedUsage.text("Used for: " + med.usage);
      newMedDosage.text("Dosage: " + med.dosage);
      newMedDailyFreq.text("Taken: " + med.dailyfreq + " times a day.");
      newMedDate.text(formattedDate);
      newMedName.append(newMedDate);
      newMedPanelHeading.append(deleteBtn);
      newMedPanelHeading.append(editBtn);
      newMedPanelHeading.append(newMedName);
      newMedPanelHeading.append(newMedUser);
      newMedPanelBody.append(newMedUsage, newMedDosage, newMedDailyFreq);
      newMedPanel.append(newMedPanelHeading);
      newMedPanel.append(newMedPanelBody);
      newMedPanel.data("med", med);
      return newMedPanel;
    }
  
    // This function figures out which post we want to delete and then calls deletePost
    function handleMedDelete() {
      var currentMed = $(this)
        .parent()
        .parent()
        .data("med");
      deleteMed(currentMed.id, currentMed.UserId);
      window.location.href = "/meds?user_id=" + currentUser.id; 
    }
  
    // This function figures out which post we want to edit and takes it to the appropriate url
    function handleMedEdit() {
      var currentMed = $(this)
        .parent()
        .parent()
        .data("med");
      window.location.href = "/addMed?med_id=" + currentMed.id;
    }
  
    // This function displays a messgae when there are no posts
    function displayEmpty(id) {
      var query = window.location.search;
      var partial = "";
      if (id) {
        partial = " for User #" + id;
      }
      medContainer.empty();
      var messageh2 = $("<h2>");
      messageh2.css({ "text-align": "center", "margin-top": "50px" });
      messageh2.html("No meds yet" + partial + ", navigate <a href='/addMed" + query +
      "'>here</a> in order to get started.");
      medssContainer.append(messageh2);
    }
  
  });
  