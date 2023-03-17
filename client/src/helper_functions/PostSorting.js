//Simple sorting function for the search page. Includes all of the sorting methods that are available to the user.

export default function cohesiveSort(sortingMethod, posts)
{
    var splitResult = sortingMethod.split("-")
    var sortedArray = posts.sort((a,b) => (a[splitResult[0]] > b[splitResult[0]]) ? 1 : -1)
    if(splitResult[1]==="ascend")
    {
        return sortedArray
    }
    else
    {
        return sortedArray.reverse()
    }
}