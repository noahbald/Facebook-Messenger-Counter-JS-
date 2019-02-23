// Global data variable
var data, message_types, people_data;

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
    console.log("loaded file ", f.name)
    var fileReader = new FileReader();
    fileReader.readAsText(f);
    // Revert page appearance
    dragLeaveHandler(null);
    try {
        // parse JSON file to obj
        data = JSON.parse(fileReader.result);
    } catch (e) {
        // do something
        console.log("invalid JSON file")
        return;
    }
    // process data
}
