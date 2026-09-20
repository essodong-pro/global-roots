# GlobalRoots – GitHub Copilot Instructions

## Project Overview

GlobalRoots is an interactive web application that helps students, travelers, and people interested in different cultures discover information about countries, traditions, languages, customs, celebrations, and food.

The main MVP pages are:

* `/`
* `/countries`
* `/countries/[id]`
* `/map`
* `/stories`
* `/quiz`

## Component Architecture

Use reusable components and avoid unnecessary duplication.

The planned component structure is:

* App

  * Header

    * Logo
    * Navigation
  * Main

    * Home
    * Countries

      * SearchBar
      * FilterBar
      * CountryCard
    * CountryDetails

      * CountryHeader
      * CulturalFacts
      * Traditions
      * Etiquette
      * Celebrations
    * CulturalMap
    * Stories

      * StoryCard
      * StoryForm
    * Quiz

      * Question
      * AnswerOptions
  * Footer

## Data Model

The project uses four main data entities:

### Country

* id
* name
* region
* capital
* description
* image
* language
* currency

### CulturalInformation

* id
* countryId
* clothing
* etiquette
* traditions
* celebrations
* cuisine

### Story

* id
* countryId
* title
* author
* content
* date

### QuizQuestion

* id
* countryId
* question
* options
* answer
* explanation

## Relationships

* One Country has one CulturalInformation record.
* One Country can have many Stories.
* One Country can have many QuizQuestions.

## Design Guidelines

Use the agreed GlobalRoots visual design:

* Primary color: Deep Green `#166534`
* Secondary color: Warm Orange `#D97706`
* Background: `#F8FAFC`
* Text: `#1F2937`
* White: `#FFFFFF`

Typography:

* Headings: Montserrat
* Body text: Roboto

## Layout Guidelines

Use a responsive, mobile-first layout.

Follow these conventions:

* Use a consistent page container.
* Use reusable cards for countries and stories.
* Maintain consistent spacing between sections.
* Provide responsive navigation.
* Use clear buttons and links.
* Maintain accessible text and color contrast.
* Reuse components instead of duplicating code.

## Development Workflow

Use GitHub branches and pull requests for development.

Each team member should:

1. Create a branch for their work.
2. Make focused changes related to their assigned issue.
3. Commit the changes with a clear commit message.
4. Push the branch to GitHub.
5. Open a pull request.
6. Have another team member review the work.
7. Merge the approved pull request into `main`.

## Coding Guidelines

* Follow the existing project structure.
* Reuse existing components whenever possible.
* Keep components focused on a clear responsibility.
* Use descriptive names for components, variables, and functions.
* Avoid unnecessary duplication.
* Keep the implementation consistent with the GlobalRoots architecture and data model.
* Do not introduce major architectural changes without discussing them with the team.

## Team Communication

Microsoft Teams is used for team communication, progress updates, and discussing blockers.

Team members should communicate when they encounter problems that could affect dependent work.
