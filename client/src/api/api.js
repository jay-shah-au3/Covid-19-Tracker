export async function fetchData(url){
   return fetch(url)
    .then(res=>res.json())
}