 <h1>🌟 Productive – Task Management</h1>

📋 About project

This is Fullstack application that helps users keep up with their tasks. Users can create acount and login. Add/delete/edit tasks, mark them as done for today. App counts daily streak of completed tasks and giving diamonds for finished missions. Tables in database are connected using foreign keys.

🚀 Tech Stack

🎨 Frontend:

⚛ React (with TypeScript)

🎨 Tailwind CSS

🔗 Axios for API requests

🛠️ Redux Toolkit for global state

🛠 Backend:

🟢 Node.js

🚀 Express.js

🗄 MySQL (Database)

🔄 Data Flow

📌 App is getting all information about user and tasks by passing User_id from Frontend (local storage) to Api to Database. Data is getting fetched for specific user by relations in the database, based on User_id.

🏛 Database Structure

✅ All tables in the database are connected via foreign keys. ✅ Queries are executed using User_id to fetch the required data.

📡 Example API Flow

🖥 Frontend Request:

axios .post(${import.meta.env.VITE_API_URL}/getStreakRewards, {  
User_id: currentUserId,  
}) .then((res) => {  
localStorage.setItem("streakRewards", JSON.stringify(res.data));

if (isDataLoading === true) {
window.location.reload();
}

}) .catch((error) => { console.error("Error fetching streak rewards:", error); });

🌐 Backend API Endpoint:

app.post("/getStreakRewards", (req, res) => {
const User_id = req.body.User_id;

db.query(
"SELECT \* FROM streakrewards WHERE User_id = ?",
[User_id],
(err, result) => {
if (err) {
return res.send({ err: err });
}
if (result.length > 0) {
return res.send(result);
} else {
return res.send({ message: "Bad request" });
}
}
);
});
