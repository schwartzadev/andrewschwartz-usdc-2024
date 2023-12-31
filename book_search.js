/**
 * SEARCHES FOR MATCHES IN SCANNED TEXT
 * This function takes a search term and a list of books, and returns a list of
 * matches. Each match is an object with the ISBN, page, and line number of the
 * match.
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm The word or term we're searching for.
 * @param {JSON} scannedTextObj A JSON object representing the scanned text
 *   from a list of books. Each book has keys for Title, ISBN, and Content.
 *   Content is an array of lines with keys Page, Line, and Text.
 * @returns {JSON} Search results.
 * */
function findSearchTermInBooks (searchTerm, scannedTextObj) {
  // For each book, we need to search the content for the search term.
  // If we find it, we'll add the book's ISBN, page, and line to the result object.

  // Placeholder object to be returned.
  const result = {
    SearchTerm: searchTerm,
    Results: []
  }

  /**
   * Searches for matches in a single book.
   * @param {JSON} book A JSON book to be searched.
   * @returns {JSON} Matches in this book.
   */
  function findSearchTermInBook (book) {
    const bookResult = []
    const bookContent = book.Content

    // This iterates over each line in the book.
    for (let i = 0; i < bookContent.length; i++) {
      const line = bookContent[i]

      if (line.Text.includes(searchTerm)) {
        bookResult.push({
          ISBN: book.ISBN,
          Page: line.Page,
          Line: line.Line
        })
      }
    }

    return bookResult
  }

  for (let i = 0; i < scannedTextObj.length; i++) {
    const book = scannedTextObj[i]
    const bookResults = findSearchTermInBook(book)
    result.Results = result.Results.concat(bookResults)
  }

  return result
}

/** Example input object. */
const twentyLeaguesIn = [
  {
    Title: 'Twenty Thousand Leagues Under the Sea',
    ISBN: '9780000528531',
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: 'now simply went on by her own momentum.  The dark-'
      },
      {
        Page: 31,
        Line: 9,
        Text: "ness was then profound; and however good the Canadian's"
      },
      {
        Page: 31,
        Line: 10,
        Text: 'eyes were, I asked myself how he had managed to see, and'
      }
    ]
  }
]

/** Example output object */
const twentyLeaguesOut = {
  SearchTerm: ' the ',
  Results: [
    {
      ISBN: '9780000528531',
      Page: 31,
      Line: 9
    }
  ]
}

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
 *
 * @param {string} searchTerm The testing term to pass to findSearchTermInBooks.
 * @param {JSON} scannedTextObj The testing scanned text object to pass to findSearchTermInBooks.
 * @param {JSON} expectedOutput The expected output from findSearchTermInBooks.
 * @param {string} testName A name for the test for logging.
 */
function testFindSearchTermInBooks (
  searchTerm,
  scannedTextObj,
  expectedOutput,
  testName
) {
  const actualOutput = findSearchTermInBooks(searchTerm, scannedTextObj)
  if (JSON.stringify(expectedOutput) === JSON.stringify(actualOutput)) {
    console.log('PASS:', testName)
  } else {
    console.log('FAIL:', testName)
    console.log('Expected:', expectedOutput)
    console.log('Received:', actualOutput)
  }
}

/** We can check that, given a known input, we get a known output. */
testFindSearchTermInBooks(
  ' the ',
  twentyLeaguesIn,
  twentyLeaguesOut,
  'Searching for a string with spaces returns the correct result.'
)

/** Check that a list with no books returns no results. */
testFindSearchTermInBooks(
  'query',
  [], // empty list
  {
    SearchTerm: 'query',
    Results: []
  },
  'Empty input returns empty output.'
)

/** Test with one book and no content. */
testFindSearchTermInBooks(
  'search',
  [
    {
      Title: 'On Painting',
      ISBN: '9780140433319',
      Content: []
    }
  ], // a list with one book and no content
  {
    SearchTerm: 'search',
    Results: []
  },
  'A query on a list with one book and no content returns empty output.'
)

/** Don't match case insensitively. */
testFindSearchTermInBooks(
  'queried',
  [
    {
      Title: 'On Painting',
      ISBN: '9780140433319',
      Content: [
        {
          Page: 1,
          Line: 1,
          Text: 'the capitalized Queried string lives here'
        }
      ]
    }
  ],
  {
    SearchTerm: 'queried',
    Results: []
  },
  'A query for a matching term with the wrong case returns no results.'
)

/** Returns multiple matches in the same book. */
testFindSearchTermInBooks(
  'match',
  [
    {
      Title: 'On Painting',
      ISBN: '9780140433319',
      Content: [
        {
          Page: 1,
          Line: 1,
          Text: 'the match'
        },
        {
          Page: 2,
          Line: 12,
          Text: 'another match'
        },
        {
          Page: 2,
          Line: 12,
          Text: 'misc line that should not return'
        }
      ]
    }
  ],
  {
    SearchTerm: 'match',
    Results: [
      {
        ISBN: '9780140433319',
        Page: 1,
        Line: 1
      },
      {
        ISBN: '9780140433319',
        Page: 2,
        Line: 12
      }
    ]
  },
  'A query that has multiple matches in the same book returns multiple results.'
)

/** A query for a string *not* in any book returns no results. */
testFindSearchTermInBooks(
  'missing string',
  [
    {
      Title: 'On Painting',
      ISBN: '9780140433319',
      Content: [
        {
          Page: 1,
          Line: 1,
          Text: 'the match'
        },
        {
          Page: 2,
          Line: 12,
          Text: 'another match'
        },
        {
          Page: 2,
          Line: 12,
          Text: 'misc line that should not return'
        }
      ]
    }
  ],
  {
    SearchTerm: 'missing string',
    Results: []
  },
  'A query for a string *not* in any book returns no results.'
)

/** Returns multiple matches in different books. */
testFindSearchTermInBooks(
  'match',
  [
    {
      Title: 'On Painting',
      ISBN: '9780140433319',
      Content: [
        {
          Page: 1,
          Line: 18,
          Text: 'the match'
        },
        {
          Page: 2,
          Line: 12,
          Text: 'misc line that should not return'
        }
      ]
    },
    {
      Title: 'Rental Person Who Does Nothing: A Memoir',
      ISBN: '9781335017536',
      Content: [
        {
          Page: 3,
          Line: 8,
          Text: 'this is not a hit'
        },
        {
          Page: 23,
          Line: 4,
          Text: 'this line matches'
        }
      ]
    }
  ],
  {
    SearchTerm: 'match',
    Results: [
      {
        ISBN: '9780140433319',
        Page: 1,
        Line: 18
      },
      {
        ISBN: '9781335017536',
        Page: 23,
        Line: 4
      }
    ]
  },
  'A query that has multiple matches in different books returns multiple results.'
)

// TODO: how to handle a search for "dark-ness" given the input text?
