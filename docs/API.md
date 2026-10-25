# Navyug LMS: frontend contract

The frontend talks to the LMS only through `js/store.js` (`window.NavyugStore`). Replace the function bodies with API calls and no page needs to change. Pages call `await NavyugStore.init()` once, then read synchronously from a cache; writes update the cache first and persist in the background.

Today everything is stored in the browser (`localStorage`). Nothing below exists on a server yet.

## Data shapes

**Course** (currently `js/data/courses.js`, should come from `GET /courses`)
```json
{ "id": "user-research", "title": "…", "category": "Design", "level": "Beginner",
  "type": "Tutorial | Essentials | Course", "price": 1999, "currency": "INR",
  "duration": 120, "durationLabel": "2 hours", "description": "…",
  "outcomes": ["…"], "modules": [{ "id": "m1", "title": "…", "lessons": [{ "id": "m1l1", "title": "…", "type": "Read | Practice", "body": "…" }] }] }
```
`price: 0` means free. The repo also uses `sample` (demonstration content, not approved), `speciality` (EV and battery section) and `keywords` (search terms); the LMS should return `sample: false` or omit it for approved courses. Prices in the repo are placeholders. Lessons are currently built in `js/pages.js` from `js/data/lessons.js`. The LMS should return them inside `modules`.

**Enrolment**: `{ "courseId": "…", "done": ["m1l1"], "last": "m1l2" }`

**Order**: `{ "id": "…", "courseId": "…", "amount": 1999, "currency": "INR", "status": "pending | paid | failed" }`

## Store function to endpoint mapping (suggested)

| `NavyugStore` | Suggested endpoint |
|---|---|
| (course list) | `GET /courses`, `GET /courses/:id` |
| `getSaved`, `toggleSaved` | `GET /me/saved`, `PUT/DELETE /me/saved/:courseId` |
| `getEnrolments` | `GET /me/enrolments` |
| `enrol(courseId)` | `POST /me/enrolments`, only if free or an order is `paid` (server must enforce) |
| `setLast`, `toggleLesson` | `PUT /me/enrolments/:courseId/progress` |
| `createOrder`, `completeOrder` | `POST /orders`; payment gateway confirms by webhook. The frontend must never mark an order paid itself. |
| `canEnrol` | derived from `GET /me/orders` |
| `getNote`, `setNote` | `GET/PUT /me/notes/:courseId/:lessonId` |
| (accounts) | `POST /auth/login`, `POST /auth/logout`, `GET /me` |
| enquiry forms | `POST /enquiries` (today the forms open a `mailto:` link) |

## Accounts and cart (added)

Learning, enrolment, notes and the dashboard require sign-in. Today `signUp`/`signIn` create demo accounts in the browser (email only, no password). A guest's cart and saved courses merge into the account on sign-in.

| `NavyugStore` | Suggested endpoint |
|---|---|
| `signUp`, `signIn`, `signOut`, `getUser` | `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, `GET /me` |
| `getCart`, `addToCart`, `removeFromCart` | `GET/PUT/DELETE /me/cart` |
| `demoCheckout(list)` | `POST /orders` then payment gateway, then enrol on webhook. Never mark paid in the browser. |

## Known prototype shortcuts to remove

- `demoCheckout` marks orders paid without a payment (cart page, `js/pages.js`).
- There is no login. Progress belongs to the browser, not a person.
- Certificates, ratings and reviews do not exist, and the UI has no placeholders for them.
