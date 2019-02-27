var MEDIA = ["photos", "videos", "gifs", "files", "audio_files"];
var REACTS = {"\u00f0\u009f\u0098\u008d": "love", "\u00f0\u009f\u0098\u0086": "laugh",
          "\u00f0\u009f\u0098\u00ae": "wow", "\u00f0\u009f\u0098\u00a2": "sad",
          "\u00f0\u009f\u0098\u00a0": "angry", "\u00f0\u009f\u0091\u008d": "like",
          "\u00f0\u009f\u0091\u008e": "dislike"};

function messageDistribution(data)
{
    // Distribute messages into categories
    var media_type = null;
    var media = [];
    var messages = [];
    var stickers = [];
    var nickname = [];
    var group_info = [];
    var reactions = [];
    var calls = [];
    var plans = [];
    var shares = [];

    // Go through each message and place it in it's respective categories
    for (var i=0; i<data.messages.length; i++)
    {
        var message = data.messages[i];
        var flag = false;
        if ('reactions' in message)
        {
            // If the message has reactions, categorise it as so
            reactions.push(message);
        }
        for (var media_type in MEDIA)
        {
            if (MEDIA[media_type] in message)
            {
                // If the message was found to be a media, categorise it as so
                media.push(message);
                flag = true;
                break;
            }
        }
        if (flag)
        {
            // If the message was media, move to the next message
            continue;
        }
        if ('content' in message)
        {
            var content = message.content;
            // Vulnerable to miscategorisation
            if (content.includes(" set the nickname for ") || content.includes(" set your nickname to "))
            {
                // If the message was a nickname change, categorise it as so
                nickname.push(message);
                continue;
            }
            else if (content.includes(" changed the group photo.") || content.includes(" removed the group photo.")
                    || content.includes(" removed the group name.") || content.includes(" named the group "))
            {
                // If the message was a group info change, categorise it as so
                group_info.push(message);
                continue;
            }
        }
        if ('sticker' in message)
        {
            // If the message was a sticker, categorise it as so
            stickers.push(message);
            continue;
        }
        else if (message.type == 'Generic' && 'content' in message)
        {
            // If the message was a text message, categorise it as so
            messages.push(message);
        }
        else if (message.type == "Call")
        {
            // If the message was a call, categorise it as so
            calls.push(message);
        }
        else if (message.type == "Plan")
        {
            // If the message was a plan, categorise it as so
            plans.push(message);
        }
        else if (message.type == "Share")
        {
            // If the message was a shared linke, categorise it as so
            shares.push(message);
        }
    }

    // Create a dictionary and return it
    return {messages: messages, media: media, stickers: stickers, nickname: nickname,
            group_info: group_info, reactions: reactions, calls: calls, plans: plans,
            shares: shares};
}

function separateUsers(data)
{
    // Separate the messages in the conversation to a dictionary of the people who sent them
    var users = {};

    for (var user in data.participants)
    {
        users[data.participants[user].name] = [];
    }
    for (var i in data.messages)
    {
        var message = data.messages[i];
        if (!(message.sender_name in users))
        {
            users[message.sender_name] = [message];
        }
        else
        {
            users[message.sender_name].push(message);
        }
    }
    return users;
}

function wordExtract(contents)
{
    // Separate words in a string into a list, removing any unnexessary characters
    var output = contents.toLowerCase();
    // Remove special characters
    for (var i=0; i<output.length; i++)
    {
        if (output.slice(i-2, i) === "\\u")
        {
            output = output.slice(0, i-2).concat(output.slice(i+22, output.length));
        }
    }
    // Remove non-valuable characters, ie digits and punctuation
    output = output.replace(/[.,\/#@!$%\^&*"';:{}=\-_`~()0-9]/g,"");

    // Separate into words
    output = output.split(" ");

    // Remove empty strings
    output = output.filter(e => e !== "");

    return output;
}

function timestampToDatetime(timestamp)
{
    return new Date(timestamp);
}
