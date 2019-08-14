let ids: number = 0;
let seed: User[] = [
    {
        Id: ids++,
        first_name: "Manthan",
        middle_name: "K",
        last_name: "Anejaa",
        phone: 7988852574,
        email: "manthananeja@gmail.com",
        address: "Mohali",
        role: "Developer"
    },
    {
        Id: ids++,
        first_name: "Akshay",
        middle_name: "",
        last_name: "Mahajan",
        phone: 9653906889,
        email: "akshay.mahajan@sourcefuse.com",
        address: "Mohali",
        role: "Developer"
    },
    {
        Id: ids++,
        first_name: "Raja",
        middle_name: "Mangli",
        last_name: "Patwari",
        phone: 987974562,
        email: "aam_aadmi@gmail.com",
        address: "Mohali",
        role: "Politician"
    },
    {
        Id: ids++,
        first_name: "Rahul",
        middle_name: "Sahi",
        last_name: "Kukreja",
        phone: 987789456,
        email: "rahul_kukreja@gmail.com",
        address: "Mohali",
        role: "Quaity Assure"
    },
    {
        Id: ids++,
        first_name: "Anichet",
        middle_name: "Curry",
        last_name: "Dubey",
        phone: 1478523690,
        email: "anichet_c@gmail.com",
        address: "Dehradun",
        role: "Dietician"
    }
];

type User = {
    Id: number | string;
    first_name: string;
    middle_name: string;
    last_name: string;
    phone: number | string;
    email: string;
    address: string;
    role: string;
    [key: string]: string|number;
}