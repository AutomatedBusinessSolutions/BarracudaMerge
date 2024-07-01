// Function to merge and clean the lists
function mergeLists(list1, list2) {
    // Split the lists into arrays of lines
    let list1Lines = list1.split('\n').slice(1); // Exclude the header line
    let list2Lines = list2.split('\n').slice(1); // Exclude the header line

    // Merge the lists
    let mergedList = [...list1Lines, ...list2Lines];

    // Create an object to store unique entries
    let uniqueEntries = {};

    // Populate the uniqueEntries object while handling duplicate beginnings
    mergedList.forEach(line => {
        const [email, policy, comment] = line.split(',');
        const cleanedEmail = email.startsWith('*@') ? email.slice(2) : email.trim(); // Remove leading *@
        if (!uniqueEntries[cleanedEmail] || comment) {
            uniqueEntries[cleanedEmail] = [cleanedEmail, policy.trim(), comment.trim()];
        }
    });

    // Convert the object values back to an array
    let uniqueLines = Object.values(uniqueEntries);

    // Sort the array alphabetically
    uniqueLines.sort();

    // Add the header line back
    uniqueLines.unshift("Email Address,Policy (block, exempt, quarantine),Comment (optional)");

    // Convert the array back to a string
    let mergedString = uniqueLines.join('\n');

    console.log(mergedString);

    document.getElementById('output').value = mergedString;

    return mergedString;
    
}

