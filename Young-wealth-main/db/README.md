# Database Directory

This directory is reserved for database-related files and configurations.

## Future Integration

This folder will contain:
- Database schema files
- Migration scripts
- Database configuration
- Seed data files

Currently using mock data in the server models. Database integration will be added later.

## Planned Database Structure

### Users Table
- id (UUID)
- fullName (String)
- email (String, unique)
- password (String, hashed)
- role (Enum: school-student, college-student, employee, admin)
- schoolType (Enum: government, private) - for school students
- isActive (Boolean)
- createdAt (DateTime)
- updatedAt (DateTime)

### Courses Table
- id (UUID)
- title (String)
- description (Text)
- category (Enum: school, college, employee)
- level (Enum: beginner, intermediate, advanced)
- price (Decimal)
- duration (Integer) - in minutes
- thumbnail (String) - file path
- isActive (Boolean)
- createdAt (DateTime)
- updatedAt (DateTime)

### Videos Table
- id (UUID)
- courseId (UUID, Foreign Key)
- title (String)
- description (Text)
- videoUrl (String) - file path
- duration (Integer) - in minutes
- order (Integer)
- createdAt (DateTime)
- updatedAt (DateTime)

### User Progress Table (Future)
- id (UUID)
- userId (UUID, Foreign Key)
- courseId (UUID, Foreign Key)
- videoId (UUID, Foreign Key)
- completed (Boolean)
- watchTime (Integer) - in seconds
- completedAt (DateTime)
- createdAt (DateTime)