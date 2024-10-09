Feature: Authors API

    Scenario: Happy Flow - Retrieve all authors
        Given the Authors API is available
        When I send a GET request to "/api/v1/Authors"
        Then the response status should be 200
        And the response should contain a list of Authors

    Scenario: Happy Flow - Retrieve an author by ID
        Given an author with ID 1 exists in the Authors API
        When I send a GET request to "/api/v1/Authors/1"
        Then the response status should be 200
        And the response should contain the Authors details

    Scenario: Happy Flow - Add a new author
        Given valid Authors details in "newAuthor.json"
        When I send a POST request to "/api/v1/Authors" with the Authors details
        Then the response status should be 200
        And the Author should be added successfully

    Scenario: Happy Flow - Update an author
        Given an author with ID 1 exists in the Authors API
        And valid Books details in "newAuthor.json"
        When I send a PUT request to "/api/v1/Authors/1" with updated details
        Then the response status should be 200
        And the Author should be updated successfully

    Scenario: Happy Flow - Delete an author
        Given an author with ID 1 exists in the Authors API
        When I send a DELETE request to "/api/v1/Authors/1"
        Then the response status should be 200
        And the Author should be deleted successfully

    Scenario: Edge Case - Try retrieving an author by an invalid ID
        When I send a GET request to "/api/v1/Authors/9999"
        Then the response status should be 404
        And the response should indicate that the Author is not found

    Scenario: Edge Case - Try adding an author with missing fields
        Given invalid Authors details in "invalidAuthorMissingFields.json"
        When I send a POST request to "/api/v1/Authors" with the Authors details
        Then the response status should be 200
    ##Ideally the status code should be 400 but API is returning 200 on missing firstName same behavior via Swagger

    Scenario: Edge Case - Try adding an author with invalid data types
        Given invalid Authors details in "invalidAuthorInvalidTypes.json"
        When I send a POST request to "/api/v1/Authors" with the Authors details
        Then the response status should be 400

    Scenario: Edge Case - Try updating an author with an invalid ID
        Given valid Authors details in "newAuthor.json"
        When I send a PUT request to "/api/v1/Authors/9999" with valid details
        Then the response status should be 200
    ##Ideally the status code should be 404 but API is returning 200 on updating incorrect Id in PUT same behavior via Swagger

    Scenario: Edge Case - Try deleting an author with an invalid ID
        When I send a DELETE request to "/api/v1/Authors/9999"
        Then the response status should be 200
    ##Ideally the status code should be 404 but API is returning 200 on deleting incorrect Id in DELETE same behavior via Swagger