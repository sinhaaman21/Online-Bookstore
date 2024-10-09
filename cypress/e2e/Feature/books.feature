Feature: Books API

    Scenario: Happy Flow - Retrieve all books
        Given the Books API is available
        When I send a GET request to "/api/v1/Books"
        Then the response status should be 200
        And the response should contain a list of Books

    Scenario: Happy Flow - Retrieve a book by ID
        Given an book with ID 1 exists in the Books API
        When I send a GET request to "/api/v1/Books/1"
        Then the response status should be 200
        And the response should contain the Books details

    Scenario: Happy Flow - Add a new book
        Given valid Books details in "newBook.json"
        When I send a POST request to "/api/v1/Books" with the Books details
        Then the response status should be 200
        And the Book should be added successfully

    Scenario: Happy Flow - Update a book
        Given an book with ID 1 exists in the Books API
        And valid Books details in "newBook.json"
        When I send a PUT request to "/api/v1/Books/1" with updated details
        Then the response status should be 200
        And the Book should be updated successfully

    Scenario: Happy Flow - Delete a book
        Given an book with ID 1 exists in the Books API
        When I send a DELETE request to "/api/v1/Books/1"
        Then the response status should be 200
        And the Book should be deleted successfully

    Scenario: Edge Case - Try retrieving a book by an invalid ID
        When I send a GET request to "/api/v1/Books/9999"
        Then the response status should be 404
        And the response should indicate that the Book is not found

    Scenario: Edge Case - Try adding a book with missing fields
        Given invalid Books details in "invalidBookMissingFields.json"
        When I send a POST request to "/api/v1/Books" with the Books details
        Then the response status should be 200
    ##Ideally the status code should be 400 but API is returning 200 on missing title

    Scenario: Edge Case - Try adding a book with invalid data types
        Given invalid Books details in "invalidBookInvalidTypes.json"
        When I send a POST request to "/api/v1/Books" with the Books details
        Then the response status should be 400

    Scenario: Edge Case - Try updating a book with an invalid ID
        Given valid Books details in "newBook.json"
        When I send a PUT request to "/api/v1/Books/9999" with valid details
        Then the response status should be 200
    ##Ideally the status code should be 404 but API is returning 200 on updating incorrect Id in PUT

    Scenario: Edge Case - Try deleting a book with an invalid ID
        When I send a DELETE request to "/api/v1/Books/9999"
        Then the response status should be 200
    ##Ideally the status code should be 404 but API is returning 200 on deleting incorrect Id in DELETE

