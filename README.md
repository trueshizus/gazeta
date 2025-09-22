# Gazeta - Historical Document Processing Platform

A full-stack application for processing and digitizing historical newspaper documents, built with Next.js frontend and Encore backend.

## Project Structure

This is a Bun workspace with two main applications:

- **`frontend/`** - Next.js application for the user interface
- **`backend/`** - Encore backend application for API and data processing

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) - Package manager and runtime
- [Encore](https://encore.dev/) - Backend framework
- Docker (for PostgreSQL database)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gazeta
```

2. Install dependencies for the entire workspace:
```bash
bun install
```

### Running the Application

#### Development Mode

Run both frontend and backend together:
```bash
bun run dev
```

Or run them separately:

**Backend only:**
```bash
bun run dev:backend
# or
cd backend && encore run
```

**Frontend only:**
```bash
bun run dev:frontend
# or 
cd frontend && bun run dev
```

#### Database Setup

The backend uses Encore's built-in database system. The database will be automatically created when you run the backend for the first time.

If you need to run migrations manually:
```bash
cd backend && encore db migrate
```

### API Documentation

The backend provides the following services:

#### Sources Service (`/sources`)
- `POST /sources` - Create a new source file entry
- `GET /sources` - List all sources with pagination
- `GET /sources/:id` - Get a specific source
- `PUT /sources/:id` - Update a source
- `DELETE /sources/:id` - Delete a source

#### Parsing Service (`/parsing`)
- `POST /parsing/parse` - Parse a source file (with optional coordinates for focused parsing)
- `GET /parsing/content/:sourceId` - Get parsed content for a source

### Features

- **File Upload Management**: Track and manage uploaded document files
- **Document Parsing**: OCR and AI-powered text extraction from historical documents
- **Focused Parsing**: Parse specific regions of documents using coordinates
- **Database Integration**: PostgreSQL database with proper indexing
- **Modern Stack**: Next.js, Encore, TypeScript, and Bun

### Architecture

- **Frontend**: Next.js application with Tailwind CSS
- **Backend**: Encore TypeScript application with built-in database
- **Database**: PostgreSQL (managed by Encore)
- **Package Management**: Bun workspace
- **Development**: Hot reload for both frontend and backend

## Contributing

1. Make sure both frontend and backend run without errors
2. Follow TypeScript best practices
3. Use Encore patterns for backend development
4. Test your changes before submitting