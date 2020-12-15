# CS148 Project: Nutriflix (Frontend)

## Summary
### Mission
Increase visibility, awareness, and accessibility for healthier eating and dieting.

### Vision
Foster a centralized platform for people with similar nutritional goals to connect and empower each other. 

### Background
While healthy eating resources are available on the web, there lacks a centralized, trustworthy platform for newly interested individuals to use and acquire information readily. We propose a solution to provide a platform for users to share with and support their community in achieving their healthier diet goals, as well as keeping each other motivated through tough times. Without knowing where to start, some people may give up and never achieve their goals; with our platform, we hope to provide the necessary convenience to those who want to give it a shot and keep them motivated to make a change for the better.

### Objective
Our web application will be a one-stop shop for nutritional food dieting regarding home cooking and eating out, as well as an informative and motivational hub to learn more and stay healthy!

## Setup
### System Overview
Our system will be comprised of the following technologies:
- React
- Javascript

### Prerequisites
None.

### Installation
See package.json for a full list of libraries.

## Specs
### Functionality
Sprint 1: MVP
1. A user can log in and log out safely to access pages based on their permissions.
2. Any logged in user can update their private profile settings.
3. Any logged in user can manage their credits and use them to buy vendor products.
4. Any logged in user can use the map feature to search for restaurants.
5. Any logged in non-business vendor can apply to become a vendor. (Admin users can review these applications and approve or deny.)
6. Any logged in vendor can manage their own products.

Sprint 2: High Priority
1. Any logged in user can search for recipes from other users and external databases.
2. Any user can retrieve the public profile of vendors to obtain contact information. 
3. Any logged in user can manage their own posts and respond to others’ posts.
4. Any logged in user can report other users for suspicious activity. (Admin users can review these reports and take appropriate action.)

### Known Issues
- Search bars are case sensitive.
- Using the '&' character will break numerous API queries.
- Maps may show not properly formatted location (not restaurant) pop ups (from base Google component).
- Two consecutive updates without refreshing will result in only the most recent update saving.
- Nutrition does not update if a recipe's ingredients or instructions update.
- Minor CSS Styling issues.
- Clearing cookies while using the app will cause the app to not work properly. 
- Requests may take a few seconds to process.
- Maps API may not work correctly for international cities.
- Recipes API may not exclude ingredients or filter by health tags properly. 
- May not be able to create an account after logging in.
- Nutrition Facts may not be accurate.

### License
Apache 2.0
