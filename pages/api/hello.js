
// import url from 'url';

// export default async function handler(req, res) {



//     let books = {}
//     await fetch("https://gutendex.com/books/")
//     .then(res => res.json())
//     .then(json => { 
//         books = json
//         //console.log(json["results"])
//     })

   

//     books["results"].map(book => {  
            
//         //console.log(book)

//         if (book["formats"]["image/jpeg"].includes("medium")) {
//                  console.log(book["formats"]["image/jpeg"])

//             // book["authors"].map(author => {
//             //     console.log(author)
//             // })
//         }
//     })


//         let usdPrice = req.query["usd"];
//         let avax = 0;
//         await fetch("https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=USD")
//         .then(res => res.json())
//         .then(json => { 
//             console.log(json["avalanche-2"]["usd"])
//             avax = json["avalanche-2"]["usd"]
//         })
        

//         if (avax !==0)  
//         {   let toAvax = usdPrice / avax 
//             res.status(200).json({ name: toAvax.toFixed(5)})
//         }


//   }