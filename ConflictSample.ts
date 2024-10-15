interface User { id: number; name: string; }  
const greetUser = (user: User) => `Hello, ${user.name}!`;  
const user: User = { id: 1, name: "Alice" };  
console.log(greetUser(user));  
