@regression @opportunity @salesforce @retail
@XRAY-TC-102 @XRAY-TS-RETAIL
Feature: Opportunity Management
  As a Retail Banker
  I want to manage opportunities in Salesforce
  So that I can track deals through the sales pipeline

  Background:
    Given the user is logged in as a Retail Banker
    And the user navigates to the "FH360 Retail" application
    And the user navigates to the "Opportunities" tab

  @smoke @create @XRAY-TC-102-01
  Scenario: Create a new opportunity
    When the user clicks the "New" button
    And the user fills in the opportunity form with the following details:
      | Opportunity Name | New Checking Account       |
      | Close Date       | 12/31/2026                 |
      | Stage            | Prospecting                |
      | Amount           | 50000                      |
    And the user saves the record
    Then a success toast message should be displayed
    And the opportunity "New Checking Account" should be visible on the record page

  @stage-update @XRAY-TC-102-02
  Scenario Outline: Update opportunity stage through pipeline
    Given an opportunity "<opportunityName>" exists at stage "<currentStage>"
    When the user opens the opportunity "<opportunityName>"
    And the user updates the stage to "<newStage>"
    Then the opportunity stage should be "<newStage>"

    Examples:
      | opportunityName      | currentStage | newStage           |
      | New Checking Account | Prospecting  | Qualification      |
      | New Checking Account | Qualification| Needs Analysis     |
      | New Checking Account | Needs Analysis| Closed Won        |

  @search @XRAY-TC-102-03
  Scenario: Search for an opportunity in list view
    When the user searches for "New Checking Account" in the list view
    Then the opportunity "New Checking Account" should appear in the results
