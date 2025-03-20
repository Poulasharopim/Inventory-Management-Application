# Inventory-Management-Application

This application allows users to manage their inventory. It displays a list of inventory items with columns for name, category, stock quantity, and last updated date. Users can also view, edit, and add new items.

## Features

*   **Inventory Listing:** Displays a list of all inventory items.
*   **Item Details:** Shows detailed information about each item.
*   **Edit Item:** Allows users to modify item details.
*   **Add Item:** Allows users to add new items to the inventory.
*   **Responsive Design:** The application is designed to work on different screen sizes.

## Technology Stack

*   **Frontend:**
    *   Angular v16
    *   PrimeNG v16 (UI Component Library)
    *   BehaviorSubject (State Management)
*   **Other Tools:**
    *   Git (Version Control)
    *   npm or yarn (Package Manager)
    *   Jest (Backend Testing)
    *   Karma and Jasmine (Frontend Testing)
    *   Webpack (Build Tool - Angular uses it internally)

## Getting Started

These instructions will guide you through setting up and running the Inventory Management Application on your local machine.

### Prerequisites

*   **Node.js and npm (or yarn):** Ensure you have Node.js and npm (or yarn) installed. You can check by running `node -v` and `npm -v` (or `yarn -v`) in your terminal.
*   **Angular CLI:** You'll need the Angular CLI installed globally. Install it with: `npm install -g @angular/cli`
*   **Git:** Ensure you have Git installed.

### Installation and Setup

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Poulasharopim/Inventory-Management-Application.git
    cd Inventory-Management-Application/Inventory
    ```


2.  **Install Frontend Dependencies:**
    ```bash
    npm install # or yarn install
    ```

### Running the Application

1.  **Start the Frontend Development Server:**
    ```bash
    ng serve
    ```
    This will start the Angular development server, usually on port 4200.

3.  **Access the Application:**
    Open your web browser and go to `http://localhost:4200` to access the Inventory Management Application.

## Testing

1.  **Run Frontend Tests:**
    ```bash
    ng test