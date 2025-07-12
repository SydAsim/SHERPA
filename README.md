# SHERPA - AI-Powered Vulnerability Management

SHERPA is a modern, AI-enhanced platform designed to streamline the process of vulnerability management. It provides security teams with the tools they need to identify, prioritize, and remediate threats efficiently. This MVP demonstrates the core functionalities, including a comprehensive dashboard, AI-driven insights, and collaborative remediation logs.

## Deployed Application

- **Live URL**: [You can deploy your app by clicking "Publish" in the top right corner!]
- **Admin Login**:
  - **Username**: `admin`
  - **Password**: `password123`

## Tech Stack

### Frontend

- **Framework**: React 18.2.0
- **Build Tool**: Vite
- **Styling**: TailwindCSS with shadcn/ui components
- **Routing**: React Router 6



### Backend (Conceptual)

This MVP uses `localStorage` for data persistence to simulate a backend. The planned backend stack is:




## Getting Started Locally

### Prerequisites

- Node.js (v20 or higher)
- npm

### Installation & Running

1.  **Clone the repository**:
    ```bash
    git clone <repo-url>
    cd <Go inside project >
    ```

2.  **Install dependencies**:
    The environment handles this automatically when `package.json` is updated. If running manually:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    The environment runs this automatically. To run manually:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Core Features

- **Theming**: Dark and Light mode support, persists in `localStorage`.
- **Authentication**: Simplified hardcoded login (`admin`/`password123`).
- **Dashboard**: A central hub to view and manage vulnerabilities.
  - **Stats Cards**: At-a-glance view of key metrics.
  - **Vulnerability Table**: Sortable and filterable list of all vulnerabilities.
- **Vulnerability Details**: A modal view showing comprehensive information, including an AI-powered chat log for remediation.
- **Add Vulnerability**: A multi-step form to add new vulnerabilities to the system.
- **AI Assistant Tools**:
  - **Vulnerability Insight Generator**: Get AI-powered analysis on vulnerability descriptions.
  - **Scenario Assistant**: Receive project management advice for security scenarios.
- **Settings Page**: A dedicated space for user and application settings.
- **Responsive Design**: Fully usable across desktop and mobile devices.
