@regression @lead-management @salesforce @retail
@XRAY-TC-101 @XRAY-TS-RETAIL
Feature: Lead Management
  As a Retail Banker
  I want to manage leads in Salesforce
  So that I can track potential customers through the sales pipeline

  Background:
    Given the user is logged in as a Retail Banker
    And the user navigates to the "FH360 Retail" application
    And the user navigates to the "Leads" tab

  @smoke @create @XRAY-TC-101-01
  Scenario: Create a new lead with required fields
    When the user clicks the "New" button
    And the user fills in the lead form with the following details:
      | First Name  | John              |
      | Last Name   | Smith             |
      | Company     | Acme Corporation  |
      | Email       | jsmith@acme.com   |
      | Phone       | 555-0100          |
    And the user saves the record
    Then a success toast message should be displayed
    And the lead "Smith" should be visible on the record page

  @smoke @create @XRAY-TC-101-02
  Scenario Outline: Create leads with different sources
    When the user clicks the "New" button
    And the user fills in the lead form with the following details:
      | Last Name   | <lastName>   |
      | Company     | <company>    |
      | Lead Source | <leadSource> |
      | Status      | <status>     |
    And the user saves the record
    Then a success toast message should be displayed

    Examples:
      | lastName  | company          | leadSource     | status        |
      | Johnson   | Tech Corp        | Web            | Open          |
      | Williams  | Finance LLC      | Phone Inquiry  | Working       |
      | Brown     | Retail Solutions | Partner        | Contacted     |

  @edit @XRAY-TC-101-03
  Scenario: Edit an existing lead
    Given a lead "Smith" exists in the system
    When the user opens the lead record for "Smith"
    And the user clicks the "Edit" button
    And the user updates the "Phone" field to "555-0200"
    And the user saves the record
    Then a success toast message should be displayed

  @convert @XRAY-TC-101-04
  Scenario: Convert a qualified lead
    Given a lead "Smith" exists with status "Qualified"
    When the user opens the lead record for "Smith"
    And the user clicks the "Convert" button
    Then the lead should be converted successfully
    And an Account record should be created
    And a Contact record should be created
