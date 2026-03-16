@regression @service-request @salesforce @csp360
@XRAY-TC-202 @XRAY-TS-CSP360
Feature: Service Request Management
  As a CSP Agent
  I want to create and manage service requests in Salesforce
  So that I can track customer service issues through resolution

  Background:
    Given the user is logged in as a CSP Agent
    And the user navigates to the "FH360 CSP" application
    And the user navigates to the "Service Requests" tab

  @smoke @create @XRAY-TC-202-01
  Scenario: Create a new service request
    When the user clicks the "New" button
    And the user fills in the service request form with the following details:
      | Subject     | Address Update Request         |
      | Description | Customer requests address change|
      | Priority    | Medium                         |
      | Category    | Account Maintenance            |
    And the user saves the record
    Then a success toast message should be displayed
    And the service request should be created successfully

  @create @XRAY-TC-202-02
  Scenario Outline: Create service requests with different priorities
    When the user clicks the "New" button
    And the user fills in the service request form with the following details:
      | Subject     | <subject>     |
      | Priority    | <priority>    |
      | Category    | <category>    |
    And the user saves the record
    Then a success toast message should be displayed

    Examples:
      | subject                  | priority | category              |
      | Card Replacement         | High     | Card Services         |
      | Statement Request        | Low      | Account Maintenance   |
      | Dispute Transaction      | High     | Disputes              |
      | Update Phone Number      | Medium   | Account Maintenance   |

  @status @XRAY-TC-202-03
  Scenario: Verify service request status after creation
    When the user clicks the "New" button
    And the user fills in the service request form with the following details:
      | Subject     | Status Check Test   |
      | Priority    | Medium              |
    And the user saves the record
    Then a success toast message should be displayed
    And the service request status should be "New"
