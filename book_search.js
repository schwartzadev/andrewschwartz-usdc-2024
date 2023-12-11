/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * futher hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text
 *   from a list of books. Each book has keys for Title, ISBN, and Content.
 *   Content is an array of lines with keys Page, Line, and Text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
  // For each book, we need to search the content for the search term.
  // If we find it, we'll add the book's ISBN, page, and line to the result object.

  // Placeholder object to be returned.
  var result = {
    SearchTerm: searchTerm,
    Results: [],
  };

  /**
   * Searches for matches in a single book.
   * @param {JSON} book - A JSON book to be searched.
   * @returns {JSON} - Matches in this book.
   */
  function findSearchTermInBook(book) {
    var bookResult = [];
    var bookContent = book.Content;

    // This iterates over each line in the book.
    for (var i = 0; i < bookContent.length; i++) {
      var line = bookContent[i];

      if (line.Text.includes(searchTerm)) {
        bookResult.push({
          ISBN: book.ISBN,
          Page: line.Page,
          Line: line.Line,
        });
      }
    }

    return bookResult;
  }

  for (var i = 0; i < scannedTextObj.length; i++) {
    var book = scannedTextObj[i];
    var bookResults = findSearchTermInBook(book);
    result.Results = result.Results.concat(bookResults);
  }

  return result;
}

/** Example input object. */
const twentyLeaguesIn = [
  {
    Title: "Twenty Thousand Leagues Under the Sea",
    ISBN: "9780000528531",
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: "now simply went on by her own momentum.  The dark-",
      },
      {
        Page: 31,
        Line: 9,
        Text: "ness was then profound; and however good the Canadian's",
      },
      {
        Page: 31,
        Line: 10,
        Text: "eyes were, I asked myself how he had managed to see, and",
      },
    ],
  },
];

/** Example output object */
const twentyLeaguesOut = {
  SearchTerm: "the",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 9,
    },
  ],
};

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that
 * output to the console. We've provided two tests as examples, and
 * they should pass with a correct implementation of `findSearchTermInBooks`.
 *
 * Please add your unit tests below.
 * */

/**
 * A helper function for running tests.
//  TODO: refactor this so the arguments are {methodArguments}, expectedOutput, testName
 * @param {string} searchTerm - The testing term to pass to findSearchTermInBooks.
 * @param {JSON} scannedTextObj - The testing scanned text object to pass to findSearchTermInBooks.
 * @param {JSON} expectedOutput - The expected output from findSearchTermInBooks.
 * @param {string} testName - A name for the test for logging.
 */
function unitTestFindSearchTermInBooks(
  searchTerm,
  scannedTextObj,
  expectedOutput,
  testName,
) {
  const actualOutput = findSearchTermInBooks(searchTerm, scannedTextObj);
  if (JSON.stringify(expectedOutput) === JSON.stringify(actualOutput)) {
    console.log("PASS:", testName);
  } else {
    console.log("FAIL:", testName);
    console.log("Expected:", expectedOutput);
    console.log("Received:", actualOutput);
  }
}

/** We can check that, given a known input, we get a known output. */
unitTestFindSearchTermInBooks(
  "the",
  twentyLeaguesIn,
  twentyLeaguesOut,
  "Pre-made Test 1.",
);

/** Check that a list with no books returns no results. */
unitTestFindSearchTermInBooks(
  "the",
  [],
  {
    SearchTerm: "the",
    Results: [],
  },
  "Empty input returns empty output.",
);

/** Test with one book and no content. */
unitTestFindSearchTermInBooks(
  "search",
  [
    {
      Title: "On Painting",
      ISBN: "9780140433319",
      Content: [],
    },
  ],
  {
    SearchTerm: "search",
    Results: [],
  },
  "A query on a list with one book and no content returns empty output.",
);

/** Don't match case insensitively. */
unitTestFindSearchTermInBooks(
  "queried",
  [
    {
      Title: "On Painting",
      ISBN: "9780140433319",
      Content: [
        {
          Page: 1,
          Line: 1,
          Text: "the Queried string lives here",
        },
      ],
    },
  ],
  {
    SearchTerm: "queried",
    Results: [],
  },
  "A query for a matching term with the wrong case returns no results.",
);

/** Returns multiple matches in the same book. */
unitTestFindSearchTermInBooks(
  "match",
  [
    {
      Title: "On Painting",
      ISBN: "9780140433319",
      Content: [
        {
          Page: 1,
          Line: 1,
          Text: "the match",
        },
        {
          Page: 2,
          Line: 12,
          Text: "another match",
        },
        {
          Page: 2,
          Line: 12,
          Text: "misc line that should not return",
        },
      ],
    },
  ],
  {
    SearchTerm: "match",
    Results: [
      {
        ISBN: "9780140433319",
        Page: 1,
        Line: 1,
      },
      {
        ISBN: "9780140433319",
        Page: 2,
        Line: 12,
      },
    ],
  },
  "A query that has multiple matches in the same book returns multiple results.",
);

/** Returns multiple matches in different books. */
unitTestFindSearchTermInBooks(
  "match",
  [
    {
      Title: "On Painting",
      ISBN: "9780140433319",
      Content: [
        {
          Page: 1,
          Line: 18,
          Text: "the match",
        },
        {
          Page: 2,
          Line: 12,
          Text: "misc line that should not return",
        },
      ],
    },
    {
      Title: "Rental Person Who Does Nothing: A Memoir",
      ISBN: "9781335017536",
      Content: [
        {
          Page: 3,
          Line: 8,
          Text: "this is not a hit",
        },
        {
          Page: 23,
          Line: 4,
          Text: "this line matches",
        },
      ],
    },
  ],
  {
    SearchTerm: "match",
    Results: [
      {
        ISBN: "9780140433319",
        Page: 1,
        Line: 18,
      },
      {
        ISBN: "9781335017536",
        Page: 23,
        Line: 4,
      },
    ],
  },
  "A query that has multiple matches in different books returns multiple results.",
);

// TODO: how to handle a search for "dark-ness" given the input text?

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
  console.log("PASS: Returns only one result.");
} else {
  console.log("FAIL: Returns only one result.");
  console.log("Expected:", twentyLeaguesOut.Results.length);
  console.log("Received:", test2result.Results.length);
}
