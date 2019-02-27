// Global data variable
var data, messageTypes, peopleData;

function dropHandler(e)
{
    // Prevent page redirect
    e.preventDefault();
    e.stopPropagation();

    // Load file and handle it
    let dt = e.dataTransfer
    let files = dt.files
    handleFile(files[0]);
    return false;
}

function dragOverHandler(e)
{
    // Prevent page redirect
    e.stopPropagation();
    e.preventDefault();
    // Alter page appearance
    var dropZone = document.getElementById('drop_zone');
    dropZone.classList.add('highlight');
}

function dragLeaveHandler(e)
{
    // Revert page appearance
    var dropZone = document.getElementById('drop_zone');
    dropZone.classList.remove('highlight');
}

function handleFile(f)
{
    // Read file
    console.log("loaded file", f.name)
    var fileReader = new FileReader();
    fileReader.onloadend = function(e)
    {
        handleData(fileReader);
    }
    fileReader.readAsText(f);
}

function handleData(fr)
{
    try {
        // parse JSON file to obj
        data = JSON.parse(fr.result);
        console.log("JSON parse successful");
    } catch (e) {
        // do something
        console.log("JSON parse failed")
        return;
    }
    // process data
    // Distribute message data
    messageTypes = messageDistribution(data);

    // Separate user data
    peopleData = separateUsers(data);

    console.log("Data processed");
}
