@demo @smoke @salesforce @lead-management
Feature: Lead Management — Live Demo
  As a QA Automation Engineer presenting the FH360 Framework
  I want to demonstrate end-to-end lead creation in Salesforce
  So that stakeholders can see the 7-layer architecture in action

  Background:
    Given the user is logged into Salesforce
    And the user navigates to the "Sales" application
    And the user navigates to the "Leads" tab

  @create @demo-primary
  Scenario: Create a new lead — Full Architecture Flow
    When the user clicks the "New" button
    And the user fills in the lead form with the following details:
      | First Name  | Demo                       |
      | Last Name   | Automation-Lead            |
      | Company     | FH360 Framework Demo Corp  |
      | Email       | demo@fh360-framework.com   |
      | Phone       | 555-0100                   |
      | Title       | QA Automation Engineer     |
    And the user saves the record
    Then a success toast message should be displayed
    And the lead "Automation-Lead" should be visible on the record page

  @navigate @demo-secondary
  Scenario: Navigate to Leads and verify list view
    Then the Leads list view should be displayed
    And the list view should contain lead records

  @component @demo-architecture
  Scenario: Demonstrate Salesforce component handling
    When the user clicks the "New" button
    Then a modal dialog should appear
    When the user cancels the dialog
    Then the modal should close
    And the spinner should not be visible
