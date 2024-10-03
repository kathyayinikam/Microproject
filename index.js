var token = "90934523|-31949226575072390|90962455";
var dbName = "stu-db";
var relation = "Stu-rel";
var endpoint_url_iml = "/api/iml";
var endpoint_url_irl = "/api/irl";
var base_url = "http://api.login2explore.com:5577";

function saveRecordAtLocalStorage(jsonObj)
{
    var record = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", record.rec_no);
}

function filldata(jsonObj)
{
    saveRecordAtLocalStorage(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    var name = record.Student_Full_Name;
    $("#stName").val(record.Student_Full_Name);
    $("#stClass").val(record.Student_Class);
    $("#stBirthDate").val(record.Student_Birth_Date);
    $("#stAddress").val(record.Student_Address);
    $("#stEnrollDate").val(record.Student_Enroll_Date);
    //alert(name);
    //alert(record);
}

function getStRollNoAsJsonObj()
{
    var roll_no = $("#stRollNo").val();

    var JsonObj =
            {
                "_Student_Roll_No": roll_no
            };
    return JSON.stringify(JsonObj);
}

function getSt()
{

    var stRollNoJsonObj = getStRollNoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(token, dbName, relation, stRollNoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getRequest, base_url, endpoint_url_irl);
    //alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 200)
    {
        $("#stRollNo").prop('disabled', true);
        $("#stChange").prop('disabled', false);
        $("#stReset").prop('disabled', false);

        // TO DISPLAY THE DATA
        filldata(resultObj);

        $("#stName").focus();
    } else
    {
        $("#stSave").prop('disabled', false);
        $("#stReset").prop('disabled', false);
    }

}

function resetForm()
{
    $("#stRollNo").val("");
    $("#stName").val("");
    $("#stClass").val("");
    $("#stBirthDate").val("");
    $("#stAddress").val("");
    $("#stEnrollDate").val("");
    $("#stRollNo").focus();

    $("#stRollNo").prop("disabled", false);
    $("#stSave").prop('disabled', true);
    $("#stChange").prop('disabled', true);
    $("#stReset").prop('disabled', true);

}

function validateData() {
    var stRollNo = $("#stRollNo").val();
    if (stRollNo === "") {
        alert("Roll No Required Value");
        $("# stRollNo").focus();
        return "";
    }
    var stName = $("#stName").val();
    if (stName === "") {
        alert("Name is Required Value");
        $("#stName").focus();
        return "";
    }
    var stClass = $("#stClass").val();
    if (stClass === "") {
        alert("Class is Required Value");
        $("#stClass").focus();
        return "";
    }
    var stBirthDate = $("#stBirthDate").val();
    if (stBirthDate === "") {
        alert("Birth Date is Required Value");
        $("#stBirthDate").focus();
        return "";
    }
    var stAddress = $("#stAddress").val();
    if (stAddress === "") {
        alert("Address is Required Value");
        $("#stAddress").focus();
        return "";
    }
    var stEnrollDate = $("#stEnrollDate").val();
    if (stEnrollDate === "") {
        alert("Enrollment Date is Required Value");
        $("#stEnrollDate").focus();
        return "";
    }

    var jsonStrObj = {
        _Student_Roll_No: stRollNo,
        Student_Full_Name: stName,
        Student_Class: stClass,
        Student_Birth_Date: stBirthDate,
        Student_Address: stAddress,
        Student_Enroll_Date: stEnrollDate,

    };
    return JSON.stringify(jsonStrObj);
}

function saveData()
{
    var JsonStrObj = validateData();
    if (JsonStrObj === "")
    {
        return "";
    }
    var putReqStr = createPUTRequest(token, JsonStrObj, dbName, relation);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr, base_url, endpoint_url_iml);
    if (resultObj.status === 200)
    {
        alert("Student enrolled successfully!")
    }
    jQuery.ajaxSetup({async: true});
    resetForm();
}

function changeData()
{
    $("#stChange").prop('disabled', true);
    var JsonStrObj = validateData();
    var updateRequest = createUPDATERecordRequest(token, JsonStrObj, dbName, relation, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(updateRequest, base_url, endpoint_url_iml);
    //alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    resetForm();
}