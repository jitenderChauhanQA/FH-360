@regression @treasury @salesforce @commercial
@XRAY-TC-301 @XRAY-TS-COMMERCIAL
Feature: Treasury Management
  As a Commercial Banker
  I want to manage treasury service requests in Salesforce
  So that I can process commercial banking product requests

  Background:
    Given the user is logged in as a Commercial Banker
    And the user navigates to the "FH360 Commercial" application
    And the user navigates to the "Treasury" tab

  @smoke @create @XRAY-TC-301-01
  Scenario: Create a new treasury service request
    When the user clicks the "New" button
    And the user fills in the treasury form with the following details:
      | Product Name  | Cash Management   |
      | Account       | First Horizon Partners |
      | Request Type  | New Setup         |
    And the user saves the record
    Then a success toast message should be displayed
    And the treasury request should be created successfully

  @create @XRAY-TC-301-02
  Scenario Outline: Create treasury requests for different products
    When the user clicks the "New" button
    And the user fills in the treasury form with the following details:
      | Product Name  | <product>     |
      | Request Type  | <requestType> |
    And the user saves the record
    Then a success toast message should be displayed

    Examples:
      | product              | requestType     |
      | Cash Management      | New Setup       |
      | Wire Transfer        | Modification    |
      | ACH Processing       | New Setup       |
      | Remote Deposit       | New Setup       |
      | Lockbox Services     | Modification    |

  @edit @XRAY-TC-301-03
  Scenario: Update an existing treasury request
    Given a treasury request exists for "Cash Management"
    When the user opens the treasury request for "Cash Management"
    And the user clicks the "Edit" button
    And the user updates the "Request Type" field to "Modification"
    And the user saves the record
    Then a success toast message should be displayed
