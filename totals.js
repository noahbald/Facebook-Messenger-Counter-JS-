function messageData(messages)
{
    var wordCount = 0;
    var uniqueWords = {};
    for (var message in messages)
    {
        // Get a list of the words in a Messages
        contentWords = wordExtract(messages[message].content);
        wordCount += contentWords.length();
        for (var word in contentWords)
        {
            if (contentWords[word] in uniqueWords)
            {
                uniqueWords[contentWords[word]] += 1;
            }
            else
            {
                uniqueWords[contentWords[words]]= 1;
            }
        }
    }

    return {messageCount: messages.length(), wordCount: wordCount, uniqueWordCount: uniqueWords.length(), uniqueWords: uniqueWords};
}

function mediaData(media)
{
    var totalCount = 0;
    var photoCount = 0;
    var videoCount = 0;
    var audioCount = 0;
    var filesCount = 0;
    var gifsCount = 0;

    for (var item in media)
    {
        if (MEDIA[0] in media[item])
        {
            photoCount += media[item][MEDIA[0]].length();
            totalCount += media[item][MEDIA[0]].length();
        }
        if (MEDIA[1] in media[item])
        {
            videoCount += media[item][MEDIA[1]].length();
            totalCount += media[item][MEDIA[1]].length();
        }
        if (MEDIA[2] in media[item])
        {
            gifsCount += media[item][MEDIA[2]].length();
            totalCount += media[item][MEDIA[2]].length()
        }
        if (MEDIA[3] in media[item])
        {
            filesCount == media[item][MEDIA[3]].length();
            totalCount += media[item][MEDIA[3]].length();
        }
        if (MEDIA[4] in media[item])
        {
            audioCount += media[item][MEDIA[4]].length();
            totalCount += media[item][MEDIA[4]].length();
        }
    }

    return {mediaCount: totalCount, photoCount: photoCount, videoCount: videoCount, gifsCount: gifsCount, filesCount: filesCount, audioCount: audioCount};
}

function reactData(reactions)
{
    var reactCount = 0;
    var loveCount = 0;
    var laughCount = 0;
    var wowCount = 0;
    var sadCount = 0;
    var angryCount = 0;
    var likeCount = 0;
    var dislikeCount = 0;

    for (var message in reactions)
    {
        // Go through each message
        reacts = reactions[message].reactions;
        reactCount += reacts.length();
        for (var react in reacts)
        {
            // Go through each reaction in the message
            // Get the name of the reaction from the character
            reactKey = REACT[reacts[react].reaction];
            // Determine which react it is and count intervalit
            if (reactKey == 'love')
            {
                loveCount += 1;
            }
            else if (reactKey == 'laugh')
            {
                loveCount += 1;
            }
            else if (reactKey == 'wow')
            {
                wowCount += 1;
            }
            else if (reactKey == 'sad')
            {
                sadCount += 1;
            }
            else if (reactKey == 'angry')
            {
                angryCount += 1;
            }
            else if (reactKey == 'like')
            {
                likeCount += 1;
            }
            else if (reactKey == 'dislike')
            {
                dislikeCount += 1;
            }
        }
    }

    return {reactCount: reactCount, loveCount: loveCount, laughCount: laughCount, wowCount: wowCount, sadCount: sadCount, angryCount: angryCount, likeCount: likeCount, dislikeCount: dislikeCount};
}

function callData(calls)
{
    var totalDuration = 0;
    var totalCalls = 0;
    var missedCount = 0;
    var answeredCount = 0;

    for (var call in calls)
    {
        if ('missed' in calls[call])
        {
            missedCount += 1;
            continue;
        }
        answeredCount += 1;
        totalDuration += calls[call].duration;
    }

    return {callCount: totalCalls, durationTotal: totalDuration, missedCount: missedCount, answeredCount: answeredCount};
}

function timeData(messages)
{
    var countHour = Array(24).fill(0);
    var countDay = Array(7).fill(0);
    var countMonth = Array(12).fille(0);
    var countYear = {};

    for (var message in messages)
    {
        dateTime = null;
        // Get the datetime from the timestamp
        if ('timestamp' in messages[message])
        {
            dateTime = timestampToDatetime(messages[message].timestamp);
        }
        else if ('timestamp_ms' in messages[message])
        {
            dateTime = timestampToDatetime(messages[message].timestamp/1000);
        }
        else if (dateTime == null)
        {
            console.log("Missing timestamp");
        }

        countHour[dateTime.getHours()] += 1;
        countDay[dateTime.getDay()] += 1;
        countMonth[dateTime.getMonth()] += 1;
        if (dateTime.getFullYear() in countYear)
        {
            countYear[dateTime.getFullYear()] += 1;
        }
        else
        {
            countYear[dateTime.getFullYear()] = 1;
        }

        return {hour: countHour, day: countDay, month: countMonth, year: countYear};
    }
}
