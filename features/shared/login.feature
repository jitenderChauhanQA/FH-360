@smoke @login @salesforce
@XRAY-TC-100 @XRAY-TS-SHARED
Feature: Salesforce Login
  As a Salesforce user
  I want to login to the FH360 application
  So that I can access my assigned modules

  Background:
    Given the user navigates to the Salesforce login page

  @csp360 @XRAY-TC-100-01
  Scenario: CSP Agent logs in successfully
    When the user enters CSP Agent credentials
    And the user clicks the Login button
    Then the Salesforce dashboard should be displayed
    And the App Launcher should be visible

  @retail @XRAY-TC-100-02
  Scenario: Retail Banker logs in successfully
    When the user enters Retail Banker credentials
    And the user clicks the Login button
    Then the Salesforce dashboard should be displayed
    And the App Launcher should be visible

  @negative @XRAY-TC-100-03
  Scenario: Login fails with invalid credentials
    When the user enters invalid credentials
      | username | password    |
      | invalid  | wrongpass   |
    And the user clicks the Login button
    Then an error message should be displayed
