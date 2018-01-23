$(document).ready(function() {
  
    
    var medContainer = $(".med-container");
    
    $(document).on("click", "button.delete", handleMedDelete);
    $(document).on("click", "button.edit", handleMedEdit);
   
    var meds;
  
    
    var url = window.location.search;
    var userId;
    if (url.indexOf("?user_id=") !== -1) {
      userId = url.split("=")[1];
      getMeds(userId);
    }
    
    else {
      getMeds();
    }
  
  
    
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
  
   
    function deleteMed(id, user) {
      $.ajax({
        method: "DELETE",
        url: "/api/meds/" + id
      })
      .then(function() {
        getMeds(user);
      });
    }
  
    
    function initializeRows() {
      medContainer.empty();
      var medsToAdd = [];
      for (var i = 0; i < meds.length; i++) {
        medsToAdd.push(createNewRow(meds[i]));
      }
      medContainer.append(medsToAdd);
    }
  
   
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
        partial = " for patient ";
      }
      medContainer.empty();
      var messageh2 = $("<h2>");
      messageh2.css({ "text-align": "center", "margin-top": "50px" });
      messageh2.html("No meds yet" + partial + ", navigate <a href='/addMed" + query +
      "'>here</a> in order to get started.");
      medContainer.append(messageh2);
    }
  
  });
  