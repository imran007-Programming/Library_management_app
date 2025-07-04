

import App from "@/App";
import { Addbook } from "@/Pages/Addbook";

import { Allbook } from "@/Pages/Allbook";
import BorrowbookSummary from "@/Pages/BorrowbookSummary";



import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path:"/",
        Component:App,
        children:[

            {   
                
                path:"/",
                Component:Allbook
            },
            {   
                index:true,
                path:"allbooks",
                Component:Allbook
            },
            
            
            {
                path:"addbook",
                Component:Addbook
            },
            {
                path:"borrow_book",
                Component:BorrowbookSummary
            },
        ] 
    },
    
    
])

export default router;

