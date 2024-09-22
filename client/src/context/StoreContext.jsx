import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const StoreContext=createContext(null);

const StoreContextProvider=(props)=>{

    const [cartItems, setCartItems]=useState({}); 
    const url="http://localhost:4000"
    const [token, setToken]=useState("");
    const [food_list, setFoodList]=useState([]);


    const addToCart = async (itemId)=>{
        if(!cartItems[itemId])
        {
             setCartItems((prev=>({...prev, [itemId]:1})))
        }
        else{
            setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }
   
    const removeFromCart = async (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    // const getTotalCartAmount=()=>{
    //     let totalAmount=0;
    //     for(const item in cartItems)
    //     {
    //         if(cartItems[item]>0){
    //             let itemInfo=food_list.find((product)=>product._id===item)
    //             totalAmount+=itemInfo.price * cartItems[item];
    //         }
            
    //     }
    //     return totalAmount;
    // }
    const getTotalCartAmount = () => {
        if (food_list.length === 0) {
            console.warn("Food list is empty, unable to calculate total.");
            return 0; // Prevent calculation when food list is not available.
        }
    
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
    
                // Check if itemInfo exists before proceeding
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                } else {
                    console.error(`Product with ID ${item} not found in food_list.`);
                }
            }
        }
        return totalAmount;
    };
    
    // const fetchFoodList=async ()=>{
    //     const response=await axios.get(url+"/api/food/list")
    //     setFoodList(response.data.data);
    // }
    const [loading, setLoading] = useState(true);
    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
        setLoading(false); // Set loading to false once the food list is fetched
    };

    const loadCartData=async (token)=>{
        const response=await axios.post(url+"/api/cart/get", {}, {headers:{token}})
        setCartItems(response.data.cartData);
    }
    // useEffect(()=>{
       
    //     async function loadData(){
    //         await fetchFoodList()
    //         if(localStorage.getItem("token")){
    //             setToken(localStorage.getItem("token"));
    //             await loadCartData(localStorage.getItem("token"));
    //         }
    //     }
    //     loadData();
    // })
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);
    if (loading) {
        return <div>Loading...</div>; // Display a loading indicator while fetching data
    }

    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider