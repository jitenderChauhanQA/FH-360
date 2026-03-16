@regression @customer-auth @salesforce @csp360
@XRAY-TC-200 @XRAY-TS-CSP360
Feature: Customer Authentication
  As a CSP Agent
  I want to authenticate customers before accessing their accounts
  So that customer identity is verified for security compliance

  Background:
    Given the user is logged in as a CSP Agent
    And the user navigates to the "FH360 CSP" application

  @smoke @verify @XRAY-TC-200-01
  Scenario: Verify customer identity with valid credentials
    When the user searches for customer "John Smith"
    And the user verifies the customer identity with the following details:
      | SSN          | ***-**-1234  |
      | Date of Birth| 01/15/1985   |
    Then the customer should be verified successfully

  @verify @XRAY-TC-200-02
  Scenario Outline: Verify customers with different verification methods
    When the user searches for customer "<customerName>"
    And the user verifies the customer identity with the following details:
      | SSN          | <ssn>   |
      | Date of Birth| <dob>   |
    Then the customer should be verified successfully

    Examples:
      | customerName  | ssn          | dob        |
      | John Smith    | ***-**-1234  | 01/15/1985 |
      | Jane Williams | ***-**-5678  | 03/22/1990 |
      | Robert Brown  | ***-**-9012  | 07/04/1978 |

  @negative @XRAY-TC-200-03
  Scenario: Customer verification fails with invalid details
    When the user searches for customer "John Smith"
    And the user verifies the customer identity with the following details:
      | SSN          | ***-**-0000  |
      | Date of Birth| 01/01/2000   |
    Then the customer verification should fail
