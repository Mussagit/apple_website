# Apple Replica — React + Express (MVC) + MySQL

A React front end (hooks + React Router) backed by an Express/MySQL API
built in MVC style.

```
apple-clone/
├── backend/                  # Express + MySQL (MVC)
│   ├── config/db.js          # mysql2 connection pool
│   ├── models/               # M — SQL queries
│   │   └── productModel.js
│   ├── controllers/          # C — request handling
│   │   └── productController.js
│   ├── routes/                # routes -> controllers
│   │   └── productRoutes.js
│   ├── database/schema.sql   # tables + seed data
│   ├── server.js             # app entry point
│   ├── .env.example
│   └── package.json
└── frontend/                 # React (hooks + react-router-dom)
    ├── public/index.html
    ├── src/
    │   ├── api/axios.js
    │   ├── components/
    │   │   ├── Navbar.js / .css
    │   │   ├── YoutubeVideos.js / .css     <-- Question 1
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Iphone.js / .css            <-- Question 2
    │   │   └── SingleAppleProduct.js / .css<-- Question 3
    │   ├── App.js             # routes: "/", "/iphone", "/iphone/:id"
    │   └── index.js           # wraps App in <BrowserRouter>
    ├── .env.example
    └── package.json
```

## 1. Database setup

1. Make sure MySQL is running locally.
2. Import the schema + seed data:
   ```bash
   mysql -u root -p < backend/database/schema.sql
   ```
   This creates the `apple_replica` database with `products`,
   `product_description`, `product_price`, `users`, and `orders` tables,
   and inserts the 3 sample iPhones (SE, 11, 11 Pro).

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# edit .env with your real MySQL password
npm run dev        # nodemon, or `npm start` for plain node
```

Verify it's working:
- `GET http://localhost:5000/api/products` → list of all iPhones
- `GET http://localhost:5000/api/products/1` → iPhone SE only

## 3. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
# edit .env: REACT_APP_YOUTUBE_API_KEY=your_key_here
npm start
```

Opens at `http://localhost:3000`.

### Getting a YouTube Data API v3 key
1. Go to console.cloud.google.com and create a project (e.g. "Apple API Project").
2. APIs & Services → Library → search "YouTube Data API v3" → Enable.
3. APIs & Services → Credentials → Create credentials → API key.
4. Paste that key into `frontend/.env` as `REACT_APP_YOUTUBE_API_KEY`.
   (Google's console UI changes from time to time — search "create YouTube
   Data API key" if these steps look different.)

## 4. How each requirement maps to the code

| Assignment requirement | File(s) |
|---|---|
| `YoutubeVideos.js`, capped at 8 videos, `useState`/`useEffect` | `frontend/src/components/YoutubeVideos.js` |
| Responsive CSS (small vs. medium+ screens) | `frontend/src/components/YoutubeVideos.css` |
| `Iphone.js` fetches products from MySQL via API | `frontend/src/pages/Iphone.js` + `backend/models/productModel.js` |
| New route for the "iphone" page, wired to Navbar | `frontend/src/App.js`, `frontend/src/components/Navbar.js` |
| `SingleAppleProduct.js`, loads on `iphone/:id` | `frontend/src/pages/SingleAppleProduct.js` (`useParams`) |
| `pid` used as unique identifier | `product_id` column, passed as the `:id` route param |
| MVC backend | `backend/models`, `backend/controllers`, `backend/routes` |

## 5. Run both together

Two terminals:
```bash
# terminal 1
cd backend && npm run dev

# terminal 2
cd frontend && npm start
```

Then click "iphone" in the navbar → see all 3 products pulled from MySQL →
click "Learn more" on any card → single product detail page loads at
`/iphone/:id`, fetched fresh from the database by `pid`.
