# GlobalRoots Project Specification

## Project Title & Description
GlobalRoots is an interactive web application designed for students, travelers, and cultural enthusiasts who want to discover, learn about, and compare diverse cultural traditions, languages, customs, and cuisines from around the globe. Users can explore country-specific profiles featuring historical insights, daily etiquette, and cultural celebrations.

## Purpose & Target Audience
* **Audience:** Students, travelers, and global cultural enthusiasts.
* **Purpose:** Provide an accessible digital hub for promoting global awareness, cross-cultural understanding, and concise cultural information in one place.

## User Stories
1. As a user, I want to create an account so that I can save my favorite cultural profiles and submit community stories.
2. As a user, I want to browse an interactive country profiles directory so I can find nation-specific cultural facts and etiquette.
3. As a user, I want to use an interactive cultural map to click regions and view regional highlights.
4. As a user, I want to submit personal cultural stories or traditional recipes via a form.
5. As a user, I want to take an interactive quiz to test my knowledge of world customs and greetings.

## Acceptance Criteria
### Story 2: Browse Country Profiles
* Given a user opens the directory page, when they view the list, then they see searchable nation cards with summary metadata.
* Given a user searches for a specific nation, when a match is found, then the list filters instantly.

### Story 4: Submit Community Stories
* Given a signed-in user, when they submit the community story form with valid details, then the story is saved and displayed.
* Given missing required fields, when the form is submitted, then validation blocks submission and highlights errors.

## Technical Requirements
* **Framework:** Next.js App Router
* **Language:** TypeScript in strict mode
* **Styling:** Tailwind CSS
* **Code Quality:** ESLint and Prettier for strict code formatting

## Core API Endpoints
* GET /api/countries
* GET /api/countries/:id
* POST /api/stories
* GET /api/quiz