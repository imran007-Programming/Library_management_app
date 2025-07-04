# 📚 Public_Library

A modern web application to browse, add, edit, and borrow books in a digital library.

---

## ✨ Features

✅ Browse all books  
✅ Add new books with validation  
✅ Borrow books with quantity tracking  
✅ Edit book details  
✅ Delete books  
✅ Responsive UI and dark mode

---

## 🛠️ Tech Stack

**Frontend**

- ⚡ Vite
- 🎨 Tailwind CSS
- 🧩 Shadcn UI
- ⚛️ Redux Toolkit & RTK Query
- 🌐 TypeScript

**Backend**

- 🚀 Node.js
- 📝 Express.js
- 🗂️ Mongoose (MongoDB)
- 🌐 TypeScript

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/imran007-Programming/Library_management_app.git
cd Library_management_app
```


# ✨ Public_Library – App Features

Public_Library is a full-stack application for managing a digital library. Below are the main features categorized by functionality.

---

## 📚 User Features

### 🟢 View and Browse Books
- See a list of all books in the library.
- View details such as title, author, genre, description, copies, and availability.


---

### 🟢 Add New Books
- Fill out a form to add new books.
- Fields include:
  - Title
  - Author
  - Genre
  - ISBN (with unique validation)
  - Description
  - Number of copies
- Validation ensures all required fields are filled correctly.

---

### 🟢 Edit Existing Books
- Update book details via an edit form.
- Modify title, author, genre, description, copies, and availability.
- Changes are saved instantly via RTK Query.

---

### 🟢 Delete Books
- Remove books from the library.
- Confirmation prompts to avoid accidental deletion.

---

### 🟢 Borrow Books
- Borrow a book by selecting the quantity.
- Available copies are updated in real-time.
- Borrowing logic ensures users cannot borrow more copies than are available.

---

## 🎨 User Interface

- **Responsive design:** Works seamlessly on desktop, tablet, and mobile.
- **Dark mode:** Toggle between light and dark themes.
- **Modern styling:** Built with Tailwind CSS and Shadcn UI components.

---

## ⚙️ Tech Overview

| Layer       | Technology                             |
| ----------- | -------------------------------------- |
| Frontend    | Vite, React, TypeScript, Tailwind CSS, Shadcn UI |
| State       | Redux Toolkit, RTK Query               |
| Backend     | Node.js, Express.js, TypeScript        |
| Database    | MongoDB with Mongoose ODM              |

---

## 🌟 Future Enhancements

- User authentication & roles (admin/user)
- Book borrowing history
- Return book feature
- Email notifications
- Pagination and advanced filtering

---

## 🙌 Contributing

If you’d like to contribute or suggest improvements, please open an issue or submit a pull request.






