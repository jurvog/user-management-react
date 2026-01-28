# User Management Dashboard

A React-based user management dashboard that demonstrates clean state handling, reusable hooks, and predictable component logic. The application focuses on typical CRUD-style functionality you would encounter in real-world internal tools.

This project is intended as a **portfolio project**, emphasizing code clarity, maintainability, and correct React patterns rather than visual polish.

---

## Live Demo

[Live demo on Vercel](https://user-management-react-rho.vercel.app/)

---

## Features

* Create, edit, and delete users
* Search and filter users by status and role
* Client-side pagination
* Persistent UI and table settings using `localStorage`
* Reusable custom hooks for shared logic
* Controlled and predictable form handling

---

## Tech Stack

* **React**
* **TypeScript (strict mode)**
* **Custom React Hooks**
* **LocalStorage for persistence**

> TypeScript is planned as a future enhancement.

---

## TypeScript Integration

This project was originally implemented in JavaScript and later **migrated to TypeScript** as part of a learning process.

TypeScript is used to:
* Define core domain types (e.g. `User`, roles, statuses)
* Strongly type component props and state
* Improve safety around shared logic (tables, forms, hooks)
* Catch errors earlier during refactoring and extension

The focus was on **practical TypeScript usage in a real React codebase**, not on showcasing advanced or overly abstract type patterns.

---

## Project Structure

```
src/
  components/     // UI components (DataTable, UserForm, etc.)
  hooks/          // Custom hooks (e.g. useLocalStorage)
  utils/          // Shared helper functions
  types/          // Shared TypeScript types
  App.tsx
  main.tsx
```

The structure is intentionally modular to reflect real-world React projects.

---

## Getting Started

### Prerequisites

* Node.js (LTS recommended)
* npm

### Install dependencies

```bash
npm install
```

### Run the project locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

---

## Design & Implementation Notes

* State updates are centralized to avoid inconsistent UI behavior
* `useCallback` and `useMemo` are used intentionally to prevent unnecessary re-renders
* Side effects are kept minimal and predictable
* Form logic is isolated from data persistence logic
* LocalStorage access is abstracted into a custom hook

The goal was to write code that is **easy to reason about and easy to extend**, not just code that “works”.

---

## Future Improvements

* Maybe improve accessibility (ARIA attributes)

---

## Author

Created as a personal portfolio project to demonstrate modern React development practices.
