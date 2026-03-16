@regression @account @salesforce @commercial
Feature: Account Management
  As a Commercial Banker
  I want to manage accounts in Salesforce
  So that I can maintain commercial client relationships

  Background:
    Given the user is logged in as a Commercial Banker
    And the user navigates to the "FH360 Commercial" application
    And the user navigates to the "Accounts" tab

  @smoke @create
  Scenario: Create a new commercial account
    When the user clicks the "New" button
    And the user fills in the account form with the following details:
      | Account Name   | First Horizon Partners   |
      | Account Number | ACC-2026-001             |
      | Industry       | Financial Services       |
      | Phone          | 555-0300                 |
    And the user saves the record
    Then a success toast message should be displayed
    And the account "First Horizon Partners" should be visible on the record page

  @edit
  Scenario: Edit an existing account
    Given an account "First Horizon Partners" exists in the system
    When the user opens the account "First Horizon Partners"
    And the user clicks the "Edit" button
    And the user updates the "Phone" field to "555-0400"
    And the user saves the record
    Then a success toast message should be displayed
