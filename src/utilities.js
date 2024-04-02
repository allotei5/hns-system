export const saveInLocalStorage = (jsonData) => {
    const myJsonString = JSON.stringify(jsonData);
    localStorage.setItem("myJsonObject", myJsonString);
}

export const retrieveFromLocalStorage = () => {
    try {
        const myJsonString = localStorage.getItem("myJsonObject");
        // Deserialize the string back into a JSON object
        const myJsonObject = JSON.parse(myJsonString);

        return myJsonObject
    } catch (error) {
        console.log(error)
        return null
    }
    
}