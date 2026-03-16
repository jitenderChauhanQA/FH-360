@regression @fraud-report @salesforce @csp360
@XRAY-TC-201 @XRAY-TS-CSP360
Feature: Fraud Report Management
  As a CSP Agent
  I want to create and manage fraud reports in Salesforce
  So that I can track fraudulent activity on customer accounts

  Background:
    Given the user is logged in as a CSP Agent
    And the user navigates to the "FH360 CSP" application
    And the user navigates to the "Fraud Reports" tab

  @smoke @create @XRAY-TC-201-01
  Scenario: Create a new fraud report with required fields
    When the user clicks the "New" button
    And the user fills in the fraud report form with the following details:
      | Fraud Type   | Card Fraud                              |
      | Description  | Unauthorized transaction on debit card  |
      | Amount       | 2500                                    |
    And the user saves the record
    Then a success toast message should be displayed
    And the fraud report should be created successfully

  @create @XRAY-TC-201-02
  Scenario Outline: Create fraud reports for different fraud types
    When the user clicks the "New" button
    And the user fills in the fraud report form with the following details:
      | Fraud Type   | <fraudType>    |
      | Description  | <description>  |
      | Amount       | <amount>       |
    And the user saves the record
    Then a success toast message should be displayed

    Examples:
      | fraudType       | description                        | amount |
      | Card Fraud      | Lost card used for purchase        | 1500   |
      | Identity Theft  | Unauthorized account opened        | 5000   |
      | Wire Fraud      | Fraudulent wire transfer initiated | 10000  |
      | Check Fraud     | Forged check deposited             | 3000   |
      | ACH Fraud       | Unauthorized ACH debit             | 2000   |

  @edit @XRAY-TC-201-03
  Scenario: Update an existing fraud report
    Given a fraud report exists in the system
    When the user opens the fraud report
    And the user clicks the "Edit" button
    And the user updates the "Description" field to "Updated fraud description"
    And the user saves the record
    Then a success toast message should be displayed
