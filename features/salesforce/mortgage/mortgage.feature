@regression @mortgage @salesforce
@XRAY-TC-400 @XRAY-TS-MORTGAGE
Feature: Mortgage Application Management
  As a Mortgage Officer
  I want to manage mortgage applications in Salesforce
  So that I can process home loan requests through the pipeline

  Background:
    Given the user is logged in as a Mortgage Officer
    And the user navigates to the "FH360 Mortgage" application
    And the user navigates to the "Mortgage Applications" tab

  @smoke @create @XRAY-TC-400-01
  Scenario: Create a new mortgage application
    When the user clicks the "New" button
    And the user fills in the mortgage form with the following details:
      | Applicant Name   | Robert Williams              |
      | Loan Amount      | 350000                       |
      | Property Address | 123 Main St, Memphis, TN     |
      | Loan Type        | Conventional                 |
      | Loan Purpose     | Purchase                     |
    And the user saves the record
    Then a success toast message should be displayed
    And the mortgage application should be created successfully

  @create @XRAY-TC-400-02
  Scenario Outline: Create mortgage applications for different loan types
    When the user clicks the "New" button
    And the user fills in the mortgage form with the following details:
      | Applicant Name   | <applicant>       |
      | Loan Amount      | <amount>          |
      | Loan Type        | <loanType>        |
      | Loan Purpose     | <purpose>         |
    And the user saves the record
    Then a success toast message should be displayed

    Examples:
      | applicant       | amount  | loanType     | purpose     |
      | Alice Johnson   | 250000  | Conventional | Purchase    |
      | Bob Martinez    | 400000  | FHA          | Purchase    |
      | Carol Davis     | 300000  | VA           | Purchase    |
      | David Wilson    | 200000  | Conventional | Refinance   |

  @edit @XRAY-TC-400-03
  Scenario: Update mortgage application loan amount
    Given a mortgage application exists for "Robert Williams"
    When the user opens the mortgage application for "Robert Williams"
    And the user clicks the "Edit" button
    And the user updates the "Loan Amount" field to "375000"
    And the user saves the record
    Then a success toast message should be displayed
