interface User { id: number; name: string; }  
const greetUser = (user: User) => `Hello, ${user.name}!`;  
const user: User = { id: 2, name: "Dharshini" };  
console.log(greetUser(user)); 
