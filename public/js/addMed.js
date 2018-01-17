$(document).ready(function () {
    
    var usageInput = $("#usage");
    var dosageInput = $("#dosage");
    var dailyFreqInput = $("#daily-freq");
    var titleInput = $("#name");
    var addMedForm = $("#addMed");
    var userSelect = $("#user");

 
    $(addMedForm).on("submit", handleFormSubmit);
    
    var url = window.location.search;
    var medId;
    var userId;
   
    var updating = false;

   
    if (url.indexOf("?med_id=") !== -1) {
        medId = url.split("=")[1];
        getMedData(medId, "med");
    }
    else if (url.indexOf("?user_id=") !== -1) {
        userId = url.split("=")[1];
    }

   
    getUsers();

   
    function handleFormSubmit(event) {
        event.preventDefault();
        
        if (!titleInput.val().trim() || !usageInput.val().trim() || !dailyFreqInput.val().trim() || !dosageInput.val().trim() || !userSelect.val()) {
            return;
        }
        var newMed = {
            name: titleInput
                .val()
                .trim(),
            usage: usageInput
                .val()
                .trim(),
            dosage: dosageInput
                .val()
                .trim(),
            dailyfreq: dailyFreqInput
                .val()
                .trim(),
            UserId: userSelect.val()
        };

        
        if (updating) {
            newMed.id = medId;
            updateMed(newMed);
        } else {
            submitMed(newMed);
        }
    }

   
    function submitMed(med) {
        $.post("/api/meds", med, function () {
            window.location.href = "/main";
        });
    }

    
    function getMedData(id, type) {
        var queryUrl;
        switch (type) {
            case "med":
                queryUrl = "/api/meds/" + id;
                break;
            case "user":
                queryUrl = "/api/user/" + id;
                break;
            default:
                return;
        }
        $.get(queryUrl, function (data) {
            if (data) {
                console.log(data.UserId || data.id)
                titleInput.val(data.name);
                usageInput.val(data.usage);
                dosageInput.val(data.dosage);
                dailyFreqInput.val(data.dailyfreq);
                UserId = data.UserId || data.id;
                updating = true;
            }
        });
    }

   
    function getUsers() {
        $.get("/api/users", renderUserList);
    }
    function renderUserList(data) {
        if (!data.length) {
            window.location.href = "/users";
        }
        $(".hidden").removeClass("hidden");
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createUserRow(data[i]));
        }
        userSelect.empty();
        console.log(rowsToAdd);
        console.log(userSelect);
        userSelect.append(rowsToAdd);
        userSelect.val(userId);
    }

    function createUserRow(user) {
        var listOption = $("<option>");
        listOption.attr("value", user.id);
        listOption.text(user.name);
        return listOption;
    }

    function updateMed(med) {
        $.ajax({
                method: "PUT",
                url: "/api/meds",
                data: med
            })
            .then(function () {
                window.location.href = "/main";
            });
    }
});