# DukaSmart: System Architecture and Data Flows

This document outlines the request and response flows for the core features in the DukaSmart application. It is designed to serve as a blueprint for creating detailed architecture diagrams.

## 1. Authentication Flow (User Login)

This flow describes how a user logs into the application using Firebase Authentication.

```
+--------------------------+      +--------------------------+      +--------------------------+
|      CLIENT (Browser)    |      |   SERVER (Next.js)       |      |   FIREBASE AUTHENTICATION|
|                          |      |                          |      |                          |
| [Login Page Component]   |      | [Server Action]          |      | [Firebase Auth Service]  |
+--------------------------+      +--------------------------+      +--------------------------+
             |                                |                               |
1. User enters email and
   password on `/login`.
             |
2. Clicks "Login" button.
             |
             +------------------------------->
             |
             |        3. Server Action Call
             |           (e.g., `signInWithEmail`)
             |           { email, password }
             |
             |                         |
             |                         | 4. Server validates credentials
             |                         |    against Firebase Auth.
             |                         |
             |                         |                +------------------->
             |                         |                |
             |                         |                | 5. Verify Credentials
             |                         |                |
             |                         |                |
             |                         |                |       [Success/Failure]
             |                         |                |               |
             |                         |                <-------------------+
             |                         |                |
             |                         |                | 6. Auth service returns
             |                         |                |    user token or error.
             |                         |
             |                         | 7. Server creates a session
             |                         |    cookie and sends a success
             |                         |    response to the client.
             |                         |
             <-------------------------------+
             |
             |        8. Response { success: true }
             |           (Redirect to /dashboard)
             |
9. Client receives response
   and Next.js router navigates
   to the dashboard page.
             |
             V
+--------------------------+
|  [Dashboard is loaded]   |
+--------------------------+
```

## 2. Inventory Management Flow (Add a Product)

This diagram illustrates how a new product is added to the inventory via a server action and persisted in Firestore.

```
+--------------------------+      +--------------------------+      +--------------------------+
|      CLIENT (Browser)    |      |   SERVER (Next.js)       |      |    DATABASE (Firestore)  |
|                          |      |                          |      |                          |
| [AddProductDialog Comp]  |      | [Server Action]          |      | [Products Collection]    |
+--------------------------+      +--------------------------+      +--------------------------+
             |                                |                               |
1. User clicks "Add Product"
   and fills out the form.
             |
2. Clicks "Save Product".
             |
             +------------------------------->
             |
             |        3. Server Action Call
             |           (e.g., `addProduct`)
             |           { name, category, ... }
             |
             |                         |
             |                         | 4. Server validates input data
             |                         |    and prepares to save to DB.
             |                         |
             |                         |                +------------------->
             |                         |                |
             |                         |                | 5. Write Operation
             |                         |                |    (Create new document)
             |                         |                |
             |                         |                |
             |                         |                |           [Saved]
             |                         |                |               |
             |                         |                <-------------------+
             |                         |                |
             |                         |                | 6. DB confirms write.
             |                         |
             |                         | 7. Server sends back a
             |                         |    success response.
             |                         |
             <-------------------------------+
             |
             |        8. Response { success: true }
             |
9. UI state updates. The
   `InventoryTable` re-fetches
   or updates, showing the new
   product. Dialog closes.
             |
             V
+--------------------------+
| [UI shows new product]   |
+--------------------------+
```

## 3. Sales & Reporting Flow

This section covers two key actions: recording a new sale and viewing sales reports.

### 3.1. Record a Sale

This flow handles the process of selling a product, which involves updating the inventory and creating a sales record.

```
+--------------------------+      +--------------------------+      +--------------------------+
|      CLIENT (Browser)    |      |   SERVER (Next.js)       |      |    DATABASE (Firestore)  |
|                          |      |                          |      |                          |
|  [SellProductDialog]     |      | [Server Action]          |      | [Products & Sales Colls] |
+--------------------------+      +--------------------------+      +--------------------------+
             |                                |                               |
1. User opens "Sell" dialog
   for a product and enters
   quantity.
             |
2. Clicks "Record Sale".
             |
             +------------------------------->
             |
             |        3. Server Action Call
             |           (e.g., `recordSale`)
             |           { productId, quantity, ... }
             |
             |                         |
             |                         | 4. Server executes a transaction:
             |                         |    a) Read product quantity.
             |                         |    b) Verify stock is sufficient.
             |                         |
             |                         |                +------------------->
             |                         |                |
             |                         |                | 5. DB Transaction:
             |                         |                |  - UPDATE `products/{id}`
             |                         |                |  - CREATE `sales/{id}`
             |                         |                |
             |                         |                |           [Success]
             |                         |                |               |
             |                         |                <-------------------+
             |                         |                |
             |                         |                | 6. DB confirms success.
             |                         |
             |                         | 7. Server returns success.
             |                         |
             <-------------------------------+
             |
             |        8. Response { success: true }
             |
9. UI updates across the app
   (e.g., inventory count,
   dashboard stats) due to
   state change.
             |
             V
+--------------------------+
| [Inventory is updated]   |
+--------------------------+
```

### 3.2. View Reports Page

This flow describes how data is fetched and rendered for the Reports page. This is primarily a server-side rendering flow.

```
+--------------------------+      +-----------------------------+      +--------------------------+
|      CLIENT (Browser)    |      |     SERVER (Next.js)        |      |    DATABASE (Firestore)  |
|                          |      |                             |      |                          |
| [User Navigation]        |      | [Reports Page (Server Comp)]|      | [Sales Collection]       |
+--------------------------+      +-----------------------------+      +--------------------------+
             |                                |                               |
1. User clicks link to
   `/dashboard/reports`.
             |
             +------------------------------->
             |
             |        2. GET /dashboard/reports
             |
             |                         |
             |                         | 3. Next.js invokes the Reports
             |                         |    Page component on the server.
             |                         |
             |                         |                +------------------->
             |                         |                |
             |                         |                | 4. Fetch Operation
             |                         |                |  (Query sales data)
             |                         |                |
             |                         |                |        [Sales Data]
             |                         |                |               |
             |                         |                <-------------------+
             |                         |                |
             |                         |                | 5. DB returns data.
             |                         |
             |                         | 6. Server component aggregates
             |                         |    data and renders the full
             |                         |    HTML for the page.
             |                         |
             <-------------------------------+
             |
             |        7. HTML Response
             |
8. Browser receives the
   fully-rendered page and
   displays it. The client-side
   React "hydrates" the page
   to make it interactive.
             |
             V
+--------------------------+
| [Reports Page displayed] |
+--------------------------+
```